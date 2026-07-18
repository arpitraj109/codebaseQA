import { useState } from "react";
import WorkspaceTabs from "./WorkspaceTabs";
import QuestionWorkspace from "./QuestionWorkspace";
import RefactorWorkspace from "./RefactorWorkspace";

export default function AIWorkspace({
  projectId,
  questionText,
  onQuestionChange,
  onAsk,
  asking,
  selectedQuestion,
}) {
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="space-y-6">
      <WorkspaceTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={activeTab === "questions" ? "block" : "hidden"}>
        <QuestionWorkspace
          questionText={questionText}
          onQuestionChange={onQuestionChange}
          onAsk={onAsk}
          asking={asking}
          selectedQuestion={selectedQuestion}
        />
      </div>

      <div className={activeTab === "refactor" ? "block" : "hidden"}>
        <RefactorWorkspace projectId={projectId} />
      </div>
    </div>
  );
}
