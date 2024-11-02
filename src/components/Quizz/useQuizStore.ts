import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  currentQuestionIndex: 0,
  answers: [],
  
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.answers.length)
  })),
  
  prevQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
  })),
  
  goToQuestion: (index) => set({ currentQuestionIndex: index }),
  
  selectAnswer: (question, answer) => set((state) => {
    const newAnswers = [...state.answers];
    const order = state.currentQuestionIndex + 1;
    
    newAnswers[order - 1] = { order, question, answer }; // Include question text
    return { answers: newAnswers };
  }),

  setAnswers: (newAnswers) => set({ answers: newAnswers }), // Set the answers directly
  
  resetQuiz: () => set({ currentQuestionIndex: 0, answers: [] }),
}));

