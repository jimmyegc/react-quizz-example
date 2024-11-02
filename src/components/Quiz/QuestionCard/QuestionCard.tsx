import { QuestionCardProps } from "../QuizModel"
import styles from './styles.module.scss'

export const QuestionCard = ({
  stepIndex,
  currentStepIndex,
  title,
  answers,
  answer,
  onNext,
  onGoTo,
  onSave,
}: QuestionCardProps) => {

  const generateUniqueId = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
    }); 
  };

  const handleWebformNull = () => {
    /*const data = {
      ...requisition,
      webFormId: null,
    };
    setRequisition(data); */
  };

  const onOptionChange = (step, answer, action, webformId) => {
    // console.log("onOptionChange requisition", requisition);
    const question = {
      order: currentStepIndex+1,
      question: title,
      answer,
    };
    console.table(question)
    if (step != currentStepIndex) {
      onGoTo(stepIndex);
    }     
    if (action === "continue") {      
      onSave(question);
      //handleWebformNull();
      onNext();
    } else {      
      onSave(question);
      /*const data = {
        ...requisition,
        webFormId: webformId.value,
      };*/
      //setRequisition(data);
    } 
  };

  const handleGoto = (idx) => {
    handleWebformNull();
    onGoTo(idx);
  };


  return (
    <div
    style={{ border: '1px solid blue'}}
    >      
      <h2>{title}</h2>
      <div>
      
      <br />
      <div>
        <label className={styles.container}>
          <input type="radio" checked name="radio" />
          <span className={styles.checkmark}></span>One
        </label>
      </div>
      <div>
        <label className={styles.container}>
          <input type="radio" name="radio" />
          <span className={styles.checkmark}></span>Two
        </label>
      </div>
      { answers?.map(({ answer, action, webformId }, index) => {
        const key = generateUniqueId();
        return (
          <div 
            key={key} 
            className={`ms-3 mb-2 d-flex`}
            style={{ cursor: 'pointer', border: '1px solid red', padding: 10 }}
          >           
            {stepIndex} 
            <label
              className={`ms-1 ${styles.label}`}
              htmlFor={`default_answer${currentStepIndex}_${index}`}
            >
              <input
                  type="radio"
                  value={answer}
                  name={`radio-item_${currentStepIndex}`}
                  id={`default_answer${currentStepIndex}_${index}`}
                  onClick={() => onOptionChange(stepIndex, answer, action, webformId)}
                  onChange={() => onOptionChange(stepIndex, answer, action, webformId)}
                  checked={answer === answer}
              />                                  
              <span className="checkmark"></span>{answer}
            </label>
          </div>
        )}
      )}
      </div>     
    </div>
  )
}
