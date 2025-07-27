interface NowSectionProps {
  content: string;
  highlight: string;
}

const NowSection = ({ content, highlight }: NowSectionProps) => {
  return (
    <div className="ornate-border parchment-texture p-6 relative">
      <div className="manuscript-corner"></div>

      {/* Decorative line */}
      <div className="decorative-line mb-6"></div>

      <h2 className="manuscript-heading text-lg uppercase tracking-wider mb-4 ink-shadow">
        Now
      </h2>

      <div className="text-center">
        <p className="manuscript-text text-muted-foreground leading-relaxed">
          {content}
          <br />
          Mindful that{" "}
          <em className="text-accent font-semibold">{highlight}</em>.
        </p>
      </div>

      {/* Decorative line */}
      <div className="decorative-line mt-6"></div>
    </div>
  );
};

export default NowSection;
