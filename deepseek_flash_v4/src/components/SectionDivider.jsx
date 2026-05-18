export default function SectionDivider() {
  return (
    <div className="relative h-24 md:h-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent" />
      <svg
        className="absolute bottom-0 w-full h-16 md:h-20 text-neural-950 fill-current"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" opacity="0.03" />
        <path d="M0,50 C360,20 1080,60 1440,30 L1440,80 L0,80 Z" opacity="0.02" />
      </svg>
    </div>
  )
}
