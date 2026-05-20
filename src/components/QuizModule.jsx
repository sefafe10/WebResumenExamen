import React, { useState } from 'react';
import { quizData } from '../data/quizData';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const QuizModule = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div className="animate-fade-in text-center glass-card">
        <h2>Resultado del Test</h2>
        <h1 style={{fontSize: '4rem', color: 'var(--accent)', margin: '20px 0'}}>
          {score} / {quizData.length}
        </h1>
        <p className="mb-4">
          {score === quizData.length 
            ? "¡Perfecto! Estás más que preparado para el examen." 
            : "¡Buen intento! Repasa un poco más las flashcards y vuelve a intentarlo."}
        </p>
        <button className="btn" onClick={restartQuiz}>
          <RotateCcw size={20} /> Reintentar Test
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2>Pregunta {currentQuestion + 1}/{quizData.length}</h2>
        <span style={{color: 'var(--accent)', fontWeight: 'bold'}}>Puntos: {score}</span>
      </div>

      <div className="glass-card">
        <h3 className="mb-4" style={{lineHeight: '1.4'}}>{quizData[currentQuestion].question}</h3>
        
        <div className="grid">
          {quizData[currentQuestion].options.map((option, index) => {
            let buttonStyle = {
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              textAlign: 'left',
              padding: '16px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: isAnswered ? 'default' : 'pointer',
              transition: 'all 0.2s ease'
            };

            let icon = null;

            if (isAnswered) {
              if (index === quizData[currentQuestion].correctAnswer) {
                buttonStyle.background = 'rgba(16, 185, 129, 0.2)';
                buttonStyle.borderColor = 'var(--success)';
                icon = <CheckCircle2 color="var(--success)" />;
              } else if (index === selectedAnswer) {
                buttonStyle.background = 'rgba(239, 68, 68, 0.2)';
                buttonStyle.borderColor = 'var(--danger)';
                icon = <XCircle color="var(--danger)" />;
              }
            }

            return (
              <button 
                key={index}
                style={buttonStyle}
                onClick={() => handleAnswerClick(index)}
              >
                <span>{option}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizModule;
