import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';

import womanSkillImg from '../assets/images/selling_skill_woman_1788954053237.jpg';
import womanSolutionImg from '../assets/images/selling_solution_woman_1788954070801.jpg';
import avatarWomanImg from '../assets/images/client_avatar_woman_1788954087657.jpg';

type StoryPhase = 'before' | 'transition' | 'after' | 'final';

interface StoryCue {
  phase: StoryPhase;
  startTimeSec: number;
  durationSec: number;
  speechText: string;
}

const STORY_TIMELINE: StoryCue[] = [
  {
    phase: 'before',
    startTimeSec: 0,
    durationSec: 10,
    speechText:
      "Imagine you have a skill you’re really good at. You can design. You can write. You can edit. You can teach. But simply telling people what you can do doesn't always make them interested."
  },
  {
    phase: 'transition',
    startTimeSec: 10,
    durationSec: 5,
    speechText:
      "Now change the conversation. Instead of saying, ‘I can design,’ show them the problem you can solve."
  },
  {
    phase: 'after',
    startTimeSec: 15,
    durationSec: 10,
    speechText:
      "‘I help small businesses create professional social media graphics.’ Now the value is clearer."
  },
  {
    phase: 'final',
    startTimeSec: 25,
    durationSec: 9,
    speechText:
      "That is the fundamental law of monetization. Don't just sell the skill. Sell the problem you can solve."
  }
];

export const MonetizationLawVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Story playback state
  const [currentPhase, setCurrentPhase] = useState<StoryPhase>(shouldReduceMotion ? 'final' : 'before');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const [hasFinishedStory, setHasFinishedStory] = useState(false);
  const [hasStartedVisual, setHasStartedVisual] = useState(false);

  // References for speech and timers
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timelineTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const visualLoopStartedRef = useRef(false);

  // Clear all pending timeline timeouts
  const clearTimeline = useCallback(() => {
    timelineTimeoutsRef.current.forEach((t) => clearTimeout(t));
    timelineTimeoutsRef.current = [];
  }, []);

  // Stop speech synthesis safely
  const stopSpeech = useCallback(() => {
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch (e) {
        console.warn('Speech cancellation notice:', e);
      }
    }
  }, []);

  // Initialize Speech Synthesis with natural warm female voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const pickVoice = () => {
        if (!synthRef.current) return;
        const voices = synthRef.current.getVoices();
        if (!voices || voices.length === 0) return;

        // Prefer natural warm female voices (e.g. South African / English female, Samantha, Serena, Karen, Victoria)
        const preferred =
          voices.find(
            (v) =>
              v.lang.toLowerCase().includes('en') &&
              (v.lang.toLowerCase().includes('za') || v.lang.toLowerCase().includes('ng')) &&
              (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('natural'))
          ) ||
          voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Samantha') ||
                v.name.includes('Serena') ||
                v.name.includes('Karen') ||
                v.name.includes('Victoria') ||
                v.name.includes('Moira') ||
                v.name.includes('Fiona') ||
                v.name.includes('Tessa') ||
                v.name.includes('Google UK English Female') ||
                v.name.includes('Microsoft Zira') ||
                v.name.includes('Jenny'))
          ) ||
          voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
          voices.find((v) => v.lang.startsWith('en'));

        if (preferred) {
          selectedVoiceRef.current = preferred;
        }
      };

      pickVoice();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = pickVoice;
      }
    }

    return () => {
      stopSpeech();
      clearTimeline();
    };
  }, [stopSpeech, clearTimeline]);

  // Execute full sequential visual timeline
  const runVisualTimeline = useCallback(
    (startSec = 0, onComplete?: () => void) => {
      clearTimeline();

      // 0s to 10s: Before scene
      if (startSec < 10) {
        const t1 = setTimeout(() => {
          setCurrentPhase('before');
        }, Math.max(0, (0 - startSec) * 1000));
        timelineTimeoutsRef.current.push(t1);
      }

      // 10s to 15s: Shift your thinking
      if (startSec < 15) {
        const t2 = setTimeout(() => {
          setCurrentPhase('transition');
        }, Math.max(0, (10 - startSec) * 1000));
        timelineTimeoutsRef.current.push(t2);
      }

      // 15s to 25s: After scene
      if (startSec < 25) {
        const t3 = setTimeout(() => {
          setCurrentPhase('after');
        }, Math.max(0, (15 - startSec) * 1000));
        timelineTimeoutsRef.current.push(t3);
      }

      // 25s: Final law statement
      const t4 = setTimeout(() => {
        setCurrentPhase('final');
        if (onComplete) onComplete();
      }, Math.max(0, (25 - startSec) * 1000));
      timelineTimeoutsRef.current.push(t4);
    },
    [clearTimeline]
  );

  // Play full sequential narration cues
  const playNarrationSequence = useCallback(
    (index = 0) => {
      if (index >= STORY_TIMELINE.length) {
        setIsPlayingAudio(false);
        setIsPausedAudio(false);
        setHasFinishedStory(true);
        setCurrentPhase('final');
        return;
      }

      const cue = STORY_TIMELINE[index];
      setCurrentPhase(cue.phase);

      if (synthRef.current) {
        try {
          const utterance = new SpeechSynthesisUtterance(cue.speechText);
          utteranceRef.current = utterance;

          if (selectedVoiceRef.current) {
            utterance.voice = selectedVoiceRef.current;
          }

          // Unhurried, conversational mentor pace
          utterance.rate = 0.88;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          utterance.onend = () => {
            // Natural pause between story beats
            const pause = cue.phase === 'final' ? 600 : 400;
            const t = setTimeout(() => {
              playNarrationSequence(index + 1);
            }, pause);
            timelineTimeoutsRef.current.push(t);
          };

          utterance.onerror = () => {
            // Fallback gracefully to timer
            const t = setTimeout(() => {
              playNarrationSequence(index + 1);
            }, cue.durationSec * 1000);
            timelineTimeoutsRef.current.push(t);
          };

          synthRef.current.speak(utterance);
        } catch (err) {
          console.warn('Speech error, advancing timeline:', err);
          const t = setTimeout(() => {
            playNarrationSequence(index + 1);
          }, cue.durationSec * 1000);
          timelineTimeoutsRef.current.push(t);
        }
      } else {
        // No speech synthesis available: fallback to timeline timer
        const t = setTimeout(() => {
          playNarrationSequence(index + 1);
        }, cue.durationSec * 1000);
        timelineTimeoutsRef.current.push(t);
      }
    },
    []
  );

  // Automatic silent visual animation when section is in view (runs once)
  const handleViewportEnter = () => {
    if (visualLoopStartedRef.current || isPlayingAudio || shouldReduceMotion) return;
    visualLoopStartedRef.current = true;
    setHasStartedVisual(true);
    runVisualTimeline(0, () => {
      setHasFinishedStory(true);
    });
  };

  // Audio Button handler (Hear the Story / Pause / Play Again)
  const handleAudioToggle = () => {
    if (isPlayingAudio && !isPausedAudio) {
      // Pause
      if (synthRef.current) {
        synthRef.current.pause();
      }
      clearTimeline();
      setIsPausedAudio(true);
    } else if (isPausedAudio) {
      // Resume
      setIsPausedAudio(false);
      if (synthRef.current && synthRef.current.paused) {
        synthRef.current.resume();
      } else {
        // Resume from current phase
        const phaseIdx = STORY_TIMELINE.findIndex((c) => c.phase === currentPhase);
        playNarrationSequence(phaseIdx >= 0 ? phaseIdx : 0);
      }
    } else {
      // Play fresh from beginning
      stopSpeech();
      clearTimeline();
      setIsPlayingAudio(true);
      setIsPausedAudio(false);
      setHasFinishedStory(false);
      setCurrentPhase('before');
      playNarrationSequence(0);
    }
  };

  // Quick reset
  const handleReplay = () => {
    stopSpeech();
    clearTimeline();
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
    setHasFinishedStory(false);
    setCurrentPhase('before');
    playNarrationSequence(0);
  };

  return (
    <div className="mt-8 mb-10 w-full" id="fundamental-law-of-monetization">
      {/* 
        Single Cinematic Canvas:
        Clean, Apple-style simplicity with warm espresso & gold tones.
        Lots of breathing room, no card nesting, no carousel controls.
      */}
      <motion.div
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, margin: '-40px' }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#2B1B14] via-[#21140E] to-[#170C08] border border-[#C9A227]/40 shadow-[0_20px_50px_-15px_rgba(43,27,20,0.6)] p-5 sm:p-8 lg:p-12 text-[#F8F4EC]"
      >
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

          {/* Discreet Audio Control */}
          <div className="self-start sm:self-auto flex items-center gap-2">
            <button
              type="button"
              id="hear-the-story-btn"
              onClick={handleAudioToggle}
              aria-label={
                isPlayingAudio && !isPausedAudio
                  ? 'Pause Story'
                  : isPausedAudio
                  ? 'Resume Story'
                  : hasFinishedStory
                  ? 'Play Story Again'
                  : 'Hear the Story'
              }
              className={`inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPlayingAudio && !isPausedAudio
                  ? 'bg-[#DFB943] text-[#2B1B14] shadow-[0_0_18px_rgba(223,185,67,0.4)]'
                  : hasFinishedStory
                  ? 'bg-[#2B1B14] text-[#DFB943] border border-[#C9A227]/60 hover:bg-[#3D251A]'
                  : 'bg-gradient-to-r from-[#DFB943] to-[#C9A227] text-[#211A17] hover:brightness-105 shadow-md'
              }`}
            >
              {isPlayingAudio && !isPausedAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Ⅱ PAUSE</span>
                  <span className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-2.5 bg-[#2B1B14] rounded-full animate-bounce" />
                    <span className="w-1 h-3.5 bg-[#2B1B14] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-2 bg-[#2B1B14] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                </>
              ) : isPausedAudio ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>▶ RESUME</span>
                </>
              ) : hasFinishedStory ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>↻ PLAY AGAIN</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>▶ HEAR THE STORY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------
            SINGLE CINEMATIC VISUAL STAGE: ONE FOCAL POINT
            No nested cards, no carousel arrows, no extraneous badges.
        ------------------------------------------------------------- */}
        <div className="relative z-10 mt-6 sm:mt-8">
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-[#120B07] border border-[#4A3026]/80 shadow-2xl">
            {/* Image 1: Before - Woman Looking Frustrated / Selling Skill */}
            <motion.div
              animate={{
                opacity: currentPhase === 'before' || currentPhase === 'transition' ? 1 : 0
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
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
                opacity: currentPhase === 'after' || currentPhase === 'final' ? 1 : 0
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={womanSolutionImg}
                alt="Confident professional African woman working with clarity"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-100 saturate-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#170C08]/90 via-[#170C08]/25 to-transparent" />
            </motion.div>

            {/* -------------------------------------------------------------
                DYNAMIC MINIMAL STORY OVERLAYS (One focal point at a time)
            ------------------------------------------------------------- */}

            {/* BEFORE SCENE: "I CAN DESIGN" */}
            <AnimatePresence>
              {currentPhase === 'before' && (
                <motion.div
                  key="before-overlay"
                  initial={{ opacity: 0, y: 10 }}
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

            {/* TRANSITION: "SHIFT YOUR THINKING" + DELICATE GOLD LINE */}
            <AnimatePresence>
              {currentPhase === 'transition' && (
                <motion.div
                  key="transition-overlay"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#170C08]/50 backdrop-blur-[2px]"
                >
                  <p className="text-base sm:text-xl md:text-2xl font-bold text-[#DFB943] italic font-serif tracking-wide drop-shadow-md mb-2">
                    Shift your thinking
                  </p>
                  {/* Subtle animated gold line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 140 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-0.5 bg-gradient-to-r from-transparent via-[#DFB943] to-transparent shadow-[0_0_12px_rgba(223,185,67,0.8)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* AFTER SCENE: "I HELP SMALL BUSINESSES..." + SINGLE CLIENT RESPONSE */}
            <AnimatePresence>
              {(currentPhase === 'after' || currentPhase === 'final') && (
                <motion.div
                  key="after-overlay"
                  initial={{ opacity: 0, y: 10 }}
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

            {/* SINGLE CLIENT RESPONSE BUBBLE (Appears during after phase) */}
            <AnimatePresence>
              {(currentPhase === 'after' || currentPhase === 'final') && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.9 }}
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
          </div>
        </div>

        {/* -------------------------------------------------------------
            FINAL MESSAGE: VISUAL CLIMAX
            Clean dark background, premium gold typography, lots of breathing room.
            No card nesting, no extra explanation paragraphs.
        ------------------------------------------------------------- */}
        <motion.div
          animate={{
            opacity: currentPhase === 'final' || hasFinishedStory ? 1 : 0.85
          }}
          className="relative z-10 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#C9A227]/25 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-1 sm:space-y-2">
            <p className="text-base sm:text-xl md:text-2xl font-bold text-[#F8F4EC] tracking-tight uppercase">
              DON&apos;T JUST SELL THE SKILL.
            </p>

            <p
              className={`text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase leading-tight transition-all duration-700 ${
                currentPhase === 'final'
                  ? 'text-[#DFB943] drop-shadow-[0_0_25px_rgba(223,185,67,0.7)]'
                  : 'text-[#DFB943]'
              }`}
            >
              SELL THE PROBLEM YOU CAN SOLVE.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
