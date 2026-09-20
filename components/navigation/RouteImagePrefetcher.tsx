"use client";

import { getImageProps } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import type {
  RoutePrefetchImage,
  RoutePrefetchTarget,
} from "@/lib/routeImagePrefetchTypes";

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

type WindowWithIdleCallback = Window & {
  cancelIdleCallback?: (handle: number) => void;
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
};

type ImagePriority = "high" | "low";

const warmedImages = new Map<string, HTMLImageElement>();
const warmingImages = new Map<string, Promise<void>>();

function resolveImageProps(image: RoutePrefetchImage) {
  if (image.srcSet) return image;

  const { props } = getImageProps({
    src: image.src,
    alt: "",
    sizes: image.sizes,
    ...(image.fill
      ? { fill: true }
      : { width: image.width, height: image.height }),
  });

  return {
    src: props.src,
    srcSet: props.srcSet,
    sizes: props.sizes ?? image.sizes,
  };
}

function warmImage(image: RoutePrefetchImage, priority: ImagePriority) {
  const resolved = resolveImageProps(image);
  const key = `${resolved.src}|${resolved.srcSet ?? ""}|${resolved.sizes}`;
  const warming = warmingImages.get(key);
  if (warming) {
    const pendingImage = warmedImages.get(key);
    if (pendingImage) pendingImage.fetchPriority = priority;
    return warming;
  }

  const warmed = warmedImages.get(key);
  if (warmed) {
    warmed.fetchPriority = priority;
    return Promise.resolve();
  }

  const element = new window.Image();
  element.alt = "";
  element.decoding = "async";
  element.fetchPriority = priority;
  element.sizes = resolved.sizes;
  if (resolved.srcSet) element.srcset = resolved.srcSet;

  const promise = new Promise<void>((resolve, reject) => {
    element.addEventListener(
      "load",
      () => {
        void element.decode().catch(() => undefined).finally(resolve);
      },
      { once: true },
    );
    element.addEventListener("error", () => reject(new Error(`Failed to prefetch ${resolved.src}`)), {
      once: true,
    });
  });

  warmedImages.set(key, element);
  warmingImages.set(key, promise);
  element.src = resolved.src;

  void promise.then(
    () => {
      warmingImages.delete(key);
    },
    () => {
      warmedImages.delete(key);
      warmingImages.delete(key);
    },
  );

  return promise;
}

function allowsIdlePrefetch() {
  const connection = (navigator as NavigatorWithConnection).connection;
  return !connection?.saveData && !connection?.effectiveType?.includes("2g");
}

function routeForAnchor(
  target: EventTarget | null,
  routes: Map<string, RoutePrefetchTarget>,
) {
  if (!(target instanceof Element)) return;

  const anchor = target.closest<HTMLAnchorElement>("a[href]");
  if (!anchor) return;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return;

  return routes.get(url.pathname.replace(/\/$/, "") || "/");
}

export default function RouteImagePrefetcher({
  targets,
}: {
  targets: RoutePrefetchTarget[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const routes = useMemo(
    () => new Map(targets.map((target) => [target.href, target])),
    [targets],
  );

  useEffect(() => {
    const warmRoute = (target: RoutePrefetchTarget, priority: ImagePriority) => {
      router.prefetch(target.href);
      void Promise.allSettled(
        target.images.map((image) => warmImage(image, priority)),
      );
    };

    const warmAnchorRoute = (event: Event) => {
      const target = routeForAnchor(event.target, routes);
      if (target) warmRoute(target, "high");
    };

    document.addEventListener("pointerover", warmAnchorRoute, { passive: true });
    document.addEventListener("focusin", warmAnchorRoute);
    document.addEventListener("touchstart", warmAnchorRoute, {
      capture: true,
      passive: true,
    });

    const idleTargets = targets.filter(
      (target) => target.preloadWhenIdle && target.href !== pathname,
    );
    const browserWindow = window as WindowWithIdleCallback;
    const idleHandles: number[] = [];
    const timeoutHandles: number[] = [];
    let cancelled = false;

    const scheduleIdleTargets = () => {
      if (!allowsIdlePrefetch() || document.visibilityState !== "visible") return;

      idleTargets.forEach((target, index) => {
        const run = () => {
          if (!cancelled) warmRoute(target, "low");
        };

        if (browserWindow.requestIdleCallback) {
          idleHandles.push(
            browserWindow.requestIdleCallback(run, {
              timeout: 2_500 + index * 750,
            }),
          );
        } else {
          timeoutHandles.push(window.setTimeout(run, 900 + index * 350));
        }
      });
    };

    if (document.readyState === "complete") {
      scheduleIdleTargets();
    } else {
      window.addEventListener("load", scheduleIdleTargets, { once: true });
    }

    return () => {
      cancelled = true;
      document.removeEventListener("pointerover", warmAnchorRoute);
      document.removeEventListener("focusin", warmAnchorRoute);
      document.removeEventListener("touchstart", warmAnchorRoute, true);
      window.removeEventListener("load", scheduleIdleTargets);
      idleHandles.forEach((handle) => browserWindow.cancelIdleCallback?.(handle));
      timeoutHandles.forEach((handle) => window.clearTimeout(handle));
    };
  }, [pathname, router, routes, targets]);

  return null;
}
