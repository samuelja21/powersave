export function PowerSaveLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="200" height="200" rx="44" fill="#248838" />
      <polygon points="115,30 70,108 98,108 85,170 138,88 108,88" fill="white" />
    </svg>
  )
}
