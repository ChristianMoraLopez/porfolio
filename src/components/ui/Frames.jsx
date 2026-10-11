// Marcos de ventana para las portadas: navegador (proyectos web) y app de
// escritorio estilo Windows (proyectos Tauri).
export function BrowserFrame({ url, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/30 ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-bg-soft px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto w-full max-w-xs truncate rounded-md bg-surface px-3 py-1 text-center font-mono text-[10px] text-muted">
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  )
}

export function DesktopFrame({ title, children, className = '', dark = true }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-2xl shadow-black/30 ${
        dark ? 'border-white/10 bg-[#0b1220] text-slate-200' : 'border-line-strong bg-surface'
      } ${className}`}
    >
      <div className={`flex items-center justify-between px-3 py-2 text-[10px] ${dark ? 'bg-white/5' : 'bg-bg-soft'}`}>
        <span className="font-mono tracking-wide opacity-70">{title}</span>
        <span className="flex gap-3 font-mono opacity-50">
          <span>—</span>
          <span>☐</span>
          <span>✕</span>
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  )
}
