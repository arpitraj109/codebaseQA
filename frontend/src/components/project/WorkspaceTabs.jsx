export default function WorkspaceTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "questions", label: "Ask Questions" },
    { id: "refactor", label: "Refactor Suggestions" },
  ];

  return (
    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition duration-200 ${
            activeTab === tab.id
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}