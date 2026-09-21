import type { CSSProperties } from "react";
import { colors, models, study } from "./study";
import styles from "./StudyArchitecture.module.css";

const providers = {
  jev: "TypeSafe · native scores",
  "gpt-oss": "Cerebras · reported probability",
  mercury: "Inception · reported probability",
  gemini: "Google AI Studio · reported probability",
};

function Connections({ merge = false }: { merge?: boolean }) {
  return <div className={styles.connection} aria-hidden="true">
    <svg viewBox="0 0 48 248" className={styles.wires}>
      <path d={merge ? "M30 28 V220 M30 124 H48" : "M0 124 H18 M18 28 V220"} />
      {models.map((model, index) => {
        const y = 28 + index * 64;
        return <g key={model}>
          <path d={merge ? `M0 ${y} H30` : `M18 ${y} H48`} style={{ stroke: colors[model] }} />
          <circle cx={merge ? 30 : 18} cy={y} r="2.5" fill={colors[model]} stroke="none" />
        </g>;
      })}
      {merge && <path d="M43 120 L48 124 L43 128" />}
    </svg>
    <span className={styles.downArrow}>↓</span>
  </div>;
}

export default function StudyArchitecture() {
  return <figure id="study-architecture" className={styles.architecture} aria-labelledby="study-architecture-title">
    <header className={styles.heading}>
      <h2 id="study-architecture-title">How the test ran</h2>
      <p>Every model received the same banking message and 77 possible intents.</p>
    </header>

    <div className={styles.preparation}>
      <span className={styles.preparationLabel}>Before the test</span>
      <span><strong>50</strong> development messages</span>
      <span className={styles.preparationArrow} aria-hidden="true">→</span>
      <span><strong>200</strong> messages to choose cutoffs</span>
      <span className={styles.preparationArrow} aria-hidden="true">→</span>
      <span className={styles.frozen}>
        <svg viewBox="0 0 16 18" width="12" height="14" aria-hidden="true"><path d="M4 7V5a4 4 0 0 1 8 0v2M2 7h12v10H2z" /><path d="M8 11v3" /></svg>
        Freeze the rules
      </span>
    </div>

    <div className={styles.pipeline}>
      <div className={styles.input}>
        <span className={styles.stage}>01 / Input</span>
        <div className={styles.datasetCount}>500<span>held-out messages</span></div>
        <span className={styles.source}>BANKING77 official test split</span>
        <div className={styles.request}>
          <svg viewBox="0 0 30 34" width="26" height="30" aria-hidden="true"><path d="M5 2h14l6 6v24H5zM19 2v7h6M10 15h10M10 20h10M10 25h6" /></svg>
          <div><strong>One shared task</strong><span>Customer message<br />+ 77 intent options</span></div>
        </div>
        <p>Expected labels stay out of the request.</p>
      </div>

      <Connections />

      <div className={styles.models}>
        <span className={styles.stage}>02 / Four model calls</span>
        <div className={styles.modelList}>{models.map((model) => <div key={model} className={styles.model} style={{ "--model-color": colors[model] } as CSSProperties}>
          <span className={styles.modelDot} aria-hidden="true" />
          <div><strong>{study.stats[model].name}</strong><span>{providers[model]}</span></div>
        </div>)}</div>
        <p className={styles.serving}>OpenRouter + Vercel AI SDK<br />Fixed providers · no retries or fallback</p>
      </div>

      <Connections merge />

      <div className={styles.evaluation}>
        <span className={styles.stage}>03 / Record and evaluate</span>
        <div className={styles.check}><span>Returned intent</span><strong>Compare with the saved label</strong><small>Accuracy includes failed requests.</small></div>
        <div className={styles.check}><span>Elapsed time + usage</span><strong>Measure latency and cost</strong><small>Keep every outcome in the run log.</small></div>
        <div className={styles.check}><span>Confidence score</span><strong>Apply the frozen rule</strong></div>
        <div className={styles.decisions}><span>Accept</span><span>Defer for review</span></div>
      </div>
    </div>

    <figcaption className={styles.caption}>
      <span><strong>500 × 4 = 2,000</strong> held-out test attempts</span>
      <span>Then repeat 50 messages per model for timing.</span>
    </figcaption>
  </figure>;
}
