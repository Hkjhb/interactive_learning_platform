'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/explore', label: 'Explore', icon: '◈' },
  { href: '/paths', label: 'Paths', icon: '◎' },
  { href: '/dashboard', label: 'Dashboard', icon: '◉' },
  { href: '/profile', label: 'Profile', icon: '○' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="navbar-logo-mark">L</div>
            Lumina
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link href={href} className={isActive ? 'active' : ''}>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '8px',
                          background: 'var(--gold-dim)',
                          zIndex: -1,
                        }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Section */}
          <div className="navbar-right">
            <motion.div
              className="streak-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              🔥 12
            </motion.div>

            <Link href="/profile">
              <motion.div
                className="navbar-avatar"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                AM
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '8px',
                fontSize: '1.2rem',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 68,
              left: 0,
              right: 0,
              zIndex: 99,
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border)',
              padding: '12px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  color: pathname === href ? 'var(--gold)' : 'var(--text-secondary)',
                  background: pathname === href ? 'var(--gold-dim)' : 'transparent',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span>{icon}</span> {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
