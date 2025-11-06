import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  unlockedCheckpoints: number[];
  unlockCheckpoint: (index: number) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedCheckpoints, setUnlockedCheckpoints] = useState<number[]>(() => {
    const saved = localStorage.getItem('checkpointProgress');
    return saved ? JSON.parse(saved) : [0]; // First checkpoint is always unlocked
  });

  useEffect(() => {
    localStorage.setItem('checkpointProgress', JSON.stringify(unlockedCheckpoints));
  }, [unlockedCheckpoints]);

  const unlockCheckpoint = (index: number) => {
    if (!unlockedCheckpoints.includes(index)) {
      setUnlockedCheckpoints([...unlockedCheckpoints, index]);
    }
  };

  const resetProgress = () => {
    setUnlockedCheckpoints([0]);
    localStorage.removeItem('checkpointProgress');
  };

  return (
    <ProgressContext.Provider value={{ unlockedCheckpoints, unlockCheckpoint, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
