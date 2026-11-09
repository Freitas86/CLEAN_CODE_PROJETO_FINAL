import { Activity, CalendarDays, ClipboardList, LayoutDashboard, Users, X } from "lucide-react";

export type Page = "dashboard" | "patients" | "appointments" | "records";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  open: boolean;
  onClose: () => void;
}

const items = [
  { id: "dashboard", label: "Visão geral", icon: LayoutDashboard },
  { id: "appointments", label: "Consultas", icon: CalendarDays },
  { id: "patients", label: "Pacientes", icon: Users },
  { id: "records", label: "Prontuários", icon: ClipboardList },
] as const;

export default function Sidebar({ activePage, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {open && <button className="mobile-backdrop" aria-label="Fechar menu" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Activity size={21} /></div>
          <div><strong>ClinicFlow</strong><span>GESTÃO DE CONSULTÓRIO</span></div>
          <button className="icon-button mobile-close" onClick={onClose} aria-label="Fechar menu"><X size={18} /></button>
        </div>
        <div className="workspace-label">MENU PRINCIPAL</div>
        <nav className="nav-list">
          {items.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${activePage === id ? "active" : ""}`}
              onClick={() => { onNavigate(id); onClose(); }}>
              <Icon size={19} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-dot" /><div><strong>Seu consultório</strong><span>Plano demonstrativo</span></div></div>
          <div className="profile"><div className="avatar">BL</div><div><strong>Dra. Beatriz Lima</strong><span>Psicóloga</span></div><span className="profile-more">•••</span></div>
        </div>
      </aside>
    </>
  );
}
