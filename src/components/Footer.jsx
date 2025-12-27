import React from 'react';
import { Dumbbell, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-black pt-20 pb-10">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
                    <div className="flex-1">
                        <a href="/" className="flex items-center gap-2 text-3xl font-black italic tracking-tighter mb-6">
                            <Dumbbell className="text-primary" size={40} />
                            ZYM<span className="text-primary text-5xl">.</span>
                        </a>
                        <p className="text-text-muted max-w-sm mb-10">
                            Transforming lives through fitness since 1995. Our community is built on sweat, discipline, and results.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-accent flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-xl mb-8">Contact Info</h4>
                        <ul className="flex flex-col gap-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-primary shrink-0" />
                                <span className="text-text-muted">123 Fitness Avenue, Muscle City, CA 90210</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-primary shrink-0" />
                                <span className="text-text-muted">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="text-primary shrink-0" />
                                <span className="text-text-muted">join@zymgym.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-xl mb-8">Newsletter</h4>
                        <p className="text-text-muted mb-6">Get fitness tips and gym updates delivered to your inbox.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-accent/40 border-none p-4 rounded-l-lg w-full outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button className="btn btn-primary rounded-l-none rounded-r-lg">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-accent pt-10 text-center text-text-muted text-sm">
                    <p>&copy; {new Date().getFullYear()} ZYM Gym. All rights reserved. Designed with passion for fitness.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
