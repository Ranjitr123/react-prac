import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero.png"
                    alt="Gym Background"
                    className="w-full h-full object-cover opacity-60 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase block mb-4">
                        Transform Your Body
                    </span>
                    <h1 className="text-6xl md:text-8xl mb-6 leading-tight">
                        BE <span className="text-primary">STRONGER</span><br />
                        BE BETTER
                    </h1>
                    <p className="text-text-muted text-lg mb-10 max-w-lg">
                        Experience the ultimate fitness journey with professional trainers and state-of-the-art equipment. Your transformation starts here.
                    </p>

                    <div className="flex gap-4 flex-col sm:flex-row">
                        <button className="btn btn-primary">
                            Get Started <ChevronRight size={20} />
                        </button>
                        <button className="btn btn-outline">
                            <span className="w-10 h-10 border border-primary rounded-full flex items-center justify-center mr-2">
                                <Play size={16} fill="currentColor" />
                            </span>
                            Watch Video
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-10 right-10 hidden lg:block">
                <div className="flex gap-12">
                    <div>
                        <h3 className="text-4xl text-primary">500+</h3>
                        <p className="text-xs uppercase tracking-widest text-text-muted">Members</p>
                    </div>
                    <div>
                        <h3 className="text-4xl text-primary">50+</h3>
                        <p className="text-xs uppercase tracking-widest text-text-muted">Classes</p>
                    </div>
                    <div>
                        <h3 className="text-4xl text-primary">20+</h3>
                        <p className="text-xs uppercase tracking-widest text-text-muted">Trainers</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
