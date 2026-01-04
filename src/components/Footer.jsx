import React from 'react';
import { GraduationCap, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-black pt-20 pb-10">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
                    <div className="flex-1">
                        <a href="/" className="flex items-center gap-2 text-3xl font-black tracking-tighter mb-6">
                            <GraduationCap className="text-primary" size={40} />
                            EduSchool<span className="text-primary text-5xl">.</span>
                        </a>
                        <p className="text-gray-400 max-w-sm mb-10">
                            Fostering intellectual growth and character development since 1995. Education for a better world.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-xl mb-8">Contact Info</h4>
                        <ul className="flex flex-col gap-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-primary shrink-0" />
                                <span className="text-gray-400">123 Education Lane, Knowledge City, CA 90210</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-primary shrink-0" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="text-primary shrink-0" />
                                <span className="text-gray-400">admissions@eduschool.edu</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <h4 className="text-xl mb-8">Newsletter</h4>
                        <p className="text-gray-400 mb-6">Stay updated with school news and events.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-white/10 border-none p-4 rounded-l-lg w-full outline-none focus:ring-1 focus:ring-primary text-white placeholder-gray-500"
                            />
                            <button className="btn btn-primary rounded-l-none rounded-r-lg">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} EduSchool. All rights reserved. Shaping the leaders of tomorrow.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
