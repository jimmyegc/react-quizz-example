import { motion } from "framer-motion";
import { useOperationStore } from "../../../../stores/createModuleOperations";
import styles from "./styles.module.scss";
import { AnswerSave } from "../useProfilingQuizz";
import { generateUniqueId } from "../../../../utils/uniqueIdGenerator";

interface WebformId {
  value?: number;
  label?: string;
}

interface Answer {
  action: "continue" | "webform";
  answer: string;
  webformId?: WebformId;
}

interface AnswerObj {
  order: number;
  question: string;
  answer: string;
}

interface QuestionCardProps {
  stepIndex: number;
  currentStepIndex: number;
  title: string;
  answers: Answer[];
  answer: AnswerObj;
  onNext: () => void;
  onGoTo: (index: number) => void;
  onSave: ({ order, question, answer }: AnswerSave) => void;
}

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
  const { requisition, setRequisition } = useOperationStore();

  const handleWebformNull = () => {
    const data = {
      ...requisition,
      webFormId: null,
    };
    setRequisition(data);
  };

  const onOptionChange = (answer, action, webformId) => {
    // console.log("onOptionChange requisition", requisition);
    const question = {
      order: currentStepIndex + 1,
      question: title,
      answer,
    };
    if (stepIndex != currentStepIndex) {
      onGoTo(stepIndex);
    }
    if (action === "continue") {
      // Continue
      onSave(question);
      handleWebformNull();
      onNext();
    } else {
      // Open WebForm
      onSave(question);
      const data = {
        ...requisition,
        webFormId: webformId.value,
      };
      setRequisition(data);
    }
  };

  const handleGoto = (idx) => {
    handleWebformNull();
    onGoTo(idx);
  };

  return (
    <motion.div
      key="questions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`border rounded w-100 p-1 ${
        stepIndex === currentStepIndex
          ? `${styles.questionActive}`
          : `${styles.questionInactive}`
      }`}
      style={{ cursor: "pointer" }}
      onClick={() => handleGoto(stepIndex)}
    >
      <div className="d-flex justify-content-between">
        <div>
          <h6 className={`mx-2 mt-2 ${styles.questionLabel}`}>{title}</h6>
          <div className="d-flex flex-column">
            {/* {JSON.stringify(answers)} */}
            {answers?.map((item, index) => (
              <div key={generateUniqueId()} className={`ms-3 mb-2 d-flex`}>
                <input
                  type="radio"
                  value={item.answer}
                  name={`radio-item_${stepIndex}`}
                  id={`default_answer${stepIndex}_${index}`}
                  onClick={() =>
                    onOptionChange(item.answer, item.action, item.webformId)
                  }
                  onChange={() =>
                    onOptionChange(item.answer, item.action, item.webformId)
                  }
                  checked={answer?.answer === item.answer}
                />
                <label
                  className={`ms-1 ${styles.label}`}
                  htmlFor={`default_answer${stepIndex}_${index}`}
                >
                  {item.answer}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex align-items-center me-2">
          <i
            className={`fa fa-arrow-flow ${
              stepIndex === currentStepIndex
                ? `${styles.iconActive}`
                : `${styles.iconInactive}`
            } `}
          />
        </div>
      </div>
    </motion.div>
  );
};
