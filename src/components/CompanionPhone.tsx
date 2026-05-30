import React, { useState } from "react";
import { 
  Smartphone, Bell, Check, Plus, Settings, Sliders, RefreshCw 
} from "lucide-react";
import { HabitItem } from "../types";

interface CompanionPhoneProps {
  habits: HabitItem[];
  addHabit: (name: string, nameArabic: string, category: "Spiritual" | "Mind" | "Family" | "Dhikr") => void;
  onSetOverlayText: (text: string) => void;
  selectedCalculationMethod: string;
  setSelectedCalculationMethod: (method: string) => void;
}

export default function CompanionPhone({
  habits,
  addHabit,
  onSetOverlayText,
  selectedCalculationMethod,
  setSelectedCalculationMethod
}: CompanionPhoneProps) {
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitArabic, setNewHabitArabic] = useState("");
  const [newHabitCategory, setNewHabitCategory] = useState<"Spiritual" | "Mind" | "Family" | "Dhikr">("Spiritual");
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  
  const [settingsToggles, setSettingsToggles] = useState({
    pRAYER_CHIMES: true,
    hABIT_STREAKS: true,
    fAMILY_ANNOUNCEMENTS: false
  });

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    // Default Arabic translation if not entered
    const arabic = newHabitArabic.trim() || "عادة جديدة";
    addHabit(newHabitName.trim(), arabic, newHabitCategory);
    
    // Clear inputs
    setNewHabitName("");
    setNewHabitArabic("");
    
    // Trigger sync animation feedback
    triggerSyncFeedback("Habit Synced!");
  };

  const triggerSyncFeedback = (alertText: string) => {
    setShowSyncSuccess(true);
    onSetOverlayText(alertText);
    setTimeout(() => {
      setShowSyncSuccess(false);
      onSetOverlayText("Synced With Companion");
    }, 2800);
  };

  const toggleSetting = (key: keyof typeof settingsToggles) => {
    const updated = { ...settingsToggles, [key]: !settingsToggles[key] };
    setSettingsToggles(updated);
    triggerSyncFeedback("Syncing Config...");
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCalculationMethod(val);
    triggerSyncFeedback(`${val.split(" ")[0]} Loaded`);
  };

  return (
    <div id="companion-phone-frame" className="w-full max-w-[320px] mx-auto">
      
      {/* Smartphone Outer Chassis Shell */}
      <div className="relative w-full aspect-[9/19] rounded-[48px] bg-[#1A1A1A] p-3.5 shadow-2xl border-2 border-stone-800">
        
        {/* Sleek speaker ear slot + selfie camera dot */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#1A1A1A] rounded-b-2xl z-30 flex justify-center items-center gap-1.5">
          <div className="w-10 h-1 bg-stone-850 rounded-full"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800"></div>
        </div>

        {/* Home dynamic volume sliders dummy indicators on side */}
        <div className="absolute -left-1.5 top-24 w-1.5 h-12 bg-stone-850 rounded-r-xs"></div>
        <div className="absolute -left-1.5 top-40 w-1.5 h-16 bg-stone-850 rounded-r-xs"></div>
        <div className="absolute -right-1.5 top-32 w-1.5 h-20 bg-stone-850 rounded-l-xs"></div>

        {/* Phone screen UI area */}
        <div className="w-full h-full rounded-[38px] bg-white overflow-hidden flex flex-col justify-between p-5 pt-8 select-none relative font-sans">
          
          {/* Status bar top */}
          <div className="flex justify-between items-center text-[10px] font-bold text-stone-900/80 mb-2 px-1">
            <span>18:42</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px]">5G</span>
              <div className="w-4 h-2 bg-stone-950 rounded-xs"></div>
            </div>
          </div>

          {/* Phone Content Header */}
          <div className="border-b border-stone-100 pb-3 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-mono tracking-wider text-stone-400 font-bold uppercase">ILHAM OS</p>
                <h4 className="text-md font-bold text-[#1A1A1A]">Tarbiyah Hub</h4>
              </div>
              <Settings size={15} className="text-stone-400" />
            </div>
            
            {showSyncSuccess && (
              <div className="absolute top-12 left-6 right-6 bg-[#B8976A]/95 text-white py-1.5 px-3 rounded-full text-[10px] font-medium flex items-center justify-between shadow-md z-30 animate-bounce">
                <span className="flex items-center gap-1">
                  <RefreshCw size={10} className="animate-spin" />
                  Remote synchronized!
                </span>
                <span className="font-bold">LIVE</span>
              </div>
            )}
          </div>

          {/* MAIN FORM OPTIONS */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none" style={{ maxHeight: "310px" }}>
            
            {/* 1. Sync Calculation Method */}
            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Prayer Calculation Method
              </label>
              <select
                value={selectedCalculationMethod}
                onChange={handleMethodChange}
                className="w-full bg-white border border-stone-200/60 rounded-lg text-xs p-1.5 font-medium text-stone-700 outline-hidden focus:border-[#B8976A]"
              >
                <option value="ISNA (North America)">ISNA (North America)</option>
                <option value="Umm Al-Qura (Makkah)">Umm Al-Qura (Makkah)</option>
                <option value="Muslim World League">Muslim World League</option>
                <option value="London Unified (UK)">London Unified (UK)</option>
                <option value="Karachi (Pakistan)">Karachi (Pakistan)</option>
              </select>
            </div>

            {/* 2. Interactive Add Habit Form */}
            <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E0D4]/75">
              <span className="text-[10px] font-bold text-[#B8976A] uppercase tracking-wider block mb-2">
                Push New Family Habit
              </span>
              
              <form onSubmit={handleCreateHabit} className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Habit in English (e.g., Morning Adhkar)"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="w-full bg-white border border-stone-205 rounded-lg text-[11px] p-1.5 text-stone-850 placeholder-stone-405 focus:outline-hidden focus:border-[#B8976A]"
                />
                
                <input
                  type="text"
                  placeholder="Arabic (e.g., أذكار الصباح)"
                  value={newHabitArabic}
                  onChange={(e) => setNewHabitArabic(e.target.value)}
                  className="w-full bg-white border border-stone-205 rounded-lg text-[11px] p-1.5 text-right font-arabic placeholder-stone-405 focus:outline-[#B8976A]"
                />

                <div className="grid grid-cols-2 gap-1.5 py-1">
                  {["Spiritual", "Family"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewHabitCategory(cat as any)}
                      className={`text-[9px] py-1 px-1.5 rounded-md border text-center font-semibold cursor-pointer ${
                        newHabitCategory === cat
                          ? "bg-[#B8976A] text-white border-[#B8976A]"
                          : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] hover:bg-[#B8976A] text-white hover:text-stone-900 transition-luxury py-1.5 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus size={11} />
                  Add Habit & Sync
                </button>
              </form>
            </div>

            {/* 3. Toggle Control Settings */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Feature Enablers
              </span>
              
              <div className="space-y-1 bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
                
                <div className="flex items-center justify-between text-[11px] py-1 border-b border-stone-100">
                  <span className="text-stone-700 font-semibold">Gentle Prayer Chimes</span>
                  <input
                    type="checkbox"
                    checked={settingsToggles.pRAYER_CHIMES}
                    onChange={() => toggleSetting("pRAYER_CHIMES")}
                    className="accent-[#B8976A] h-3 w-3 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] py-1 border-b border-stone-100">
                  <span className="text-stone-700 font-semibold">Streaks Visual Ring</span>
                  <input
                    type="checkbox"
                    checked={settingsToggles.hABIT_STREAKS}
                    onChange={() => toggleSetting("hABIT_STREAKS")}
                    className="accent-[#B8976A] h-3 w-3 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] py-1">
                  <span className="text-stone-700 font-semibold">Share Announcements</span>
                  <input
                    type="checkbox"
                    checked={settingsToggles.fAMILY_ANNOUNCEMENTS}
                    onChange={() => toggleSetting("fAMILY_ANNOUNCEMENTS")}
                    className="accent-[#B8976A] h-3 w-3 cursor-pointer"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Connected state bottom notification bar */}
          <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-stone-400">STATUS</span>
            <span className="text-[10px] font-semibold text-[#B8976A] uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
              Synchronized
            </span>
          </div>

        </div>

      </div>

      {/* Helpful Interactive Instructions under Phone */}
      <p className="text-xs text-stone-400 mt-4 text-center font-medium font-mono flex items-center gap-1.5 justify-center">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-300"></span>
        Add habits or toggle options here to trigger remote synchronization.
      </p>

    </div>
  );
}
