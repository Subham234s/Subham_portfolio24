interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl dark:text-[#F8FAFC]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
          {description}
        </p>
      )}
    </div>
  );
}
