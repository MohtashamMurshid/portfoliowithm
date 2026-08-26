"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { catalog } from "./catalog";
import { ShelfEngine, type ShelfMode } from "./ShelfEngine";
import { siteConfig } from "./site-config";

export function ProgressLibrary() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ShelfEngine | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<ShelfMode>("browse");
  const [ready, setReady] = useState(false);
  const [shelfStatus, setShelfStatus] = useState("Loading the shelf");

  const activeBook = catalog[activeIndex];
  const selectedBook = useMemo(
    () => (selectedIndex === null ? null : catalog[selectedIndex]),
    [selectedIndex],
  );
  const isFocused = mode !== "browse";

  useEffect(() => {
    let cancelled = false;
    let engine: ShelfEngine | null = null;

    async function start() {
      if (!canvasRef.current) return;
      if (document.fonts.status !== "loaded") {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => window.setTimeout(resolve, 1_000)),
        ]);
      }
      if (cancelled || !canvasRef.current) return;

      try {
        engine = new ShelfEngine(canvasRef.current, catalog, {
          onActiveIndex: setActiveIndex,
          onMode: (nextMode, index) => {
            setMode(nextMode);
            setSelectedIndex(index);
          },
          onStatus: setShelfStatus,
          onReady: () => setReady(true),
        });
        engineRef.current = engine;
      } catch (error) {
        console.error("The bookshelf could not start.", error);
        setShelfStatus("The shelf could not load.");
      }
    }

    void start();
    return () => {
      cancelled = true;
      engine?.dispose();
      engineRef.current = null;
    };
  }, []);

  return (
    <main
      className={`press-experience ${ready ? "is-ready" : ""} ${
        isFocused ? "is-focused" : "is-browsing"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="shelf-canvas"
        data-testid="shelf-canvas"
        role="application"
        tabIndex={0}
        aria-label={`Interactive three-dimensional shelf of ${catalog.length} books. Drag or use the arrow keys to browse. Press Enter to inspect the selected book.`}
      />

      <div className="shelf-loader" aria-hidden={ready} aria-live="polite">
        <div className="shelf-loader__books" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <p>{shelfStatus}</p>
      </div>

      <section
        className="browse-caption"
        aria-hidden={isFocused}
        data-testid="browse-caption"
      >
        <p className="eyebrow">Favorite books</p>
        <p className="browse-caption__title">{activeBook.shortTitle}</p>
        <p className="browse-caption__author">{activeBook.author}</p>
        <p className="shelf-instruction">Click a book to read my notes.</p>
      </section>

      <aside
        className="book-details"
        aria-hidden={!isFocused}
        aria-label={selectedBook ? `Details for ${selectedBook.title}` : "Book details"}
        data-testid="book-details"
      >
        {selectedBook ? (
          <div className="book-details__inner">
            <button
              type="button"
              className="back-button"
              data-testid="return-to-shelf"
              onClick={() => engineRef.current?.returnToShelf()}
            >
              <span aria-hidden="true">←</span>
              <span>Back to shelf</span>
            </button>

            <div className="book-details__copy">
              <p className="eyebrow">My notes</p>
              <h2>{selectedBook.title}</h2>
              <p className="book-details__author">{selectedBook.author}</p>
              <p className="book-details__description">
                {selectedBook.description}
              </p>

              <blockquote>
                <p>“{selectedBook.quote}”</p>
                <cite>{selectedBook.quoteBy}</cite>
              </blockquote>

              <a
                className="official-link"
                data-testid="official-link"
                href={selectedBook.url}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {selectedBook.linkLabel ?? siteConfig.bookLinkLabel}
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        ) : null}
      </aside>

      <div className="sr-only" aria-live="polite">
        {isFocused && selectedBook
          ? `Inspecting ${selectedBook.title} by ${selectedBook.author}.`
          : `Selected ${activeBook.title} by ${activeBook.author}.`}
      </div>
    </main>
  );
}
