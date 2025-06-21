import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { initGA } from './utils/analytics';
import { initEmailJS } from './utils/emailService';

function App() {
  useEffect(() => {
    initGA();
    initEmailJS();
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
