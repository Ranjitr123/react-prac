import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Palette, Trophy } from 'lucide-react';

const courses = [
    {
        title: 'Science & Tech',
        desc: 'Explore the universe with our advanced science labs and coding curriculum.',
        icon: <BookOpen size={40} />,
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Arts & Humanities',
        desc: 'Express creativity through painting, music, history, and literature.',
        icon: <Palette size={40} />,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Sports Excellence',
        desc: 'Develop teamwork and fitness with our championship-winning sports teams.',
        icon: <Trophy size={40} />,
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800'
    }
];

const Courses = () => {
    return (
        <section id="courses" className="py-20 bg-accent/20">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-widest">Our Curriculum</span>
                    <h2 className="section-title">Academic <span className="text-primary">Excellence</span></h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="relative group overflow-hidden rounded-lg bg-card flex-1 shadow-xl"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                            </div>

                            <div className="p-8">
                                <div className="text-primary mb-4">{course.icon}</div>
                                <h3 className="text-2xl mb-2">{course.title}</h3>
                                <p className="text-gray-400 mb-6">{course.desc}</p>
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

export default Courses;
