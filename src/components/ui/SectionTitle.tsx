interface SectionTitleProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionTitle({
  children,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const alignClass =
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
  return (
    <h2
      className={`font-bebas leading-none tracking-[0.04em] text-transparent bg-clip-text section-title-animated ${alignClass} mb-14 sm:mb-16 lg:mb-20 ${className}`}
      style={{
        fontSize: "clamp(3.5rem, 8vw, 7rem)",
        backgroundImage:
          "linear-gradient(95deg, #ff6a00 0%, #ff8a1f 28%, #ffb455 50%, #ff8a1f 72%, #ff6a00 100%)",
        backgroundSize: "220% 100%",
      }}
    >
      {children}
    </h2>
  );
}
