'use client'
import { motion } from 'framer-motion'

const shapes = [
  { type: 'circle', size: 300, x: '10%', y: '15%', duration: 20, delay: 0 },
  { type: 'triangle', size: 120, x: '80%', y: '10%', duration: 25, delay: 3 },
  { type: 'circle', size: 180, x: '70%', y: '50%', duration: 18, delay: 5 },
  { type: 'triangle', size: 90, x: '15%', y: '60%', duration: 22, delay: 8 },
  { type: 'circle', size: 240, x: '50%', y: '80%', duration: 28, delay: 2 },
  { type: 'triangle', size: 150, x: '85%', y: '75%', duration: 16, delay: 6 },
]

function Triangle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon
        points="50,5 95,95 5,95"
        stroke="#FF6B47"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

function Circle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#FF6B47"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.06]"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, 0, 20, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' ? (
            <Circle size={shape.size} />
          ) : (
            <Triangle size={shape.size} />
          )}
        </motion.div>
      ))}
    </div>
  )
}
