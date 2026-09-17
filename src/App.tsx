import React, { useState, useEffect } from 'react';
import { ScreenType, SurvivalCalc, LeadData, AssessmentResult } from './types';
import { QUESTIONS } from './data/scorecardData';
import { generateAssessmentResult } from './utils/scoringEngine';
import { trackEvent } from './utils/analytics';
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { WelcomeView } from './components/WelcomeView';
import { AssessmentView } from './components/AssessmentView';
import { CalculatorView } from './components/CalculatorView';
import { CalculatingView } from './components/CalculatingView';
import { LeadCaptureView } from './components/LeadCaptureView';
import { ResultsView } from './components/ResultsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [survivalData, setSurvivalData] = useState<SurvivalCalc | null>(null);
  const [leadData, setLeadData] = useState<LeadData>({ fullName: '', firstName: '', email: '', whatsapp: '' });
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Question navigation handlers
  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(nextAnswers);

    trackEvent('question_answered', {
      questionNumber: currentQuestionIndex + 1,
      optionIndex
    });
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === null) return;

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all 20 questions, go to optional calculator
      setCurrentScreen('calculator');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculator continuation
  const handleCalculatorContinue = (calculated: SurvivalCalc | null) => {
    if (calculated) {
      setSurvivalData(calculated);
    }
    setCurrentScreen('calculating');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Calculating completion -> lead gate
  const handleCalculatingComplete = () => {
    setCurrentScreen('lead');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Lead submission -> Calculate scores and show results
  const handleLeadSubmit = (lead: LeadData) => {
    setLeadData(lead);

    // Compute diagnostic result using the 4-profile routing engine
    const computed = generateAssessmentResult(answers);

    // Attach UTM and marketing attribution if present in URL
    let source = 'direct';
    let campaign: string | undefined;
    let referrer: string | undefined;

    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        source = urlParams.get('utm_source') || urlParams.get('source') || 'direct';
        campaign = urlParams.get('utm_campaign') || undefined;
        referrer = document.referrer || undefined;
      }
    } catch {
      // Ignore URL parsing failure
    }

    const fullResult: AssessmentResult = {
      ...computed,
      source,
      campaign,
      referrer
    };

    setAssessmentResult(fullResult);

    // Persist structured lead & diagnostic payload for automation/CRM integration
    try {
      const storedPayload = {
        name: lead.fullName,
        email: lead.email,
        whatsapp: lead.whatsapp,
        assessmentId: fullResult.assessmentId,
        completedAt: fullResult.completedAt,
        scores: fullResult.scores,
        normalizedScores: fullResult.normalizedScores,
        profile: fullResult.profile,
        primaryBottleneck: fullResult.primaryBottleneck,
        leadTemperature: fullResult.leadTemperature,
        recommendedOffer: fullResult.recommendedOffer,
        source: fullResult.source,
        campaign: fullResult.campaign,
        referrer: fullResult.referrer
      };
      localStorage.setItem('cda_last_lead_assessment', JSON.stringify(storedPayload));
    } catch {
      // Ignore localStorage issues
    }

    trackEvent('assessment_completed', {
      assessmentId: fullResult.assessmentId,
      profile: fullResult.profile,
      offer: fullResult.recommendedOffer,
      temperature: fullResult.leadTemperature,
      bottleneck: fullResult.primaryBottleneck
    });

    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Retake flow
  const handleRetake = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQuestionIndex(0);
    setSurvivalData(null);
    setAssessmentResult(null);
    setCurrentScreen('welcome');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#211A17] selection:bg-[#C9A227]/30 selection:text-[#2B1B14]">
      {/* Persistent Nav on Landing, Results, and Welcome screens */}
      {['landing', 'welcome', 'results'].includes(currentScreen) && (
        <HeaderNav
          onStartScorecard={() => {
            if (currentScreen === 'results') {
              handleRetake();
            } else {
              trackEvent('assessment_started');
              setCurrentScreen('welcome');
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }
          }}
          showCta={currentScreen === 'landing'}
        />
      )}

      {/* Screen Routing */}
      <main className="flex-1 w-full">
        {currentScreen === 'landing' && (
          <LandingView
            onStart={() => {
              trackEvent('assessment_started');
              setCurrentScreen('welcome');
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }}
          />
        )}

        {currentScreen === 'welcome' && (
          <WelcomeView
            onStart={() => {
              setCurrentScreen('assessment');
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }}
            onBackToHome={() => {
              setCurrentScreen('landing');
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }}
          />
        )}

        {currentScreen === 'assessment' && (
          <AssessmentView
            questions={QUESTIONS}
            currentIndex={currentQuestionIndex}
            answers={answers}
            onSelectOption={handleSelectOption}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
          />
        )}

        {currentScreen === 'calculator' && (
          <CalculatorView
            initialData={survivalData}
            onContinue={handleCalculatorContinue}
          />
        )}

        {currentScreen === 'calculating' && (
          <CalculatingView onComplete={handleCalculatingComplete} />
        )}

        {currentScreen === 'lead' && (
          <LeadCaptureView
            initialLead={leadData}
            onSubmit={handleLeadSubmit}
          />
        )}

        {currentScreen === 'results' && assessmentResult && (
          <ResultsView
            assessmentResult={assessmentResult}
            leadData={leadData}
            survivalData={survivalData}
            onRetake={handleRetake}
          />
        )}
      </main>

      {/* Persistent Footer on Landing and Results */}
      {['landing', 'results'].includes(currentScreen) && <Footer />}
    </div>
  );
}
