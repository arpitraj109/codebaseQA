const paths = {
  archive: (
    <>
      <path d="M4 7h16" />
      <path d="M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
      <path d="M8 3h8l2 4H6l2-4Z" />
      <path d="M10 12h4" />
    </>
  ),
  bot: (
    <>
      <path d="M12 8V4" />
      <path d="M8 4h8" />
      <rect x="5" y="8" width="14" height="10" rx="3" />
      <path d="M9 13h.01" />
      <path d="M15 13h.01" />
      <path d="M9 18v2" />
      <path d="M15 18v2" />
    </>
  ),
  check: (
    <path d="m5 12 4 4L19 6" />
  ),
  code: (
    <>
      <path d="m9 18-6-6 6-6" />
      <path d="m15 6 6 6-6 6" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </>
  ),
  git: (
    <>
      <path d="M15 4h2a3 3 0 0 1 3 3v2" />
      <path d="M9 20H7a3 3 0 0 1-3-3v-2" />
      <path d="M14 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
      <path d="M14 20a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
      <path d="M12 6v12" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-5 1.5-5-2.5-7-3" />
      <path d="M15 22v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7a4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.6 3.5 5.6 3.8 5.6 3.8A4.3 4.3 0 0 0 5.5 7a4.7 4.7 0 0 0-1.3 3.2c0 4.7 2.9 5.7 5.6 6A3 3 0 0 0 9 18.5V22" />
    </>
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M20 16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
    </>
  ),
};

export default function Icon({ name, className = "", title }) {
  return (
    <svg
      className={className}
      fill="none"
      role={title ? "img" : "presentation"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : "true"}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
