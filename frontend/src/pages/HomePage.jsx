import UploadForm from "../components/home/UploadForm";
import GithubForm from "../components/home/GithubForm";
import Card from "../components/ui/Card";
import Hero from "../components/home/Hero";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <Hero />

      <section className="grid gap-8 pb-12 lg:grid-cols-[1fr_auto_1fr] items-stretch">
        <Card className="h-full">
          <UploadForm />
        </Card>

       <div className="hidden lg:flex items-center justify-center px-2">
  <div className="flex items-center gap-3">
    <div className="h-px w-12 bg-slate-300" />
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
      OR
    </span>
    <div className="h-px w-12 bg-slate-300" />
  </div>
</div>

        <Card className="h-full">
          <GithubForm />
        </Card>
      </section>
    </div>
  );
}
