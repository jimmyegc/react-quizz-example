import { useState } from 'react';

export const useQuiz = (initialQuestions, initialAnswers = []) => {
  const [questions] = useState(initialQuestions); // Lista de preguntas
  const [answers, setAnswers] = useState(initialAnswers); // Arreglo de respuestas ya contestadas

  // Determina el índice de la última pregunta contestada
  const initialIndex = initialAnswers.length > 0 ? initialAnswers.length - 1 : 0;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex); 

  // Función para seleccionar una respuesta
  const selectAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex(
        (ans) => ans.order === currentQuestionIndex + 1
      );

      const answerObject = {
        order: currentQuestionIndex + 1,
        question: questions[currentQuestionIndex].question,
        answer,
      };

      if (existingAnswerIndex !== -1) {
        // Si ya existe una respuesta para esta pregunta, actualízala
        updatedAnswers[existingAnswerIndex] = answerObject;
      } else {
        // Si no existe, agrega una nueva respuesta
        updatedAnswers.push(answerObject);
      }

      return updatedAnswers;
    });
  };

  // Función para ir a la siguiente pregunta
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Función para ir a la pregunta anterior
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Función para ir a una pregunta específica (si es necesario)
  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  return {
    questions,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
  };
};