const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-4",
};

export default function Spinner({ size = "md", className = "" }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-current border-r-transparent ${sizes[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
