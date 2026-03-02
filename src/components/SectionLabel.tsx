interface SectionLabelProps {
  text: string;
  light?: boolean;
}

export function SectionLabel({ text, light = false }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="gradient-line" />
      <span
        className="text-[10px] font-bold tracking-[3px] uppercase"
        style={{
          fontFamily: "var(--font-heading)",
          color: light ? "var(--dark-gray)" : "var(--spruce-light)",
        }}
      >
        {text}
      </span>
    </div>
  );
}
