import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  description: string;
}

const PILLARS: PillarItem[] = [
  {
    id: 'career',
    title: 'Career Base',
    subtitle: 'Primary Role',
    badge: 'Foundation',
    badgeColor: 'bg-[#2B1B14]/10 text-[#2B1B14] border-[#2B1B14]/20',
    description: 'Steady primary executive income & organizational stability.',
  },
  {
    id: 'skill',
    title: 'Skill Value',
    subtitle: 'Monetized Expertise',
    badge: 'High Leverage',
    badgeColor: 'bg-[#C9A227]/20 text-[#2B1B14] border-[#C9A227]/40 font-bold',
    description: 'Proprietary advisory & high-ticket knowledge packaged into premium retainers.',
  },
  {
    id: 'income',
    title: 'Income System',
    subtitle: 'Scalable Assets',
    badge: 'Recurring',
    badgeColor: 'bg-[#8B3E1E]/10 text-[#8B3E1E] border-[#8B3E1E]/20',
    description: 'Automated digital systems & products generating cash flow without trading hours.',
  },
];

export const ResilientArchitectureIcons: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activePillar, setActivePillar] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* 3D Pillars Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-2.5">
        {/* Pillar 1: Career Base (3D Architectural Bedrock Pillar) */}
        <motion.div
          id="pillar-career-base"
          onMouseEnter={() => setActivePillar('career')}
          onMouseLeave={() => setActivePillar(null)}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#F5EFE6] border transition-all duration-300 text-center flex flex-col items-center cursor-default select-none shadow-xs ${
            activePillar === 'career' ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30' : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          {/* Subtle Top Specular Sheen */}
          <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Bedrock Pillar Icon */}
          <div className="relative w-12 h-12 flex items-center justify-center mb-2">
            {/* Dynamic Ambient Shadow */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.4 }
                  : { scaleX: [1, 0.82, 1], opacity: [0.45, 0.25, 0.45] }
              }
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              className="absolute -bottom-0.5 w-9 h-2 bg-[#2B1B14]/30 rounded-full blur-[2px]"
            />

            {/* 3D Floating Isometric Pillar */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: [0, -3.5, 0], rotateZ: [0, 0.5, 0] }
              }
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              className="relative z-10 w-11 h-11"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.22)]" fill="none">
                <defs>
                  {/* Pillar Capital Light Face */}
                  <linearGradient id="pCapTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="100%" stopColor="#DFB943" />
                  </linearGradient>
                  {/* Pillar Left Shaded Face */}
                  <linearGradient id="pLeft" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4A3026" />
                    <stop offset="100%" stopColor="#2B1B14" />
                  </linearGradient>
                  {/* Pillar Right Shadow Face */}
                  <linearGradient id="pRight" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2B1B14" />
                    <stop offset="100%" stopColor="#1B100C" />
                  </linearGradient>
                  {/* Gold Filigree Accent */}
                  <linearGradient id="pGoldTrim" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#DFB943" />
                    <stop offset="50%" stopColor="#C9A227" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                </defs>

                {/* Pedestal Base */}
                <polygon points="12,50 32,58 52,50 32,42" fill="#E1D5C5" stroke="#C9A227" strokeWidth="0.75" />
                <polygon points="12,50 32,58 32,61 12,53" fill="#4A3026" />
                <polygon points="32,58 52,50 52,53 32,61" fill="#1B100C" />

                {/* Shaft Main Left & Right Isometric Facets */}
                <polygon points="20,20 32,24 32,44 20,40" fill="url(#pLeft)" />
                <polygon points="32,24 44,20 44,40 32,44" fill="url(#pRight)" />

                {/* Architectural Flutes (Engraved depth lines) */}
                <line x1="24" y1="21.5" x2="24" y2="41.5" stroke="#DFB943" strokeWidth="1" strokeOpacity="0.8" />
                <line x1="28" y1="23" x2="28" y2="43" stroke="#DFB943" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="36" y1="23" x2="36" y2="43" stroke="#DFB943" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="40" y1="21.5" x2="40" y2="41.5" stroke="#C9A227" strokeWidth="1" strokeOpacity="0.8" />

                {/* Gold Middle Ring */}
                <polygon points="19,30 32,34 45,30 32,27" fill="url(#pGoldTrim)" />

                {/* Capital Head / Abacus Plinth */}
                <polygon points="15,16 32,10 49,16 32,21" fill="url(#pCapTop)" stroke="#FFFFFF" strokeWidth="0.75" />
                <polygon points="15,16 32,21 32,24 15,19" fill="url(#pLeft)" />
                <polygon points="32,21 49,16 49,19 32,24" fill="url(#pRight)" />

                {/* Golden Executive Crest on Top */}
                <circle cx="32" cy="15.5" r="2.5" fill="#2B1B14" stroke="#DFB943" strokeWidth="0.75" />
              </svg>
            </motion.div>
          </div>

          <span className="text-[11px] font-bold text-[#2B1B14] block leading-tight">Career Base</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 text-[#2B1B14] bg-[#2B1B14]/8 rounded border border-[#2B1B14]/15">
            Foundation
          </span>
        </motion.div>

        {/* Pillar 2: Skill Value (3D Brilliant Faceted Gold Gem / Diamond) */}
        <motion.div
          id="pillar-skill-value"
          onMouseEnter={() => setActivePillar('skill')}
          onMouseLeave={() => setActivePillar(null)}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-[#FFFFFF] via-[#FFFDF7] to-[#F8F2E2] border transition-all duration-300 text-center flex flex-col items-center cursor-default select-none shadow-xs ${
            activePillar === 'skill' ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/40' : 'border-[#C9A227]/60 hover:border-[#C9A227]'
          }`}
        >
          {/* Top Gold Halo Sheen */}
          <div className="absolute inset-x-2 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#DFB943] to-transparent" />

          {/* 3D Animated Faceted Gem Icon */}
          <div className="relative w-12 h-12 flex items-center justify-center mb-2">
            {/* Dynamic Gold Ambient Glow & Shadow */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scale: 1, opacity: 0.4 }
                  : { scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="absolute inset-1 rounded-full bg-[#C9A227]/25 blur-md"
            />
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.8, 1], opacity: [0.4, 0.2, 0.4] }
              }
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="absolute -bottom-0.5 w-8 h-2 bg-[#8B6E2A]/35 rounded-full blur-[2px]"
            />

            {/* 3D Floating Isometric Faceted Prism */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: [0, -4.5, 0], rotateY: [0, 8, 0, -8, 0] }
              }
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.3 }}
              className="relative z-10 w-11 h-11"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_6px_10px_rgba(201,162,39,0.35)]" fill="none">
                <defs>
                  {/* Top Crown Table Facet */}
                  <linearGradient id="gemTable" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#FFF4D0" />
                    <stop offset="100%" stopColor="#DFB943" />
                  </linearGradient>
                  {/* Left Facet Highlight */}
                  <linearGradient id="gemLeft" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F7DF8F" />
                    <stop offset="100%" stopColor="#C9A227" />
                  </linearGradient>
                  {/* Front Core Facet */}
                  <linearGradient id="gemFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                  {/* Right Shaded Facet */}
                  <linearGradient id="gemRight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#B3871D" />
                    <stop offset="100%" stopColor="#5E430B" />
                  </linearGradient>
                  {/* Bottom Pavilion Apex */}
                  <linearGradient id="gemBottom" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#3E2B06" />
                  </linearGradient>
                </defs>

                {/* 3D Faceted Diamond Top Crown Table */}
                <polygon points="32,9 47,19 32,26 17,19" fill="url(#gemTable)" stroke="#FFFFFF" strokeWidth="0.8" />

                {/* Crown Girdle Upper Facets */}
                <polygon points="17,19 32,26 32,36 10,29" fill="url(#gemLeft)" stroke="#FFF4D0" strokeWidth="0.5" />
                <polygon points="32,26 47,19 54,29 32,36" fill="url(#gemRight)" stroke="#E8C654" strokeWidth="0.5" />
                <polygon points="17,19 10,29 32,36" fill="url(#gemFront)" stroke="#FFF4D0" strokeWidth="0.4" />

                {/* Lower Pavilion (V-Taper to Bottom Point) */}
                <polygon points="10,29 32,36 32,55" fill="url(#gemLeft)" stroke="#E8C654" strokeWidth="0.4" />
                <polygon points="32,36 54,29 32,55" fill="url(#gemRight)" stroke="#B3871D" strokeWidth="0.4" />

                {/* Front Center Prism Triangle */}
                <polygon points="23,32 41,32 32,48" fill="url(#gemBottom)" opacity="0.85" />

                {/* Animated Specular Star Sparkle on the Apex */}
                <motion.g
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.9, scale: 1 }
                      : { opacity: [0.2, 1, 0.2], scale: [0.7, 1.25, 0.7] }
                  }
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  style={{ transformOrigin: '32px 14px' }}
                >
                  <polygon points="32,9 33.5,13 38,14 33.5,15 32,19 30.5,15 26,14 30.5,13" fill="#FFFFFF" />
                  <circle cx="32" cy="14" r="1.5" fill="#FFFFFF" />
                </motion.g>
              </svg>
            </motion.div>
          </div>

          <span className="text-[11px] font-bold text-[#2B1B14] block leading-tight">Skill Value</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 text-[#2B1B14] bg-[#C9A227]/25 rounded border border-[#C9A227]/40 shadow-2xs">
            High Leverage
          </span>
        </motion.div>

        {/* Pillar 3: Income System (3D Interlocking Dual Ring / Scalable Flywheel) */}
        <motion.div
          id="pillar-income-system"
          onMouseEnter={() => setActivePillar('income')}
          onMouseLeave={() => setActivePillar(null)}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-[#FFFFFF] via-[#FDFBF7] to-[#F5EFE6] border transition-all duration-300 text-center flex flex-col items-center cursor-default select-none shadow-xs ${
            activePillar === 'income' ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30' : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          {/* Subtle Top Specular Sheen */}
          <div className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Flywheel Ring Icon */}
          <div className="relative w-12 h-12 flex items-center justify-center mb-2">
            {/* Dynamic Ambient Shadow */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.35 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.4, 0.2, 0.4] }
              }
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -bottom-0.5 w-9 h-2 bg-[#2B1B14]/30 rounded-full blur-[2px]"
            />

            {/* 3D Floating Isometric Dual Ring Engine */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: [0, -3.2, 0], rotateZ: [0, -0.8, 0] }
              }
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.6 }}
              className="relative z-10 w-11 h-11"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_8px_rgba(43,27,20,0.25)]" fill="none">
                <defs>
                  {/* Outer Gear Ring Metallic Gradient */}
                  <linearGradient id="ringDark" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5C4033" />
                    <stop offset="50%" stopColor="#2B1B14" />
                    <stop offset="100%" stopColor="#1B100C" />
                  </linearGradient>
                  {/* Inner Ring Gold Gradient */}
                  <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="50%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                  {/* Core Energy Pulse */}
                  <radialGradient id="ringCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFEBA8" />
                    <stop offset="70%" stopColor="#C9A227" />
                    <stop offset="100%" stopColor="#4A3026" />
                  </radialGradient>
                </defs>

                {/* 3D Isometric Outer Elliptical Flywheel Base */}
                <ellipse cx="32" cy="38" rx="22" ry="12" fill="url(#ringDark)" stroke="#C9A227" strokeWidth="0.8" />
                <ellipse cx="32" cy="37" rx="16" ry="8" fill="#F8F4EC" stroke="#2B1B14" strokeWidth="0.6" />

                {/* 3D Inner Gyroscope / Orbital Ring (Tilted Isometric) */}
                <motion.g
                  animate={
                    shouldReduceMotion
                      ? { rotate: 0 }
                      : { rotate: 360 }
                  }
                  transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                  style={{ transformOrigin: '32px 32px' }}
                >
                  {/* Tilted Gold Orbiting Ring */}
                  <ellipse cx="32" cy="32" rx="18" ry="9" fill="none" stroke="url(#ringGold)" strokeWidth="2.8" strokeDasharray="18 4" />

                  {/* Orbiting Satellite Energy Node 1 */}
                  <circle cx="49" cy="32" r="3" fill="#DFB943" stroke="#FFFFFF" strokeWidth="0.8" />
                  <circle cx="15" cy="32" r="2.5" fill="#C9A227" stroke="#2B1B14" strokeWidth="0.6" />
                </motion.g>

                {/* Central Autonomous Core Generator Plinth */}
                <circle cx="32" cy="32" r="6" fill="url(#ringCore)" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="32" cy="32" r="2.5" fill="#2B1B14" />
                <circle cx="33" cy="31" r="0.8" fill="#FFFFFF" />
              </svg>
            </motion.div>
          </div>

          <span className="text-[11px] font-bold text-[#2B1B14] block leading-tight">Income System</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 text-[#2B1B14] bg-[#2B1B14]/8 rounded border border-[#2B1B14]/15">
            Scalable
          </span>
        </motion.div>
      </div>

      {/* Dynamic Detail Callout on Hover or Default Message */}
      <div className="min-h-[38px] flex items-center justify-center">
        {activePillar ? (
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="w-full text-center px-1"
          >
            <p className="text-[11px] text-[#2B1B14] font-semibold leading-tight">
              <strong className="text-[#C9A227]">
                {PILLARS.find((p) => p.id === activePillar)?.title}:
              </strong>{' '}
              {PILLARS.find((p) => p.id === activePillar)?.description}
            </p>
          </motion.div>
        ) : (
          <p className="text-xs text-[#211A17] leading-relaxed font-medium text-center">
            Your career provides steady foundation while independent skills and systems create durable safety.
          </p>
        )}
      </div>
    </div>
  );
};
