import MarkdownArticle from "../MarkdownArticle";
import { DataTable, Figure, Legend, MetricChart } from "./Figure";
import { AcceptanceExplorer, ConfidenceDistribution, LatencyChart, ReliabilityChart } from "./JevInteractive";
import StudyArchitecture from "./StudyArchitecture";
import { colors, dollars, figureUrl, models, percent, seconds, shortNames, study } from "./study";
import styles from "./JevStudy.module.css";

function DataSplit() {
  return <Figure id="data-splits" title="Dataset splits" subtitle="Models saw the message and category list. We kept the answer key in the local evaluation records."
    caption="We removed exact duplicates after normalizing case and whitespace. Similar messages and prior training exposure may remain.">
    <div className={styles.splitGrid}>
      <div><span className={styles.eyebrow}>Training split</span><div className={styles.splitCounts}><span><strong>50</strong>development</span><span><strong>200</strong>choose cutoffs</span></div><p>Separate sets, excluded from test accuracy.</p></div>
      <div><span className={styles.eyebrow}>Official test split</span><div className={styles.splitCounts}><span><strong>500</strong>held-out messages</span></div><p>All 77 intents, with six or seven examples of each.</p></div>
    </div>
    <div className={styles.intentGrid} role="img" aria-label="77 intent groups: 38 with seven test messages and 39 with six, totaling 500.">
      {Array.from({ length: 77 }, (_, i) => <span aria-hidden="true" key={i} className={i < 38 ? styles.intentSeven : styles.intentSix}>{i < 38 ? 7 : 6}</span>)}
    </div>
    <Legend items={[{ label: "38 intents × 7 messages", color: colors.jev }, { label: "39 intents × 6 messages", color: "#d8e0e0" }]} />
  </Figure>;
}

function Accuracy() {
  return <Figure id="accuracy" title="Accuracy on 500 test messages" subtitle="Correct decisions out of all 500 attempts. Failed requests count as incorrect."
    caption="Lines show 95% paired, intent-stratified bootstrap intervals. The paired accuracy difference between Jev and GPT-OSS includes zero.">
    <MetricChart max={100} ticks={[0, 25, 50, 75, 100]} axis="Correct answers, % of all attempts" rows={models.map((model) => {
      const s = study.stats[model];
      return { label: s.name, value: s.accuracy * 100, display: percent(s.accuracy), color: colors[model], interval: s.accuracy_ci95.map((x) => x * 100), detail: `${s.correct}/500 correct · 95% interval ${percent(s.accuracy_ci95[0])} to ${percent(s.accuracy_ci95[1])}` };
    })} />
  </Figure>;
}

function Cost() {
  return <Figure id="request-cost" title="Cost per 1,000 requests" subtitle="Costs from the 500 test attempts, scaled to 1,000."
    caption="We used reported charges and conservative reservations for failed calls with missing bills. Development, cutoff selection, repeats, and human review are excluded.">
    <MetricChart max={0.8} ticks={[0, 0.2, 0.4, 0.6, 0.8]} axis="Accounted USD / 1,000 test attempts" rows={models.map((model) => {
      const s = study.stats[model];
      return { label: s.name, value: s.cost_per_1000_usd, display: dollars(s.cost_per_1000_usd), color: colors[model] };
    })} />
  </Figure>;
}

function Ranking() {
  return <Figure id="confidence-ranking" title="How well the scores ranked mistakes" subtitle="Higher AUROC means the score was better at ranking mistakes below correct answers."
    caption="Jev uses native confidence. The LLMs use reported probabilities. We included valid scored responses only. The bootstrap 95% intervals overlap.">
    <MetricChart max={1} ticks={[0, 0.25, 0.5, 0.75, 1]} reference={0.5} dots axis="Error-detection AUROC · dashed line: chance at 0.5" rows={models.map((model) => {
      const s = study.stats[model];
      const metric = model === "jev" ? study.stats.jev.native_error_detection : s.probability_error_detection;
      return { label: s.name, value: metric.auroc, display: metric.auroc.toFixed(3), color: colors[model], interval: metric.auroc_ci95, detail: `${s.valid_responses} valid responses · 95% interval ${metric.auroc_ci95.map((n) => n.toFixed(3)).join(" to ")}` };
    })} />
    <div className={styles.callout}>AUROC measures ranking, not accuracy or probability calibration.</div>
  </Figure>;
}

function Failures() {
  return <Figure id="failures" title="Correct, wrong, and failed requests" subtitle="Every row represents the same 500 held-out messages."
    caption="Mercury had 21 upstream errors, five parse errors, and two schema errors. Gemini had one location-related API rejection. All acceptance rules defer failed requests.">
    <Legend items={[{ label: "Correct", color: "#41697c" }, { label: "Wrong answer", color: "#ad6554" }, { label: "Failed request", color: "#423e38" }]} />
    <div className={styles.outcomeRows}>{models.map((model) => {
      const s = study.stats[model];
      const wrong = 500 - s.correct - s.failures;
      return <div key={model}><div className={styles.rowHeading}><span>{s.name}</span><strong>{s.failures} failed</strong></div>
        <div className={styles.stackedBar} aria-hidden="true"><i style={{ width: percent(s.correct / 500), background: "#41697c" }} /><i style={{ width: percent(wrong / 500), background: "#ad6554" }} /><i style={{ width: percent(s.failures / 500), background: "#423e38" }} /></div>
        <div className={styles.rowDetail}>{s.correct} correct · {wrong} wrong · {s.failures} failed</div>
      </div>;
    })}</div>
  </Figure>;
}

function Repeats() {
  const agreements = ["49/50", "50/50", "41/45", "49/50"];
  return <Figure id="timing-repeats" title="Response times in the repeat run" subtitle="Median valid-response times for the test and the separate 50-message repeat."
    caption="All bars use a 0 to 2 second scale. Label agreement is an exploratory check of pairs where both calls succeeded. Mercury has 45 such pairs. Repeats add no independent accuracy evidence.">
    <Legend items={[{ label: "Held-out test", color: "#41697c" }, { label: "Timing repeat", color: "#bdcdd4" }]} />
    <div className={styles.repeatRows}>{models.map((model, i) => {
      const s = study.stats[model];
      return <div key={model}><div className={styles.rowHeading}><span>{shortNames[model]}</span><span className={styles.rowDetail}>{agreements[i]} labels matched</span></div>
        {[s.median_ms, s.timing_repeat_median_ms].map((value, index) => <div key={index} className={styles.repeatBar}><div><i style={{ width: `${value / 2000 * 100}%`, background: index === 0 ? "#41697c" : "#bdcdd4" }} /></div><span>{seconds(value)}</span></div>)}
      </div>;
    })}</div>
  </Figure>;
}

function Budget() {
  const stages = [
    { label: "Development", calls: 200, cost: 0.062044 },
    { label: "Threshold selection", calls: 800, cost: 0.260229 },
    { label: "Held-out test", calls: 2000, cost: 0.643902 },
    { label: "Timing repeats", calls: 200, cost: 0.062534 },
  ];
  // Full-study totals reported in the article. Per-model billed totals are null
  // in the metrics when any request has a missing bill, so they cannot be summed.
  const billed = 1.007308;
  const reserved = 0.021401;
  return <Figure id="study-budget" title="Cost of the full study" subtitle="3,200 attempts across development, cutoff selection, testing, and repeats."
    caption="Totals are rounded to six decimal places. We reserved costs for 38 attempts with missing bills, so this total may differ from the final charge. Human review and hosting are excluded.">
    <div className={styles.budgetTotal}><strong>${study.total_accounted_usd.toFixed(6)}</strong><span>accounted across the full study</span></div>
    <MetricChart max={0.8} ticks={[0, 0.2, 0.4, 0.6, 0.8]} axis="Accounted USD per stage" rows={stages.map((stage) => ({ label: `${stage.label} · ${stage.calls.toLocaleString("en-US")} calls`, value: stage.cost, display: `$${stage.cost.toFixed(6)}`, color: "#41697c" }))} />
    <div className={styles.accounting}><div><span>Reported API charges</span><strong>${billed.toFixed(6)}</strong></div><span aria-hidden="true">+</span><div><span>Missing-bill reservations</span><strong>${reserved.toFixed(6)}</strong></div></div>
  </Figure>;
}

export default function JevArticle({ body }: { body: string }) {
  const figures = {
    [figureUrl("study-architecture")]: <StudyArchitecture />,
    [figureUrl("data-splits")]: <DataSplit />,
    [figureUrl("accuracy")]: <Accuracy />,
    [figureUrl("latency")]: <LatencyChart />,
    [figureUrl("request-cost")]: <Cost />,
    [figureUrl("confidence-distribution")]: <ConfidenceDistribution />,
    [figureUrl("confidence-ranking")]: <Ranking />,
    [figureUrl("acceptance")]: <AcceptanceExplorer />,
    [figureUrl("failures")]: <Failures />,
    [figureUrl("timing-repeats")]: <Repeats />,
    [figureUrl("reliability")]: <ReliabilityChart />,
    [figureUrl("study-budget")]: <Budget />,
  };
  return <>
    <MarkdownArticle body={body} figures={figures} />
    <div className={styles.provenance}>
      <span>Data from study revision {study.provenance.revision.slice(0, 7)}.</span>
      <a href={study.provenance.metrics}>Frozen metrics</a><a href={study.provenance.results}>Test results CSV</a>
      <DataTable label="About these figures" headings={["Source", "Use"]} rows={[
        ["Frozen metrics", "Point estimates, intervals, acceptance rules, reliability bins, and latency."],
        ["2,000 test results", "Jev confidence distributions; counts and acceptance rules cross-checked against the metrics."],
        ["Study article", "Dataset split counts, stage costs, and repeat-label agreement."],
      ]} />
    </div>
  </>;
}
