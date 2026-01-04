import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import AdmissionForm from './components/AdmissionForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <AdmissionForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
