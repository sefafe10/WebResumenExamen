import React, { useState } from 'react';
import { flashcardsData } from '../data/flashcardsData';
import { ChevronLeft, ChevronRight, Rotate3D } from 'lucide-react';

const FlashcardsModule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 150);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-center">Flashcards</h1>
      <p className="text-center mb-4">Toca la tarjeta para ver la definición.</p>

      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="btn-secondary" style={{padding: '8px', borderRadius: '50%', border: 'none', color: 'var(--text-main)'}}>
          <ChevronLeft size={32} />
        </button>
        <span style={{color: 'var(--accent)', fontWeight: 'bold'}}>
          {currentIndex + 1} / {flashcardsData.length}
        </span>
        <button onClick={handleNext} className="btn-secondary" style={{padding: '8px', borderRadius: '50%', border: 'none', color: 'var(--text-main)'}}>
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="flashcard-face flashcard-front">
            <h2 style={{color: 'var(--accent)', fontSize: '2rem'}}>{flashcardsData[currentIndex].term}</h2>
            <Rotate3D size={24} color="var(--text-muted)" style={{marginTop: '20px'}} />
          </div>
          <div className="flashcard-face flashcard-back">
            <p style={{color: 'white', fontSize: '1.25rem', lineHeight: '1.4', margin: 0}}>
              {flashcardsData[currentIndex].definition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsModule;
