'use client'
import { motion } from 'framer-motion'

export default function MandalaGlowLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-soft-mist">
      <div className="relative w-32 h-32">
        {/* 曼陀羅旋轉 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" className="text-accent-mauve opacity-30">
            {/* 同心圓 */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            
            {/* 放射線 */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos((angle * Math.PI) / 180)}
                y2={50 + 45 * Math.sin((angle * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="0.3"
                opacity="0.5"
              />
            ))}
            
            {/* 小圓點 */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <circle
                key={`dot-${angle}`}
                cx={50 + 35 * Math.cos((angle * Math.PI) / 180)}
                cy={50 + 35 * Math.sin((angle * Math.PI) / 180)}
                r="1.5"
                fill="currentColor"
                opacity="0.4"
              />
            ))}
          </svg>
        </motion.div>

        {/* 中心微光（溫柔脈動）*/}
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-glow-warm to-glow-gentle shadow-lg shadow-glow-warm/50"></div>
        </motion.div>

        {/* 周圍飄浮微光點 */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={i}
            animate={{
              x: [
                0, 
                25 * Math.cos((angle * Math.PI) / 180), 
                0
              ],
              y: [
                0, 
                25 * Math.sin((angle * Math.PI) / 180), 
                0
              ],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-glow-gentle"
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        ))}
      </div>

      {/* 載入文字 */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-10 text-center"
      >
        <p className="text-charcoal-light text-sm font-light tracking-wide">
          載入中...
        </p>
        <p className="text-charcoal-light/60 text-xs font-light mt-1 font-serif italic">
          尋找微光
        </p>
      </motion.div>
    </div>
  )
}