import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

// Character & avatar images generated specifically to match the reference artwork
import womanSkillImg from '../assets/images/selling_skill_woman_1788954053237.jpg';
import womanSolutionImg from '../assets/images/selling_solution_woman_1788954070801.jpg';
import avatarWomanImg from '../assets/images/client_avatar_woman_1788954087657.jpg';
import avatarManImg from '../assets/images/client_avatar_man_1788954103504.jpg';

// Narration script cues exactly following user instructions
interface NarrationCue {
  id: number;
  phase: 'intro' | 'skill' | 'rejection' | 'shift' | 'solution' | 'clients' | 'law' | 'outro';
  stepIndex: number; // 0: The Skill, 1: The Shift, 2: The Solution
  text: string;
  displayCaption: string;
  highlightWords?: string[];
  durationEstimateSec: number;
  highlightTarget: 'title' | 'laptop1' | 'credentials' | 'hesitations' | 'arrow' | 'laptop2' | 'bubbles' | 'heroLaw';
}

const NARRATION_CUES: NarrationCue[] = [
  {
    id: 0,
    phase: 'intro',
    stepIndex: 0,
    text: "Imagine you have a skill you’re really good at. You can design. You can write. You can edit. You can teach.",
    displayCaption: "“Imagine you have a skill you’re really good at. You can design. You can write. You can edit. You can teach.”",
    highlightWords: ['skill', 'design', 'write', 'teach'],
    durationEstimateSec: 6.5,
    highlightTarget: 'laptop1'
  },
  {
    id: 1,
    phase: 'skill',
    stepIndex: 0,
    text: "So you put your skill out there and say, ‘I can do this.’",
    displayCaption: "“So you put your skill out there and say, ‘I can do this.’”",
    highlightWords: ['I can do this'],
    durationEstimateSec: 4.2,
    highlightTarget: 'laptop1'
  },
  {
    id: 2,
    phase: 'rejection',
    stepIndex: 0,
    text: "But sometimes... nobody seems interested.",
    displayCaption: "“But sometimes... nobody seems interested.”",
    highlightWords: ['nobody seems interested'],
    durationEstimateSec: 4.0,
    highlightTarget: 'hesitations'
  },
  {
    id: 3,
    phase: 'shift',
    stepIndex: 1,
    text: "Then you make one important shift. Instead of asking people to buy your skill...",
    displayCaption: "“Then you make one important shift. Instead of asking people to buy your skill...”",
    highlightWords: ['important shift', 'buy your skill'],
    durationEstimateSec: 5.2,
    highlightTarget: 'arrow'
  },
  {
    id: 4,
    phase: 'solution',
    stepIndex: 2,
    text: "you show them the problem your skill can solve.",
    displayCaption: "“...you show them the problem your skill can solve.”",
    highlightWords: ['problem your skill can solve'],
    durationEstimateSec: 4.0,
    highlightTarget: 'laptop2'
  },
  {
    id: 5,
    phase: 'solution',
    stepIndex: 2,
    text: "You stop saying: ‘I can design.’ And you start saying: ‘I help small businesses create professional social media graphics.’",
    displayCaption: "“You stop saying: ‘I can design.’ And you start saying: ‘I help small businesses create professional social media graphics.’”",
    highlightWords: ['I help small businesses create professional social media graphics'],
    durationEstimateSec: 7.8,
    highlightTarget: 'laptop2'
  },
  {
    id: 6,
    phase: 'clients',
    stepIndex: 2,
    text: "Now the value is clearer. Because people don't just buy skills. They pay for solutions to problems they care about.",
    displayCaption: "“Now the value is clearer. Because people don't just buy skills. They pay for solutions to problems they care about.”",
    highlightWords: ['value is clearer', 'solutions to problems'],
    durationEstimateSec: 7.0,
    highlightTarget: 'bubbles'
  },
  {
    id: 7,
    phase: 'law',
    stepIndex: 2,
    text: "That is the fundamental law of monetization. Don’t just sell the skill. Sell the problem you can solve.",
    displayCaption: "“That is the fundamental law of monetization. Don’t just sell the skill. Sell the problem you can solve.”",
    highlightWords: ['fundamental law of monetization', 'Sell the problem you can solve'],
    durationEstimateSec: 7.0,
    highlightTarget: 'heroLaw'
  },
  {
    id: 8,
    phase: 'outro',
    stepIndex: 2,
    text: "When you make the problem clear, the value becomes easier to see.",
    displayCaption: "“When you make the problem clear, the value becomes easier to see.”",
    highlightWords: ['problem clear', 'value becomes easier to see'],
    durationEstimateSec: 4.8,
    highlightTarget: 'heroLaw'
  }
];

export const MonetizationLawVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Story & Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [activeCueIndex, setActiveCueIndex] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0); // 0 = Skill, 1 = Shift, 2 = Solution
  const [isMuted, setIsMuted] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState<boolean>(true);
  const [replayKey, setReplayKey] = useState(0);

  // References to handle speech synthesis & timers
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const activeCueIndexRef = useRef(0);

  // Keep refs in sync
  isPlayingRef.current = isPlaying;
  isPausedRef.current = isPaused;
  activeCueIndexRef.current = activeCueIndex;

  // Initialize Speech Synthesis and select warm natural female voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const pickVoice = () => {
        if (!synthRef.current) return;
        const voices = synthRef.current.getVoices();
        if (voices.length === 0) return;

        // Preferred order:
        // 1. South African / African-English or Nigerian female voices (en-ZA, en-NG, en-KE, en-GH)
        // 2. Clear warm female English voices: Samantha, Karen, Serena, Victoria, Google UK English Female, Moira, Fiona, Tessa, Zira
        // 3. Any English voice with female indicator
        // 4. Any English voice
        const preferred = voices.find((v) =>
          v.lang.toLowerCase().includes('en') &&
          (v.lang.toLowerCase().includes('za') || v.lang.toLowerCase().includes('ng')) &&
          (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('natural'))
        ) ||
        voices.find((v) =>
          v.lang.startsWith('en') &&
          (
            v.name.includes('Samantha') ||
            v.name.includes('Karen') ||
            v.name.includes('Victoria') ||
            v.name.includes('Serena') ||
            v.name.includes('Moira') ||
            v.name.includes('Fiona') ||
            v.name.includes('Tessa') ||
            v.name.includes('Google UK English Female') ||
            v.name.includes('Google US English') ||
            v.name.includes('Microsoft Zira') ||
            v.name.includes('Jenny')
          )
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
    } else {
      setVoiceAvailable(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Stop current speech & timer safely
  const stopAudio = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Play a specific cue
  const playCue = useCallback((cueIndex: number) => {
    if (cueIndex >= NARRATION_CUES.length) {
      // Completed all cues
      setIsPlaying(false);
      setIsPaused(false);
      setHasFinished(true);
      return;
    }

    const cue = NARRATION_CUES[cueIndex];
    setActiveCueIndex(cueIndex);
    setActiveStep(cue.stepIndex);

    stopAudio();

    // If sound is enabled and speech synthesis is available
    if (!isMuted && synthRef.current && voiceAvailable) {
      try {
        const utterance = new SpeechSynthesisUtterance(cue.text);
        utteranceRef.current = utterance;

        if (selectedVoiceRef.current) {
          utterance.voice = selectedVoiceRef.current;
        }

        // Warm, unhurried mentor delivery
        utterance.rate = 0.90;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => {
          if (isPlayingRef.current && !isPausedRef.current) {
            // Small natural pause between sentences
            const pauseTime = cue.phase === 'law' ? 800 : 400;
            timerRef.current = setTimeout(() => {
              playCue(cueIndex + 1);
            }, pauseTime);
          }
        };

        utterance.onerror = (e) => {
          // If speech is interrupted or blocked, fallback to timer gracefully
          console.warn('Speech synthesis notice:', e);
          if (isPlayingRef.current && !isPausedRef.current) {
            timerRef.current = setTimeout(() => {
              playCue(cueIndex + 1);
            }, cue.durationEstimateSec * 1000);
          }
        };

        synthRef.current.speak(utterance);
      } catch (err) {
        console.warn('Audio playback fallback triggered:', err);
        // Graceful fallback to timer without audio
        timerRef.current = setTimeout(() => {
          if (isPlayingRef.current && !isPausedRef.current) {
            playCue(cueIndex + 1);
          }
        }, cue.durationEstimateSec * 1000);
      }
    } else {
      // Silent animated playback driven by timeline
      timerRef.current = setTimeout(() => {
        if (isPlayingRef.current && !isPausedRef.current) {
          playCue(cueIndex + 1);
        }
      }, cue.durationEstimateSec * 1000);
    }
  }, [isMuted, stopAudio, voiceAvailable]);

  // Handler: Start or Resume Story
  const handleStartOrResume = () => {
    if (isPlaying && !isPaused) {
      // Pause
      if (synthRef.current) {
        synthRef.current.pause();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setIsPaused(true);
    } else if (isPaused) {
      // Resume
      setIsPaused(false);
      if (synthRef.current && synthRef.current.paused) {
        synthRef.current.resume();
      } else {
        playCue(activeCueIndex);
      }
    } else {
      // New Play
      setIsPlaying(true);
      setIsPaused(false);
      setHasFinished(false);
      setReplayKey((prev) => prev + 1);
      playCue(0);
    }
  };

  // Handler: Replay From Beginning
  const handleReplay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopAudio();
    setIsPlaying(true);
    setIsPaused(false);
    setHasFinished(false);
    setActiveCueIndex(0);
    setActiveStep(0);
    setReplayKey((prev) => prev + 1);
    playCue(0);
  };

  // Step Navigation (Allows jumping between the 3 story acts manually)
  const handleStepClick = (stepIndex: number) => {
    stopAudio();
    setActiveStep(stepIndex);
    // Find first cue of this step
    const targetCueIdx = NARRATION_CUES.findIndex((c) => c.stepIndex === stepIndex);
    if (targetCueIdx !== -1) {
      setActiveCueIndex(targetCueIdx);
      if (isPlaying) {
        playCue(targetCueIdx);
      }
    }
  };

  const handlePrevStep = () => {
    const newStep = Math.max(0, activeStep - 1);
    handleStepClick(newStep);
  };

  const handleNextStep = () => {
    const newStep = Math.min(2, activeStep + 1);
    handleStepClick(newStep);
  };

  const currentCue = NARRATION_CUES[activeCueIndex] || NARRATION_CUES[0];

  // Timing helper
  const d = (val: number) => (shouldReduceMotion ? 0 : val);
  const dur = (val: number) => (shouldReduceMotion ? 0 : val);

  return (
    <div className="mt-10 mb-8 w-full" id="fundamental-law-of-monetization">
      {/* Outer Luxury Card matching the reference artwork */}
      <motion.div
        key={replayKey}
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: dur(0.6), ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#2B1B14] via-[#21140E] to-[#170C08] border-2 border-[#C9A227] shadow-[0_22px_60px_-15px_rgba(43,27,20,0.5),0_0_40px_rgba(201,162,39,0.22)] p-4 sm:p-6 md:p-8 lg:p-10 text-[#F8F4EC]"
      >
        {/* Ambient Warm Golden Corner Flares */}
        <div className="absolute -top-12 -left-12 w-52 h-52 bg-[#C9A227]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#DFB943]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A227]/8 rounded-full blur-3xl pointer-events-none" />

        {/* -------------------------------------------------------------
            TOP FLOATING CONTROLS: STORY BADGE & AUDIO CONTROL
        ------------------------------------------------------------- */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#C9A227]/25">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-[#DFB943] bg-[#2B1B14]/90 border border-[#C9A227]/50 px-3 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#DFB943]" />
              <span>Animated Story &amp; Voice Narration</span>
            </span>

            {/* Subtle Voice Status Pill */}
            <span className="hidden sm:inline-flex items-center text-[11px] font-medium text-[#E1D5C5]/70 bg-[#21140E]/80 px-2.5 py-0.5 rounded-full border border-[#4A3026]">
              Warm Mentor Audio
            </span>
          </div>

          {/* Controls Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Mute/Unmute Toggle */}
            <button
              type="button"
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (nextMuted && synthRef.current) {
                  synthRef.current.cancel();
                }
              }}
              aria-label={isMuted ? 'Unmute voice narration' : 'Mute voice narration'}
              title={isMuted ? 'Unmute voice' : 'Mute voice'}
              className="p-1.5 rounded-full bg-[#2B1B14]/90 hover:bg-[#4A3026] text-[#DFB943] border border-[#C9A227]/40 text-xs transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* PRIMARY BUTTON: HEAR THE STORY / PAUSE STORY / PLAY AGAIN */}
            <button
              type="button"
              id="hear-the-story-btn"
              onClick={handleStartOrResume}
              aria-label={isPlaying && !isPaused ? 'Pause Story' : hasFinished ? 'Play Again' : isPaused ? 'Resume Story' : 'Hear the Story'}
              className={`inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer ${
                isPlaying && !isPaused
                  ? 'bg-[#DFB943] text-[#2B1B14] hover:bg-[#FFF5DC] shadow-[0_0_20px_rgba(223,185,67,0.4)] ring-2 ring-[#DFB943]'
                  : hasFinished
                  ? 'bg-gradient-to-r from-[#DFB943] to-[#C9A227] text-[#2B1B14] hover:opacity-90'
                  : 'bg-gradient-to-r from-[#DFB943] via-[#E6C35C] to-[#C9A227] text-[#211A17] hover:brightness-110 shadow-[0_4px_15px_rgba(201,162,39,0.35)]'
              }`}
            >
              {isPlaying && !isPaused ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Ⅱ PAUSE STORY</span>
                  {/* Subtle 3-bar animated soundwave */}
                  <span className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-3 bg-[#2B1B14] rounded-full animate-bounce" />
                    <span className="w-1 h-4 bg-[#2B1B14] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-2 bg-[#2B1B14] rounded-full animate-bounce [animation-delay:0.4s]" />
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
                  <Play className="w-4 h-4 fill-current text-[#211A17]" />
                  <span>▶ HEAR THE STORY</span>
                </>
              )}
            </button>

            {/* Replay Button (When active) */}
            {(isPlaying || hasFinished) && (
              <button
                type="button"
                onClick={handleReplay}
                title="Restart from beginning"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2B1B14]/90 hover:bg-[#4A3026] text-[#DFB943] border border-[#C9A227]/40 text-xs font-semibold transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------
            MAIN TOP HEADLINE
            THE FUNDAMENTAL LAW OF MONETIZATION
        ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(0.5), delay: d(0.2) }}
          className="relative z-10 text-center my-3 sm:my-4"
        >
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#DFB943] block">
            THE FUNDAMENTAL LAW OF
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-[#FFF5DC] via-[#DFB943] to-[#C9A227] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(201,162,39,0.3)]">
            MONETIZATION
          </h3>
          <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-[#DFB943] to-transparent mx-auto mt-2" />
        </motion.div>

        {/* -------------------------------------------------------------
            LIVE SPOKEN CAPTION / SUBTITLE BAR
            Displays the mentor voiceover in real-time
        ------------------------------------------------------------- */}
        <div className="relative z-20 my-3">
          <div className="bg-[#1C110C]/90 border border-[#C9A227]/40 rounded-2xl p-3 sm:p-3.5 shadow-md flex items-center gap-3 backdrop-blur-xs">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A227]/20 border border-[#DFB943]/60 flex items-center justify-center text-[#DFB943]">
              <Volume2 className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFB943] block">
                {isPlaying && !isPaused ? 'Narrator Speaking:' : isPaused ? 'Narrator Paused:' : 'Audio Narration:'}
              </span>
              <p className="text-xs sm:text-sm font-medium text-[#F8F4EC] leading-snug truncate sm:whitespace-normal">
                {currentCue.displayCaption}
              </p>
            </div>

            {/* Story Step Indicator in Subtitle Bar */}
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-[#4A3026]">
              {[0, 1, 2].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => handleStepClick(step)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeStep === step ? 'w-5 bg-[#DFB943]' : 'bg-[#E1D5C5]/30 hover:bg-[#DFB943]/60'
                  }`}
                  aria-label={`Jump to story part ${step + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            VISUAL STORY CANVAS: SCENE 1 vs SCENE 2
        ------------------------------------------------------------- */}
        <div className="relative z-10 mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">

          {/* =========================================================
              SCENE 1: SELLING THE SKILL (Left Column - 5 Cols on Desktop)
          ========================================================= */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: activeStep === 0 && isPlaying ? 1.01 : 1
            }}
            transition={{ duration: dur(0.5) }}
            className={`lg:col-span-5 relative rounded-2xl bg-[#1C110C]/90 p-4 sm:p-5 flex flex-col justify-between shadow-inner transition-all duration-300 ${
              activeStep === 0
                ? 'border-2 border-[#C9A227] shadow-[0_0_25px_rgba(201,162,39,0.2)]'
                : 'border border-[#4A3026] opacity-90'
            }`}
          >
            {/* Header label for Scene 1 */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C9A227]/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8B3E1E]" />
                Before: The Common Mistake
              </span>
              <span className="text-[11px] font-semibold text-[#E1D5C5]/60 bg-[#2B1B14] px-2 py-0.5 rounded border border-[#4A3026]">
                Focus: Activity
              </span>
            </div>

            {/* Character & Environment Frame */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#120B07] border border-[#3D251A] shadow-md group">
              {/* Photo of African woman looking uncertain at laptop */}
              <img
                src={womanSkillImg}
                alt="African professional woman looking frustrated at her laptop while selling only her skill"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-all duration-500 ${
                  activeStep === 0 ? 'saturate-[1.0] brightness-[0.95]' : 'saturate-[0.8] brightness-[0.85]'
                }`}
              />

              {/* Dark subtle gradient overlay to ensure UI elements pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/85 via-transparent to-[#1A0F0A]/40 pointer-events-none" />

              {/* Laptop Screen Graphic Overlay: "I CAN DESIGN" */}
              <motion.div
                animate={{
                  scale: currentCue.highlightTarget === 'laptop1' ? [1, 1.06, 1] : 1,
                  borderColor: currentCue.highlightTarget === 'laptop1' ? '#DFB943' : '#E1D5C5'
                }}
                transition={{ duration: 1.5, repeat: currentCue.highlightTarget === 'laptop1' ? Infinity : 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#F8F4EC]/95 backdrop-blur-xs text-[#211A17] px-3.5 py-1.5 rounded-lg border shadow-lg text-center z-10"
              >
                <span className="text-[10px] uppercase font-bold text-[#5C514B] block tracking-wider">
                  Positioning:
                </span>
                <span className="text-xs sm:text-sm font-extrabold tracking-wide text-[#2B1B14] uppercase">
                  “I CAN DESIGN”
                </span>
              </motion.div>

              {/* Book Stack / Focus Badges: SKILLS, TOOLS, CERTIFICATES, PORTFOLIO */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                {[
                  { label: 'SKILLS', delay: d(0.2) },
                  { label: 'TOOLS', delay: d(0.4) },
                  { label: 'CERTIFICATES', delay: d(0.6) },
                  { label: 'PORTFOLIO', delay: d(0.8) }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: currentCue.highlightTarget === 'hesitations' ? '#FFF5DC' : '#FFFFFF'
                    }}
                    transition={{ duration: dur(0.3), delay: item.delay }}
                    className="text-[#2B1B14] text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow-xs border border-[#E1D5C5] tracking-wide"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Floating Hesitation / Rejection Speech Bubbles */}
              {/* Bubble 1: "Hmm..." */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: currentCue.highlightTarget === 'hesitations' ? [0, -3, 0] : 0
                }}
                transition={{ duration: dur(0.4), delay: d(0.4) }}
                className="absolute top-3 right-4 bg-[#FFFFFF]/95 text-[#2B1B14] text-xs font-semibold px-3 py-1 rounded-xl shadow-md border border-[#E1D5C5] z-10"
              >
                Hmm...
                <div className="absolute -bottom-1 left-3 w-2 h-2 bg-[#FFFFFF] rotate-45 border-r border-b border-[#E1D5C5]" />
              </motion.div>

              {/* Bubble 2: "Not interested" */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: currentCue.highlightTarget === 'hesitations' ? [0, -3, 0] : 0
                }}
                transition={{ duration: dur(0.4), delay: d(0.7) }}
                className="absolute top-12 right-2 bg-[#FFFFFF]/95 text-[#5C514B] text-xs font-semibold px-3 py-1 rounded-xl shadow-md border border-[#E1D5C5] z-10"
              >
                Not interested
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-[#FFFFFF] rotate-45 border-r border-b border-[#E1D5C5]" />
              </motion.div>

              {/* Bubble 3: "I can do that myself" */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: currentCue.highlightTarget === 'hesitations' ? [0, -3, 0] : 0
                }}
                transition={{ duration: dur(0.4), delay: d(1.0) }}
                className="absolute top-22 right-3 bg-[#FFFFFF]/95 text-[#211A17] text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-xl shadow-md border border-[#E1D5C5] z-10"
              >
                I can do that myself
                <div className="absolute -bottom-1 left-3 w-2 h-2 bg-[#FFFFFF] rotate-45 border-r border-b border-[#E1D5C5]" />
              </motion.div>
            </div>

            {/* Bottom Label Card for Scene 1 */}
            <div className={`mt-4 p-3.5 rounded-xl border text-left shadow-md transition-all duration-300 ${
              activeStep === 0
                ? 'bg-[#FFFFFF] border-[#C9A227] ring-1 ring-[#C9A227]'
                : 'bg-[#F8F4EC]/90 border-[#E1D5C5]'
            }`}>
              <span className="text-xs sm:text-sm font-extrabold text-[#2B1B14] block tracking-wide">
                SELLING THE SKILL
              </span>
              <p className="text-xs text-[#5C514B] font-medium mt-0.5">
                Focuses on what you do. Creates hesitation because the buyer hasn&apos;t connected it to their pain.
              </p>
            </div>
          </motion.div>


          {/* =========================================================
              THE TRANSITION ARROW & BRIDGE (Center - 2 Cols on Desktop)
          ========================================================= */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 lg:py-0 relative z-20">
            {/* Desktop Curved Gold Arrow */}
            <div className="hidden lg:flex flex-col items-center text-center">
              <motion.span
                animate={{
                  scale: currentCue.highlightTarget === 'arrow' || activeStep === 1 ? 1.1 : 1,
                  color: currentCue.highlightTarget === 'arrow' || activeStep === 1 ? '#FFF5DC' : '#DFB943'
                }}
                className="text-base font-bold text-[#DFB943] italic tracking-wide font-serif mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] cursor-pointer"
                onClick={() => handleStepClick(1)}
              >
                Shift your thinking
              </motion.span>

              {/* Animated Gold SVG Arrow Drawing Itself */}
              <svg
                viewBox="0 0 160 80"
                className="w-36 h-20 overflow-visible cursor-pointer"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleStepClick(1)}
              >
                <defs>
                  <linearGradient id="goldGradientArrow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9A227" />
                    <stop offset="50%" stopColor="#DFB943" />
                    <stop offset="100%" stopColor="#FFF1B8" />
                  </linearGradient>
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Sweeping curve path */}
                <motion.path
                  d="M 15 50 Q 80 5 145 42"
                  stroke="url(#goldGradientArrow)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#goldGlow)"
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0.2 }}
                  animate={{
                    pathLength: 1,
                    strokeWidth: currentCue.highlightTarget === 'arrow' || activeStep === 1 ? 6 : 5
                  }}
                  transition={{ duration: dur(1.2), ease: 'easeInOut' }}
                />

                {/* Arrowhead */}
                <motion.polygon
                  points="145,42 133,32 138,47"
                  fill="#FFF1B8"
                  filter="url(#goldGlow)"
                  animate={{
                    scale: currentCue.highlightTarget === 'arrow' || activeStep === 1 ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 1.2, repeat: currentCue.highlightTarget === 'arrow' ? Infinity : 0 }}
                />
              </svg>

              <div className="text-[10px] uppercase font-bold text-[#EFE6D6]/80 tracking-widest mt-1">
                SKILL → PROBLEM → SOLUTION
              </div>
            </div>

            {/* Mobile / Tablet Horizontal Transition Divider */}
            <div className="flex lg:hidden flex-col items-center justify-center my-2 text-center w-full">
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[#C9A227]/40" />
                <button
                  type="button"
                  onClick={() => handleStepClick(1)}
                  className="bg-[#2B1B14] border border-[#C9A227] px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#DFB943] italic font-serif">
                    Shift your thinking
                  </span>
                  <span className="text-xs text-[#DFB943]">↓</span>
                </button>
                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[#C9A227]/40" />
              </div>
            </div>
          </div>


          {/* =========================================================
              SCENE 2: SELLING THE PROBLEM SHE CAN SOLVE (Right - 5 Cols)
          ========================================================= */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: activeStep === 2 && isPlaying ? 1.01 : 1
            }}
            transition={{ duration: dur(0.5) }}
            className={`lg:col-span-5 relative rounded-2xl bg-[#1C110C]/90 p-4 sm:p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(201,162,39,0.15)] transition-all duration-300 ${
              activeStep === 2
                ? 'border-2 border-[#DFB943] shadow-[0_0_35px_rgba(223,185,67,0.3)] ring-1 ring-[#DFB943]'
                : 'border-2 border-[#C9A227]/80'
            }`}
          >
            {/* Header label for Scene 2 */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#DFB943] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E6F40]" />
                After: The High-Value Shift
              </span>
              <span className="text-[11px] font-semibold text-[#DFB943] bg-[#2B1B14] px-2 py-0.5 rounded border border-[#C9A227]/60">
                Focus: Outcome
              </span>
            </div>

            {/* Character & Environment Frame */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#120B07] border border-[#C9A227]/50 shadow-lg group">
              {/* Photo of same African woman smiling confidently in camel blazer typing on laptop */}
              <img
                src={womanSolutionImg}
                alt="African professional woman smiling confidently while communicating the problem she solves"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-all duration-500 ${
                  activeStep === 2 ? 'saturate-[1.08] brightness-[1.03]' : 'saturate-[1.0] brightness-[0.98]'
                }`}
              />

              {/* Warm glow gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/85 via-transparent to-[#1A0F0A]/30 pointer-events-none" />

              {/* Coffee Mug Branding Callout: "Solve Problems Create Opportunities" */}
              <div className="absolute bottom-3 right-3 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#2B1B14] text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md border border-[#E1D5C5] shadow-xs max-w-[105px] leading-tight text-center hidden sm:block">
                Solve Problems,
                <span className="block text-[#C9A227]">Create Opportunities</span>
              </div>

              {/* Problem-Focused Laptop Screen Message Overlay */}
              <motion.div
                animate={{
                  scale: currentCue.highlightTarget === 'laptop2' ? [1, 1.04, 1] : 1,
                  boxShadow: currentCue.highlightTarget === 'laptop2'
                    ? '0 0 25px rgba(223,185,67,0.6)'
                    : '0 10px 25px rgba(0,0,0,0.3)'
                }}
                transition={{ duration: 1.5, repeat: currentCue.highlightTarget === 'laptop2' ? Infinity : 0 }}
                className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-12 sm:max-w-[285px] bg-[#FFFFFF]/98 backdrop-blur-xs text-[#211A17] p-2.5 sm:p-3 rounded-xl border-2 border-[#C9A227] shadow-xl text-left z-10"
              >
                <span className="text-[9px] sm:text-[10px] uppercase font-extrabold text-[#8B3E1E] block tracking-wide">
                  Value-Driven Offer:
                </span>
                <p className="text-xs sm:text-[13px] font-bold text-[#2B1B14] leading-snug mt-0.5">
                  “I HELP SMALL BUSINESSES CREATE PROFESSIONAL SOCIAL MEDIA GRAPHICS.”
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1 bg-gradient-to-r from-[#DFB943] to-[#C9A227] text-[#2B1B14] text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow-2xs">
                  <span>LET&apos;S WORK TOGETHER</span>
                </div>
              </motion.div>

              {/* Positive Customer Response Bubbles with Realistic Headshot Avatars */}
              {/* Bubble 1: "This is exactly what I need!" */}
              <motion.div
                animate={{
                  scale: currentCue.highlightTarget === 'bubbles' ? [1, 1.08, 1] : 1,
                  y: currentCue.highlightTarget === 'bubbles' ? [0, -3, 0] : 0
                }}
                transition={{ duration: 1.2, delay: 0.1 }}
                className="absolute top-2 right-2 bg-[#FFFFFF] text-[#211A17] text-[11px] sm:text-xs font-bold pl-1.5 pr-3 py-1 rounded-full shadow-lg border border-[#DFB943] flex items-center gap-2 z-10"
              >
                <img
                  src={avatarWomanImg}
                  alt="Client avatar"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-[#DFB943]"
                />
                <span>This is exactly what I need!</span>
              </motion.div>

              {/* Bubble 2: "Can you help my business?" */}
              <motion.div
                animate={{
                  scale: currentCue.highlightTarget === 'bubbles' ? [1, 1.08, 1] : 1,
                  y: currentCue.highlightTarget === 'bubbles' ? [0, -3, 0] : 0
                }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute top-11 right-2 sm:right-3 bg-[#FFFFFF] text-[#211A17] text-[11px] sm:text-xs font-bold pl-1.5 pr-3 py-1 rounded-full shadow-lg border border-[#DFB943] flex items-center gap-2 z-10"
              >
                <img
                  src={avatarManImg}
                  alt="Client avatar"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-[#DFB943]"
                />
                <span>Can you help my business?</span>
              </motion.div>

              {/* Bubble 3: "Let's get started!" */}
              <motion.div
                animate={{
                  scale: currentCue.highlightTarget === 'bubbles' ? [1, 1.08, 1] : 1,
                  y: currentCue.highlightTarget === 'bubbles' ? [0, -3, 0] : 0
                }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="absolute top-20 right-2 sm:right-4 bg-[#FFFFFF] text-[#2E6F40] text-[11px] sm:text-xs font-extrabold pl-1.5 pr-3 py-1 rounded-full shadow-lg border border-[#2E6F40]/40 flex items-center gap-2 z-10"
              >
                <img
                  src={avatarWomanImg}
                  alt="Client avatar"
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-[#DFB943]"
                />
                <span>Let&apos;s get started!</span>
              </motion.div>
            </div>

            {/* Bottom Label Card for Scene 2 */}
            <div className={`mt-4 p-3.5 rounded-xl border-2 text-left shadow-md transition-all duration-300 ${
              activeStep === 2
                ? 'bg-[#FFFFFF] border-[#DFB943] ring-1 ring-[#DFB943]'
                : 'bg-[#FFFFFF]/90 border-[#C9A227]'
            }`}>
              <span className="text-xs sm:text-sm font-extrabold text-[#2B1B14] block tracking-wide">
                SELLING THE PROBLEM YOU CAN SOLVE
              </span>
              <p className="text-xs text-[#4A3026] font-semibold mt-0.5">
                Communicates immediate relief and business value. Makes saying “yes” an obvious decision.
              </p>
            </div>
          </motion.div>
        </div>

        {/* -------------------------------------------------------------
            BOTTOM CAROUSEL PAGINATION / STORY NAVIGATION CONTROLS
            Matching the bottom arrows (< >) & 3 dots in the reference!
        ------------------------------------------------------------- */}
        <div className="relative z-20 flex items-center justify-center gap-4 mt-6">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={activeStep === 0}
            aria-label="Previous story scene"
            className="w-8 h-8 rounded-full bg-[#2B1B14] border border-[#C9A227]/40 hover:border-[#DFB943] text-[#DFB943] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3 Step Dots */}
          <div className="flex items-center gap-2">
            {[
              { index: 0, label: 'Act 1: Selling The Skill' },
              { index: 1, label: 'Act 2: Shift Your Thinking' },
              { index: 2, label: 'Act 3: The Problem Solved' }
            ].map((item) => (
              <button
                key={item.index}
                type="button"
                onClick={() => handleStepClick(item.index)}
                title={item.label}
                aria-label={item.label}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeStep === item.index
                    ? 'w-6 h-2.5 bg-[#DFB943] shadow-[0_0_10px_rgba(223,185,67,0.7)]'
                    : 'w-2.5 h-2.5 bg-[#E1D5C5]/40 hover:bg-[#E1D5C5]/80'
                }`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNextStep}
            disabled={activeStep === 2}
            aria-label="Next story scene"
            className="w-8 h-8 rounded-full bg-[#2B1B14] border border-[#C9A227]/40 hover:border-[#DFB943] text-[#DFB943] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* -------------------------------------------------------------
            BOTTOM HERO CONCLUSION STATEMENT
            DON'T JUST SELL THE SKILL.
            SELL THE PROBLEM YOU CAN SOLVE.
        ------------------------------------------------------------- */}
        <motion.div
          animate={{
            scale: currentCue.highlightTarget === 'heroLaw' ? [1, 1.02, 1] : 1
          }}
          transition={{ duration: 1.8, repeat: currentCue.highlightTarget === 'heroLaw' ? Infinity : 0 }}
          className="relative z-10 mt-6 pt-6 border-t border-[#C9A227]/30 text-center"
        >
          <div className="max-w-3xl mx-auto space-y-1.5 px-2">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#F8F4EC] tracking-tight uppercase">
              DON&apos;T JUST SELL THE SKILL.
            </p>

            <motion.p
              animate={{
                textShadow: currentCue.highlightTarget === 'heroLaw'
                  ? '0 0 25px rgba(223,185,67,0.9), 0 0 45px rgba(223,185,67,0.4)'
                  : '0 0 15px rgba(223,185,67,0.4)'
              }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#DFB943] tracking-tight uppercase leading-tight"
            >
              SELL THE PROBLEM YOU CAN SOLVE.
            </motion.p>

            {/* Elegant curved gold underline flourish */}
            <div className="flex justify-center pt-1">
              <svg width="220" height="12" viewBox="0 0 220 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
                <path d="M 2 4 Q 110 12 218 4" stroke="#DFB943" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <p className="text-xs sm:text-sm text-[#EFE6D6]/85 font-medium pt-2 max-w-xl mx-auto">
              Clients do not pay for your tools, credentials, or software. They pay for the relief of having their specific problem solved.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
