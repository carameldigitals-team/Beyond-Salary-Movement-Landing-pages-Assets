import React, { useState } from 'react';
import { Play } from 'lucide-react';

export const MonetizationLawVisual: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [thumbSrc, setThumbSrc] = useState<string>(
    'https://img.youtube.com/vi/kZPL8upk9Uk/sddefault.jpg'
  );

  const videoId = 'kZPL8upk9Uk';
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <section
      className="mt-8 mb-10 w-full"
      id="fundamental-law-of-monetization"
      aria-label="The Fundamental Law of Monetization Lesson"
    >
      {/* Premium Beyond Salary Movement Video Frame */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#2B1B14] via-[#21140E] to-[#170C08] border border-[#C9A227]/40 shadow-[0_20px_50px_-15px_rgba(43,27,20,0.6)] p-5 sm:p-8 lg:p-10 text-[#F8F4EC] font-['Montserrat',sans-serif]">
        {/* Subtle Ambient Gold Lighting */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#DFB943]/8 rounded-full blur-3xl pointer-events-none" />

        {/* -------------------------------------------------------------
            SECTION INTRODUCTION (Above Video)
        ------------------------------------------------------------- */}
        <div className="relative z-10 text-center max-w-2xl mx-auto pb-6 sm:pb-8 border-b border-[#C9A227]/20">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#DFB943] block">
            A QUICK BEYOND SALARY LESSON
          </span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#F8F4EC] mt-1.5 uppercase">
            THE FUNDAMENTAL LAW OF MONETIZATION
          </h3>
          <p className="text-sm sm:text-base text-[#EFE6D6]/90 font-medium mt-2 leading-relaxed">
            Don’t just sell the skill. Sell the problem you can solve.
          </p>
        </div>

        {/* -------------------------------------------------------------
            VIDEO EMBED CONTAINER (16:9 Aspect Ratio)
        ------------------------------------------------------------- */}
        <div className="relative z-10 mt-6 sm:mt-8 max-w-4xl mx-auto">
          <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#120B07] border border-[#4A3026] shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
            {isPlaying ? (
              <iframe
                src={embedUrl}
                title="The Fundamental Law of Monetization — Beyond Salary Movement"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full">
                {/* Video Thumbnail */}
                <img
                  src={thumbSrc}
                  alt="The Fundamental Law of Monetization video thumbnail"
                  onError={() => {
                    // Graceful fallback to hqdefault
                    setThumbSrc('https://img.youtube.com/vi/kZPL8upk9Uk/hqdefault.jpg');
                  }}
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-[1.05]"
                  loading="lazy"
                />

                {/* Subtle dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#170C08]/80 via-[#170C08]/30 to-transparent" />

                {/* Custom Play Experience Button */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play video: The Fundamental Law of Monetization — Watch the 60-second lesson"
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#DFB943]"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#DFB943]/80 bg-[#2B1B14]/80 backdrop-blur-xs flex items-center justify-center text-[#F8F4EC] shadow-[0_0_30px_rgba(201,162,39,0.35)] transition-transform duration-300 hover:scale-[1.02] active:scale-95">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#F8F4EC] text-[#F8F4EC] ml-1 transition-transform" />
                  </div>
                  <span className="mt-3 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#DFB943] drop-shadow-md">
                    WATCH THE 60-SECOND LESSON
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------
            VIDEO INFORMATION BELOW
        ------------------------------------------------------------- */}
        <div className="relative z-10 mt-6 sm:mt-8 pt-6 border-t border-[#C9A227]/20 text-center max-w-2xl mx-auto">
          <p className="text-sm sm:text-base text-[#EFE6D6]/90 italic font-medium leading-relaxed">
            “You may already have a valuable skill. The question is whether you know how to position it around a problem people need solved.”
          </p>

          <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent mt-4 mb-3" />

          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#DFB943] block">
            WATCH → UNDERSTAND → APPLY
          </span>
        </div>
      </div>
    </section>
  );
};
