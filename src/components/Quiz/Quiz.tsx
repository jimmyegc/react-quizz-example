import { useEffect, useId, useMemo, useState } from "react"

import { mockData } from './ProfilingMockQuestions'
import { QuestionCard } from "./QuestionCard/QuestionCard"
import { AnswerSave } from "./QuizModel"

export const Quiz = () => {
  
  const [questions, setQuestions] = useState([])  
  const [answers, setAnswers] = useState([])
  const [data, setData] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState()  

  const generateUniqueId = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
    }); 
  };

  const filteredQuestions = useMemo( () => {
    return questions.filter((_, index) => index < (currentStepIndex === null ? currentStepIndex : 1));
}, [currentStepIndex] );

const back = () => {
  setCurrentStepIndex(i => {
    if(i<=0) return i
    return i - 1
  })
}

const next = () => {                        
  setCurrentStepIndex(i => {
    if(i>=questions.length-1) return i      
    return i + 1
  })
}

const goTo = (index: number) => {
  setCurrentStepIndex(index)
}

const saveAnswer = ({ order, question, answer } : AnswerSave ) => {
  const answerUpdated = { order, question, answer }      
  console.log("saveAnswer", answerUpdated)
  //const  = [...data]

  //alert(currentStepIndex)
  //const newArray = (currentStepIndex === undefined) ? [...answerUpdated] : [...data, data[currentStepIndex]];  
  setData([answerUpdated, ...data])
}
  
  const load = () => {
    setQuestions(mockData);
    (data.length > 0) ? setCurrentStepIndex(data.length) : setCurrentStepIndex(0)
  }
  
  useEffect(()=> {
    load();
  },[])

  return (<div>     
    Paso #{currentStepIndex+1}
    {filteredQuestions.map((question, index) => 
      (
      <QuestionCard 
        key={generateUniqueId()}
        stepIndex={index+1}
        currentStepIndex={currentStepIndex}
        title={question.name}
        answers={question.answers}
        onNext={next}
        onGoTo={goTo}
        onSave={saveAnswer}
        answer={questions[currentStepIndex]}
      />))}
    
    
    <br />
    <button onClick={() => goTo(1)}>First</button>
    <button onClick={back}>Back</button>
    <button onClick={next}>Next</button>
    <button>Load</button>
    <button>Save</button>
    <pre>
    {JSON.stringify(data, null, 2)}</pre>
  </div>)
}