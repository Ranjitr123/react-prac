import React, { useState, useEffect } from 'react';
import { Dumbbell, Menu, X } from 'lucide-react';

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
        <a href="/" className="flex items-center gap-2 text-2xl font-black italic tracking-tighter">
          <Dumbbell className="text-primary" size={32} />
          ZYM<span className="text-primary text-4xl">.</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-widest">
          <li><a href="#home" className="hover:text-primary">Home</a></li>
          <li><a href="#programs" className="hover:text-primary">Programs</a></li>
          <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
          <li><a href="#contact" className="hover:text-primary">Contact</a></li>
        </ul>

        <a href="#contact" className="hidden md:block btn btn-primary py-2 px-6">Join Now</a>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl py-10 md:hidden animate-in fade-in slide-in-from-top-4">
          <ul className="flex flex-col items-center gap-6 font-bold text-xl uppercase">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#programs" onClick={() => setIsMenuOpen(false)}>Programs</a></li>
            <li><a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a></li>
            <li><a href="#contact" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Join Now</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
