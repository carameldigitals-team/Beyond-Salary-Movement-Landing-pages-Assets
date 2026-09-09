import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

import womanSkillImg from '../assets/images/selling_skill_woman_1788954053237.jpg';
import womanSolutionImg from '../assets/images/selling_solution_woman_1788954070801.jpg';
import avatarWomanImg from '../assets/images/client_avatar_woman_1788954087657.jpg';
import narrationAudioMp3 from '../assets/audio/narration_african_professional.mp3';

type StoryStage =
  | 'idle'
  | 'skill_intro'
  | 'skill_rejected'
  | 'shift'
  | 'solution'
  | 'realisation'
  | 'final';

export const MonetizationLawVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Audio element reference & states
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);

  // Smooth 60fps time tracking while audio is playing
  useEffect(() => {
    let animationFrameId: number;

    const syncTime = () => {
      if (audioRef.current && isPlaying && !isPaused) {
        setCurrentTime(audioRef.current.currentTime);
        animationFrameId = requestAnimationFrame(syncTime);
      }
    };

    if (isPlaying && !isPaused) {
      animationFrameId = requestAnimationFrame(syncTime);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, isPaused]);

  // Derive active stage mathematically from audio currentTime
  const getStage = (): StoryStage => {
    if (!hasUserInteracted && currentTime === 0) {
      return 'idle';
    }
    if (currentTime < 7.2) {
      return 'skill_intro';
    }
    if (currentTime < 12.5) {
      return 'skill_rejected';
    }
    if (currentTime < 15.5) {
      return 'shift';
    }
    if (currentTime < 24.8) {
      return 'solution';
    }
    if (currentTime < 27.5) {
      return 'realisation';
    }
    return 'final';
  };

  const stage = getStage();

  // One-tap robust audio trigger
  const handleTogglePlay = async () => {
    setAudioError(null);
    setHasUserInteracted(true);

    const audio = audioRef.current;
    if (!audio) {
      setAudioError('Audio engine initializing. Tap to try again.');
      return;
    }

    if (isPlaying && !isPaused) {
      // Pause
      audio.pause();
      setIsPaused(true);
    } else if (isPaused) {
      // Resume
      try {
        await audio.play();
        setIsPaused(false);
        setIsPlaying(true);
      } catch (err) {
        console.error('Failed to resume audio:', err);
        setAudioError('Audio could not start. Tap to try again.');
        setIsPlaying(false);
        setIsPaused(false);
      }
    } else {
      // Start fresh or Play Again
      try {
        audio.currentTime = 0;
        setCurrentTime(0);
        setHasFinished(false);
        await audio.play();
        setIsPlaying(true);
        setIsPaused(false);
      } catch (err) {
        console.error('Failed to start audio playback:', err);
        setAudioError('Audio could not start. Tap to try again.');
        setIsPlaying(false);
        setIsPaused(false);
      }
    }
  };

  return (
    <div className="mt-8 mb-10 w-full" id="fundamental-law-of-monetization">
      {/* 
        Native HTML5 Audio element:
        Loaded with primary bundled MP3 and multi-source fallbacks.
        Synchronous user gesture handler unlocks audio on Android Chrome & iOS Safari.
      */}
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
          setIsPaused(false);
          setAudioError(null);
        }}
        onPause={() => {
          setIsPaused(true);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setIsPaused(false);
          setHasFinished(true);
          setCurrentTime(35.5);
        }}
        onError={(e) => {
          console.error('Audio playback error event:', e);
          setIsPlaying(false);
          setIsPaused(false);
          setAudioError('Audio could not start. Tap to try again.');
        }}
      >
        <source src={narrationAudioMp3} type="audio/mpeg" />
        <source src="/assets/narration_african_professional.mp3" type="audio/mpeg" />
        <source src="/audio/narration_african_professional.mp3" type="audio/mpeg" />
        <source src="/assets/narration_african_professional.wav" type="audio/wav" />
      </audio>

      {/* 
        Single Cinematic Canvas:
        Clean, Apple-style simplicity with warm espresso & gold tones.
        Lots of breathing room, no card nesting, no carousel controls.
      */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#2B1B14] via-[#21140E] to-[#170C08] border border-[#C9A227]/40 shadow-[0_20px_50px_-15px_rgba(43,27,20,0.6)] p-5 sm:p-8 lg:p-12 text-[#F8F4EC]">
        {/* Subtle Ambient Lighting */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#DFB943]/8 rounded-full blur-3xl pointer-events-none" />

        {/* -------------------------------------------------------------
            TOP BAR: MINIMAL TITLE & DISCREET AUDIO BUTTON
        ------------------------------------------------------------- */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 pb-6 border-b border-[#C9A227]/20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#DFB943] block">
              Core Principle
            </span>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#F8F4EC] mt-0.5">
              THE FUNDAMENTAL LAW OF MONETIZATION
            </h3>
          </div>

          {/* Discreet Audio Control with User-Initiated Tap */}
          <div className="self-start sm:self-auto flex flex-col items-start sm:items-end gap-1.5">
            <button
              type="button"
              id="hear-the-story-btn"
              onClick={handleTogglePlay}
              aria-label={
                isPlaying && !isPaused
                  ? 'Pause story'
                  : isPaused
                  ? 'Resume story'
                  : hasFinished
                  ? 'Play again'
                  : 'Hear the story'
              }
              className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPlaying && !isPaused
                  ? 'bg-[#DFB943] text-[#2B1B14] shadow-[0_0_20px_rgba(223,185,67,0.5)]'
                  : hasFinished
                  ? 'bg-[#2B1B14] text-[#DFB943] border border-[#C9A227]/70 hover:bg-[#3D251A]'
                  : 'bg-gradient-to-r from-[#DFB943] to-[#C9A227] text-[#211A17] hover:brightness-105 shadow-md'
              }`}
            >
              {isPlaying && !isPaused ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Ⅱ PAUSE STORY</span>
                  {/* Subtle audio playing wave indicator */}
                  <span className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-2 bg-[#2B1B14] rounded-full animate-pulse" />
                    <span className="w-1 h-3.5 bg-[#2B1B14] rounded-full animate-pulse [animation-delay:0.15s]" />
                    <span className="w-1 h-2.5 bg-[#2B1B14] rounded-full animate-pulse [animation-delay:0.3s]" />
                  </span>
                </>
              ) : isPaused ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>▶ RESUME STORY</span>
                </>
              ) : hasFinished ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>↻ PLAY AGAIN</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>▶ HEAR THE STORY</span>
                  <Volume2 className="w-3.5 h-3.5 opacity-80" />
                </>
              )}
            </button>

            {/* Error or guidance message if audio could not start */}
            {audioError ? (
              <p className="text-[11px] sm:text-xs text-[#E17855] font-semibold flex items-center gap-1 animate-pulse">
                <span>⚠️ {audioError}</span>
              </p>
            ) : !hasUserInteracted ? (
              <span className="text-[11px] text-[#DFB943]/80 font-medium">
                Tap to hear the story
              </span>
            ) : null}
          </div>
        </div>

        {/* -------------------------------------------------------------
            SINGLE CINEMATIC VISUAL STAGE: ONE FOCAL POINT
            No nested cards, no carousel arrows, no extraneous badges.
        ------------------------------------------------------------- */}
        <div className="relative z-10 mt-6 sm:mt-8">
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-[#120B07] border border-[#4A3026]/80 shadow-2xl">
            {/* Image 1: Before - Woman Working at Laptop / Selling Skill */}
            <motion.div
              animate={{
                opacity:
                  stage === 'idle' ||
                  stage === 'skill_intro' ||
                  stage === 'skill_rejected' ||
                  stage === 'shift'
                    ? 1
                    : 0
              }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={womanSkillImg}
                alt="Professional African woman working at laptop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-90 saturate-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#170C08]/90 via-[#170C08]/30 to-transparent" />
            </motion.div>

            {/* Image 2: After - Same Woman Confident / Selling Solution */}
            <motion.div
              animate={{
                opacity:
                  stage === 'solution' || stage === 'realisation' || stage === 'final'
                    ? 1
                    : 0
              }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={womanSolutionImg}
                alt="Confident professional African woman working with clarity"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center filter ${
                  stage === 'realisation' || stage === 'final'
                    ? 'brightness-105 saturate-110'
                    : 'brightness-100 saturate-105'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#170C08]/90 via-[#170C08]/25 to-transparent" />
            </motion.div>

            {/* -------------------------------------------------------------
                DYNAMIC MINIMAL STORY OVERLAYS (Synchronized with Narration)
            ------------------------------------------------------------- */}

            {/* STAGE 1: SKILL CONCEPT INTRO (0s - 7.2s) */}
            <AnimatePresence>
              {stage === 'skill_intro' && (
                <motion.div
                  key="skill-intro-overlay"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 max-w-[280px] sm:max-w-md"
                >
                  <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#DFB943]/90 block mb-1">
                    SKILL IN HAND
                  </span>
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-xs text-[#211A17] px-4 py-2.5 rounded-xl border border-[#E1D5C5] shadow-lg">
                    <p className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-[#2B1B14]">
                      Design • Writing • Editing • Teaching
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 2: "I CAN DESIGN" + "NOT INTERESTED" (7.2s - 12.5s and Idle) */}
            <AnimatePresence>
              {(stage === 'idle' || stage === 'skill_rejected') && (
                <motion.div
                  key="before-overlay"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 max-w-[280px] sm:max-w-md"
                >
                  <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#DFB943]/90 block mb-1">
                    SELLING THE SKILL
                  </span>
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-xs text-[#211A17] px-4 py-2.5 rounded-xl border border-[#E1D5C5] shadow-lg">
                    <p className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight uppercase">
                      “I CAN DESIGN.”
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle "Not interested." response from prospect during skill pitch */}
            <AnimatePresence>
              {stage === 'skill_rejected' && (
                <motion.div
                  key="rejected-bubble"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute top-3 sm:top-5 right-3 sm:right-6 z-20 bg-[#2B1B14]/90 backdrop-blur-xs text-[#EFE6D6] px-3.5 py-1.5 rounded-full shadow-lg border border-[#8B3E1E]/50 text-xs font-semibold"
                >
                  “Not interested.”
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 3: THE SHIFT - "SHIFT YOUR THINKING" + DELICATE GOLD LINE (12.5s - 15.5s) */}
            <AnimatePresence>
              {stage === 'shift' && (
                <motion.div
                  key="transition-overlay"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#170C08]/60 backdrop-blur-[2px]"
                >
                  <p className="text-base sm:text-xl md:text-2xl font-bold text-[#DFB943] italic font-serif tracking-wide drop-shadow-md mb-2">
                    Shift your thinking
                  </p>
                  {/* Subtle animated gold line */}
                  <motion.div
                    initial={shouldReduceMotion ? false : { width: 0 }}
                    animate={{ width: 150 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-0.5 bg-gradient-to-r from-transparent via-[#DFB943] to-transparent shadow-[0_0_12px_rgba(223,185,67,0.8)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGES 4, 5, 6: THE SOLUTION - "I HELP SMALL BUSINESSES..." */}
            <AnimatePresence>
              {(stage === 'solution' || stage === 'realisation' || stage === 'final') && (
                <motion.div
                  key="after-overlay"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-20 max-w-sm sm:max-w-md"
                >
                  <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#DFB943] block mb-1">
                    SELLING THE PROBLEM YOU CAN SOLVE
                  </span>
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-xs text-[#211A17] p-3 sm:p-3.5 rounded-xl border border-[#DFB943] shadow-xl">
                    <p className="text-xs sm:text-sm md:text-base font-extrabold leading-snug">
                      “I HELP SMALL BUSINESSES CREATE PROFESSIONAL SOCIAL MEDIA GRAPHICS.”
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SINGLE CLIENT RESPONSE BUBBLE */}
            <AnimatePresence>
              {(stage === 'solution' || stage === 'realisation' || stage === 'final') && (
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute top-3 sm:top-5 right-3 sm:right-6 z-20 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#211A17] pl-1.5 pr-3 py-1 rounded-full shadow-lg border border-[#E1D5C5] flex items-center gap-2"
                >
                  <img
                    src={avatarWomanImg}
                    alt="Client avatar"
                    referrerPolicy="no-referrer"
                    className="w-5 h-5 rounded-full object-cover border border-[#DFB943]"
                  />
                  <span className="text-xs sm:text-sm font-semibold">
                    “This is exactly what I need.”
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 5: THE REALISATION (24.8s - 27.5s) - "NOW THE VALUE IS CLEARER" */}
            <AnimatePresence>
              {(stage === 'realisation' || stage === 'final') && (
                <motion.div
                  key="value-tags"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-3 sm:top-5 left-3 sm:left-6 z-20 flex items-center gap-2"
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-[#DFB943]/20 border border-[#DFB943]/70 text-[#DFB943] text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                    VALUE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#DFB943]/20 border border-[#DFB943]/70 text-[#DFB943] text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                    OUTCOME
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* -------------------------------------------------------------
            FINAL MESSAGE: VISUAL CLIMAX
            Clean dark background, premium gold typography, lots of breathing room.
            No card nesting, no extra explanation paragraphs.
        ------------------------------------------------------------- */}
        <div className="relative z-10 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#C9A227]/25 text-center">
          <div className="max-w-2xl mx-auto space-y-1 sm:space-y-2">
            <p className="text-base sm:text-xl md:text-2xl font-bold text-[#F8F4EC] tracking-tight uppercase">
              DON&apos;T JUST SELL THE SKILL.
            </p>

            <p
              className={`text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-tight transition-all duration-700 ${
                stage === 'final' || hasFinished
                  ? 'text-[#DFB943] drop-shadow-[0_0_25px_rgba(223,185,67,0.7)]'
                  : 'text-[#DFB943]'
              }`}
            >
              SELL THE PROBLEM YOU CAN SOLVE.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
