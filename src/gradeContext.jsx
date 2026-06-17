import React, { createContext, useContext, useState, useEffect } from 'react';

const GradeContext = createContext();

export function GradeProvider({ children }) {
  const [grade, setGrade] = useState(() => {
    return localStorage.getItem('selected_grade') || '10';
  });

  useEffect(() => {
    localStorage.setItem('selected_grade', grade);
    // Custom event to notify other tabs/components if needed
    window.dispatchEvent(new Event('gradeChanged'));
  }, [grade]);

  return (
    <GradeContext.Provider value={{ grade, setGrade }}>
      {children}
    </GradeContext.Provider>
  );
}

export function useGrade() {
  const context = useContext(GradeContext);
  if (!context) {
    throw new Error('useGrade must be used within a GradeProvider');
  }
  return context;
}
