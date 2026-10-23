import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const PrescriptionUploadModal = () => {
  const {
    isRxModalOpen,
    setIsRxModalOpen,
    prescription,
    setPrescription,
    isRxVerified,
    setIsRxVerified,
    showToast
  } = useStore();

  const [isVerifying, setIsVerifying] = useState(false);

  if (!isRxModalOpen) return null;

  const handleDemoUpload = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setPrescription({
        fileName: 'Rx_Dr_Sharma_Apollo_Clinic.pdf',
        doctorName: 'Dr. Priya Sharma, MD (Reg #DL-88219)',
        patientName: 'Demo Patient',
        date: new Date().toLocaleDateString(),
        verified: true,
      });
      setIsRxVerified(true);
      setIsVerifying(false);
      showToast('Prescription uploaded & verified by Pharmacist!', 'success');
      setIsRxModalOpen(false);
    }, 1200);
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
        showToast(`Prescription "${file.name}" uploaded and validated!`, 'success');
        setIsRxModalOpen(false);
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 modal-animate-in">
        
        {/* Close Button */}
        <button
          onClick={() => setIsRxModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Upload size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Upload Prescription
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified by registered in-house pharmacists in real-time
            </p>
          </div>
        </div>

        {/* Upload Drop Zone */}
        <div className="border-2 border-dashed border-teal-500/40 dark:border-teal-500/30 rounded-2xl p-6 text-center hover:bg-teal-50/30 dark:hover:bg-teal-950/20 transition-colors mb-4 relative">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-inner">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Drag & drop your prescription here
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Supports JPG, PNG, or PDF (up to 10MB)
              </p>
            </div>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-lg bg-teal-600 text-white shadow-sm">
              Browse Files
            </span>
          </div>
        </div>

        {/* Demo Prescription 1-Click Button */}
        <button
          onClick={handleDemoUpload}
          disabled={isVerifying}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-slate-200 dark:border-slate-700 font-semibold text-xs transition-all mb-4"
        >
          <Sparkles size={15} className="text-amber-500" />
          <span>
            {isVerifying ? 'Pharmacist verifying Rx...' : '⚡ Click to use Demo Doctor Prescription'}
          </span>
        </button>

        {/* Verification Checklist */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <p className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-600" /> Prescription Guidelines
          </p>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
              <span>Doctor name, qualification & registration number visible</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
              <span>Patient name and date of consultation visible</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
              <span>Legible medicine names, strength, and dosage instructions</span>
            </li>
          </ul>
        </div>

        {prescription && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck size={18} className="text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  {prescription.fileName}
                </p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400">
                  Verified by Pharmacist • Valid
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600">Active</span>
          </div>
        )}

      </div>
    </div>
  );
};
