import Icon from "../ui/Icon";
import Card from "../ui/Card";

const workflow = [
  { title: "Upload Repository", icon: "upload" },
  { title: "Ask Questions", icon: "bot" },
  { title: "Review Evidence", icon: "file" },
];

export default function Hero() {
  return (
    <section className="grid gap-8 py-6 lg:grid-cols-[1fr_430px] lg:items-center lg:py-10">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
          <Icon name="check" className="h-4 w-4 text-emerald-600" />
          AI answers backed by source evidence
        </div>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Understand any codebase with answers you can verify.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-900">
          Import a repository, ask focused engineering questions, and inspect the exact files and lines behind each answer.
        </p>

        <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
          {workflow.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {step.title}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold text-slate-400">
                Step {index + 1}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-slate-950 p-5 text-white shadow-md">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300">
              Preview
            </span>
          </div>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-white p-4 text-slate-900 shadow-lg shadow-black/10">
              <div className="flex items-center gap-2">
                <Icon name="bot" className="h-5 w-5 text-slate-500" />
                <p className="text-sm font-semibold">How are API calls handled?</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                API calls are centralized through an Axios client, then exposed through project-specific service functions.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
                <Icon name="file" className="h-4 w-4 text-slate-300" />
                <p className="text-sm text-slate-100">src/api/projects.js</p>
              </div>
              <div className="space-y-2 p-4 text-xs text-slate-400">
                <p><span className="text-slate-500">12</span> export const getProject = async...</p>
                <p><span className="text-slate-500">17</span> export const askQuestion = async...</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
