import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter hover:scale-105 transition-transform">
          <GraduationCap className="text-primary" size={32} />
          EduSchool<span className="text-primary text-4xl">.</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-widest">
          <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
          <li><a href="#courses" className="hover:text-primary transition-colors">Courses</a></li>
          <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
          <li><a href="#admission" className="hover:text-primary transition-colors">Admissions</a></li>
        </ul>

        <a href="#admission" className="hidden md:block btn btn-primary py-2 px-6 shadow-lg shadow-primary/20">Apply Now</a>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white hover:text-primary transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl py-10 md:hidden animate-in fade-in slide-in-from-top-4 border-t border-white/10">
          <ul className="flex flex-col items-center gap-6 font-bold text-xl uppercase">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Home</a></li>
            <li><a href="#courses" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Courses</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">About</a></li>
            <li><a href="#admission" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Admissions</a></li>
            <li><a href="#admission" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Apply Now</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
