import styles from "./styles.module.scss";
import { ViwerTemplateX as ViewTemplate } from "../../../components/index.components";
import { useProfilingQuizz } from "./useProfilingQuizz";
import { QuestionCard } from "./components/QuestionCard";
import { TraysRequisition } from "../TraysRequisition/TraysRequisition";
import { useEffect, useState } from "react";
import { APP_ENVIRONMENT } from "../../../config/consts";
import { useOperationStore } from "../../../stores/createModuleOperations";
import { useGetWebFormWithCampaign } from "../../../hooks/webforms/useGetWebFormWithCampaign";
import { useNavigate } from "react-router-dom";
import { generateUniqueId } from "../../../utils/uniqueIdGenerator";

interface ProfilingProps {
  applicationNumber?: number | null;
}

export const ProfilingRequisition = ({ applicationNumber }: ProfilingProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { requisition } = useOperationStore();
  const navigate = useNavigate();

  const { data: answersData, isLoading } = useGetWebFormWithCampaign(
    0,
    requisition.applicationNumber,
    requisition.campaignId
  );

  const {
    data: questionsData,
    setData,
    questions,
    stepsFilter,
    next,
    goTo,
    saveAnswer,
    currentStepIndex,
    isLastStep,
    answers,
    setAnswers,
    setCurrentStepIndex,
  } = useProfilingQuizz();

  const handleClose = () => navigate("/operations/operations-trays");

  useEffect(
    () => () => {
      handleClose();
    },
    []
  );

  // Get Answers of Application already answered
  useEffect(() => {
    if (answersData && !isLoaded) {
      if (answersData?.profiling === null) {
        setData([]);
        setAnswers([]);
        setCurrentStepIndex(0);
        setIsLoaded(true);
      }
      if (answersData?.profiling) {
        setData(answersData?.profiling);
        setAnswers(answersData?.profiling);
        setCurrentStepIndex(answersData?.profiling.length);
        setIsLoaded(true);
      }
    }
  }, [answersData, applicationNumber]);

  return (
    <>
      <ViewTemplate>
        <div className="d-flex">
          <div className={`${styles.containerQuizz}`}>
            {!isLoading && (
              <>
                {stepsFilter?.map(
                  (question, index) =>
                    index <= currentStepIndex && (
                      <QuestionCard
                        key={generateUniqueId()}
                        stepIndex={index}
                        currentStepIndex={currentStepIndex}
                        title={question.name}
                        answers={question.answers}
                        onNext={next}
                        onGoTo={goTo}
                        onSave={saveAnswer}
                        answer={questionsData[index]}
                      />
                    )
                )}
              </>
            )}
          </div>
          <div className={`${styles.containerWebForm} ${styles.bgContainer}`}>
            <TraysRequisition
              currentStepIndex={currentStepIndex}
              isLastStep={isLastStep}
              onNextQuestion={() => goTo(currentStepIndex + 1)}
              questions={questionsData}
            />
          </div>
        </div>
        {APP_ENVIRONMENT === "development" && (
          <>
            <div>
              currentStepIndex:
              <pre>{JSON.stringify(currentStepIndex)}</pre>
              data:
              <pre>{JSON.stringify(questionsData, null, 2)}</pre>
              answered:
              <pre>{JSON.stringify(answers, null, 2)}</pre>
              questions:
              <pre>{JSON.stringify(questions, null, 2)}</pre>
            </div>
          </>
        )}
      </ViewTemplate>
    </>
  );
};
