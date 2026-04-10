import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import data from './data.json';

const App = () => {
  const [currentScreenId, setCurrentScreenId] = useState('root');
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentScreen = data.screens[currentScreenId] || data.screens['root'];

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [currentScreenId]);

  const handleCardClick = (card) => {
    if (expandedCardId === card.id) {
      setExpandedCardId(null);
      return;
    }

    if (card.nextId && !card.question) {
      setCurrentScreenId(card.nextId);
      setExpandedCardId(null);
    } else {
      setExpandedCardId(card.id);
    }
  };

  const handleBack = () => {
    if (currentScreenId !== 'root') {
      setCurrentScreenId('root');
      setExpandedCardId(null);
    }
  };

  const handleQuestionClick = (nextId) => {
    if (nextId) {
      setCurrentScreenId(nextId);
      setExpandedCardId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#0f1115]">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[#00e676] font-bold text-xl"
        >
          BHC
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto shadow-2xl relative overflow-hidden bg-[#0f1115]">
      {/* Header */}
      <header className="px-6 pt-12 pb-4">
        {currentScreenId !== 'root' && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="flex items-center text-[#8b949e] text-sm mb-4 cursor-pointer"
          >
            <ArrowLeft size={16} className="mr-1" />
            {currentScreen.breadcrumb.join(' > ')}
          </motion.div>
        )}
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           key={currentScreenId + 'title'}
        >
          <span className="text-[#00e676] font-semibold text-sm tracking-widest uppercase">{currentScreen.brand}</span>
          <h1 className="text-3xl font-bold mt-1">{currentScreen.title}</h1>
          {currentScreen.subtitle && <p className="text-[#8b949e] mt-2 text-sm">{currentScreen.subtitle}</p>}
        </motion.div>
      </header>

      {/* Card Grid */}
      <main className="flex-1 px-4 py-4 grid grid-cols-2 gap-4 auto-rows-fr content-start">
        <AnimatePresence mode="popLayout">
          {currentScreen.cards.map((card, index) => (
            <Card 
              key={card.id} 
              card={card} 
              isExpanded={expandedCardId === card.id}
              onClick={() => handleCardClick(card)}
              hasSiblingsExpanded={expandedCardId !== null && expandedCardId !== card.id}
            />
          ))}
        </AnimatePresence>
      </main>

      {/* Bottom Exploration Question */}
      <AnimatePresence>
        {expandedCardId && currentScreen.cards.find(c => c.id === expandedCardId)?.question && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="absolute bottom-10 left-0 right-0 px-6 z-20"
          >
            <button 
              onClick={() => handleQuestionClick(currentScreen.cards.find(c => c.id === expandedCardId).nextId)}
              className="w-full bg-[#1a1d23] border border-[#ffffff10] py-5 rounded-2xl flex items-center justify-between px-6 shadow-2xl active:scale-95 transition-transform"
            >
              <span className="text-white text-lg font-medium">
                {currentScreen.cards.find(c => c.id === expandedCardId).question}
              </span>
              <ChevronRight className="text-[#00e676]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .h-full { height: 100%; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .pt-12 { padding-top: 3rem; }
        .pb-4 { padding-bottom: 1rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mr-1 { margin-right: 0.25rem; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .gap-4 { gap: 1rem; }
        .flex-1 { flex: 1; }
        .max-w-md { max-width: 28rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .bottom-10 { bottom: 2.5rem; }
        .left-0 { left: 0; }
        .right-0 { right: 0; }
        .z-20 { z-index: 20; }
        .w-full { width: 100%; }
        .rounded-2xl { border-radius: 1rem; }
        .justify-between { justify-content: space-between; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .text-3xl { font-size: 1.875rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
        .text-sm { font-size: 0.875rem; }
        .tracking-widest { letter-spacing: 0.1em; }
        .uppercase { text-transform: uppercase; }
        .cursor-pointer { cursor: pointer; }
      `}</style>
    </div>
  );
};

const Card = ({ card, isExpanded, onClick, hasSiblingsExpanded }) => {
  const colorMap = {
    red: '#ff4d4d',
    green: '#00e676',
    yellow: '#ffca28'
  };

  return (
    <motion.div
      layout
      animate={{
        opacity: hasSiblingsExpanded ? 0.3 : 1,
        scale: isExpanded ? 1.05 : 1,
        zIndex: isExpanded ? 10 : 1,
        gridColumn: isExpanded ? 'span 2' : 'span 1',
        gridRow: isExpanded ? 'span 2' : 'span 1',
        height: isExpanded ? 'auto' : '100%'
      }}
      onClick={onClick}
      className={`
        relative p-5 rounded-3xl cursor-pointer overflow-hidden
        ${isExpanded ? 'bg-[#1a1d23]' : 'bg-[#1a1d23]'}
        border border-[#ffffff08]
      `}
      style={{
        boxShadow: isExpanded ? '0 20px 40px rgba(0,0,0,0.4)' : 'none'
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <motion.div layout>
          <motion.div 
            layout="position"
            style={{ color: colorMap[card.color] || 'white' }}
            className={`font-bold leading-tight ${isExpanded ? 'text-4xl' : 'text-2xl'}`}
          >
            {card.value}
          </motion.div>
          <motion.div 
            layout="position"
            className="text-white font-medium mt-1 text-sm opacity-80"
          >
            {card.label}
          </motion.div>
        </motion.div>

        <motion.div 
          layout="position"
          className={`text-[#8b949e] text-xs mt-3 ${isExpanded ? '' : 'line-clamp-2'}`}
        >
          {card.desc}
        </motion.div>
      </div>

      {/* Decorative gradient */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at top right, ${colorMap[card.color]}, transparent 70%)` 
        }}
      />
    </motion.div>
  );
};

export default App;
