import { useEffect, useRef } from "react";

export default function Textarea({
  value,
  autoResize = false,
  className = "",
  onChange,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!autoResize || !ref.current) return;

    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [autoResize, value]);

  return (
    <textarea
      {...props}
      ref={ref}
      value={value}
      onChange={onChange}
      className={`min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 ${className}`}
    />
  );
}
