import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="app">
      <Navbar setView={setCurrentView} currentView={currentView} />
      {currentView === 'landing' ? (
        <main>
          <Hero setView={setCurrentView} />
          <Problem />
          <Solution />
          <Features />
          <HowItWorks />
          <CTASection setView={setCurrentView} />
        </main>
      ) : (
        <main>
          <Dashboard />
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
