import React, { useState } from "react";
import { Check, Clock, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { PrayerTime, HabitItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveDeviceProps {
  activeFinish: {
    id: string;
    name: string;
    hex: string;
    accentHex: string;
    imageStyle: string;
  };
  prayerTimes: PrayerTime[];
  setPrayerTimes?: React.Dispatch<React.SetStateAction<PrayerTime[]>>;
  habits: HabitItem[];
  toggleHabit: (id: string) => void;
  customOverlayText?: string;
}

export default function InteractiveDevice({
  activeFinish,
  prayerTimes,
  habits,
  toggleHabit,
  customOverlayText
}: InteractiveDeviceProps) {
  const [deviceTab, setDeviceTab] = useState<"prayer" | "habits" | "board">("prayer");
  const [localPrayers, setLocalPrayers] = useState<PrayerTime[]>(prayerTimes);
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerTime | null>(prayerTimes.find(p => p.status === "active") || prayerTimes[3]);

  // Handle local prayer clicking to simulate high-fidelity screen interaction
  const handlePrayerSelect = (p: PrayerTime) => {
    setSelectedPrayer(p);
    setLocalPrayers(prev =>
      prev.map(item => ({
        ...item,
        status: item.name === p.name ? "active" : "past"
      }))
    );
  };

  // Get screen-glow backgrounds corresponding to selected active prayer
  const getScreenBg = () => {
    if (!selectedPrayer) return "bg-[#FAF7F2]";
    switch (selectedPrayer.name) {
      case "Fajr":
        return "bg-gradient-to-b from-[#F2EDDF] via-[#FDFBF7] to-[#FAF8F5]";
      case "Dhuhr":
        return "bg-gradient-to-b from-[#FFFDF7] via-[#FAF8F5] to-[#F1EDE4]";
      case "Asr":
        return "bg-gradient-to-b from-[#F8F2E4] via-[#FAF8F5] to-[#EBE4D5]";
      case "Maghrib":
        return "bg-gradient-to-b from-[#F3E7D3] via-[#FAF8F5] to-[#E9DFCE]";
      case "Isha":
        return "bg-gradient-to-b from-[#E7E2D8] via-[#FAF8F5] to-[#DDD7CC]";
      default:
        return "bg-[#FAF8F5]";
    }
  };

  return (
    <div id="interactive-device-wrapper" className="w-full max-w-lg mx-auto flex flex-col items-center">
      
      {/* Physical Device Frame Chassis Container */}
      <div
        id="tarbiyah-device-frame"
        className={`relative w-full aspect-4/3 rounded-3xl p-6 transition-luxury shadow-2xl border-4 ${
          activeFinish.id === "walnut"
            ? "border-[#4A321A] bg-radial from-[#5A3F24] to-[#36210E]"
            : activeFinish.id === "oak"
            ? "border-[#CDBDA3] bg-radial from-[#DEC8A9] to-[#AB9578]"
            : "border-[#D1C9BE] bg-radial from-[#EBE4D7] to-[#BDB4A5]"
        }`}
        style={{
          boxShadow: "0 25px 60px -15px rgba(26, 26, 26, 0.25), inset 0 2px 8px rgba(255, 255, 255, 0.4)"
        }}
      >
        
        {/* Subtle wood or stone textural grain glare layering */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 bg-linear-to-tr from-transparent via-stone-500/10 to-transparent mix-blend-overlay"></div>

        {/* Outer Bezel Inset Chime Port and Ambient Sensor dots */}
        <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 flex gap-1.5 justify-center items-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-900/30"></div>
          <div className="w-1 h-1 rounded-full bg-stone-900/20"></div>
        </div>

        {/* E-Paper Digital Screen Canvas */}
        <div
          id="device-screen"
          className={`w-full h-full rounded-xl p-6 relative overflow-hidden transition-all duration-700 ease-in-out flex flex-col justify-between paper-glow ${getScreenBg()}`}
        >
          {/* E-paper fine particle pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>

          {/* Screen Header Grid */}
          <div className="flex items-center justify-between z-10 border-b border-stone-200/40 pb-3">
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#B8976A]" />
              <span className="font-mono text-[10px] tracking-widest text-[#3D3D3D] uppercase font-bold">
                Tarbiyah Display
              </span>
            </div>
            
            {/* Display status or custom override text */}
            <div className="text-right">
              <span className="font-sans text-[11px] font-medium text-[#3D3D3D] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8976A] animate-pulse"></span>
                {customOverlayText || "Home Connected"}
              </span>
            </div>
          </div>

          {/* MAIN SCREEN VIEWS CONTENT AREA */}
          <div className="flex-1 my-4 flex flex-col justify-center z-10 relative">
            <AnimatePresence mode="wait">
              
              {/* 1. Prayer Times View */}
              {deviceTab === "prayer" && (
                <motion.div
                  key="prayer-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Large visual active showcase praying header */}
                  {selectedPrayer && (
                    <div className="text-center mb-1">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#3D3D3D]/65 font-bold">
                        Upcoming Reflection
                      </p>
                      <h3 className="font-arabic text-3xl font-semibold text-[#1A1A1A] mt-0.5 tracking-wide">
                        {selectedPrayer.nameArabic} — {selectedPrayer.name}
                      </h3>
                      <p className="text-[11px] text-[#3D3D3D] max-w-sm mx-auto font-medium italic mt-1 font-sans">
                        "{selectedPrayer.quote}"
                      </p>
                    </div>
                  )}

                  {/* Horizontal grid list representing daily prayers */}
                  <div className="grid grid-cols-5 gap-1.5 pt-1.5 border-t border-stone-200/30">
                    {localPrayers.map((pray) => {
                      const isActive = pray.name === (selectedPrayer?.name || "");
                      return (
                        <button
                          key={pray.name}
                          onClick={() => handlePrayerSelect(pray)}
                          className={`flex flex-col items-center justify-between py-2.5 px-0.5 rounded-lg border transition-all cursor-pointer ${
                            isActive
                              ? "bg-white border-[#B8976A]/50 shadow-xs"
                              : "border-transparent hover:bg-stone-500/5"
                          }`}
                        >
                          <span className={`text-[10px] font-semibold tracking-wider ${isActive ? "text-[#B8976A]" : "text-stone-400"}`}>
                            {pray.name}
                          </span>
                          <span className="font-arabic text-md font-bold text-[#1A1A1A] my-1">
                            {pray.nameArabic}
                          </span>
                          <span className="font-mono text-[10px] font-medium text-[#3D3D3D]">
                            {pray.time}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* 2. Family Habit Tracker View */}
              {deviceTab === "habits" && (
                <motion.div
                  key="habits-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center mb-1 border-b border-stone-200/30 pb-2">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#3D3D3D]/65 font-bold">Home Habits</p>
                      <h4 className="text-sm font-semibold text-stone-800">Spiritual Growth Loop</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#B8976A]/10 text-[#B8976A] px-2 py-0.5 rounded-full">
                      Streak: 12 Days
                    </span>
                  </div>

                  <div className="space-y-2">
                    {habits.slice(0, 4).map((h) => (
                      <div
                        key={h.id}
                        onClick={() => toggleHabit(h.id)}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/70 border border-stone-200/20 hover:bg-white transition-all cursor-pointer hover:border-[#B8976A]/40"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                              h.completed
                                ? "bg-[#B8976A] border-[#B8976A] text-white"
                                : "border-stone-300 bg-transparent"
                            }`}
                          >
                            {h.completed && <Check size={10} strokeWidth={3} />}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#1A1A1A] block">{h.name}</span>
                            <span className="text-[9px] font-mono text-stone-400">{h.category}</span>
                          </div>
                        </div>

                        <span className="font-arabic text-xs font-bold text-[#B8976A] leading-none">
                          {h.nameArabic}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3. Family Announcement Board */}
              {deviceTab === "board" && (
                <motion.div
                  key="board-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 flex flex-col justify-center text-center h-full py-2"
                >
                  <div className="mb-2">
                    <span className="font-arabic text-2xl text-[#B8976A] block mb-1">السلام عليكم</span>
                    <span className="font-mono text-[9px] tracking-widest text-[#3D3D3D]/50 uppercase font-bold">AL-SABAH RESIDENCE</span>
                  </div>
                  
                  <div className="bg-white/45 p-3 rounded-xl border border-stone-200/30 font-sans max-w-sm mx-auto space-y-1.5 shadow-xs">
                    <p className="text-xs font-semibold text-[#1A1A1A]">Household Reminder</p>
                    <p className="text-xs text-[#3D3D3D] leading-relaxed italic">
                      "Indeed, prayer safeguards the family heart. Let's gather in the living room for Surah Al-Mulk recitation after Isha prayers tonight."
                    </p>
                  </div>

                  <div className="flex justify-center gap-1.5 items-center mt-1 text-[10px] text-[#B8976A] font-medium font-mono uppercase">
                    <Sparkles size={11} />
                    <span>Next Event: Quran Circle @ 20:30</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Screen Bottom Touch Buttons Menu bar */}
          <div className="z-10 border-t border-stone-200/40 pt-2.5 flex items-center justify-between">
            <button
              onClick={() => setDeviceTab("prayer")}
              className={`text-[10px] tracking-wider uppercase font-semibold transition-luxury py-1 px-2.5 rounded-md cursor-pointer ${
                deviceTab === "prayer" ? "bg-stone-500/10 text-[#1A1A1A] font-bold" : "text-stone-400 font-medium hover:text-stone-600"
              }`}
            >
              Prayer Times
            </button>
            <button
              onClick={() => setDeviceTab("habits")}
              className={`text-[10px] tracking-wider uppercase font-semibold transition-luxury py-1 px-2.5 rounded-md cursor-pointer ${
                deviceTab === "habits" ? "bg-stone-500/10 text-[#1A1A1A] font-bold" : "text-stone-400 font-medium hover:text-stone-600"
              }`}
            >
              Habit Tracker
            </button>
            <button
              onClick={() => setDeviceTab("board")}
              className={`text-[10px] tracking-wider uppercase font-semibold transition-luxury py-1 px-2.5 rounded-md cursor-pointer ${
                deviceTab === "board" ? "bg-stone-500/10 text-[#1A1A1A] font-bold" : "text-stone-400 font-medium hover:text-stone-600"
              }`}
            >
              Family Board
            </button>
          </div>

        </div>

      </div>

      {/* Helpful Interactive Instructions under the Device */}
      <p className="text-xs text-stone-400 mt-4 text-center font-medium font-mono flex items-center gap-1.5 justify-center">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-300"></span>
        Tap screen tabs or elements inside Tarbiyah to simulate interactions.
      </p>

    </div>
  );
}
