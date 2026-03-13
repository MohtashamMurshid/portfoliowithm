import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "WhatsApp",
  description: "Mohtasham's WhatsApp contact page",
};

const hasWhatsAppQr = existsSync(
  path.join(process.cwd(), "public", "whatsapp-qr.png")
);

const fallbackLinks = [
  { href: "/x", label: "X" },
  { href: "/ig", label: "Instagram" },
  { href: "/linkedin", label: "LinkedIn" },
];

export default function WhatsAppPage() {
  return (
    <main className="min-h-screen bg-[#25D366] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-10">
        <div className="w-full rounded-[32px] bg-white px-6 py-10 text-center text-neutral-950 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:px-10">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[#25D366] text-3xl font-bold text-white shadow-lg">
            M
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Mohtasham</h1>
          <p className="mt-2 text-lg text-neutral-600">WhatsApp contact</p>

          <div className="mt-10 rounded-[28px] bg-neutral-100 p-6">
            {hasWhatsAppQr ? (
              <Image
                src="/whatsapp-qr.png"
                alt="WhatsApp QR code for Mohtasham"
                width={320}
                height={320}
                priority
                className="mx-auto w-full max-w-xs rounded-2xl bg-white p-3 shadow-sm"
              />
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-10">
                <p className="text-base font-semibold text-neutral-700">
                  WhatsApp QR image not added yet.
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  Add a file at{" "}
                  <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700">
                    public/whatsapp-qr.png
                  </code>{" "}
                  to show the QR code on this page.
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="max-w-md text-center text-lg font-semibold leading-8 text-white/95">
          Scan or upload this QR code using the WhatsApp camera to add me on
          WhatsApp.
        </p>

        {!hasWhatsAppQr ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {fallbackLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
