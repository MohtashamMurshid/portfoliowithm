"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./SiteHeader.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "https://blog.mohtasham.dev" },
  { label: "Archive", href: "/archive" },
];

type BlobStyle = CSSProperties & {
  "--blob-delay": string;
  "--blob-scale": number;
  "--blob-x": string;
  "--blob-y": string;
};

const logoBlobs: Array<{ cx: number; cy: number; r: number; style: BlobStyle }> = [
  { cx: 10, cy: 34, r: 2.2, style: { "--blob-delay": "40ms", "--blob-scale": 1.8, "--blob-x": "-22px", "--blob-y": "13px" } },
  { cx: 10, cy: 28, r: 1.6, style: { "--blob-delay": "125ms", "--blob-scale": 0.7, "--blob-x": "18px", "--blob-y": "-20px" } },
  { cx: 10, cy: 21, r: 2.7, style: { "--blob-delay": "10ms", "--blob-scale": 1.25, "--blob-x": "-13px", "--blob-y": "-18px" } },
  { cx: 10, cy: 14, r: 1.8, style: { "--blob-delay": "180ms", "--blob-scale": 2.1, "--blob-x": "24px", "--blob-y": "12px" } },
  { cx: 13, cy: 18, r: 2.4, style: { "--blob-delay": "75ms", "--blob-scale": 0.85, "--blob-x": "-24px", "--blob-y": "-8px" } },
  { cx: 16, cy: 22, r: 1.5, style: { "--blob-delay": "210ms", "--blob-scale": 1.7, "--blob-x": "13px", "--blob-y": "22px" } },
  { cx: 17, cy: 24, r: 2.5, style: { "--blob-delay": "95ms", "--blob-scale": 1.15, "--blob-x": "-17px", "--blob-y": "16px" } },
  { cx: 20, cy: 20, r: 1.7, style: { "--blob-delay": "155ms", "--blob-scale": 2.2, "--blob-x": "20px", "--blob-y": "-15px" } },
  { cx: 24, cy: 14, r: 2.8, style: { "--blob-delay": "25ms", "--blob-scale": 0.8, "--blob-x": "1px", "--blob-y": "-25px" } },
  { cx: 27, cy: 18, r: 1.5, style: { "--blob-delay": "225ms", "--blob-scale": 1.5, "--blob-x": "-21px", "--blob-y": "-16px" } },
  { cx: 30, cy: 22, r: 2.4, style: { "--blob-delay": "65ms", "--blob-scale": 2, "--blob-x": "23px", "--blob-y": "17px" } },
  { cx: 31, cy: 24, r: 1.8, style: { "--blob-delay": "170ms", "--blob-scale": 0.75, "--blob-x": "-9px", "--blob-y": "23px" } },
  { cx: 34, cy: 20, r: 2.6, style: { "--blob-delay": "115ms", "--blob-scale": 1.3, "--blob-x": "20px", "--blob-y": "-20px" } },
  { cx: 38, cy: 14, r: 1.7, style: { "--blob-delay": "0ms", "--blob-scale": 2.3, "--blob-x": "25px", "--blob-y": "-8px" } },
  { cx: 38, cy: 21, r: 2.3, style: { "--blob-delay": "195ms", "--blob-scale": 0.9, "--blob-x": "-19px", "--blob-y": "18px" } },
  { cx: 38, cy: 28, r: 1.5, style: { "--blob-delay": "50ms", "--blob-scale": 1.9, "--blob-x": "24px", "--blob-y": "8px" } },
  { cx: 38, cy: 34, r: 2.6, style: { "--blob-delay": "140ms", "--blob-scale": 1.1, "--blob-x": "8px", "--blob-y": "24px" } },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const overlaysPage = pathname === "/" || pathname === "/work";
  const toneClass = overlaysPage
    ? ""
    : pathname === "/archive"
      ? styles.paper
      : pathname === "/archive/2"
        ? styles.report
        : pathname === "/work/markdown-to-docx"
          ? styles.document
          : pathname.startsWith("/work/")
            ? styles.dossier
            : styles.plain;

  return (
    <>
      <header className={`${styles.header} ${toneClass}`}>
        <Link className={styles.mark} href="/" aria-label="Mohtasham, home">
          <span className={styles.logoTile} aria-hidden="true">
            <svg className={styles.logoBlobs} viewBox="0 0 48 48">
              {logoBlobs.map((blob) => (
                <circle
                  className={styles.logoBlob}
                  cx={blob.cx}
                  cy={blob.cy}
                  key={`${blob.cx}-${blob.cy}`}
                  r={blob.r}
                  style={blob.style as CSSProperties}
                />
              ))}
            </svg>
            <span className={styles.logoGlyphReveal}>
              <span className={styles.logoGlyphJitter}>
                <svg viewBox="0 0 48 48">
                  <path d="M10 34V14l7 10 7-10 7 10 7-10v20" />
                </svg>
              </span>
            </span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = item.href === "/"
              ? pathname === "/"
              : item.href.startsWith("/") && (pathname === item.href || pathname.startsWith(`${item.href}/`));

            return item.href.startsWith("http") ? (
              <a href={item.href} key={item.label}>{item.label}</a>
            ) : (
              <Link className={active ? styles.active : undefined} href={item.href} key={item.label}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.socials} aria-label="Social links">
          <a href="https://x.com/mohtashamdotdev" aria-label="X"><FaXTwitter aria-hidden="true" /></a>
          <a href="https://github.com/MohtashamMurshid" aria-label="GitHub"><FaGithub aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/in/mohtashammurshid/" aria-label="LinkedIn"><FaLinkedinIn aria-hidden="true" /></a>
        </div>
      </header>
      {overlaysPage ? null : <div className={`${styles.spacer} ${toneClass}`} aria-hidden="true" />}
    </>
  );
}
