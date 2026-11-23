import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Stethoscope,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { doctorSpecialties } from '../data/healthData';

export const DoctorConsultModal = () => {
  const { isDoctorConsultOpen, setIsDoctorConsultOpen, showToast } = useStore();
  const [selectedSpecialty, setSelectedSpecialty] = useState('gp');
  const [patientConcern, setPatientConcern] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isDoctorConsultOpen) return null;

  const currentSpecialtyObj = doctorSpecialties.find((s) => s.id === selectedSpecialty) || doctorSpecialties[0];

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      showToast(`Consultation request submitted for ${currentSpecialtyObj.name} (${currentSpecialtyObj.fee})`, 'success');
      setIsDoctorConsultOpen(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 shadow-xl p-5 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={() => setIsDoctorConsultOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
            <Stethoscope size={16} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Doctor consultation
            </h2>
            <p className="text-xs text-slate-500">
              Verified registered medical practitioners • Prescription reviews
            </p>
          </div>
        </div>

        {/* Specialty Selection */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Select specialty & consultation fee
          </label>
          <div className="grid grid-cols-2 gap-2">
            {doctorSpecialties.map((spec) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`p-3 rounded-xl border text-left transition-colors ${
                  selectedSpecialty === spec.id
                    ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 font-medium'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="text-xs font-medium text-slate-900 dark:text-white">{spec.name}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-mono tabular-nums">
                  <span className="font-semibold text-teal-700 dark:text-teal-400">{spec.fee}</span>
                  <span className="flex items-center gap-0.5 text-slate-400"><Clock size={10} /> {spec.waitTime}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Patient Symptoms */}
        <div className="space-y-1.5 mb-5">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Symptoms or primary health concern (optional)
          </label>
          <textarea
            rows={3}
            value={patientConcern}
            onChange={(e) => setPatientConcern(e.target.value)}
            placeholder="e.g. Fever for two days, mild cough, prescription refill advice"
            className="w-full text-xs p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-400">Consultation fee</p>
            <p className="text-base font-semibold font-mono text-slate-900 dark:text-white tabular-nums">
              {currentSpecialtyObj.fee}
            </p>
          </div>

          <button
            type="button"
            disabled={isConnecting}
            onClick={handleConnect}
            className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <ShieldCheck size={14} />
            <span>{isConnecting ? 'Scheduling...' : `Book consultation (${currentSpecialtyObj.fee})`}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
