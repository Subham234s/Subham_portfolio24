import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Journey', to: '/journey' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-[#F5F7FB]/90 backdrop-blur-md dark:border-[#263247] dark:bg-[#080B14]/90">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-[#111827] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0789A7] dark:text-[#F8FAFC] dark:focus-visible:outline-[#38D6F2]"
        >
          Subham Singh
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0789A7] dark:focus-visible:outline-[#38D6F2] ${
                  isActive
                    ? 'text-[#0789A7] dark:text-[#38D6F2]'
                    : 'text-[#64748B] hover:text-[#111827] dark:text-[#A1AEC0] dark:hover:text-[#F8FAFC]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[2px] h-[2px] rounded-full bg-[#0789A7] dark:bg-[#38D6F2]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link
            to="/contact"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-[#0789A7] px-4 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06728b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7] dark:focus-visible:outline-[#38D6F2]"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#111827] transition-colors hover:border-[#0789A7] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0789A7] dark:border-[#263247] dark:bg-[#111827] dark:text-[#F8FAFC] dark:hover:border-[#38D6F2]"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#E2E8F0] bg-[#F5F7FB] px-4 py-4 md:hidden dark:border-[#263247] dark:bg-[#0D1321]"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EEF2F8] text-[#0789A7] dark:bg-[#182235] dark:text-[#38D6F2]'
                        : 'text-[#111827] hover:bg-[#EEF2F8] dark:text-[#F8FAFC] dark:hover:bg-[#182235]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/contact"
                className="flex min-h-[44px] items-center justify-center rounded-lg bg-[#0789A7] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#06728b] dark:bg-[#38D6F2] dark:text-[#080B14] dark:hover:bg-[#5ce0f7]"
              >
                Contact Me
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
