import { useState } from "react";
import { 
  ArrowRight, Check, Sparkles, Clock, Calendar, Smartphone, 
  Layers, Smile, ChevronDown, CheckCircle2, Volume2, ShieldCheck, Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Navbar from "./components/Navbar";
import InteractiveDevice from "./components/InteractiveDevice";
import CompanionPhone from "./components/CompanionPhone";
import ConfiguratorModal from "./components/ConfiguratorModal";

// Static & Interactive Data
import { 
  INITIAL_PRAYER_TIMES, 
  INITIAL_HABITS, 
  DEVICE_FINISHES, 
  HOW_IT_WORKS_STEPS, 
  FAQS 
} from "./data";
import { DeviceFinish, HabitItem, PrayerTime } from "./types";

// Static Path reference to the generated hero image asset
const mockupImg = "/src/assets/images/tarbiyah_device_1780166443437.png";

export default function App() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [activeFinish, setActiveFinish] = useState<DeviceFinish>(DEVICE_FINISHES[0]);
  const [deviceOverlayText, setDeviceOverlayText] = useState("Connected");

  // State for interactive demonstration loops
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(INITIAL_PRAYER_TIMES);
  const [habits, setHabits] = useState<HabitItem[]>(INITIAL_HABITS);
  
  // Custom Calculation method state managed synchronously
  const [selectedCalculationMethod, setSelectedCalculationMethod] = useState("ISNA (North America)");

  // FAQ Expanded states
  const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(null);

  // Toggle habit state locally (updates on interactive screen display and can be synced from phone)
  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    // Trigger tiny device notification update
    const toggledHabit = habits.find(h => h.id === id);
    if (toggledHabit) {
      const stateLabel = !toggledHabit.completed ? "Done" : "Cleared";
      setDeviceOverlayText(`${toggledHabit.name.split(" ")[0]} ${stateLabel}`);
      setTimeout(() => setDeviceOverlayText("Habit Saved"), 2200);
    }
  };

  // Append habit from the companion phone interface
  const addHabit = (name: string, nameArabic: string, category: "Spiritual" | "Mind" | "Family" | "Dhikr") => {
    const newHabit: HabitItem = {
      id: "h_" + Date.now(),
      name,
      nameArabic,
      category,
      frequency: "Daily",
      completed: false
    };
    setHabits(prev => [newHabit, ...prev]);
  };

  // Scroll smooth script to target elements
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] font-sans antialiased overflow-x-hidden selection:bg-[#B8976A]/20 selection:text-[#B8976A]">
      
      {/* 1. NAVBAR */}
      <Navbar 
        onPreOrderClick={() => setIsConfiguratorOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* 2. HERO SECTION */}
      <section
        id="hero"
        className="w-full min-h-screen pt-28 pb-16 flex flex-col justify-center items-center relative px-6 md:px-12 bg-linear-to-b from-[#FAF8F5]/30 to-[#E8E0D4]/20"
      >
        <div className="absolute inset-0 bg-[#E8E0D4]/5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-8 z-10 flex flex-col items-center">
          
          {/* Subtle Arabic calligraphic design tag without using typical crescent moons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8E0D4]/35 border border-[#E8E0D4]/45 shadow-2xs"
          >
            <span className="font-arabic text-sm text-[#B8976A] font-medium tracking-wide">البركة في البيت</span>
            <span className="text-[10px] font-semibold text-[#3D3D3D] uppercase tracking-widest border-l border-stone-300 pl-2">ILHAM INC. LAUNCH</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light tracking-tight text-[#1A1A1A] max-w-4xl leading-tight"
          >
            Build Islamic Habits. <br />
            <span className="font-semibold text-stone-900 border-b border-[#B8976A]/40 pb-1.5">
              One at a Time.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-md md:text-xl text-[#3D3D3D] max-w-2xl font-normal leading-relaxed"
          >
            Tarbiyah brings your family's spiritual life into the home — beautifully with a glare-free e-ink panel packaged in premium natural wood.
          </motion.p>

          {/* Action Trigger Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
          >
            <button
              onClick={() => setIsConfiguratorOpen(true)}
              className="bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#B8976A] hover:text-[#1A1A1A] transition-luxury px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase shadow-md flex items-center gap-2 cursor-pointer"
            >
              Reserve Early Spot
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => scrollToSection("product")}
              className="text-sm font-bold text-[#1A1A1A] hover:text-[#B8976A] tracking-wider uppercase transition-luxury py-2 cursor-pointer flex items-center gap-1"
            >
              Explore Device Specs
            </button>
          </motion.div>

          {/* Product Hero Mockup with warm, clean Japandi style background */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4 }}
            className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl mt-12 bg-[#E8E0D4]/30 border border-[#E8E0D4]/45 p-3 md:p-4 aspect-16/9 relative group"
          >
            {/* The generated high-fidelity product placement render */}
            <img
              src={mockupImg}
              alt="Tarbiyah smart display on wood console table in minimalist warm sunlit living room"
              className="w-full h-full object-cover rounded-xl grayscale-10 group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Ambient vignette shading on image corners */}
            <div className="absolute inset-4 rounded-xl shadow-inner pointer-events-none border border-white/10"></div>
          </motion.div>

        </div>
      </section>

      {/* 3. WHAT IS TARBIYAH */}
      <section
        id="product"
        className="w-full py-20 md:py-32 bg-[#FAF8F5] border-t border-[#E8E0D4]/30 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#B8976A] uppercase">PURPOSEFUL NATURE</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
                The anti-screen <br />
                for intentional families.
              </h2>
              
              <div className="space-y-4 text-sm md:text-base text-[#3D3D3D] leading-relaxed font-normal">
                <p>
                  Most domestic displays scream for your attention with bright glowing pixels, pop-up notifications, and blue light glare. They keep you tied to constant distractions instead of the simple domestic presence.
                </p>
                <p>
                  Tarbiyah operates in beautiful reverse. Engineered with a matte, highly textured display reflecting natural light, it acts as quiet kinetic wallpaper. It only displays what brings peace to your hearth: prayer routines, habit loops, and heartfelt reminders. No noise, no notifications, no anxiety.
                </p>
              </div>

              {/* Decorative premium blockquote */}
              <div className="border-l-2 border-[#B8976A] pl-5 py-1 text-xs md:text-sm text-[#1A1A1A] italic">
                "Our domestic space is our sanctuary. Tarbiyah honors that boundary, rendering faith and memory like fine typography printed on heavy textured craft paper."
                <span className="block text-[10px] font-bold text-[#B8976A] mt-2 font-mono uppercase not-italic">
                  — ILHAM DESIGN COUNCIL
                </span>
              </div>
            </div>

            {/* Right Feature Highlights Column */}
            <div className="lg:col-span-7 space-y-6 bg-[#E8E0D4]/20 border border-[#E8E0D4]/40 p-8 md:p-10 rounded-2xl relative">
              <div className="absolute inset-0 bg-[#FAF8F5]/10 pointer-events-none rounded-xl"></div>
              
              <h3 className="text-xl font-bold tracking-tight text-stone-850">Core Concept Highlights</h3>
              <p className="text-xs text-stone-500 font-sans mt-1">Sustainably sourced, highly functional pieces</p>
              
              <div className="space-y-8 mt-8">
                
                {/* Highlight 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#B8976A] shadow-xs border border-stone-200/40 shrink-0">
                    <Clock size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1A1A1A]">E-Ink Prayer Climax Display</h4>
                    <p className="text-stone-500 text-xs md:text-sm mt-1 leading-relaxed">
                      Beautiful typography automatically transitions in shade representing the twilight, dusk, and noon prayer times. Silent customizable alerts replace shocking digital tones.
                    </p>
                  </div>
                </div>

                {/* Highlight 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#B8976A] shadow-xs border border-stone-200/40 shrink-0">
                    <Calendar size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1A1A1A]">Unified Home Habit Loops</h4>
                    <p className="text-stone-500 text-xs md:text-sm mt-1 leading-relaxed">
                      A visual tracking framework that encourages positive small daily steps. Tick off collective family goals (evening addu'a, quran readings) directly on physical glass.
                    </p>
                  </div>
                </div>

                {/* Highlight 3 */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#B8976A] shadow-xs border border-stone-200/40 shrink-0">
                    <Smartphone size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1A1A1A]">Seamless Cloud Sync (No Subscriptions)</h4>
                    <p className="text-stone-500 text-xs md:text-sm mt-1 leading-relaxed">
                      Manage coordinates, update announcements, and view statistics from the free companion app on your phone. Changes push to the home wall instantly.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section
        id="how-it-works"
        className="w-full py-20 md:py-32 bg-[#E8E0D4]/20 border-y border-[#E8E0D4]/35 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B8976A] uppercase">THE METHODOLOGY</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
              Three steps to a quiet hearth.
            </h2>
            <p className="text-sm text-stone-550 max-w-lg mx-auto font-sans font-medium">Simple configuration, timeless presence</p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-4">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="flex flex-col gap-5 p-6 rounded-2xl bg-white border border-stone-200/30 transition-all duration-300 hover:shadow-lg hover:border-[#B8976A]/40"
              >
                {/* Minimal Number Indicator */}
                <div className="flex justify-between items-center">
                  <span className="text-3xl md:text-4xl font-light tracking-tight text-[#B8976A] font-mono">
                    {step.number}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-200"></div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FEATURES DETAILS GRID SECTION */}
      <section
        id="features"
        className="w-full py-20 md:py-32 bg-[#FAF8F5] px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B8976A] uppercase">ENGINEERED INTEGRITY</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
              Every detail, deliberate.
            </h2>
          </div>

          {/* Feature Grid: 3x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200/30 flex flex-col gap-4">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B8976A] border border-stone-200/50">
                <Clock size={16} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[#1A1A1A]">Adaptive Prayer Display</h4>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-sans">
                  Auto-syncs local latitude coordinates. Features ISNA, Umm al-Qura, and custom mosque offset formulas.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200/30 flex flex-col gap-4">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B8976A] border border-stone-200/50">
                <CheckCircle2 size={16} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[#1A1A1A]">Family Habit Rings</h4>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-sans">
                  Beautiful circular rings of progress indicating checked actions of morning dhikr and Quran circles.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200/30 flex flex-col gap-4">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B8976A] border border-stone-200/50">
                <Smile size={16} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[#1A1A1A]">Household Board</h4>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-sans">
                  A neat chalkboard alternative to leave gentle notes, Du'a requests, and calendar sync updates.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200/30 flex flex-col gap-4">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B8976A] border border-stone-200/50">
                <Smartphone size={16} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[#1A1A1A]">Companion App Hub</h4>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-sans">
                  Clean interface for iOS and Android. Update goals in real-time with family coordination.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200/30 flex flex-col gap-4">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B8976A] border border-stone-200/50">
                <Layers size={16} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[#1A1A1A]">Artisanal Bezel materials</h4>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-sans">
                  Available in solid American Walnut, light Natural White-Oak, and precision-cut genuine Travertine stone.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200/30 flex flex-col gap-4">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#B8976A] border border-stone-200/50">
                <Volume2 size={16} />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[#1A1A1A]">Ambient Chime feedback</h4>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-sans">
                  A high-end internal acoustic resonant chamber that hums subtle, serene cues instead of synthetic alarm sounds.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE DEMONSTRATION & REAL-TIME SYNC PLAYGROUND */}
      <section
        id="customize"
        className="w-full py-20 md:py-32 bg-[#E8E0D4]/20 border-t border-[#E8E0D4]/35 px-6 md:px-12 relative"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B8976A] uppercase">LIVE PLAYGROUND DEMO</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
              Connect, Create, Sync.
            </h2>
            <p className="text-[#3D3D3D] text-xs md:text-sm max-w-2xl mx-auto font-sans leading-relaxed">
              Test the integration real-time. Use the digital phone app mockup below to add a custom habit, sync settings, or change calculation models, and watch the virtual Tarbiyah frame display adjust.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-6">
            
            {/* Left: Companion Phone Control */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <CompanionPhone
                habits={habits}
                addHabit={addHabit}
                onSetOverlayText={setDeviceOverlayText}
                selectedCalculationMethod={selectedCalculationMethod}
                setSelectedCalculationMethod={setSelectedCalculationMethod}
              />
            </div>

            {/* Middle: Connection Sync Line Indicator for Desktop */}
            <div className="hidden lg:col-span-1 lg:flex flex-col items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B8976A] animate-ping"></div>
              <div className="w-0.5 h-36 bg-linear-to-b from-[#B8976A] via-stone-300 to-transparent"></div>
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#B8976A] uppercase vertical-text transform rotate-90 my-4">
                SYNCING
              </span>
              <div className="w-0.5 h-36 bg-linear-to-t from-[#B8976A] via-stone-300 to-transparent"></div>
            </div>

            {/* Right: The Reserving Smart Display Frame itself */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <InteractiveDevice
                activeFinish={activeFinish}
                prayerTimes={prayerTimes}
                habits={habits}
                toggleHabit={toggleHabit}
                customOverlayText={deviceOverlayText}
              />
            </div>

          </div>

          {/* Quick Finishes Interactive Select for customization preview */}
          <div className="flex flex-col items-center gap-4 pt-10 border-t border-[#E8E0D4]/35">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block font-sans">
              Preview other authentic chassis finishes
            </span>
            <div className="flex items-center gap-3">
              {DEVICE_FINISHES.map((fin) => (
                <button
                  key={fin.id}
                  onClick={() => {
                    setActiveFinish(fin);
                    setDeviceOverlayText(`${fin.name} Selected`);
                    setTimeout(() => setDeviceOverlayText("Sync Completed"), 1800);
                  }}
                  className={`px-5 py-2 rounded-full border text-xs font-bold tracking-wide transition-luxury flex items-center gap-2 cursor-pointer ${
                    activeFinish.id === fin.id
                      ? "bg-[#1A1A1A] text-[#FAF8F5] border-[#1A1A1A]"
                      : "bg-[#white] text-[#3D3D3D] border-stone-250 hover:border-stone-400"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fin.hex }}></span>
                  {fin.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. PRICING SECTION */}
      <section
        id="pricing"
        className="w-full py-20 md:py-32 bg-[#FAF8F5] px-6 md:px-12 flex flex-col items-center"
      >
        <div className="max-w-3xl mx-auto text-center space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B8976A] uppercase">PRE-ORDER TIERS</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
              Bring Barakah into your residence.
            </h2>
            <p className="text-sm text-stone-550 max-w-lg mx-auto font-sans">Special early adopter pricing spots available in North America.</p>
          </div>

          {/* Single polished premium pricing card with Gold accent outline */}
          <div
            id="premium-pricing-card"
            className="w-full max-w-lg mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border-t-8 border-[#B8976A] space-y-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <span className="text-[10px] font-mono font-bold text-[#B8976A] tracking-wider uppercase bg-[#B8976A]/10 px-3 py-1 rounded-full">
                    Group A Reserve Tiers
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-stone-900 mt-2">Tarbiyah Smart Display</h3>
                </div>
                
                <div className="text-right">
                  <span className="text-sm text-stone-400 line-through font-mono font-bold block">$279</span>
                  <span className="text-3xl md:text-4xl font-semibold font-mono text-[#1A1A1A]">${activeFinish.price}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-stone-500 font-sans leading-normal text-left">
                Includes your customized hand-crafted solid hardwood bezel chassis, a premium braided USB-C woven cable, companion mobile access, and life-long software calibrations with no hidden monthly fees.
              </p>

              <div className="border-t border-stone-150 pt-5 space-y-3.5 text-left text-xs md:text-sm font-sans font-medium text-stone-700">
                <div className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#B8976A]" />
                  <span>Sustainably harvested timber (Walnut / White-Oak)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#B8976A]" />
                  <span>Interactive matte anti-glare e-ink displays</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#B8976A]" />
                  <span>Zero blue light emission — eye safe and calm</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check size={16} className="text-[#B8976A]" />
                  <span>Comes with lifetime free companion app sync</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-450 italic">
                  <Sparkles size={14} className="text-[#B8976A]" />
                  <span>Configurable laser back engraving available</span>
                </div>
              </div>

            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setIsConfiguratorOpen(true)}
                className="w-full bg-[#1A1A1A] text-white hover:bg-[#B8976A] hover:text-[#1A1A1A] py-4 rounded-full text-xs font-bold tracking-wider uppercase transition-luxury cursor-pointer shadow-sm"
              >
                Configure & Secure Pre-Order
              </button>
              <p className="text-[10px] text-stone-400 font-mono tracking-wider font-semibold">
                No active charge processed. Free group spots reserved today.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ SECTION (With custom beautiful accordion) */}
      <section
        id="faq"
        className="w-full py-20 md:py-32 bg-[#E8E0D4]/20 border-t border-[#E8E0D4]/35 px-6 md:px-12"
      >
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B8976A] uppercase">MORE DETAILS</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500 text-xs font-sans">Clear answers for intentional parents</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = expandedFAQIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-stone-200/50 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFAQIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-sans cursor-pointer group"
                  >
                    <span className="text-sm md:text-base font-bold text-stone-850 group-hover:text-[#B8976A] transition-luxury">
                      {faq.question}
                    </span>
                    <span className="text-[#B8976A] shrink-0">
                      {isOpen ? <ChevronDown size={18} className="transform rotate-180 transition-transform duration-350" /> : <ChevronDown size={18} className="transition-transform duration-350" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-stone-550 leading-relaxed font-sans border-t border-stone-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. FOOTER */}
      <footer
        id="main-landing-footer"
        className="bg-[#1A1A1A] text-[#FAF8F5] py-16 px-6 md:px-12 border-t border-stone-800"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 pb-8 border-b border-stone-800/80">
            
            {/* Logo Group */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-arabic text-3xl font-semibold text-[#B8976A] tracking-wider">تربية</span>
                <span className="text-xs text-stone-400 font-mono tracking-widest font-bold uppercase border-l border-stone-700 pl-3">ILHAM INC</span>
              </div>
              <p className="text-xs text-stone-400 max-w-sm line-normal leading-relaxed font-sans">
                Thoughtfully crafted digital additions for the contemporary values-led household. Elevating homes one deliberate habit at a time.
              </p>
            </div>

            {/* Links Block */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 text-xs font-mono font-medium tracking-wide text-stone-300">
              <div className="space-y-2.5">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">THE HARDWARE</span>
                <button onClick={() => scrollToSection("product")} className="block hover:text-[#B8976A] transition-luxury text-left">Classic Walnut</button>
                <button onClick={() => scrollToSection("product")} className="block hover:text-[#B8976A] transition-luxury text-left">Natural Oak</button>
                <button onClick={() => scrollToSection("product")} className="block hover:text-[#B8976A] transition-luxury text-left">Travertine Edition</button>
              </div>
              <div className="space-y-2.5">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">RESOURCES</span>
                <button onClick={() => scrollToSection("how-it-works")} className="block hover:text-[#B8976A] transition-luxury text-left">How It Works</button>
                <button onClick={() => scrollToSection("features")} className="block hover:text-[#B8976A] transition-luxury text-left">Calculations OS</button>
                <button onClick={() => scrollToSection("faq")} className="block hover:text-[#B8976A] transition-luxury text-left font-sans">Calculations FAQ</button>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-stone-500 font-semibold uppercase tracking-wider">
            <span>© {new Date().getFullYear()} ILHAM INC. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-luxury">Instagram</a>
              <a href="#" className="hover:text-white transition-luxury">vimeo</a>
              <a href="#" className="hover:text-white transition-luxury">Contact Support</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 8. PRE-ORDER CONFIGURATOR MODAL OVERLAY */}
      <ConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        onSelectFinish={setActiveFinish}
        activeFinish={activeFinish}
      />

    </div>
  );
}
