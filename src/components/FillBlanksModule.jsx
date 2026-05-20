import React, { useState } from 'react';
import { fillBlanksData } from '../data/fillBlanksData';
import { CheckCircle2, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';

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

const FillBlanksModule = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const startGame = (topicId) => {
    let pool = [];
    if (topicId === "all") {
      pool = [...fillBlanksData];
    } else {
      pool = fillBlanksData.filter(q => q.topic === topicId);
    }
    const shuffled = shuffleArray(pool).slice(0, 10);
    const prepared = shuffled.map(q => {
      const shuffledOpts = shuffleArray(q.options);
      return { ...q, options: shuffledOpts };
    });
    setQuestions(prepared);
    setSelectedTopic(topicId);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowResult(false);
    setAnswers([]);
  };

  const handleSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === questions[currentIndex].answer;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, {
      sentence: questions[currentIndex].sentence,
      selected: option,
      correct: questions[currentIndex].answer,
      isCorrect
    }]);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(i => i + 1);
        setSelectedOption(null);
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
        <h1>Completar Frases</h1>
        <p className="text-center mb-4">Rellena la palabra que falta en cada frase. Elige un tema o mezcla todos.</p>
        <div className="grid">
          {TOPICS.map(t => (
            <button
              key={t.id}
              className="glass-card"
              onClick={() => startGame(t.id)}
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
    if (pct === 100) { emoji = "🏆"; msg = "¡Perfecto! Dominas todos los conceptos."; }
    else if (pct >= 70) { emoji = "😊"; msg = "¡Genial! Solo unos pocos fallos."; }
    else if (pct >= 50) { emoji = "📖"; msg = "Vas bien, repasa los huecos que fallaste."; }
    else { emoji = "💪"; msg = "¡Ánimo! Vuelve a la teoría y flashcards."; }

    return (
      <div className="animate-fade-in">
        <div className="glass-card text-center mb-4">
          <span style={{ fontSize: '4rem' }}>{emoji}</span>
          <h1 style={{ fontSize: '3.5rem', color: pct >= 70 ? 'var(--success)' : 'var(--accent)', margin: '12px 0' }}>
            {score} / {questions.length}
          </h1>
          <p style={{ fontSize: '1.1rem' }}>{msg}</p>
          <div className="flex" style={{ flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
            <button className="btn" onClick={() => startGame(selectedTopic)}>
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
              <p style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '8px', lineHeight: '1.5' }}>
                {a.sentence.replace('________', a.isCorrect ? `✅ ${a.correct}` : `❌ ${a.selected}`)}
              </p>
              {!a.isCorrect && (
                <p style={{ color: 'var(--success)', margin: '4px 0' }}>Respuesta correcta: <strong>{a.correct}</strong></p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- GAME ---
  const q = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  // Highlight the blank in the sentence
  const parts = q.sentence.split('________');

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={18} /> Volver
        </button>
        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
          {currentIndex + 1}/{questions.length} · Aciertos: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }}>
        <div style={{ width: `${progress}%`, height: '100%', borderRadius: '3px', background: 'var(--accent)', transition: 'width 0.4s ease' }} />
      </div>

      <div className="glass-card mb-4">
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', textAlign: 'center' }}>
          {parts[0]}
          <span style={{
            display: 'inline-block',
            minWidth: '100px',
            borderBottom: '3px solid var(--accent)',
            margin: '0 6px',
            padding: '2px 8px',
            color: isAnswered
              ? (selectedOption === q.answer ? 'var(--success)' : 'var(--danger)')
              : 'var(--accent)',
            fontWeight: 700,
            fontSize: '1.3rem',
            transition: 'color 0.3s'
          }}>
            {isAnswered ? (selectedOption === q.answer ? q.answer : selectedOption) : '?'}
          </span>
          {parts[1]}
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {q.options.map((option, i) => {
          let bg = 'rgba(255, 255, 255, 0.05)';
          let border = '1px solid var(--glass-border)';
          let icon = null;

          if (isAnswered) {
            if (option === q.answer) {
              bg = 'rgba(16, 185, 129, 0.2)';
              border = '1px solid var(--success)';
              icon = <CheckCircle2 size={16} color="var(--success)" />;
            } else if (option === selectedOption) {
              bg = 'rgba(239, 68, 68, 0.2)';
              border = '1px solid var(--danger)';
              icon = <XCircle size={16} color="var(--danger)" />;
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              style={{
                background: bg,
                border,
                color: 'var(--text-main)',
                padding: '14px 12px',
                borderRadius: '10px',
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textAlign: 'center'
              }}
            >
              {option} {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FillBlanksModule;
