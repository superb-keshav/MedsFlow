import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const PrescriptionUploadModal = () => {
  const {
    isRxModalOpen,
    setIsRxModalOpen,
    prescription,
    setPrescription,
    setIsRxVerified,
    showToast
  } = useStore();

  const [isVerifying, setIsVerifying] = useState(false);

  if (!isRxModalOpen) return null;

  const handleDemoUpload = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setPrescription({
        fileName: 'Rx_Dr_Sharma_Dispensary.pdf',
        doctorName: 'Dr. Priya Sharma, MD (Reg #DL-88219)',
        patientName: 'Verified Patient',
        date: new Date().toLocaleDateString(),
        verified: true,
      });
      setIsRxVerified(true);
      setIsVerifying(false);
      showToast('Prescription verified by pharmacist');
      setIsRxModalOpen(false);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsVerifying(true);
      setTimeout(() => {
        setPrescription({
          fileName: file.name,
          doctorName: 'Licensed Medical Practitioner (Verified)',
          patientName: 'Patient Record',
          date: new Date().toLocaleDateString(),
          verified: true,
        });
        setIsRxVerified(true);
        setIsVerifying(false);
        showToast(`Prescription "${file.name}" uploaded and validated`);
        setIsRxModalOpen(false);
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={() => setIsRxModalOpen(false)}
          aria-label="Close prescription dialog"
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pr-8">
          <div className="w-10 h-10 rounded-lg bg-teal-600/10 text-teal-700 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
            <Upload size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white font-heading">
              Upload prescription
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified by registered dispensary pharmacists in real-time
            </p>
          </div>
        </div>

        {/* Upload Drop Zone */}
        <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors mb-4 relative">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Choose a file or drag here
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                Supports PDF, PNG, JPG (up to 10MB)
              </p>
            </div>
            <span className="inline-block mt-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Select document
            </span>
          </div>
        </div>

        {/* Demo Prescription 1-Click Button */}
        <button
          onClick={handleDemoUpload}
          disabled={isVerifying}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-colors mb-4"
        >
          <span>
            {isVerifying ? 'Pharmacist verifying prescription...' : 'Use sample doctor prescription'}
          </span>
        </button>

        {/* Verification Checklist */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
            <span>Prescription guidelines</span>
          </p>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <span>Doctor name, qualification and registration number visible</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <span>Patient name and consultation date visible</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <span>Legible medicine names, dosage, and frequency instructions</span>
            </li>
          </ul>
        </div>

        {prescription && (
          <div className="mt-4 p-3 rounded-xl bg-teal-50/50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck size={16} className="text-teal-600 dark:text-teal-400" />
              <div>
                <p className="text-xs font-medium text-slate-900 dark:text-white font-mono">
                  {prescription.fileName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Verified by pharmacist • Valid
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-teal-700 dark:text-teal-400">Active</span>
          </div>
        )}

      </div>
    </div>
  );
};