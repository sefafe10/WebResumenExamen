import React, { useState } from 'react';
import { summaryData } from '../data/summaryData';
import { ChevronDown, ChevronUp } from 'lucide-react';

const StudyModule = () => {
  const [expandedId, setExpandedId] = useState(1);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="animate-fade-in">
      <h1>Módulo de Estudio</h1>
      <p className="text-center mb-4">Repasa los puntos clave del temario. Toca cada sección para desplegar su contenido.</p>
      
      <div className="grid">
        {summaryData.map((item) => (
          <div key={item.id} className="glass-card" style={{padding: '16px 24px'}}>
            <div 
              className="flex items-center justify-between" 
              onClick={() => toggleExpand(item.id)}
              style={{cursor: 'pointer'}}
            >
              <h3 style={{margin: 0, color: expandedId === item.id ? 'var(--accent)' : 'var(--text-main)'}}>
                {item.title}
              </h3>
              {expandedId === item.id ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedId === item.id && (
              <div className="mt-4 animate-fade-in" style={{whiteSpace: 'pre-wrap'}}>
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyModule;
