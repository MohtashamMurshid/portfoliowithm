interface NowSectionProps {
  content: string;
  highlight: string;
}

const NowSection = ({ content, highlight }: NowSectionProps) => {
  return (
    <div>
      <h2 className="text-sm uppercase tracking-wider mb-4">Now</h2>
      <p className="text-gray-400">
        {content}
        <br />
        Mindful that <em>{highlight}</em>.
      </p>
    </div>
  );
};

export default NowSection;
