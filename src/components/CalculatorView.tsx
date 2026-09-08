import React, { useState } from 'react';
import { SurvivalCalc } from '../types';
import { ArrowRight, Calculator, ShieldCheck, Sparkles } from 'lucide-react';

interface CalculatorViewProps {
  onContinue: (survivalData: SurvivalCalc | null) => void;
  initialData: SurvivalCalc | null;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({ onContinue, initialData }) => {
  const [currency, setCurrency] = useState(initialData?.currency || '₦');
  const [expenses, setExpenses] = useState<string>(initialData ? String(initialData.expenses) : '');
  const [savings, setSavings] = useState<string>(initialData ? String(initialData.savings) : '');
  const [calculatedMonths, setCalculatedMonths] = useState<number | null>(initialData?.months ?? null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const expNum = parseFloat(expenses);
    const savNum = parseFloat(savings);

    if (isNaN(expNum) || expNum <= 0) {
      setErrorMsg('Please enter a valid monthly expenses amount greater than 0.');
      return;
    }
    if (isNaN(savNum) || savNum < 0) {
      setErrorMsg('Please enter a valid savings amount (0 or more).');
      return;
    }

    setErrorMsg(null);
    const months = savNum / expNum;
    setCalculatedMonths(months);
  };

  const handleProceed = () => {
    if (calculatedMonths !== null && expenses && savings) {
      onContinue({
        currency,
        expenses: parseFloat(expenses),
        savings: parseFloat(savings),
        months: calculatedMonths
      });
    } else {
      onContinue(null);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-5 py-12 bg-[radial-gradient(600px_400px_at_50%_0%,rgba(0,163,255,0.08),transparent_70%)]">
      <div className="w-full max-w-[500px] text-center bg-white border border-[#E1E7F7] rounded-3xl p-7 sm:p-10 shadow-sm">
        <div className="inline-flex items-center gap-2 bg-[#F3F8FF] border border-[#E1E7F7] px-4 py-1.5 rounded-full text-xs font-bold text-[#03037E] mb-5">
          <Calculator className="w-3.5 h-3.5 text-[#00A3FF]" />
          <span>Optional · The Salary Safety Check</span>
        </div>

        <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#101040] leading-snug">
          Want an even more personalised result?
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-[#4A4C78] leading-relaxed">
          Tell us your approximate monthly essential expenses and current emergency savings, and we'll calculate how long your savings could support you.
        </p>

        <form onSubmit={handleCalculate} className="mt-6 flex flex-col gap-4 text-left">
          <div>
            <label className="block text-xs font-bold text-[#03037E] uppercase tracking-wider mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3.5 border-2 border-[#E1E7F7] rounded-xl text-sm font-medium text-[#101040] bg-white focus:outline-none focus:border-[#00A3FF]"
            >
              <option value="₦">NGN (₦ - Nigerian Naira)</option>
              <option value="$">USD ($ - US Dollar)</option>
              <option value="£">GBP (£ - British Pound)</option>
              <option value="€">EUR (€ - Euro)</option>
              <option value="GH₵">GHS (GH₵ - Ghanaian Cedi)</option>
              <option value="KSh">KES (KSh - Kenyan Shilling)</option>
              <option value="R">ZAR (R - South African Rand)</option>
              <option value="">Other Currency</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#03037E] uppercase tracking-wider mb-2">
              Approximate monthly essential expenses
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-sm font-bold text-[#8082AC]">
                {currency || '#'}
              </span>
              <input
                type="number"
                value={expenses}
                onChange={(e) => { setExpenses(e.target.value); setErrorMsg(null); }}
                placeholder="e.g. 250000"
                min="0"
                className="w-full pl-9 pr-4 py-3.5 border-2 border-[#E1E7F7] rounded-xl text-sm text-[#101040] bg-white focus:outline-none focus:border-[#00A3FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#03037E] uppercase tracking-wider mb-2">
              Current emergency savings available
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-sm font-bold text-[#8082AC]">
                {currency || '#'}
              </span>
              <input
                type="number"
                value={savings}
                onChange={(e) => { setSavings(e.target.value); setErrorMsg(null); }}
                placeholder="e.g. 100000"
                min="0"
                className="w-full pl-9 pr-4 py-3.5 border-2 border-[#E1E7F7] rounded-xl text-sm text-[#101040] bg-white focus:outline-none focus:border-[#00A3FF]"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="text-xs text-[#E0913A] font-medium bg-[#E0913A]/10 p-2.5 rounded-lg">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="mt-1 bg-[#03037E] hover:bg-[#020254] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.99]"
          >
            Calculate My Survival Capacity
          </button>
        </form>

        {calculatedMonths !== null && (
          <div className="mt-5 p-5 bg-[#F3F8FF] border border-[#E1E7F7] rounded-2xl animate-fade-in">
            <div className="text-xs font-bold uppercase tracking-wider text-[#03037E] mb-1">
              Your Financial Survival Capacity
            </div>
            <div className="text-3xl font-extrabold text-[#FFBE4D] my-1">
              {calculatedMonths < 0.1 ? '< 0.1' : calculatedMonths.toFixed(1)} months
            </div>
            <div className="text-xs text-[#4A4C78]">
              of essential expenses covered by your current liquid savings
            </div>
          </div>
        )}

        <div className="mt-5 text-[11px] text-[#8082AC] leading-relaxed">
          This is not financial advice. It's designed to help you understand your current financial safety position. The goal isn't to panic — it's to build options before you desperately need them.
        </div>

        <div className="mt-6 pt-5 border-t border-[#E1E7F7] flex flex-col items-center gap-3">
          {calculatedMonths !== null ? (
            <button
              type="button"
              onClick={handleProceed}
              className="flex items-center justify-center gap-2 bg-[#00A3FF] hover:bg-[#0092e6] text-white font-bold text-sm px-6 py-3.5 rounded-xl w-full shadow-md transition-all active:scale-[0.99]"
            >
              <span>See My Full Diagnostic Result</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onContinue(null)}
              className="text-xs sm:text-sm text-[#4A4C78] hover:text-[#03037E] underline underline-offset-4 transition-colors py-1"
            >
              Skip and see my result →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
