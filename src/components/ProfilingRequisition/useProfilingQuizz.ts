import { useEffect, useState } from "react"
import { useOperationStore } from "../../../stores/createModuleOperations";
import { useGetProfilingById } from "../../../hooks/profiling/index.hooks.profiling";

export interface AnswerSave {
  order: number;
  question: string;
  answer: string;
}

export const useProfilingQuizz = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)  
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [data, setData] = useState([])

  const {
    tray: { profilingId }    
  } = useOperationStore();
  
  const { data: questionsRequest } = useGetProfilingById(profilingId);

  const saveAnswer = ({ order, question, answer } : AnswerSave ) => {
    const answerUpdated = {
      order,
      question,
      answer
    }      
    const newArray = [...data]
    newArray[currentStepIndex] = answerUpdated    
    setData(newArray)
  }
  
  const next = () => {                        
    setCurrentStepIndex(i => {
      if(i>=questions.length-1) return i      
      return i + 1
    })
  }

  const back = () => {
    setCurrentStepIndex(i => {
      if(i<=0) return i
      return i - 1
    })
  }

  const goTo = (index: number) => {
    setCurrentStepIndex(index)
  }

  useEffect(()=> {
    if(questionsRequest) setQuestions(JSON.parse(questionsRequest.questionnaireJSON))          
  },[questionsRequest])
  
  return {
    currentStepIndex,
    step: questions[currentStepIndex],    
    stepsFilter: questions.filter((_,index) => index <= currentStepIndex),    
    questions,
    data,
    setData,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === questions.length-1,
    goTo,
    next,
    back,
    saveAnswer,    
    setCurrentStepIndex,    
    setQuestions,
    answers,    
    setAnswers,        
  }
}