'use client';

import { motion } from 'framer-motion';

function Shimmer({ style = {}, className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: 'var(--bg-card-hover)',
        borderRadius: '6px',
        ...style,
      }}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Banner */}
      <Shimmer style={{ height: 140, borderRadius: 0 }} />

      {/* Body */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Shimmer style={{ height: 18, width: '80%' }} />
        <Shimmer style={{ height: 13, width: '50%' }} />

        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          <Shimmer style={{ height: 13, width: 60 }} />
          <Shimmer style={{ height: 13, width: 70 }} />
          <Shimmer style={{ height: 13, width: 40 }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Shimmer style={{ height: 22, width: 50, borderRadius: '6px' }} />
            <Shimmer style={{ height: 22, width: 60, borderRadius: '6px' }} />
          </div>
          <Shimmer style={{ height: 20, width: 40 }} />
        </div>
      </div>
    </div>
  );
}

export function CourseGridSkeleton({ count = 6 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <CourseCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Shimmer style={{ height: 24, width: 32 }} />
      <Shimmer style={{ height: 32, width: '60%' }} />
      <Shimmer style={{ height: 13, width: '40%' }} />
    </div>
  );
}

export function LessonRowSkeleton({ count = 5 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderTop: i === 0 ? 'none' : '1px solid var(--border)',
          }}
        >
          <Shimmer style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0 }} />
          <Shimmer style={{ flex: 1, height: 13 }} />
          <Shimmer style={{ width: 40, height: 13 }} />
        </div>
      ))}
    </div>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
        paddingBottom: '40px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '40px',
      }}
    >
      <Shimmer style={{ width: 88, height: 88, borderRadius: '50%', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Shimmer style={{ height: 28, width: '40%' }} />
        <Shimmer style={{ height: 14, width: '30%' }} />
        <div style={{ display: 'flex', gap: '24px', marginTop: '6px' }}>
          {[60, 70, 50, 80].map((w, i) => (
            <Shimmer key={i} style={{ height: 36, width: w }} />
          ))}
        </div>
      </div>
    </div>
  );
}
