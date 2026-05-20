import React, { useState, useMemo } from 'react';
import { quizByTopic } from '../data/quizData';
import { CheckCircle2, XCircle, RotateCcw, ArrowLeft, Shuffle } from 'lucide-react';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TOPICS = [
  { id: 1, emoji: "🧬", label: "Tema 1: Introducción y Piel" },
  { id: 2, emoji: "⚗️", label: "Tema 2: Obtención y Curtición" },
  { id: 3, emoji: "🏷️", label: "Tema 3: Secciones y Tipos" },
  { id: 4, emoji: "✂️", label: "Tema 4: Confección y Acabados" },
  { id: "all", emoji: "🔀", label: "Todos los temas mezclados" },
];

const QuizModule = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);

  const startQuiz = (topicId) => {
    let pool = [];
    if (topicId === "all") {
      Object.values(quizByTopic).forEach(t => pool.push(...t.questions));
    } else {
      pool = [...quizByTopic[topicId].questions];
    }
    const shuffled = shuffleArray(pool).slice(0, 10);
    // Also shuffle each question's options
    const prepared = shuffled.map(q => {
      const indexedOptions = q.options.map((text, idx) => ({ text, isCorrect: idx === q.correctAnswer }));
      const shuffledOpts = shuffleArray(indexedOptions);
      return {
        question: q.question,
        options: shuffledOpts.map(o => o.text),
        correctAnswer: shuffledOpts.findIndex(o => o.isCorrect)
      };
    });
    setQuestions(prepared);
    setSelectedTopic(topicId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnswers([]);
  };

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    const isCorrect = index === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, {
      question: questions[currentQuestion].question,
      selected: questions[currentQuestion].options[index],
      correct: questions[currentQuestion].options[questions[currentQuestion].correctAnswer],
      isCorrect
    }]);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(c => c + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const goBack = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setShowResult(false);
  };

  // --- TOPIC SELECTOR ---
  if (!selectedTopic) {
    return (
      <div className="animate-fade-in">
        <h1>Test de Examen</h1>
        <p className="text-center mb-4">Elige un tema o haz un examen mezclado con preguntas de todos los temas. Se seleccionarán 10 preguntas aleatorias.</p>
        <div className="grid">
          {TOPICS.map(t => (
            <button
              key={t.id}
              className="glass-card"
              onClick={() => startQuiz(t.id)}
              style={{ cursor: 'pointer', textAlign: 'left', border: 'none', width: '100%' }}
            >
              <div className="flex items-center" style={{ gap: '12px' }}>
                <span style={{ fontSize: '2rem' }}>{t.emoji}</span>
                <h3 style={{ margin: 0, color: 'var(--text-main)' }}>{t.label}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- RESULTS ---
  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    let emoji, msg;
    if (pct === 100) { emoji = "🏆"; msg = "¡Perfecto! Estás más que preparado/a."; }
    else if (pct >= 70) { emoji = "😊"; msg = "¡Muy bien! Repasa un poquito más los fallos."; }
    else if (pct >= 50) { emoji = "📖"; msg = "Vas por buen camino. Dale otra vuelta a la teoría."; }
    else { emoji = "💪"; msg = "¡Ánimo! Revisa la teoría y las flashcards y vuelve a intentarlo."; }

    return (
      <div className="animate-fade-in">
        <div className="glass-card text-center mb-4">
          <span style={{ fontSize: '4rem' }}>{emoji}</span>
          <h1 style={{ fontSize: '3.5rem', color: pct >= 70 ? 'var(--success)' : 'var(--accent)', margin: '12px 0' }}>
            {score} / {questions.length}
          </h1>
          <p style={{ fontSize: '1.1rem' }}>{msg}</p>
          <div className="flex" style={{ flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
            <button className="btn" onClick={() => startQuiz(selectedTopic)}>
              <RotateCcw size={18} /> Reintentar
            </button>
            <button className="btn btn-secondary" onClick={goBack}>
              <ArrowLeft size={18} /> Elegir otro tema
            </button>
          </div>
        </div>

        <h2>Repaso de respuestas</h2>
        <div className="grid">
          {answers.map((a, i) => (
            <div key={i} className="glass-card" style={{ borderLeft: `4px solid ${a.isCorrect ? 'var(--success)' : 'var(--danger)'}` }}>
              <p style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '8px' }}>{i + 1}. {a.question}</p>
              {!a.isCorrect && (
                <p style={{ color: 'var(--danger)', margin: '4px 0' }}>Tu respuesta: {a.selected}</p>
              )}
              <p style={{ color: 'var(--success)', margin: '4px 0' }}>Correcta: {a.correct}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- QUIZ ---
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={18} /> Volver
        </button>
        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
          {currentQuestion + 1}/{questions.length} · Aciertos: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }}>
        <div style={{ width: `${progress}%`, height: '100%', borderRadius: '3px', background: 'var(--accent)', transition: 'width 0.4s ease' }} />
      </div>

      <div className="glass-card">
        <h3 className="mb-4" style={{ lineHeight: '1.5' }}>{questions[currentQuestion].question}</h3>
        <div className="grid">
          {questions[currentQuestion].options.map((option, index) => {
            let bg = 'rgba(255, 255, 255, 0.05)';
            let border = '1px solid var(--glass-border)';
            let icon = null;

            if (isAnswered) {
              if (index === questions[currentQuestion].correctAnswer) {
                bg = 'rgba(16, 185, 129, 0.2)';
                border = '1px solid var(--success)';
                icon = <CheckCircle2 size={20} color="var(--success)" />;
              } else if (index === selectedAnswer) {
                bg = 'rgba(239, 68, 68, 0.2)';
                border = '1px solid var(--danger)';
                icon = <XCircle size={20} color="var(--danger)" />;
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                style={{
                  background: bg,
                  border,
                  color: 'var(--text-main)',
                  textAlign: 'left',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '1rem',
                  width: '100%',
                  fontFamily: 'inherit'
                }}
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
