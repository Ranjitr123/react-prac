import React from 'react';
// import { motion } from 'framer-motion';
import { Trophy, Zap, Heart } from 'lucide-react';

const programs = [
    {
        title: 'Strength Training',
        desc: 'Build raw power and muscle with our Olympic lifting and resistance program.',
        icon: <Trophy size={40} />,
        image: '/assets/strength.png'
    },
    {
        title: 'Cardio & Endurance',
        desc: 'Burn fat and improve cardiovascular health with high-intensity intervals.',
        icon: <Zap size={40} />,
        image: '/assets/cardio.png'
    },
    {
        title: 'Yoga & Wellness',
        desc: 'Balance your body and mind with our expert-led yoga and mobility sessions.',
        icon: <Heart size={40} />,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
    }
];

const Programs = () => {
    return (
        <section id="programs" className="py-20 bg-accent/20">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-widest">Our Programs</span>
                    <h2 className="section-title">Push Your <span className="text-primary">Limits</span></h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="relative group overflow-hidden rounded-lg bg-card flex-1"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                            </div>

                            <div className="p-8">
                                <div className="text-primary mb-4">{program.icon}</div>
                                <h3 className="text-2xl mb-2">{program.title}</h3>
                                <p className="text-text-muted mb-6">{program.desc}</p>
                                <a href="#" className="text-primary font-bold flex items-center gap-2 group">
                                    Learn More <span className="group-hover:translate-x-2 transition-transform">→</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;
