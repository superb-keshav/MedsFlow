import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Stethoscope,
  PhoneCall,
  MessageCircle,
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

  const handleConnect = (type) => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      showToast(`Booking consultation with ${currentSpecialtyObj.name} (Fee: ${currentSpecialtyObj.fee})...`, 'success');
      setIsDoctorConsultOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 modal-animate-in">
        
        {/* Close Button */}
        <button
          onClick={() => setIsDoctorConsultOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Doctor Banner Graphic */}
        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src="/images/doctor-consult.jpg"
            alt="Verified medical doctors"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-teal-500 text-slate-950 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <ShieldCheck size={11} /> Verified Medical Practitioners
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                Doctor Consultation & Prescription Care
              </h2>
              <p className="text-xs text-slate-200">
                Get medical advice, disease management, and dosage advice from verified specialists
              </p>
            </div>
          </div>
        </div>

        {/* Specialty Selection with Fees */}
        <div className="space-y-3 mb-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Select Doctor Specialty & Fee:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {doctorSpecialties.map((spec) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedSpecialty === spec.id
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50 text-teal-900 dark:text-teal-200 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                }`}
              >
                <p className="text-xs font-bold">{spec.name}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span className="text-teal-700 dark:text-teal-300 font-black">Fee: {spec.fee}</span>
                  <span className="flex items-center gap-0.5"><Clock size={10} /> {spec.waitTime}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Symptoms / Note */}
        <div className="space-y-1.5 mb-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Describe Your Symptoms (Optional):
          </label>
          <input
            type="text"
            value={patientConcern}
            onChange={(e) => setPatientConcern(e.target.value)}
            placeholder="e.g. Fever, headache, stomach acidity..."
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        {/* Connect Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleConnect('call')}
            disabled={isConnecting}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <PhoneCall size={15} />
            <span>{isConnecting ? 'Booking...' : `Consult Doctor (${currentSpecialtyObj.fee})`}</span>
          </button>

          <button
            onClick={() => handleConnect('chat')}
            disabled={isConnecting}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <MessageCircle size={15} />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
