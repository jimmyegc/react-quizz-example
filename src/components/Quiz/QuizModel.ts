
export interface WebformId {
  value?: number;
  label?: string;
}

export interface Answer {
  action: "continue" | "webform";
  answer: string;
  webformId?: WebformId;
}

export interface AnswerSave {
  order: number;
  question: string;
  answer: string;
}

export interface AnswerObj {
  order: number;
  question: string;
  answer: string;
}

export interface QuestionCardProps {
  stepIndex: number;
  currentStepIndex: number;
  title: string;
  answers: Answer[];
  answer: AnswerObj;
  onNext: () => void;
  onGoTo: (index: number) => void;
  onSave: ({ order, question, answer }: AnswerSave) => void;
}