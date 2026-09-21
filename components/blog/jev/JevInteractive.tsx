"use client";

import { useState } from "react";
import { DataTable, Figure, Legend, MetricChart } from "./Figure";
import { colors, models, percent, seconds, shortNames, study, type Model } from "./study";
import styles from "./JevStudy.module.css";

function Choices<T extends string>({ label, options, value, onChange }: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return <div className={styles.choices} role="group" aria-label={label}>
    {options.map((option) => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)}>{option.label}</button>)}
  </div>;
}

export function LatencyChart() {
  const [metric, setMetric] = useState<"median" | "p95">("median");
  return <Figure id="latency" title="Response time" subtitle="Time to receive and validate a complete answer, including networking."
    caption="Valid responses only: Jev 500, GPT-OSS 500, Mercury 472, Gemini 499. We excluded failures from these timings. Results cover one host and one run.">
    <Choices label="Latency statistic" value={metric} onChange={setMetric} options={[{ value: "median", label: "Median / typical" }, { value: "p95", label: "95th percentile" }]} />
    <div aria-live="polite"><MetricChart max={3.5} ticks={[0, 1, 2, 3, 3.5]} axis={`Seconds to a valid answer · ${metric === "median" ? "median" : "95th percentile"}`} rows={models.map((model) => {
      const s = study.stats[model];
      const ms = metric === "median" ? s.median_ms : s.p95_ms;
      return { label: s.name, value: ms / 1000, display: seconds(ms), color: colors[model] };
    })} /></div>
    <DataTable headings={["System", "Median", "95th percentile", "Valid answers"]} rows={models.map((model) => {
      const s = study.stats[model];
      return [s.name, seconds(s.median_ms), seconds(s.p95_ms), s.valid_responses];
    })} />
  </Figure>;
}

const plot = { left: 42, right: 380, top: 18, bottom: 214 };
const px = (x: number) => plot.left + x * (plot.right - plot.left);
const py = (y: number) => plot.bottom - y * (plot.bottom - plot.top);

function PlotGrid() {
  return <>{[0, 0.25, 0.5, 0.75, 1].map((tick) => <g key={tick}>
    <line x1={px(tick)} x2={px(tick)} y1={plot.top} y2={plot.bottom} className={styles.gridLine} />
    <line x1={plot.left} x2={plot.right} y1={py(tick)} y2={py(tick)} className={styles.gridLine} />
    <text x={px(tick)} y="237" textAnchor="middle">{tick}</text>
    <text x="32" y={py(tick) + 4} textAnchor="end">{tick}</text>
  </g>)}</>;
}

function ecdfPath(points: number[][]) {
  return points.map(([x, y], i) => i === 0 ? `M ${px(x)} ${py(y)}` : `H ${px(x)} V ${py(y)}`).join(" ");
}

export function ConfidenceDistribution() {
  const [score, setScore] = useState<"native" | "probability">("native");
  const distribution = study.distributions[score];
  return <Figure id="confidence-distribution" title="Jev's confidence scores" subtitle="Each step shows the fraction of correct or incorrect answers at or below a score."
    caption="These curves use all 500 Jev responses. Mistakes tend to have lower scores, but both groups reach the maximum. Native confidence and selected-answer probability are different scores.">
    <Choices label="Jev confidence score" value={score} onChange={setScore} options={[{ value: "native", label: "Native confidence" }, { value: "probability", label: "Selected-answer probability" }]} />
    <Legend items={[{ label: "Correct / 405 answers", color: colors.jev }, { label: "Incorrect / 95 answers", color: "#ad6554", dashed: true }]} />
    <div className={styles.plotLabel}>Fraction of the group at or below the score</div>
    <svg viewBox="0 0 400 250" className={styles.plot} role="img" aria-label={`Cumulative ${score === "native" ? "native confidence" : "selected-answer probability"} for 405 correct and 95 incorrect Jev answers. Incorrect answers generally received lower scores, but the groups overlap.`}>
      <PlotGrid />
      <path d={ecdfPath(distribution.correct)} fill="none" stroke={colors.jev} strokeWidth="2.5" />
      <path d={ecdfPath(distribution.incorrect)} fill="none" stroke="#ad6554" strokeWidth="2.5" strokeDasharray="6 3" />
    </svg>
    <div className={styles.axisLabel}>{score === "native" ? "Native confidence" : "Selected-answer probability"}</div>
    <div className={styles.callout} aria-live="polite">At a score of 1.00, Jev still made <strong>{study.selective.jev[score].errors} mistakes</strong> among {study.selective.jev[score].accepted} accepted answers.</div>
    <DataTable label="View cumulative score data" headings={["Group", "Score", "Fraction at or below"]} rows={(["correct", "incorrect"] as const).flatMap((group) => distribution[group].map(([value, fraction]) => [group, value.toFixed(2), percent(fraction)]))} />
  </Figure>;
}

const policies = [
  { value: "jev-native", label: "Jev / native", rule: study.selective.jev.native },
  { value: "jev-probability", label: "Jev / probability", rule: study.selective.jev.probability },
  { value: "gemini", label: "Gemini", rule: study.selective.gemini.probability },
  { value: "gpt-oss", label: "GPT-OSS", rule: study.selective["gpt-oss"].probability },
  { value: "mercury", label: "Mercury", rule: study.selective.mercury.probability },
] as const;
type Policy = (typeof policies)[number]["value"];

export function AcceptanceExplorer() {
  const [selected, setSelected] = useState<Policy>("jev-native");
  const { rule, label } = policies.find((policy) => policy.value === selected)!;
  const correct = rule.accepted - rule.errors;
  const deferred = 500 - rule.accepted;
  return <Figure id="acceptance" title="Accepted and deferred messages" subtitle="Choose an acceptance rule. Each square represents one of the 500 test messages."
    caption="We grouped the squares by outcome. We chose and froze each rule using 200 separate messages. The rules produce different error rates, so they are not comparisons at equal risk.">
    <Choices label="Acceptance rule" options={policies} value={selected} onChange={setSelected} />
    <div className={styles.ruleSummary} aria-live="polite">
      <div><span>Accepted</span><strong>{rule.accepted}<small> / 500</small></strong><span>{percent(rule.coverage)} coverage</span></div>
      <div><span>Wrong among accepted</span><strong>{rule.errors}<small>{rule.accepted ? ` / ${rule.accepted}` : " accepted"}</small></strong><span>{rule.accepted_error === null ? "No accepted answers" : `${percent(rule.accepted_error)} observed error`}</span></div>
      <div><span>Left for review</span><strong>{deferred}</strong><span>{percent(deferred / 500)} deferred</span></div>
    </div>
    <div className={styles.matrix} role="img" aria-label={`${label}: ${correct} accepted and correct, ${rule.errors} accepted and wrong, ${deferred} deferred.`}>
      {Array.from({ length: 500 }, (_, i) => <i key={i} aria-hidden="true" className={i < correct ? styles.accepted : i < rule.accepted ? styles.wrong : styles.deferred} />)}
    </div>
    <Legend items={[{ label: `${correct} accepted / correct`, color: "#41697c" }, { label: `${rule.errors} accepted / wrong`, color: "#ad6554" }, { label: `${deferred} deferred`, color: "#dcd7cd" }]} />
    <div className={styles.ruleNote} aria-live="polite">
      {rule.threshold === null ? <p>No cutoff qualified on the calibration set. This rule defers all 500 test messages. Its accepted-error rate is undefined.</p> : <>
        <p>Frozen cutoff <strong>{rule.threshold.toFixed(2)}</strong> · Calibration accepted {rule.calibration.accepted}/200 with {rule.calibration.errors} {rule.calibration.errors === 1 ? "mistake" : "mistakes"}.</p>
        <MetricChart max={10} ticks={[0, 2.5, 5, 7.5, 10]} reference={5} dots axis="Errors among accepted answers, % · dashed line: 5% target" rows={[{
          label: "Observed error and Wilson 95% interval", value: rule.accepted_error! * 100,
          display: percent(rule.accepted_error!), interval: rule.accepted_error_ci95.map((n) => n! * 100), color: "#ad6554",
          detail: `95% interval ${percent(rule.accepted_error_ci95[0]!)} to ${percent(rule.accepted_error_ci95[1]!)}. It extends above the 5% target.`,
        }]} />
      </>}
    </div>
    <DataTable label="Compare all frozen rules" headings={["Rule", "Cutoff", "Accepted", "Wrong", "Error / accepted"]} rows={policies.map(({ label: name, rule: r }) => [name, r.threshold?.toFixed(2) ?? "None qualified", r.accepted, r.errors, r.accepted_error === null ? "Not applicable" : percent(r.accepted_error)])} />
  </Figure>;
}

export function ReliabilityChart() {
  const [model, setModel] = useState<Model>("jev");
  const bins = study.reliability[model];
  return <Figure id="reliability" title="Probability calibration" subtitle="Each point compares average reported probability with observed accuracy for a group of answers."
    caption="We grouped valid scored responses into five equal-width probability bins. Lines show Wilson 95% intervals. Hollow points have fewer than 20 answers. Empty bins have no point. Jev uses selected-answer probability.">
    <Choices label="Probability calibration model" options={models.map((value) => ({ value, label: shortNames[value] }))} value={model} onChange={setModel} />
    <div className={styles.calibrationSummary} aria-live="polite"><span>Brier score <strong>{study.stats[model].brier.toFixed(3)}</strong><small>Lower is better</small></span><span><strong>{study.stats[model].valid_responses}</strong> valid answers</span></div>
    <div className={styles.plotLabel}>Observed fraction correct</div>
    <svg viewBox="0 0 400 250" className={styles.plot} role="img" aria-label={`${shortNames[model]} probability reliability plot. The dashed diagonal is perfect calibration. Exact bin counts and values are in the data table.`}>
      <PlotGrid />
      <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(1)} className={styles.referenceLine} />
      {bins.filter((bin) => bin.n > 0).map((bin) => <g key={bin.low} stroke={colors[model]} strokeWidth="2">
        <line x1={px(bin.mean_probability!)} x2={px(bin.mean_probability!)} y1={py(bin.ci95[0]!)} y2={py(bin.ci95[1]!)} />
        {bin.ci95.map((bound, i) => <line key={i} x1={px(bin.mean_probability!) - 4} x2={px(bin.mean_probability!) + 4} y1={py(bound!)} y2={py(bound!)} />)}
        <circle cx={px(bin.mean_probability!)} cy={py(bin.accuracy!)} r="5" fill={bin.sparse ? "var(--site-paper, #f3f0e8)" : colors[model]} />
      </g>)}
    </svg>
    <div className={styles.axisLabel}>Mean reported probability</div>
    <div className={styles.callout}>Points below the diagonal indicate overconfidence.</div>
    <DataTable label="View reliability bins and sample counts" headings={["Probability bin", "Answers", "Mean probability", "Correct", "95% interval"]} rows={bins.map((bin) => [
      `${bin.low.toFixed(1)} to ${bin.high.toFixed(1)}${bin.n > 0 && bin.sparse ? " · sparse" : ""}`,
      bin.n, bin.mean_probability === null ? "No observations" : percent(bin.mean_probability),
      bin.accuracy === null ? "Not applicable" : percent(bin.accuracy),
      bin.ci95[0] === null ? "Not applicable" : `${percent(bin.ci95[0])} to ${percent(bin.ci95[1]!)}`,
    ])} />
  </Figure>;
}
