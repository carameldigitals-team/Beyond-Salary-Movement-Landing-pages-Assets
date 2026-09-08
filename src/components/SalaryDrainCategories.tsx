import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

interface ExpenseItem {
  id: string;
  name: string;
  category: string;
  takeRate: string;
  impactNote: string;
}

const EXPENSES: ExpenseItem[] = [
  {
    id: 'rent',
    name: 'Rent',
    category: 'Shelter & Housing',
    takeRate: '30–50% of Salary',
    impactNote: 'Non-negotiable monthly debit. Due regardless of income delays.',
  },
  {
    id: 'school_fees',
    name: 'School Fees',
    category: 'Children & Education',
    takeRate: 'Major Term Peaks',
    impactNote: 'Tuition, books, and uniforms that trigger severe quarterly cash drains.',
  },
  {
    id: 'food',
    name: 'Food',
    category: 'Provisions & Groceries',
    takeRate: '15–25% of Salary',
    impactNote: 'Daily nutritional needs, market runs, and escalating food inflation.',
  },
  {
    id: 'transport',
    name: 'Transport',
    category: 'Fuel & Mobility',
    takeRate: '10–20% of Salary',
    impactNote: 'Daily office commutes, fuel price hikes, fares, and vehicle servicing.',
  },
  {
    id: 'family_needs',
    name: 'Family Needs',
    category: 'Parents & Dependents',
    takeRate: 'Continuous Outflow',
    impactNote: 'Elderly parents, extended family emergencies, and family support.',
  },
  {
    id: 'bills',
    name: 'Bills & Utilities',
    category: 'Power, Water & Data',
    takeRate: 'Fixed Monthly Leak',
    impactNote: 'Electricity tokens, fast internet, municipal water, and recurring subs.',
  },
  {
    id: 'unexpected',
    name: 'Unexpected Expenses',
    category: 'Unplanned Shocks',
    takeRate: 'Sudden Emergency Drain',
    impactNote: 'Sudden car breakdowns, hospital admissions, or sudden urgent crises.',
  },
  {
    id: 'savings',
    name: 'Savings',
    category: 'If Anything Is Left',
    takeRate: 'Often 0% Remaining',
    impactNote: 'The leftover amount that often vanishes before month-end arrives.',
  },
];

export const SalaryDrainCategories: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="w-full mt-7">
      {/* 3D Expense Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5">
        {/* 1. Rent (3D Isometric Modern Residence) */}
        <motion.div
          id="expense-card-rent"
          onMouseEnter={() => setActiveId('rent')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'rent'
              ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30'
              : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          {/* Subtle Top Specular */}
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Building Icon */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.82, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -bottom-1 w-10 h-2 bg-[#2B1B14]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -3.5, 0] }
              }
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.18)]" fill="none">
                <defs>
                  <linearGradient id="rentRoof" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                  <linearGradient id="rentWallL" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4A3026" />
                    <stop offset="100%" stopColor="#2B1B14" />
                  </linearGradient>
                  <linearGradient id="rentWallR" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2B1B14" />
                    <stop offset="100%" stopColor="#1A100C" />
                  </linearGradient>
                  <linearGradient id="rentGlass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="100%" stopColor="#DFB943" />
                  </linearGradient>
                </defs>

                {/* Ground Plinth */}
                <polygon points="12,50 32,58 52,50 32,42" fill="#EFE6D6" stroke="#E1D5C5" strokeWidth="0.5" />

                {/* 3D Isometric Building Walls */}
                <polygon points="16,24 32,32 32,50 16,42" fill="url(#rentWallL)" />
                <polygon points="32,32 48,24 48,42 32,50" fill="url(#rentWallR)" />

                {/* 3D Pitched Roof */}
                <polygon points="32,10 12,22 32,30 52,22" fill="url(#rentRoof)" stroke="#FFFFFF" strokeWidth="0.6" />
                <polygon points="32,10 52,22 52,25 32,13" fill="#8A6615" />
                <polygon points="12,22 32,30 32,33 12,25" fill="#B88E18" />

                {/* Golden Illuminated Windows */}
                <polygon points="20,29 25,31.5 25,37 20,34.5" fill="url(#rentGlass)" stroke="#2B1B14" strokeWidth="0.5" />
                <polygon points="39,29 44,26.5 44,32 39,34.5" fill="url(#rentGlass)" stroke="#2B1B14" strokeWidth="0.5" />

                {/* Front Portico Entrance */}
                <polygon points="28,40 32,42 32,49 28,47" fill="#C9A227" />
                <circle cx="30.5" cy="44.5" r="0.8" fill="#2B1B14" />

                {/* Floating 3D Rent Key Badge */}
                <circle cx="46" cy="16" r="5" fill="#2B1B14" stroke="#DFB943" strokeWidth="1" />
                <path d="M 45 14 L 47 16 L 49 14 M 46 16 L 46 19" stroke="#DFB943" strokeWidth="0.9" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">Rent</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">Shelter & Home</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded-full border border-[#8B3E1E]/20">
            30–50% Salary
          </span>
        </motion.div>

        {/* 2. School Fees (3D Isometric Academic Mortarboard & Diploma) */}
        <motion.div
          id="expense-card-school-fees"
          onMouseEnter={() => setActiveId('school_fees')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'school_fees'
              ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30'
              : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Graduation Cap */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 0.2 }}
              className="absolute -bottom-1 w-10 h-2 bg-[#2B1B14]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -3.8, 0] }
              }
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 0.2 }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.18)]" fill="none">
                <defs>
                  <linearGradient id="capTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4A3026" />
                    <stop offset="100%" stopColor="#1B100C" />
                  </linearGradient>
                  <linearGradient id="capGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="50%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                </defs>

                {/* Skullcap Base */}
                <ellipse cx="32" cy="35" rx="13" ry="5" fill="#1B100C" />
                <path d="M 19 35 C 19 43 45 43 45 35 Z" fill="#2B1B14" stroke="#DFB943" strokeWidth="0.5" />

                {/* 3D Mortarboard Rhombus Top */}
                <polygon points="32,15 54,24 32,33 10,24" fill="url(#capTop)" stroke="#DFB943" strokeWidth="0.75" />

                {/* Center Button Pin */}
                <circle cx="32" cy="24" r="2.2" fill="url(#capGold)" />

                {/* Animated Swinging Tassel */}
                <motion.g
                  animate={
                    shouldReduceMotion
                      ? { rotate: 0 }
                      : { rotate: [-5, 8, -5] }
                  }
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                  style={{ transformOrigin: '32px 24px' }}
                >
                  <path d="M 32 24 Q 44 26 46 36" stroke="#DFB943" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <polygon points="44,36 48,36 47,44 45,44" fill="url(#capGold)" />
                  <circle cx="46" cy="36" r="1.5" fill="#8A6615" />
                </motion.g>

                {/* Diploma Scroll on the Base */}
                <polygon points="12,50 28,42 32,45 16,53" fill="#FFF4D0" stroke="#E1D5C5" strokeWidth="0.5" />
                <polygon points="12,50 16,53 14,54 10,51" fill="#C9A227" />
                <line x1="20" y1="46" x2="22" y2="49" stroke="#8B3E1E" strokeWidth="1.2" />
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">School Fees</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">Children & Tuition</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded-full border border-[#8B3E1E]/20">
            Heavy Term Peaks
          </span>
        </motion.div>

        {/* 3. Food (3D Gourmet Harvest Cloche & Fresh Provision Basket) */}
        <motion.div
          id="expense-card-food"
          onMouseEnter={() => setActiveId('food')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'food'
              ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30'
              : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Food Cloche */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -bottom-1 w-10 h-2 bg-[#2B1B14]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -3.2, 0] }
              }
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.4 }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.18)]" fill="none">
                <defs>
                  <linearGradient id="clocheGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="40%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                  <linearGradient id="clocheTray" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5C4033" />
                    <stop offset="50%" stopColor="#2B1B14" />
                    <stop offset="100%" stopColor="#1B100C" />
                  </linearGradient>
                </defs>

                {/* Serving Platter Tray Base */}
                <ellipse cx="32" cy="46" rx="22" ry="7" fill="url(#clocheTray)" stroke="#C9A227" strokeWidth="0.8" />
                <ellipse cx="32" cy="44.5" rx="18" ry="4.5" fill="#EFE6D6" />

                {/* 3D Cloche Dome with Specular Highlights */}
                <path
                  d="M 16 44 C 16 26 48 26 48 44 Z"
                  fill="url(#clocheGold)"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                />

                {/* Specular Curved Highlight */}
                <path
                  d="M 22 41 C 22 30 36 29 36 31"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* Top Finial Knob */}
                <circle cx="32" cy="23" r="3.2" fill="#2B1B14" stroke="#DFB943" strokeWidth="1" />
                <ellipse cx="32" cy="21.5" r="1.5" fill="#FFF4D0" />

                {/* Animated Rising Aroma Steam */}
                <motion.path
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.6 }
                      : { opacity: [0.2, 0.8, 0.2], y: [0, -3, 0] }
                  }
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  d="M 29 17 Q 31 13 29 9 M 35 17 Q 33 13 35 9"
                  stroke="#DFB943"
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">Food</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">Daily Nutrition</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded-full border border-[#8B3E1E]/20">
            15–25% Salary
          </span>
        </motion.div>

        {/* 4. Transport (3D Isometric Executive Commuter Vehicle) */}
        <motion.div
          id="expense-card-transport"
          onMouseEnter={() => setActiveId('transport')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'transport'
              ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30'
              : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Vehicle Icon */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-1 w-11 h-2 bg-[#2B1B14]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -3.2, 0] }
              }
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut', delay: 0.5 }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.18)]" fill="none">
                <defs>
                  <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4A3026" />
                    <stop offset="100%" stopColor="#1B100C" />
                  </linearGradient>
                  <linearGradient id="carWindshield" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="100%" stopColor="#DFB943" />
                  </linearGradient>
                </defs>

                {/* 3D Vehicle Cabin Hood & Body */}
                <polygon points="12,38 28,46 54,34 38,26" fill="url(#carBody)" stroke="#DFB943" strokeWidth="0.6" />
                <polygon points="12,38 28,46 28,50 12,42" fill="#1B100C" />
                <polygon points="28,46 54,34 54,38 28,50" fill="#2B1B14" />

                {/* Cabin Roof */}
                <polygon points="20,30 32,36 46,29 34,23" fill="#2B1B14" stroke="#DFB943" strokeWidth="0.5" />

                {/* Glass Windshields */}
                <polygon points="20,30 28,34 28,38 18,34" fill="url(#carWindshield)" opacity="0.9" />
                <polygon points="28,34 44,27 44,31 28,38" fill="url(#carWindshield)" opacity="0.75" />

                {/* 3D Wheels */}
                <ellipse cx="22" cy="48" rx="4.5" ry="3.5" fill="#1B100C" stroke="#DFB943" strokeWidth="0.8" />
                <circle cx="22" cy="48" r="1.5" fill="#DFB943" />
                <ellipse cx="44" cy="38" rx="4.5" ry="3.5" fill="#1B100C" stroke="#DFB943" strokeWidth="0.8" />
                <circle cx="44" cy="38" r="1.5" fill="#DFB943" />

                {/* Headlight Beam */}
                <polygon points="12,40 4,44 7,49 14,43" fill="#DFB943" opacity="0.6" />
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">Transport</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">Commute & Fuel</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded-full border border-[#8B3E1E]/20">
            10–20% Salary
          </span>
        </motion.div>

        {/* 5. Family Needs (3D Multi-Generational Hearth / Protective Shield) */}
        <motion.div
          id="expense-card-family"
          onMouseEnter={() => setActiveId('family_needs')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'family_needs'
              ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30'
              : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Family Hearth Shield */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.6 }}
              className="absolute -bottom-1 w-10 h-2 bg-[#2B1B14]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -3.5, 0] }
              }
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.6 }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.18)]" fill="none">
                <defs>
                  <linearGradient id="shieldGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="50%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                  <linearGradient id="hearthCore" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8B3E1E" />
                  </linearGradient>
                </defs>

                {/* 3D Shield Plinth */}
                <path
                  d="M 32 10 L 48 18 C 48 34 32 50 32 50 C 32 50 16 34 16 18 Z"
                  fill="#2B1B14"
                  stroke="url(#shieldGold)"
                  strokeWidth="1.5"
                />

                {/* Inner Beveled Heart / Family Flame */}
                <path
                  d="M 32 20 C 35 15 42 16 42 22 C 42 28 32 36 32 36 C 32 36 22 28 22 22 C 22 16 29 15 32 20 Z"
                  fill="url(#hearthCore)"
                  stroke="#FFF4D0"
                  strokeWidth="0.8"
                />

                {/* Radiating Hearth Pulse Center */}
                <circle cx="32" cy="24" r="2.5" fill="#FFF4D0" />
                <circle cx="32" cy="24" r="1.2" fill="#DFB943" />
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">Family Needs</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">Parents & Extended</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded-full border border-[#8B3E1E]/20">
            Constant Outflow
          </span>
        </motion.div>

        {/* 6. Bills (3D Utility Invoice Receipt with Electric Arc) */}
        <motion.div
          id="expense-card-bills"
          onMouseEnter={() => setActiveId('bills')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'bills'
              ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30'
              : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Receipt Invoice Icon */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 2.7, ease: 'easeInOut', delay: 0.3 }}
              className="absolute -bottom-1 w-10 h-2 bg-[#2B1B14]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -3.4, 0] }
              }
              transition={{ repeat: Infinity, duration: 2.7, ease: 'easeInOut', delay: 0.3 }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.18)]" fill="none">
                <defs>
                  <linearGradient id="billPaper" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#EFE6D6" />
                  </linearGradient>
                </defs>

                {/* 3D Folded Receipt Paper */}
                <polygon points="18,12 44,16 40,52 14,48" fill="url(#billPaper)" stroke="#C9A227" strokeWidth="0.8" />
                <polygon points="14,48 40,52 38,55 12,51" fill="#E1D5C5" />

                {/* Receipt Line Items */}
                <line x1="20" y1="22" x2="38" y2="25" stroke="#2B1B14" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="20" y1="28" x2="34" y2="30" stroke="#5C514B" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="20" y1="34" x2="36" y2="36" stroke="#5C514B" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="20" y1="40" x2="30" y2="41.5" stroke="#8B3E1E" strokeWidth="1.5" strokeLinecap="round" />

                {/* 3D Floating Electric Energy Bolt */}
                <motion.g
                  animate={
                    shouldReduceMotion
                      ? { scale: 1 }
                      : { scale: [1, 1.15, 1], y: [0, -2, 0] }
                  }
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  style={{ transformOrigin: '44px 22px' }}
                >
                  <circle cx="44" cy="22" r="7" fill="#2B1B14" stroke="#DFB943" strokeWidth="1" />
                  <polygon points="45,17 40,23 44,23 43,28 48,21 44,21" fill="#DFB943" />
                </motion.g>
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">Bills</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">Power, Water & Net</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#8B3E1E] bg-[#8B3E1E]/10 px-2 py-0.5 rounded-full border border-[#8B3E1E]/20">
            Fixed Leaks
          </span>
        </motion.div>

        {/* 7. Unexpected Expenses (3D Urgent Shock Prism / Emergency Kit) */}
        <motion.div
          id="expense-card-unexpected"
          onMouseEnter={() => setActiveId('unexpected')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'unexpected'
              ? 'border-[#8B3E1E] shadow-md ring-1 ring-[#8B3E1E]/30'
              : 'border-[#E1D5C5] hover:border-[#8B3E1E]/60'
          }`}
        >
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Emergency Vault */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
              className="absolute -bottom-1 w-10 h-2 bg-[#8B3E1E]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: [0, -3.6, 0], rotateZ: [0, 1.5, 0, -1.5, 0] }
              }
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(139,62,30,0.25)]" fill="none">
                <defs>
                  <linearGradient id="alertRed" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A84B24" />
                    <stop offset="100%" stopColor="#5E230D" />
                  </linearGradient>
                </defs>

                {/* 3D Isometric First-Aid / Emergency Cube */}
                <polygon points="32,12 48,20 32,28 16,20" fill="#DFB943" stroke="#FFFFFF" strokeWidth="0.6" />
                <polygon points="16,20 32,28 32,46 16,38" fill="url(#alertRed)" />
                <polygon points="32,28 48,20 48,38 32,46" fill="#3D1507" />

                {/* 3D White Emergency Cross on Left Face */}
                <polygon points="21,29 27,32 27,34 21,31" fill="#FFFFFF" />
                <polygon points="23,27 25,28 25,36 23,35" fill="#FFFFFF" />

                {/* Warning Hazard Ring */}
                <circle cx="42" cy="18" r="4.5" fill="#2B1B14" stroke="#DFB943" strokeWidth="1" />
                <text x="42" y="21.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#DFB943" fontFamily="sans-serif">!</text>
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">Unexpected</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">Medical & Repairs</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#8B3E1E] bg-[#8B3E1E]/15 px-2 py-0.5 rounded-full border border-[#8B3E1E]/30">
            Sudden Crisis
          </span>
        </motion.div>

        {/* 8. Savings (3D Dwindling Gold Safe with Solitary Lone Coin) */}
        <motion.div
          id="expense-card-savings"
          onMouseEnter={() => setActiveId('savings')}
          onMouseLeave={() => setActiveId(null)}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`relative p-3.5 rounded-2xl bg-[#FFFFFF] border transition-all duration-300 flex flex-col items-center text-center cursor-default select-none shadow-xs ${
            activeId === 'savings'
              ? 'border-[#C9A227] shadow-md ring-1 ring-[#C9A227]/30'
              : 'border-[#E1D5C5] hover:border-[#C9A227]/60'
          }`}
        >
          <div className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E1D5C5] to-transparent" />

          {/* 3D Animated Safe Vault Icon */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-2">
            <motion.div
              animate={
                shouldReduceMotion
                  ? { scaleX: 1, opacity: 0.3 }
                  : { scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }
              }
              transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.7 }}
              className="absolute -bottom-1 w-10 h-2 bg-[#2B1B14]/25 rounded-full blur-[2px]"
            />

            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -3.2, 0] }
              }
              transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.7 }}
              className="relative z-10 w-12 h-12"
            >
              <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_4px_6px_rgba(43,27,20,0.18)]" fill="none">
                <defs>
                  <linearGradient id="vaultDoor" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4A3026" />
                    <stop offset="100%" stopColor="#1B100C" />
                  </linearGradient>
                  <linearGradient id="loneCoin" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="60%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#8A6615" />
                  </linearGradient>
                </defs>

                {/* 3D Isometric Safe Box */}
                <polygon points="14,18 36,12 52,22 30,28" fill="#5C4033" stroke="#C9A227" strokeWidth="0.6" />
                <polygon points="14,18 30,28 30,50 14,40" fill="url(#vaultDoor)" />
                <polygon points="30,28 52,22 52,44 30,50" fill="#1B100C" />

                {/* Safe Combination Dial */}
                <circle cx="22" cy="34" r="5" fill="#2B1B14" stroke="#DFB943" strokeWidth="0.8" />
                <circle cx="22" cy="34" r="2" fill="#DFB943" />

                {/* Solitary Floating Remaining Coin */}
                <motion.g
                  animate={
                    shouldReduceMotion
                      ? { y: 0 }
                      : { y: [0, -4, 0], rotateY: [0, 180, 360] }
                  }
                  transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                  style={{ transformOrigin: '40px 34px' }}
                >
                  <ellipse cx="40" cy="34" rx="4.5" ry="6" fill="url(#loneCoin)" stroke="#FFFFFF" strokeWidth="0.6" />
                  <text x="40" y="36.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#2B1B14" fontFamily="serif">$</text>
                </motion.g>
              </svg>
            </motion.div>
          </div>

          <span className="text-xs sm:text-sm font-bold text-[#2B1B14] block leading-tight">Savings</span>
          <span className="text-[10px] text-[#5C514B] font-semibold mt-0.5 block">What Is Left...</span>
          <span className="mt-1.5 text-[9px] font-bold text-[#5C514B] bg-[#EFE6D6] px-2 py-0.5 rounded-full border border-[#E1D5C5]">
            Often 0% Left
          </span>
        </motion.div>
      </div>

      {/* Dynamic Detail Callout on Hover or Default Message */}
      <div className="mt-4 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E1D5C5] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#8B3E1E]/10 border border-[#8B3E1E]/20 flex items-center justify-center shrink-0">
          <AlertCircle className="w-4 h-4 text-[#8B3E1E]" />
        </div>
        <div className="text-left flex-1 min-h-[22px] flex items-center">
          {activeId ? (
            <motion.p
              key={activeId}
              initial={{ opacity: 0, x: -3 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="text-xs sm:text-sm text-[#211A17] font-medium"
            >
              <strong className="text-[#2B1B14] font-bold">
                {EXPENSES.find((e) => e.id === activeId)?.name}:
              </strong>{' '}
              {EXPENSES.find((e) => e.id === activeId)?.impactNote}{' '}
              <span className="text-[#8B3E1E] font-bold">
                ({EXPENSES.find((e) => e.id === activeId)?.takeRate})
              </span>
            </motion.p>
          ) : (
            <p className="text-xs sm:text-sm text-[#5C514B] font-medium">
              Hover or tap any responsibility to see how one single salary gets absorbed before you can save.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
