import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, ArrowRight } from 'lucide-react';

const AdmissionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        grade: '',
        message: ''
    });
    const [focusedField, setFocusedField] = useState(null);
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFocus = (field) => {
        setFocusedField(field);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:3000/api/admissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', grade: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    const isFilled = (value) => value && value.trim() !== '';

    return (
        <section id="admission" className="admission-section py-20">
            <div className="admission-bg-glow"></div>
            <div className="container relative z-10">
                <div className="form-container-grid">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="admission-content"
                    >
                        <span className="text-primary font-bold uppercase tracking-widest mb-4 block">Admissions Open</span>
                        <h2 className="text-white">
                            Begin Your <span className="text-primary">Legacy</span> <br />
                            With Excellence.
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                            Join a community where innovation meets tradition. Our admission process is designed to find students who are eager to learn, lead, and make a difference.
                        </p>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-center gap-4">
                                <span className="bg-primary/10 p-3 rounded-full text-primary">
                                    <CheckCircle size={24} />
                                </span>
                                <div>
                                    <h4 className="text-xl text-white mb-1">World-Class Mentorship</h4>
                                    <p className="text-sm text-gray-500">Learn from industry experts and renowned academics.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="bg-primary/10 p-3 rounded-full text-primary">
                                    <CheckCircle size={24} />
                                </span>
                                <div>
                                    <h4 className="text-xl text-white mb-1">State-of-the-Art Facilities</h4>
                                    <p className="text-sm text-gray-500">Advanced labs, modern libraries, and smart classrooms.</p>
                                </div>
                            </div>
                        </div>

                        <div className="admission-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
                                alt="University Campus"
                            />
                        </div>
                    </motion.div>

                    {/* Right Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="admission-card"
                    >
                        <h3 className="text-3xl text-white mb-8 font-bold">Admission Inquiry</h3>

                        <form onSubmit={handleSubmit}>
                            <div className={`form-group ${focusedField === 'name' ? 'field-focused' : ''} ${isFilled(formData.name) ? 'field-filled' : ''}`}>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('name')}
                                    onBlur={handleBlur}
                                    required
                                    placeholder=" "
                                />
                                <label className="form-label">Full Name</label>
                            </div>

                            <div className={`form-group ${focusedField === 'email' ? 'field-focused' : ''} ${isFilled(formData.email) ? 'field-filled' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={handleBlur}
                                    required
                                    placeholder=" "
                                />
                                <label className="form-label">Email Address</label>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className={`form-group ${focusedField === 'phone' ? 'field-focused' : ''} ${isFilled(formData.phone) ? 'field-filled' : ''}`}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('phone')}
                                        onBlur={handleBlur}
                                        placeholder=" "
                                    />
                                    <label className="form-label">Phone Number</label>
                                </div>

                                <div className={`form-group`}>
                                    <select
                                        name="grade"
                                        className={`form-select ${isFilled(formData.grade) ? 'field-filled' : ''}`}
                                        value={formData.grade}
                                        onChange={handleChange}
                                        onFocus={() => handleFocus('grade')}
                                        onBlur={handleBlur}
                                    >
                                        <option value=""></option>
                                        <option value="9">Grade 9</option>
                                        <option value="10">Grade 10</option>
                                        <option value="11">Grade 11</option>
                                        <option value="12">Grade 12</option>
                                    </select>
                                    <label className="form-label">Grade of Interest</label>
                                </div>
                            </div>

                            <div className={`form-group ${focusedField === 'message' ? 'field-focused' : ''} ${isFilled(formData.message) ? 'field-filled' : ''}`}>
                                <textarea
                                    name="message"
                                    className="form-textarea"
                                    rows="3"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('message')}
                                    onBlur={handleBlur}
                                    placeholder=" "
                                ></textarea>
                                <label className="form-label">Tell us about the student...</label>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="form-submit-btn"
                            >
                                {status === 'submitting' ? 'Processing...' : (
                                    <>
                                        Submit Application <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-center font-medium"
                                >
                                    Message sent successfully! We will contact you soon.
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center font-medium"
                                >
                                    Something went wrong. Please try again.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AdmissionForm;
