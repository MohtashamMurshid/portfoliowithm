import { DataTable, Figure, MetricChart } from "./Figure";
import fresh from "./fresh.json";
import styles from "./JevStudy.module.css";

const pct = (value: number) => `${(value * 100).toFixed(1)}%`;
const colors = ["#41697c", "#ad6554", "#716087", "#71805b"];

export function FreshAccuracy() {
  return <Figure id="fresh-validation" title="Fresh validation, September 22" subtitle="500 new BANKING77 messages, separate from the original 500. These results do not replace the original study."
    caption="Whiskers show Wilson 95% intervals, unlike the original figure's bootstrap intervals. Failed requests count as incorrect. The local classifier used labeled training data; the hosted API prompts were zero-shot.">
    <div className={styles.legend} aria-label="Hosted setup" data-testid="fresh-pipeline-badges">
      <span>OpenRouter + Vercel AI SDK</span><span>Pinned providers</span><span>No automatic retries</span>
    </div>
    <MetricChart max={100} ticks={[0, 25, 50, 75, 100]} axis="Correct answers, % of 500 fresh attempts" rows={fresh.systems.map((system, index) => ({
      label: system.label, value: system.accuracy.rate * 100, display: pct(system.accuracy.rate), color: colors[index],
      interval: system.accuracy.wilson_ci95.map(value => value * 100),
      detail: `${system.accuracy.count}/${system.accuracy.n} correct`,
    }))} />
    <div className={styles.callout}>Jev-only reuses the actual cascade&apos;s first-stage responses. Independent Gemini is a separate request on each message, not the fallback response reused as a baseline.</div>
    <DataTable label="View fresh accuracy counts" headings={["System", "Correct", "Attempts", "Wilson 95% interval"]} rows={fresh.systems.map(system => [system.label, system.accuracy.count, system.accuracy.n, system.accuracy.wilson_ci95.map(pct).join(" to ")])} />
  </Figure>;
}

export function FreshCostLatency() {
  const costs = fresh.cost_sensitivity;
  const hosted = fresh.systems.filter(system => system.id === "gemini" || system.id === "cascade");
  return <Figure id="fresh-cost-latency" title="Lower request cost, slower median path" subtitle="Both comparisons use the 500 fresh banking messages. Cascade cost excludes the separate Gemini comparison calls."
    caption="The cost bars use reported bills and assign the independent Gemini request with a missing bill zero cost. The 23.27% reduction is the lower sensitivity assumption, not a verified final invoice. Timing includes all 500 terminal outcomes per path.">
    <MetricChart max={0.8} ticks={[0, 0.2, 0.4, 0.6, 0.8]} axis="USD / 1,000 banking cases, lower-saving assumption" rows={[
      { label: "Independent Gemini", value: costs.gemini_baseline.reported_bills_usd / fresh.banking_n * 1000, display: `$${(costs.gemini_baseline.reported_bills_usd / fresh.banking_n * 1000).toFixed(3)}`, color: colors[1] },
      { label: "Actual cascade", value: costs.cascade.reported_bills_usd / fresh.banking_n * 1000, display: `$${(costs.cascade.reported_bills_usd / fresh.banking_n * 1000).toFixed(3)}`, color: colors[2] },
    ]} />
    <div className={styles.callout}>{costs.sensitivity.lower_saving_percent.toFixed(2)}% lower under this assumption. The larger 55.94% reservation-based scenario is not an observed saving.</div>
    <MetricChart max={2500} ticks={[0, 500, 1000, 1500, 2000, 2500]} axis="Measured hosted path median, wall-clock milliseconds" rows={hosted.map(system => ({
      label: system.label, value: system.median_ms, display: `${Math.round(system.median_ms)} ms`, color: system.id === "cascade" ? colors[2] : colors[1],
    }))} />
    <div className={styles.callout}>The actual cascade was slower at the median: 1867 versus 1638 ms. Local TF-IDF LR took {fresh.systems[3].median_ms.toFixed(3)} CPU ms per prediction, excluding training and network service overhead. It is not on the hosted latency axis; local compute cost was not priced.</div>
    <DataTable label="View cost assumptions and timing populations" headings={["Measure", "Value"]} rows={[
      ["Cascade reported bills, 500 cases", `$${costs.cascade.reported_bills_usd.toFixed(8)}`],
      ["Independent Gemini reported bills, 500 cases", `$${costs.gemini_baseline.reported_bills_usd.toFixed(6)}`],
      ["Independent Gemini missing-bill calls", costs.gemini_baseline.unknown_bill_calls],
      ["Reservation for that missing bill, not an invoice", `$${costs.gemini_baseline.unknown_bill_reservations_usd}`],
      ["Timing population", "500 terminal outcomes per hosted path, including failures"],
    ]} />
  </Figure>;
}

export function FreshGates() {
  const safety = fresh.safety;
  return <Figure id="fresh-gates" title="Selective gates are not a safety guarantee" subtitle="The safety policy applies the frozen Jev gate, then the frozen Gemini gate, then defers. It is separate from the forced-answer accuracy comparison."
    caption="The out-of-scope check uses 100 easy-domain nonbanking messages. It does not establish rejection of ambiguous banking near-misses, adversarial requests, or open-world traffic. The forced-answer cascade itself cannot reject out-of-scope requests.">
    <div className={styles.ruleSummary}>
      <div><span>Accepted banking cases</span><strong>{safety.accepted.count}<small> / 500</small></strong></div>
      <div><span>Mistakes among accepted</span><strong>{safety.accepted_error.count}<small> / 374</small></strong></div>
      <div><span>Deferred for human review</span><strong>{safety.human_defer_count}</strong></div>
    </div>
    <div className={styles.callout}>Accepted-case error was {pct(safety.accepted_error.rate)}, above the 5% calibration target. Its Wilson 95% interval was {safety.accepted_error.wilson_ci95.map(pct).join(" to ")}. Human review outcomes were not measured.</div>
    <div className={styles.callout}>Out-of-scope false accepts: {fresh.oos.count}/{fresh.oos.n}. The Wilson 95% upper limit is {pct(fresh.oos.wilson_ci95[1])}, not zero risk.</div>
    <DataTable label="View fresh evidence provenance" headings={["Input", "SHA-256"]} rows={Object.entries(fresh.provenance.input_sha256)} />
    <div className={styles.provenance}>
      <span>Fresh evidence revision {fresh.provenance.revision.slice(0, 7)}.</span>
      <a href={fresh.provenance.report}>Fresh report</a><a href={fresh.provenance.code}>Runner code</a><a href={fresh.provenance.data}>Fresh data</a>
      <a href={fresh.provenance.summary}>Frozen summary</a><a href={fresh.provenance.costs}>Cost sensitivity</a>
    </div>
  </Figure>;
}
