import React, { useState } from 'react';
import { ScreenType, CategoryId, SurvivalCalc, LeadData } from './types';
import { QUESTIONS, RESULT_CATEGORIES } from './data/scorecardData';
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
  const [leadData, setLeadData] = useState<LeadData>({ firstName: '', email: '', whatsapp: '' });

  // Calculated Results state
  const [totalScore, setTotalScore] = useState(0);
  const [categoryPercentages, setCategoryPercentages] = useState<Record<CategoryId, number>>({
    dependency: 0,
    safety: 0,
    skill: 0,
    execution: 0
  });
  const [bottleneckCategory, setBottleneckCategory] = useState<CategoryId>('dependency');
  const [resultKey, setResultKey] = useState('survivor');

  // Question navigation handlers
  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(nextAnswers);
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

    // Compute score according to exact formula
    const catSums: Record<CategoryId, number> = {
      dependency: 0,
      safety: 0,
      skill: 0,
      execution: 0
    };

    QUESTIONS.forEach((q, idx) => {
      const val = answers[idx] ?? 1;
      catSums[q.cat] += val;
    });

    const percentages: Record<CategoryId, number> = {
      dependency: Math.round((catSums.dependency / 20) * 100),
      safety: Math.round((catSums.safety / 20) * 100),
      skill: Math.round((catSums.skill / 20) * 100),
      execution: Math.round((catSums.execution / 20) * 100)
    };

    const points25 = {
      dependency: (catSums.dependency / 20) * 25,
      safety: (catSums.safety / 20) * 25,
      skill: (catSums.skill / 20) * 25,
      execution: (catSums.execution / 20) * 25
    };

    const calculatedTotal = Math.round(
      points25.dependency + points25.safety + points25.skill + points25.execution
    );

    // Lowest category is the bottleneck
    const cats: CategoryId[] = ['dependency', 'safety', 'skill', 'execution'];
    const bottleneck = cats.reduce((lowest, current) => 
      catSums[current] <= catSums[lowest] ? current : lowest
    , 'dependency' as CategoryId);

    // Find result category profile
    let determinedKey = 'survivor';
    Object.keys(RESULT_CATEGORIES).forEach((key) => {
      const r = RESULT_CATEGORIES[key];
      if (calculatedTotal >= r.min && calculatedTotal <= r.max) {
        determinedKey = key;
      }
    });

    setTotalScore(calculatedTotal);
    setCategoryPercentages(percentages);
    setBottleneckCategory(bottleneck);
    setResultKey(determinedKey);

    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  // Retake flow
  const handleRetake = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQuestionIndex(0);
    setSurvivalData(null);
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

        {currentScreen === 'results' && (
          <ResultsView
            totalScore={totalScore}
            categoryPercentages={categoryPercentages}
            bottleneckCategory={bottleneckCategory}
            resultKey={resultKey}
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
