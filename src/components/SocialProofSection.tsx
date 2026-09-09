import React from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import avatarWomanImg from '../assets/images/client_avatar_woman_1788954087657.jpg';
import avatarManImg from '../assets/images/client_avatar_man_1788954103504.jpg';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  profileFound: string;
  quote: string;
  avatar: string;
  highlight: string;
}

export const SocialProofSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Emeka O.',
      role: 'Senior Financial Analyst',
      location: 'Lagos, Nigeria',
      profileFound: 'The Ready But Stuck',
      highlight: 'From chasing crypto to packaging my Excel & reporting skills',
      quote:
        'I spent three years convinced that creating a second income meant learning crypto or dropshipping. The Scorecard revealed my actual bottleneck: I already had high-value corporate financial modelling skills, but I had never packaged them into a solution. I now run monthly reporting retainers for 2 SME founders on weekends—without touching my 9-to-5.',
      avatar: avatarManImg,
    },
    {
      name: 'Amina K.',
      role: 'HR & Operations Lead',
      location: 'Nairobi, Kenya',
      profileFound: 'The Income Explorer',
      highlight: 'Realized I had only 45 days of runway if my salary stopped',
      quote:
        'The question about how long I could survive without borrowing money gave me chills. I was living well, but on a knife’s edge. Taking this assessment stopped me from buying another generic $300 course. It gave me a clear 4-step sequence to focus on building an emergency safety cushion first, then monetizing my onboarding workflows.',
      avatar: avatarWomanImg,
    },
    {
      name: 'Kwame A.',
      role: 'Corporate Training Consultant',
      location: 'Accra, Ghana',
      profileFound: 'The Salary Survivor → Builder',
      highlight: 'Keep the job as your bedrock; build options from strength',
      quote:
        'Online gurus preach "quit your job and jump off the cliff." Beyond Salary is the only community that respects the dignity of employment while showing you how to engineer options so you never have to negotiate from a position of fear. The 5-minute diagnostic gave me ruthless clarity.',
      avatar: avatarManImg,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[#E1D5C5]">
      <div className="max-w-[1080px] mx-auto px-5">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#EFE6D6] px-3.5 py-1.5 rounded-full mb-3 border border-[#E1D5C5]">
            <CheckCircle className="w-3.5 h-3.5 text-[#C9A227]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B1B14]">
              Voices of African Professionals
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1B14] leading-tight">
            WHAT HAPPENS WHEN YOU STOP GUESSING AND GET CLARITY
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#5C514B] font-medium max-w-xl mx-auto">
            Real working professionals who moved from single-salary anxiety to structured, dignified options.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-[#F8F4EC] border border-[#E1D5C5] shadow-xs hover:border-[#C9A227] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Profile Badge & Quote Icon */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E1D5C5] mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2B1B14] bg-[#EFE6D6] px-2.5 py-1 rounded-md border border-[#E1D5C5]">
                    Profile: {t.profileFound}
                  </span>
                  <div className="flex text-[#C9A227]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227]" />
                    ))}
                  </div>
                </div>

                {/* Core Takeaway Highlight */}
                <p className="text-sm sm:text-base font-bold text-[#2B1B14] mb-3 leading-snug">
                  "{t.highlight}"
                </p>

                {/* Testimonial Body */}
                <p className="text-xs sm:text-sm text-[#5C514B] leading-relaxed font-medium">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 mt-5 border-t border-[#E1D5C5] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#C9A227]"
                />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#2B1B14]">
                    {t.name}
                  </h3>
                  <p className="text-[11px] text-[#5C514B]">
                    {t.role} • {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stat Summary */}
        <div className="mt-10 p-5 rounded-2xl bg-[#2B1B14] text-[#F8F4EC] flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left border border-[#4A3026]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D251A] border border-[#C9A227]/40 flex items-center justify-center font-bold text-[#C9A227] text-lg">
              20
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-[#DFB943]">
                Targeted Questions
              </p>
              <p className="text-xs text-[#E1D5C5]">
                Zero fluff, 100% focused on income reality
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-[1px] h-8 bg-[#4A3026]" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D251A] border border-[#C9A227]/40 flex items-center justify-center font-bold text-[#C9A227] text-lg">
              4
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-[#DFB943]">
                Core Diagnostic Pillars
              </p>
              <p className="text-xs text-[#E1D5C5]">
                Dependency, Safety Runway, Skill, Execution
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-[1px] h-8 bg-[#4A3026]" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D251A] border border-[#C9A227]/40 flex items-center justify-center font-bold text-[#C9A227] text-lg">
              5
            </div>
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-[#DFB943]">
                Minutes Required
              </p>
              <p className="text-xs text-[#E1D5C5]">
                Fast, actionable insights delivered instantly
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
