import React, { useState } from "react";
import { X, Check, ArrowRight, ShieldCheck, Award, Sparkles, Lock } from "lucide-react";
import { DEVICE_FINISHES } from "../data";
import { DeviceFinish } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFinish: (finish: DeviceFinish) => void;
  activeFinish: DeviceFinish;
}

export default function ConfiguratorModal({
  isOpen,
  onClose,
  onSelectFinish,
  activeFinish
}: ConfiguratorModalProps) {
  const [engravingToggle, setEngravingToggle] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const [selectedMount, setSelectedMount] = useState<"standard" | "desk" | "wall">("standard");
  const [preOrderStep, setPreOrderStep] = useState<"configure" | "checkout" | "success">("configure");
  
  // Checkout Form states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const mountPrice = selectedMount === "desk" ? 29 : selectedMount === "wall" ? 19 : 0;
  const engravingPrice = engravingToggle ? 25 : 0;
  const totalPrice = activeFinish.price + mountPrice + engravingPrice;

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (preOrderStep === "configure") {
      setPreOrderStep("checkout");
    } else if (preOrderStep === "checkout") {
      setPreOrderStep("success");
    }
  };

  const handleFinishPreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !address) return;
    setPreOrderStep("success");
  };

  return (
    <div id="preorder-modal-overlay" className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div
        id="configurator-modal-content"
        className="bg-[#FAF8F5] p-0 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-[#E8E0D4]"
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 z-10 p-2 cursor-pointer transition-luxury bg-white/55 backdrop-blur-xs rounded-full"
          aria-label="Close Configurator"
        >
          <X size={18} />
        </button>

        <AnimatePresence mode="wait">
          
          {/* STEP 1: CONFIGURATION GRID */}
          {preOrderStep === "configure" && (
            <motion.div
              type="div"
              key="step-configure"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-stone-200/50"
            >
              {/* Left Display Mockup Preview Panel */}
              <div className="w-full md:w-1/2 bg-[#E8E0D4]/30 p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
                
                <div>
                  <h3 className="font-arabic text-2xl font-bold text-[#B8976A] tracking-wider">تربية</h3>
                  <h4 className="text-xl font-bold tracking-tight text-[#1A1A1A] mt-1 font-sans">
                    Customized Edition
                  </h4>
                  <p className="text-stone-500 font-sans text-xs mt-1">Configured for your lifestyle</p>
                </div>

                {/* Scaled Preview Frame */}
                <div className="my-10 flex justify-center items-center">
                  <div
                    className={`w-64 aspect-4/3 rounded-2xl p-4 transition-all duration-550 border-3 flex flex-col justify-between shadow-2xl relative ${
                      activeFinish.id === "walnut"
                        ? "border-[#4A321A] bg-radial from-[#5A3F24] to-[#36210E]"
                        : activeFinish.id === "oak"
                        ? "border-[#CDBDA3] bg-radial from-[#DEC8A9] to-[#AB9578]"
                        : "border-[#D1C9BE] bg-radial from-[#EBE4D7] to-[#BDB4A5]"
                    }`}
                  >
                    {/* Inner virtual display rendering e-ink */}
                    <div className="w-full h-full rounded-lg bg-[#FAF8F5] p-3 flex flex-col justify-between paper-glow relative overflow-hidden">
                      <div className="absolute inset-0 bg-stone-100/30"></div>
                      <div className="flex justify-between items-center z-10 border-b border-stone-200/40 pb-1">
                        <span className="text-[7px] font-mono tracking-widest text-[#B8976A] uppercase font-bold">Tarbiyah Display</span>
                        <span className="text-[7px] font-sans font-semibold text-[#1A1A1A]">North America</span>
                      </div>
                      
                      <div className="text-center my-auto z-10">
                        <span className="font-arabic text-xl font-bold text-stone-850 block">صلة الرحم</span>
                        <span className="text-[10px] text-[#3D3D3D] italic mt-0.5 block">"Build Islamic habits beautiful and warm"</span>
                      </div>

                      {/* Display Mount representation bottom indicators */}
                      <div className="flex justify-between items-center z-10 border-t border-stone-200/40 pt-1 text-[8px] font-mono text-stone-400 font-bold">
                        <span>{activeFinish.name}</span>
                        <span>{selectedMount.toUpperCase()} MOUNT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini features lists */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#B8976A]" /> Free shipping globally & 2-year warranty
                  </p>
                  <p className="text-xs font-semibold text-[#1A1A1A] flex items-center gap-2">
                    <Award size={14} className="text-[#B8976A]" /> Artisanal, sustainable timber & stone
                  </p>
                </div>
              </div>

              {/* Right Configuration Setup Panel */}
              <div className="w-full md:w-1/2 p-8 overflow-y-auto max-h-[80vh] md:max-h-[90vh]-custom">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#B8976A] uppercase">STRETCH-GOAL PRE-ORDER</span>
                <h4 className="text-2xl font-bold tracking-tight text-[#1A1A1A] mt-1 mb-6 font-sans">
                  Craft Your Tarbiyah
                </h4>

                <div className="space-y-6">
                  {/* Option 1: Hardware Bezel Finishes Selection */}
                  <div>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-3">
                      1. Frame Finish material
                    </span>
                    <div className="space-y-2.5">
                      {DEVICE_FINISHES.map((fin) => {
                        const isSelected = activeFinish.id === fin.id;
                        return (
                          <div
                            key={fin.id}
                            onClick={() => onSelectFinish(fin)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? "border-[#B8976A] bg-white shadow-xs"
                                : "border-stone-200/80 hover:border-stone-400 bg-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              {/* Color swatch dot */}
                              <div
                                className="w-6 h-6 rounded-full border border-stone-300"
                                style={{ backgroundColor: fin.hex }}
                              ></div>
                              <div>
                                <h5 className="text-sm font-bold text-[#1A1A1A]">{fin.name}</h5>
                                <p className="text-[11px] text-stone-500 max-w-xs mt-0.5 leading-normal font-sans">
                                  {fin.description.slice(0, 75)}...
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold font-mono text-[#3D3D3D]">
                              ${fin.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Option 2: Custom Back Engraving Panel */}
                  <div className="border-t border-stone-200/40 pt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">
                        2. Laser engraving backplate (+$25)
                      </span>
                      <button
                        onClick={() => {
                          setEngravingToggle(!engravingToggle);
                          setEngravingText("");
                        }}
                        className="text-xs font-semibold text-[#B8976A] hover:underline cursor-pointer"
                      >
                        {engravingToggle ? "Remove" : "Configure Engraving"}
                      </button>
                    </div>

                    {engravingToggle ? (
                      <div className="bg-white p-3 rounded-xl border border-stone-200 space-y-2 animate-fade-in">
                        <label className="text-[10px] text-[#3D3D3D] font-medium font-sans">
                          Family Name or Custom Verse (limit 40 letters)
                        </label>
                        <input
                          type="text"
                          maxLength={40}
                          placeholder="e.g. As-Salamu Alaykum Al-Sabah House"
                          value={engravingText}
                          onChange={(e) => setEngravingText(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-stone-250 rounded-lg text-xs p-2 text-stone-800 focus:outline-[#B8976A]"
                        />
                        <p className="text-[9px] font-mono text-stone-400 italic">
                          Meticulously laser etched onto your hardwood body backplate.
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#3D3D3D] italic font-sans">
                        Add a heartwarming memory, date, or Quranic verse on the backing.
                      </p>
                    )}
                  </div>

                  {/* Option 3: Table stands / wall mounts accessories */}
                  <div className="border-t border-stone-200/40 pt-5">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-3">
                      3. Display Mount Accessory Options
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: "standard", name: "Standard stand", desc: "Flush tabletop", price: 0 },
                        { id: "desk", name: "Solid Oak Stand", desc: "Elevated angle", price: 29 },
                        { id: "wall", name: "Magnetic Mount", desc: "Slim wall flush", price: 19 }
                      ].map((mnt) => {
                        const isSelected = selectedMount === mnt.id;
                        return (
                          <div
                            key={mnt.id}
                            onClick={() => setSelectedMount(mnt.id as any)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer text-center flex flex-col justify-between h-24 ${
                              isSelected
                                ? "border-[#B8976A] bg-white shadow-xs"
                                : "border-stone-200/80 hover:border-stone-400 bg-transparent"
                            }`}
                          >
                            <div>
                              <span className="text-xs font-bold text-[#1A1A1A] block">{mnt.name}</span>
                              <span className="text-[9px] text-stone-500 font-sans block mt-0.5 leading-snug">{mnt.desc}</span>
                            </div>
                            <span className="text-xs font-bold font-mono text-[#B8976A]">
                              {mnt.price === 0 ? "Included" : `+$${mnt.price}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Total Value Summary & Next Action triggers */}
                  <div className="border-t border-stone-200/40 pt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-stone-400 font-mono font-medium">Estimated pre-order value</p>
                      <h4 className="text-3xl font-extrabold font-mono text-[#1A1A1A]">${totalPrice}</h4>
                    </div>
                    <button
                      onClick={handleNextStep}
                      className="bg-[#1A1A1A] text-white hover:bg-[#B8976A] hover:text-[#1A1A1A] transition-luxury px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      Pre-Order Now
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SHIPPING SECURE CHECKOUT FORM */}
          {preOrderStep === "checkout" && (
            <motion.div
              type="form"
              onSubmit={handleFinishPreOrder}
              key="step-checkout"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-stone-200/50"
            >
              {/* Left Order Recap Summary Panel */}
              <div className="w-full md:w-5/12 bg-[#E8E0D4]/30 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">Pre-order Details</span>
                  <h4 className="text-lg font-bold text-stone-850 mt-1 mb-4">Your Bespoke Selection</h4>
                  
                  <div className="space-y-3.5 border-b border-stone-200 pb-4 text-xs font-sans">
                    <div className="flex justify-between font-medium">
                      <span className="text-stone-500">Tarbiyah Frame Finish:</span>
                      <span className="text-[#1A1A1A] font-bold">{activeFinish.name}</span>
                    </div>
                    
                    <div className="flex justify-between font-medium">
                      <span className="text-stone-500">Casing material base:</span>
                      <span className="text-stone-800">${activeFinish.price}</span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-stone-500">Laser engraving:</span>
                      <span className="text-stone-800">{engravingToggle ? `Enabled (${engravingText || "Custom"})` : "None"}</span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-stone-500">Mount Accessory style:</span>
                      <span className="text-stone-800">{selectedMount.toUpperCase()}</span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <span className="text-stone-500">Accessory add value:</span>
                      <span className="text-stone-800">${mountPrice + engravingPrice}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center bg-transparent">
                    <span className="text-xs font-bold text-[#1A1A1A]">Total pre-order Amount</span>
                    <span className="text-2xl font-bold font-mono text-[#B8976A]">${totalPrice}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-8 md:mt-0">
                  <p className="text-[10px] text-stone-500 flex items-center gap-1.5 font-mono font-bold uppercase">
                    <Lock size={12} className="text-[#B8976A]" /> SECURED ZERO RISK CHECKOUT
                  </p>
                  <p className="text-[11px] text-[#3D3D3D] font-sans leading-normal">
                    This is a mock pre-order registration checkout for demonstration. No active credit card or charge is processed. Your device selection of <span className="font-bold">{activeFinish.name}</span> is stored in active local states.
                  </p>
                </div>
              </div>

              {/* Right Address Sign-up form panel */}
              <form onSubmit={handleFinishPreOrder} className="w-full md:w-7/12 p-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-[#1A1A1A] mb-1 font-sans">Join the Pre-Production Queue</h4>
                  <p className="text-stone-500 text-xs mb-6 font-sans">Reserve your batch spot with zero down payment today.</p>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
                        Active Contact Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. zaid.s@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-stone-250 rounded-xl text-sm p-3 text-stone-800 focus:outline-[#B8976A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
                        Primary Household Representative name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Zaid Shahid Al-Sabah"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border border-stone-250 rounded-xl text-sm p-3 text-stone-800 focus:outline-[#B8976A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
                        Mailing & Shipping Address
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 104 Applecrest Dr, Toronto, ON"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-white border border-stone-250 rounded-xl text-sm p-3 text-stone-800 focus:outline-[#B8976A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setPreOrderStep("configure")}
                    className="text-stone-500 hover:text-[#1A1A1A] transition-luxury text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Back to Config
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#1A1A1A] text-white hover:bg-[#B8976A] hover:text-[#1A1A1A] transition-luxury py-4 px-6 rounded-full text-xs font-bold tracking-wider uppercase text-center cursor-pointer shadow-md"
                  >
                    Confirm Free Pre-order Spot
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS CONGRATULATION OVERLAY */}
          {preOrderStep === "success" && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full p-12 text-center flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#B8976A]/10 text-[#B8976A] flex items-center justify-center animate-pulse">
                <Sparkles size={32} />
              </div>

              <div>
                <span className="font-arabic text-3xl font-bold text-[#B8976A] block tracking-wide">تربية والبركة كلاهما</span>
                <h4 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mt-2 font-sans">
                  Pre-Order Confirmed for {fullName || "the Al-Sabah House"}!
                </h4>
                <p className="text-stone-500 text-xs mt-3 max-w-md mx-auto leading-relaxed font-sans">
                  Subhan'Allah, your pre-order and reservation spot for the <span className="font-bold text-[#1A1A1A]">{activeFinish.name}</span> custom-crafted Tarbiyah panel have been successfully logged.
                </p>
              </div>

              <div className="bg-[#E8E0D4]/30 border border-[#E8E0D4] p-5 rounded-2xl max-w-lg mx-auto space-y-2 text-xs font-mono text-[#3D3D3D]">
                <div className="flex justify-between border-b border-[#E8E0D4]/50 pb-2">
                  <span className="font-bold">PRE-ORDER MATCH NUMBER:</span>
                  <span className="font-extrabold text-[#1A1A1A]">#ILH-2026-95821</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E0D4]/50 pb-2 pt-1">
                  <span>Shipment Tier:</span>
                  <span className="font-bold text-[#1A1A1A]">Group A (Fall 2026 Batch)</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Confirmation receipt sent to:</span>
                  <span className="font-bold text-[#1A1A1A]">{email || "your email"}</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setPreOrderStep("configure");
                    onClose();
                  }}
                  className="bg-[#1A1A1A] text-white hover:bg-[#B8976A] hover:text-[#1A1A1A] transition-luxury py-3.5 px-8 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer shadow-sm"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
