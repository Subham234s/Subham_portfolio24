import { Code2 } from 'lucide-react';
import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  title: string;
  priority?: boolean;
  className?: string;
}

export function ProjectImage({
  src,
  alt,
  title,
  priority = false,
  className = '',
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex aspect-video w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#EEF2F8] via-[#E2E8F0] to-[#EEF2F8] p-6 text-center dark:from-[#0D1321] dark:via-[#182235] dark:to-[#111827] ${className}`}
      >
        <Code2 className="h-7 w-7 text-[#0789A7] dark:text-[#38D6F2]" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className={`aspect-video w-full overflow-hidden bg-[#0D1321] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
      />
    </div>
  );
}
