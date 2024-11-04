import { useEffect, useState } from "react";
import { useQuizStore } from './useQuizStore.ts';
import './Quizz.css';
import { motion } from "framer-motion";

const questions = [
  { id: 1, question: "¿Cuál es tu color favorito?", options: ["Rojo", "Azul", "Verde"] },
  { id: 2, question: "¿Cuál es tu animal favorito?", options: ["Perro", "Gato", "Pájaro"] },
  { id: 3, question: "¿Cuál es tu comida favorita?", options: ["Pizza", "Sushi", "Tacos"] },
];

export const Quizz = () => {
  const {
    currentQuestionIndex,
    answers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    saveAdditionalInfo 
  } = useQuizStore();

  const [selectedOption, setSelectedOption] = useState(null);
  const [additionalInput, setAdditionalInput] = useState(""); // Estado para el input adicional

  const handleAnswerSelect = (question, option) => {
    setSelectedOption(option);
    selectAnswer(question, option); // Selecciona la respuesta
  };

  const handleContinue = () => {
    if (selectedOption) {
      saveAdditionalInfo(currentQuestionIndex + 1, additionalInput);
      setAdditionalInput(""); // Reinicia el input adicional para la próxima pregunta
      setSelectedOption(null); // Reinicia la opción seleccionada
      nextQuestion(); // Avanza a la siguiente pregunta
    }
  };

  // Verificar si la pregunta actual ha sido respondida
  const isCurrentQuestionAnswered = answers.some(
    answer => answer.order === currentQuestionIndex + 1
  );


  return (
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Lado izquierdo: Lista de preguntas contestadas y la actual */}
        <div style={{ flex: 1 }}>
          <h1>Lista de Preguntas</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {questions.map((question, index) => {
              const isCurrent = index === currentQuestionIndex;
              const isAnswered = answers.some(answer => answer.order === index + 1);
              const isUnlocked = index <= answers.length; // La pregunta es desbloqueada si ha sido respondida

              // Mostrar solo preguntas contestadas y la pregunta actual
              if (!isAnswered && !isCurrent) return null;

              const selectedAnswer = answers.find(answer => answer.order === index + 1)?.answer;

              return (
                <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.35 }}
              >
                <div
                  key={question.id}
                  onClick={() => isAnswered ? goToQuestion(index) : null} // Permitir clic solo en preguntas contestadas
                  style={{
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: isCurrent ? "#f0f8ff" : "#e6f7e6",
                    cursor: isAnswered ? "pointer" : "default",
                    position: "relative",
                    boxShadow: isCurrent ? "0 0 10px rgba(0, 123, 255, 0.5)" : "0 0 5px rgba(0,0,0,0.1)"
                  }}
                >
                  <h3>{`Pregunta ${index + 1}`}</h3>
                  <p>{question.question}</p>

                  {/* Opciones de respuesta directamente en la pregunta */}
                  <div>
                    
                    {question.options.map(option => (
                       
                      <label key={option} style={{ display: "block", margin: "5px 0", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={option === (isCurrent ? selectedOption : selectedAnswer)}
                          onChange={() => handleAnswerSelect(question.question, option)} // Manejar selección de respuesta
                          style={{ marginRight: "10px" }}
                        />
                        <span style={{ color: option === (isCurrent ? selectedOption : selectedAnswer) ? 'blue' : 'black' }}>
                          {option}
                        </span>
                      </label>
                      
                    ))}
                  </div>
                </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lado derecho: Formulario adicional (solo visible si la pregunta actual ha sido contestada) */}
        {isCurrentQuestionAnswered && (
          <div style={{ flex: 1 }}>
            <h1>Información Adicional</h1>
            <div
              style={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 0 10px rgba(0, 123, 255, 0.5)"
              }}
            >
              <label style={{ display: "block", margin: "15px 0 5px" }}>
                Información adicional:
                <input
                  type="text"
                  value={additionalInput}
                  onChange={(e) => setAdditionalInput(e.target.value)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                />
              </label>
              <button onClick={handleContinue} style={{ marginTop: "10px" }}>
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
      <pre>
        {JSON.stringify(answers, null, 2)}
      </pre>      
    </>
  );
};
