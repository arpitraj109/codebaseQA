import Card from "../ui/Card";
import QuestionForm from "./QuestionForm";
import AnswerCard from "./AnswerCard";
import EvidenceList from "./EvidenceList";

export default function QuestionWorkspace({
  questionText,
  onQuestionChange,
  onAsk,
  asking,
  selectedQuestion,
}) {
  return (
    <div className="space-y-6">
      <Card>
        <QuestionForm
          question={questionText}
          onQuestionChange={onQuestionChange}
          onAsk={onAsk}
          loading={asking}
        />
      </Card>

      <Card>
        <AnswerCard answer={selectedQuestion} loading={asking} />
      </Card>

      <Card>
        <EvidenceList evidence={selectedQuestion?.evidence} loading={asking} />
      </Card>
    </div>
  );
}