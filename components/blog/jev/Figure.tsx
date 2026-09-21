import type { ReactNode } from "react";
import styles from "./JevStudy.module.css";

export function Figure({ id, title, subtitle, caption, children }: {
  id: string;
  title: string;
  subtitle: string;
  caption: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure id={id} className={styles.figure} aria-labelledby={`${id}-title`}>
      <header className={styles.figureHeader}>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{subtitle}</p>
      </header>
      {children}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

export function Legend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return <div className={styles.legend}>{items.map(({ label, color, dashed }) => (
    <span key={label}><i style={{ background: dashed ? "transparent" : color, border: dashed ? `1px dashed ${color}` : undefined }} />{label}</span>
  ))}</div>;
}

export type MetricRow = {
  label: string;
  value: number;
  display: string;
  color: string;
  interval?: readonly number[];
  detail?: string;
};

// Each row keeps its label and numeric value in HTML, so they remain readable on
// small screens. Only the quantitative marks scale inside the SVG.
export function MetricChart({ rows, max, ticks, axis, reference, dots = false }: {
  rows: MetricRow[];
  max: number;
  ticks: number[];
  axis: string;
  reference?: number;
  dots?: boolean;
}) {
  return (
    <div className={styles.metricChart}>
      {rows.map((row) => (
        <div key={row.label} className={styles.metricRow}>
          <div className={styles.rowHeading}><span>{row.label}</span><strong>{row.display}</strong></div>
          <svg viewBox="-2 0 504 32" preserveAspectRatio="none" className={styles.barSvg} aria-hidden="true">
            {ticks.map((tick) => <line key={tick} x1={tick / max * 500} x2={tick / max * 500} y1="0" y2="32" className={styles.gridLine} />)}
            {reference !== undefined && <line x1={reference / max * 500} x2={reference / max * 500} y1="0" y2="32" className={styles.referenceLine} />}
            {!dots && <rect x="0" y="7" width={row.value / max * 500} height="18" rx="2" fill={row.color} />}
            {row.interval && <g className={styles.whisker}>
              <line x1={row.interval[0] / max * 500} x2={row.interval[1] / max * 500} y1="16" y2="16" />
              {row.interval.map((bound, i) => <line key={i} x1={bound / max * 500} x2={bound / max * 500} y1="9" y2="23" />)}
            </g>}
            {dots && <ellipse cx={row.value / max * 500} cy="16" rx="5" ry="5" fill={row.color} />}
          </svg>
          {row.detail && <span className={styles.rowDetail}>{row.detail}</span>}
        </div>
      ))}
      <div className={styles.axisTicks}>{ticks.map((tick) => <span key={tick} style={{ left: `${tick / max * 100}%` }}>{tick}</span>)}</div>
      <div className={styles.axisLabel}>{axis}</div>
    </div>
  );
}

export function DataTable({ headings, rows, label = "View the data" }: {
  headings: string[];
  rows: (string | number)[][];
  label?: string;
}) {
  return <details className={styles.dataDetails}>
    <summary>{label}</summary>
    <div className={styles.dataScroll} tabIndex={0} role="region" aria-label={label}>
      <table><thead><tr>{headings.map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </details>;
}
