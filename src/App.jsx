import { useState } from 'react';
import { Home, BookOpen, PenTool, BrainCircuit } from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudyModule from './components/StudyModule';
import QuizModule from './components/QuizModule';
import FlashcardsModule from './components/FlashcardsModule';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const renderContent = () => {
    switch(currentTab) {
      case 'home': return <Dashboard setTab={setCurrentTab} />;
      case 'study': return <StudyModule />;
      case 'quiz': return <QuizModule />;
      case 'flashcards': return <FlashcardsModule />;
      default: return <Dashboard setTab={setCurrentTab} />;
    }
  };

  return (
    <div className="app-container">
      {renderContent()}

      <nav className="mobile-nav">
        <button 
          className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentTab('home')}
        >
          <Home size={24} />
          <span>Inicio</span>
        </button>
        <button 
          className={`nav-item ${currentTab === 'study' ? 'active' : ''}`}
          onClick={() => setCurrentTab('study')}
        >
          <BookOpen size={24} />
          <span>Teoría</span>
        </button>
        <button 
          className={`nav-item ${currentTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setCurrentTab('quiz')}
        >
          <PenTool size={24} />
          <span>Test</span>
        </button>
        <button 
          className={`nav-item ${currentTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setCurrentTab('flashcards')}
        >
          <BrainCircuit size={24} />
          <span>Repaso</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
