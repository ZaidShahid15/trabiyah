import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onPreOrderClick: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ onPreOrderClick, onScrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Product", id: "product" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Features", id: "features" },
    { name: "Customize", id: "customize" },
    { name: "FAQ", id: "faq" }
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E0D4]/45 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Group */}
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleLinkClick("hero")}
        >
          <span 
            id="brand-arabic-logo"
            className="font-arabic text-2xl md:text-3xl font-bold text-[#B8976A] tracking-wider transition-colors hover:text-[#1A1A1A]"
          >
            تربية
          </span>
          <span className="text-xs tracking-[0.25em] text-[#3D3D3D] border-l border-[#E8E0D4] pl-3 uppercase font-medium">
            ILHAM Inc
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#B8976A] tracking-wide transition-luxury cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onPreOrderClick}
            id="navbar-cta-btn"
            className="bg-[#1A1A1A] text-[#FAF8F5] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-[#B8976A] hover:text-[#1A1A1A] transition-luxury shadow-xs"
          >
            Pre-Order
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#1A1A1A] p-1.5 focus:outline-hidden"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation-dropdown"
          className="md:hidden bg-[#FAF8F5] border-b border-[#E8E0D4] w-full py-6 px-8 flex flex-col gap-5 shadow-lg absolute top-full left-0 z-40 transition-luxury"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-base font-medium text-[#1A1A1A] hover:text-[#B8976A] pb-2 border-b border-stone-100 transition-luxury"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onPreOrderClick();
            }}
            className="bg-[#1A1A1A] text-[#FAF8F5] py-3.5 rounded-full text-center text-sm font-bold tracking-wide hover:bg-[#B8976A] hover:text-[#1A1A1A] transition-luxury shadow-xs"
          >
            Pre-Order Tarbiyah
          </button>
        </div>
      )}
    </header>
  );
}
