import { useEffect, useState } from "react";
//import { useQuiz } from "./useQuiz";
import {useQuizStore} from './useQuizStore.ts';
import './Quizz.css'

const questions = [
  { id: 1, question: "¿Cuál es tu color favorito?", options: ["Rojo", "Azul", "Verde"] },
  { id: 2, question: "¿Cuál es tu animal favorito?", options: ["Perro", "Gato", "Pájaro"] },
  { id: 3, question: "¿Cuál es tu comida favorita?", options: ["Pizza", "Sushi", "Tacos"] },
];

const initialAnswers = [
  { order: 1, question: "¿Cuál es tu color favorito?", answer: "Azul" },
];

export const Quizz = () => {
  const {
    currentQuestionIndex,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
  } = useQuizStore();

  const [animate, setAnimate] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // Estado para controlar si la pregunta está bloqueada

  const handleAnswerSelect = (question, option) => {
    selectAnswer(question, option);
    nextQuestion(); // Avanzar automáticamente a la siguiente pregunta
  };

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, [currentQuestionIndex]);

  return (
    <div>
      <h1>Quiz</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {questions.map((question, index) => {
          const isCurrent = index === currentQuestionIndex;
          const isAnswered = answers.some((answer) => answer.order === index + 1);
          const isUnlocked = index <= answers.length; // Una pregunta se considera desbloqueada si ha sido respondida

          // Solo mostrar preguntas que han sido respondidas o la pregunta actual
          if (!isUnlocked && !isCurrent) return null;

          const selectedAnswer = answers.find(answer => answer.order === index + 1)?.answer;

          return (
            <div
              key={question.id}
              onClick={() => isUnlocked && goToQuestion(index)}
              className={`fade-in ${isCurrent && animate ? 'fade-in-active' : ''}`}
              style={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: isCurrent ? "#f0f8ff" : isAnswered ? "#e6f7e6" : "#fff",
                cursor: isUnlocked ? "pointer" : "not-allowed",
                position: "relative",
                boxShadow: isCurrent ? "0 0 10px rgba(0, 123, 255, 0.5)" : "0 0 5px rgba(0,0,0,0.1)",
                opacity: isAnswered || isCurrent ? 1 : 0.5
              }}
            >
              <span style={{ position: "absolute", top: "10px", right: "10px" }}>
                {isCurrent ? "🔵" : isAnswered ? "✔️" : ""}
              </span>
              <h3>{`Pregunta ${index + 1}`}</h3>
              <p>{question.question}</p>

              <div>
                {question.options.map(option => (
                  <label key={option} style={{ display: "block", margin: "5px 0", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={option === selectedAnswer}
                      onChange={() => handleAnswerSelect(question.question, option)} // Manejar selección de respuesta
                      style={{ marginRight: "10px", marginBottom: "10px" }}
                    />
                    <span style={{ color: option === selectedAnswer ? 'blue' : 'black' }}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
          Anterior
        </button>
        <button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Siguiente
        </button>
      </div>

      <h3>Respuestas:</h3>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  );
};