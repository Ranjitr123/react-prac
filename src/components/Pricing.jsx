import React from 'react';
import { Check } from 'lucide-react';

const plans = [
    {
        name: 'Basic',
        price: '29',
        features: ['Access to Gym', 'Standard Equipment', 'Locker Room', 'Water Station']
    },
    {
        name: 'Pro',
        price: '59',
        popular: true,
        features: ['Everything in Basic', 'Unlimited Classes', 'Personal Trainer (1/mo)', 'Sauna Access']
    },
    {
        name: 'Elite',
        price: '99',
        features: ['Everything in Pro', 'Unlimited PT sessions', 'Nutrition Plan', 'All-Access Pass']
    }
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-20">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-widest">Pricing Plans</span>
                    <h2 className="section-title">Join The <span className="text-primary">Elite</span></h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`flex-1 p-10 rounded-2xl flex flex-col ${plan.popular ? 'bg-primary text-black transform scale-105 shadow-2xl z-10' : 'bg-card'}`}
                        >
                            {plan.popular && (
                                <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase">Most Popular</span>
                            )}
                            <h3 className="text-4xl mb-2 italic font-black">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-black">$</span>
                                <span className="text-6xl font-black">{plan.price}</span>
                                <span className={plan.popular ? 'text-black/60 font-bold' : 'text-text-muted font-bold'}>/month</span>
                            </div>

                            <ul className="flex flex-col gap-4 mb-10 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <Check size={20} className={plan.popular ? 'text-black' : 'text-primary'} />
                                        <span className="font-semibold">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`btn w-full justify-center ${plan.popular ? 'bg-black text-white hover:bg-white hover:text-black' : 'btn-primary'}`}>
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
