import { useState } from 'react';

type TabKey = 'profile' | 'stack' | 'focus';

const TABS: { key: TabKey; label: string; lines: string[] }[] = [
  {
    key: 'profile',
    label: 'profile.ts',
    lines: [
      'export const developer = {',
      '  name: "Subham Singh",',
      '  education: "First-Year College Student",',
      '  role: "Aspiring Full-Stack Developer",',
      '  interests: [',
      '    "Full-Stack Web Development",',
      '    "Artificial Intelligence",',
      '  ],',
      '  mindset: "Build, learn, refine.",',
      '};',
    ],
  },
  {
    key: 'stack',
    label: 'stack.json',
    lines: [
      '{',
      '  "frontend": ["HTML", "CSS", "JavaScript", "React"],',
      '  "backend": ["Node.js", "REST APIs"],',
      '  "database": ["DBMS Fundamentals", "SQL"],',
      '  "exploring": ["AI Concepts", "System Design"]',
      '}',
    ],
  },
  {
    key: 'focus',
    label: 'focus.sql',
    lines: [
      'SELECT topic, status',
      'FROM current_learning',
      'WHERE semester = 1',
      'ORDER BY priority ASC;',
      '',
      '-- Full-Stack React + Node.js  | Active',
      '-- Relational DBMS & SQL      | Active',
      '-- Applied AI Fundamentals    | Exploring',
    ],
  },
];

export function CodeEditorVisual() {
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const current = TABS.find((t) => t.key === activeTab) ?? TABS[0];

  return (
    <div className="flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#0D1321] text-[#F8FAFC] shadow-sm dark:border-[#263247]">
      {/* Tab Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#263247] bg-[#111827] px-4 py-3">
        <div role="tablist" aria-label="Developer profile code tabs" className="flex flex-wrap items-center gap-1">
          {TABS.map((tab) => {
            const isSelected = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38D6F2] ${
                  isSelected
                    ? 'bg-[#182235] text-[#38D6F2]'
                    : 'text-[#A1AEC0] hover:text-[#F8FAFC]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span className="hidden font-mono text-xs text-[#A1AEC0] sm:inline">UTF-8</span>
      </div>

      {/* Code Canvas */}
      <div
        role="tabpanel"
        aria-label={current.label}
        className="min-w-0 flex-1 overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-7"
      >
        <ol className="space-y-0.5">
          {current.lines.map((line, index) => (
            <li key={`${current.key}-${index}`} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="w-6 shrink-0 select-none text-right text-[#64748B] tabular-nums"
              >
                {index + 1}
              </span>
              <code className="whitespace-pre text-[#F8FAFC]">
                {highlightLine(line)}
              </code>
            </li>
          ))}
        </ol>
      </div>

      {/* Subtle Workspace Footer */}
      <div className="flex items-center justify-between border-t border-[#263247] bg-[#111827] px-4 py-2.5 font-mono text-xs text-[#A1AEC0]">
        <span>Subham Singh Workspace</span>
        <span className="tabular-nums">Lines: {current.lines.length}</span>
      </div>
    </div>
  );
}

function highlightLine(line: string) {
  if (line.trim().startsWith('--')) {
    return <span className="text-[#A1AEC0]">{line}</span>;
  }
  const colonIdx = line.indexOf(':');
  if (colonIdx > 0 && !line.includes('http')) {
    const keyPart = line.slice(0, colonIdx);
    const valPart = line.slice(colonIdx);
    return (
      <>
        <span className="text-[#38D6F2]">{keyPart}</span>
        <span className="text-[#E2E8F0]">{valPart}</span>
      </>
    );
  }
  if (/^(export|const|SELECT|FROM|WHERE|ORDER BY)/.test(line.trim())) {
    return <span className="text-[#8B5CF6]">{line}</span>;
  }
  return <span>{line}</span>;
}
