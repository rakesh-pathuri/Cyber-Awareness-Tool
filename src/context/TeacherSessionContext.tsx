import React, { createContext, useContext, useState } from 'react';

// Define the structure of a slide/step in the teacher presentation
export interface PresentationStep {
  id: string;
  type: 'explain' | 'demo' | 'poll' | 'reveal';
  title: string;
  studentViewContent?: React.ReactNode; 
  teacherNotes: string;
}

export interface LessonConfig {
  id: string;
  title: string;
  durationMinutes: number;
  steps: PresentationStep[];
}

interface TeacherSessionState {
  activeLesson: LessonConfig | null;
  currentStepIndex: number;
  startLesson: (lesson: LessonConfig) => void;
  nextStep: () => void;
  prevStep: () => void;
  endLesson: () => void;
}

const TeacherSessionContext = createContext<TeacherSessionState | undefined>(undefined);

export function TeacherSessionProvider({ children }: { children: React.ReactNode }) {
  const [activeLesson, setActiveLesson] = useState<LessonConfig | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startLesson = (lesson: LessonConfig) => {
    setActiveLesson(lesson);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    if (activeLesson && currentStepIndex < activeLesson.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const endLesson = () => {
    setActiveLesson(null);
    setCurrentStepIndex(0);
  };

  return (
    <TeacherSessionContext.Provider value={{
      activeLesson,
      currentStepIndex,
      startLesson,
      nextStep,
      prevStep,
      endLesson
    }}>
      {children}
    </TeacherSessionContext.Provider>
  );
}

export function useTeacherSession() {
  const context = useContext(TeacherSessionContext);
  if (context === undefined) {
    throw new Error('useTeacherSession must be used within a TeacherSessionProvider');
  }
  return context;
}
