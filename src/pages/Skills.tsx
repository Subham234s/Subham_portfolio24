import { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { skillsData } from '../data/skills';
import {
  filterSkillsByCategory,
  type LearningStatus,
  type SkillCategory,
} from '../utils/portfolioLogic';

const CATEGORIES: ('All' | SkillCategory)[] = [
  'All',
  'Frontend Development',
  'Backend Development',
  'Database',
  'AI and Emerging Technology',
];

const STATUS_STYLE: Record<LearningStatus, string> = {
  'Currently Using': 'text-[#0789A7] dark:text-[#38D6F2]',
  'Familiar With': 'text-[#111827] dark:text-[#F8FAFC]',
  'Currently Learning': 'text-[#7652D8] dark:text-[#8B5CF6]',
  Exploring: 'text-[#64748B] dark:text-[#A1AEC0]',
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'All' | SkillCategory>('All');
  const visibleSkills = filterSkillsByCategory(skillsData, activeCategory);

  return (
    <PageLayout title="Skills">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#0789A7] dark:text-[#38D6F2]">
            Technical Capabilities
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#111827] sm:text-5xl dark:text-[#F8FAFC]">
            Skills &amp; Learning Stack
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
            An honest overview of the technologies I build with today and the concepts I am actively studying—represented by real learning status rather than arbitrary percentages.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mt-10 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#EEF2F8] p-1.5 sm:inline-flex dark:border-[#263247] dark:bg-[#0D1321]"
        >
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category)}
                className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:focus-visible:outline-[#38D6F2] ${
                  isSelected
                    ? 'bg-white text-[#111827] shadow-xs dark:bg-[#182235] dark:text-[#38D6F2]'
                    : 'text-[#64748B] hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleSkills.map((skill) => (
            <article
              key={skill.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0789A7]/60 dark:border-[#263247] dark:bg-[#111827] dark:hover:border-[#38D6F2]/60"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[#64748B] dark:text-[#A1AEC0]">{skill.category}</span>
                  <span className="font-mono text-[#64748B] dark:text-[#A1AEC0]">
                    {skill.focusArea}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                  {skill.name}
                </h2>

                <p className="mt-2.5 text-sm leading-relaxed text-[#64748B] dark:text-[#A1AEC0]">
                  {skill.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4 text-xs dark:border-[#263247]">
                <span className="text-[#64748B] dark:text-[#A1AEC0]">Status</span>
                <span className={`font-semibold ${STATUS_STYLE[skill.learningStatus]}`}>
                  {skill.learningStatus}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
