'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from '@/components/CourseCard';
import { courses, categories } from '@/lib/mockData';

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Newest', 'Price: Low to High'];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [view, setView] = useState('grid'); // grid | list

  const filtered = useMemo(() => {
    let result = [...courses];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (activeLevel !== 'All Levels') {
      result = result.filter((c) => c.level === activeLevel);
    }

    if (sortBy === 'Highest Rated') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'Most Popular') result.sort((a, b) => b.students - a.students);

    return result;
  }, [search, activeCategory, activeLevel, sortBy]);

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '40px' }}
      >
        <span className="section-label">Discover</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '12px' }}>
          Explore Courses
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {courses.length} courses across {categories.length - 1} disciplines
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{ marginBottom: '24px' }}
      >
        <div style={{ position: 'relative', maxWidth: '480px' }}>
          <span style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            fontSize: '1rem',
          }}>
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search courses, instructors, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-body)',
              outline: 'none',
              transition: 'var(--transition)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(232, 197, 71, 0.4)';
              e.target.style.boxShadow = '0 0 0 3px rgba(232, 197, 71, 0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </motion.div>

      {/* Filters Row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Category pills */}
        <div className="filter-bar" style={{ marginBottom: 0, flex: 1 }}>
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.icon} {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Level Filter */}
        <select
          value={activeLevel}
          onChange={(e) => setActiveLevel(e.target.value)}
          style={{
            padding: '8px 14px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '40px',
            color: 'var(--text-secondary)',
            fontSize: '0.83rem',
            fontWeight: '500',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {levels.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 14px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '40px',
            color: 'var(--text-secondary)',
            fontSize: '0.83rem',
            fontWeight: '500',
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {sortOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['grid', 'list'].map((v) => (
            <motion.button
              key={v}
              onClick={() => setView(v)}
              whileTap={{ scale: 0.9 }}
              style={{
                padding: '8px 12px',
                background: view === v ? 'var(--gold-dim)' : 'var(--bg-card)',
                border: `1px solid ${view === v ? 'rgba(232,197,71,0.3)' : 'var(--border)'}`,
                borderRadius: '8px',
                color: view === v ? 'var(--gold)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
                transition: 'var(--transition)',
              }}
            >
              {v === 'grid' ? '⊞' : '☰'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <div style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        Showing <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{filtered.length}</span> courses
        {search && <span> for "<span style={{ color: 'var(--gold)' }}>{search}</span>"</span>}
      </div>

      {/* Course Grid/List */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${activeLevel}-${view}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={view === 'grid' ? 'courses-grid' : ''}
            style={view === 'list' ? {
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            } : {}}
          >
            {filtered.map((course, i) =>
              view === 'grid' ? (
                <CourseCard key={course.id} course={course} index={i} />
              ) : (
                <ListCourseCard key={course.id} course={course} index={i} />
              )
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>◌</div>
            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>No courses found</h3>
            <p style={{ fontSize: '0.9rem' }}>Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ListCourseCard({ course, index }) {
  return (
    <motion.a
      href={`/courses/${course.id}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ x: 4 }}
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        padding: '20px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'var(--transition)',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '14px',
          background: `${course.accent}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          color: course.accent,
          flexShrink: 0,
          border: `1px solid ${course.accent}25`,
        }}
      >
        ◎
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: '600',
          fontSize: '1.1rem',
          marginBottom: '4px',
        }}>
          {course.title}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          by {course.instructor} · {course.duration} · {course.totalLessons} lessons
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {course.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '1.2rem' }}>{course.price}</span>
        <span className="rating">★ {course.rating}</span>
        <span className={`level-badge level-${course.level}`}>{course.level}</span>
      </div>
    </motion.a>
  );
}
