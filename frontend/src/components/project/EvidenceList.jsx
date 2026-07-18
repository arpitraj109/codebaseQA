import { useState } from "react";
import EmptyState from "../ui/EmptyState";
import Icon from "../ui/Icon";
import Skeleton from "../ui/Skeleton";
import EvidenceCard from "./EvidenceCard";

export default function EvidenceList({ evidence, loading }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Icon name="file" className="h-4 w-4" />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Evidence
          </h2>
        </div>
        <div className="mt-5 space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon name="file" className="h-4 w-4" />
        </span>
        <h2 className="text-xl font-bold tracking-tight text-slate-950">
          Evidence
        </h2>
      </div>

      {evidence?.length ? (
        <div className="mt-5 space-y-3">
          {evidence.map((item, index) => (
            <EvidenceCard
              key={`${item.file}-${item.startLine}-${index}`}
              item={item}
              active={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-5"
          icon="file"
          title="No evidence yet"
          description="Evidence will appear after an answer is generated."
        />
      )}
    </div>
  );
}
