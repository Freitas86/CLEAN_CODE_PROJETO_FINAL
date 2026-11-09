import { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  Bell, CalendarDays, Check, ChevronDown,
  Menu, Plus, Users, X,
} from "lucide-react";
import {
  ActivityIcon,
  Field,
  PageHeading,
  SearchBox,
  StatCard,
} from "./components/Shared";
import Sidebar, { type Page } from "./components/Sidebar";
import Modal from "./components/Modal";
import { initialAppointments, initialNotes, initialPatients } from "./data/seed";
import type { Appointment, ClinicalNote, Patient } from "./types";

const STORAGE_KEYS = { patients: "clinicflow-patients", appointments: "clinicflow-appointments", notes: "clinicflow-notes" };

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function formatDate(date: string) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

function getPatientName(patientId: string, patients: Patient[]) {
  return patients.find((patient) => patient.id === patientId)?.name ?? "Paciente não encontrado";
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [patients, setPatients] = useLocalStorage(STORAGE_KEYS.patients, initialPatients);
  const [appointments, setAppointments] = useLocalStorage(STORAGE_KEYS.appointments, initialAppointments);
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.notes, initialNotes);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"patient" | "appointment" | "note" | null>(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");

  const today = "2026-11-09";
  const todaysAppointments = useMemo(() => appointments
    .filter((item) => item.date === today && item.status !== "Cancelada")
    .sort((a, b) => a.time.localeCompare(b.time)), [appointments]);
  const activePatients = patients.filter((patient) => patient.status === "Ativo").length;
  const completed = appointments.filter((item) => item.status === "Concluída").length;
  const upcoming = appointments.filter((item) => item.status === "Agendada").length;

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function addPatient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const patient: Patient = {
      id: makeId("p"), name: String(form.get("name")).trim(), email: String(form.get("email")).trim(),
      phone: String(form.get("phone")).trim(), birthDate: String(form.get("birthDate")),
      status: "Ativo", createdAt: today,
    };
    setPatients((current) => [patient, ...current]);
    setModal(null); notify("Paciente cadastrado com sucesso.");
  }

  function addAppointment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const appointment: Appointment = {
      id: makeId("a"), patientId: String(form.get("patientId")), date: String(form.get("date")),
      time: String(form.get("time")), type: String(form.get("type")),
      status: "Agendada", notes: "",
    };
    setAppointments((current) => [...current, appointment]);
    setModal(null); notify("Consulta agendada com sucesso.");
  }

  function addNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const note: ClinicalNote = {
      id: makeId("n"), patientId: String(form.get("patientId")), date: today,
      title: String(form.get("title")).trim(), content: String(form.get("content")).trim(),
    };
    setNotes((current) => [note, ...current]);
    setModal(null); notify("Evolução registrada com sucesso.");
  }

  function updateAppointmentStatus(id: string, status: Appointment["status"]) {
    setAppointments((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    notify(status === "Concluída" ? "Consulta marcada como concluída." : "Consulta cancelada.");
  }

  function removePatient(id: string) {
    if (!window.confirm("Deseja realmente excluir este paciente?")) return;
    setPatients((current) => current.filter((patient) => patient.id !== id));
    notify("Paciente removido.");
  }

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.email} ${patient.phone}`.toLowerCase().includes(search.toLowerCase()));
  const filteredAppointments = appointments.filter((item) =>
    getPatientName(item.patientId, patients).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={(page) => { setActivePage(page); setSearch(""); }}
        open={mobileMenu} onClose={() => setMobileMenu(false)} />
      <main className="main-area">
        <header className="topbar">
          <button className="icon-button menu-trigger" onClick={() => setMobileMenu(true)} aria-label="Abrir menu"><Menu size={21} /></button>
          <div className="breadcrumb">Clínica <span>/</span> <strong>{pageTitle(activePage)}</strong></div>
          <div className="topbar-actions"><button className="icon-button notification" aria-label="Notificações"><Bell size={19} /><i /></button>
            <div className="topbar-date">Segunda-feira, 09 de novembro</div><div className="avatar small">BL</div></div>
        </header>
        <div className="content">
          {activePage === "dashboard" && <Dashboard patients={patients} appointments={todaysAppointments}
            activePatients={activePatients} completed={completed} upcoming={upcoming}
            onNewAppointment={() => setModal("appointment")} onNewPatient={() => setModal("patient")}
            onFinish={(id) => updateAppointmentStatus(id, "Concluída")} />}
          {activePage === "patients" && <Patients patients={filteredPatients} search={search} setSearch={setSearch}
            onAdd={() => setModal("patient")} onDelete={removePatient} onOpen={(id) => { setSelectedPatient(id); setActivePage("records"); }} />}
          {activePage === "appointments" && <Appointments appointments={filteredAppointments} patients={patients}
            search={search} setSearch={setSearch} onAdd={() => setModal("appointment")}
            onStatus={updateAppointmentStatus} />}
          {activePage === "records" && <Records notes={notes} patients={patients} onAdd={() => setModal("note")}
            selectedPatient={selectedPatient} onSelect={setSelectedPatient} />}
        </div>
      </main>
      {modal === "patient" && <Modal title="Novo paciente" subtitle="Preencha os dados para cadastrar um paciente." onClose={() => setModal(null)}>
        <form className="form-grid" onSubmit={addPatient}>
          <Field label="Nome completo" name="name" placeholder="Ex.: Ana Souza" required />
          <Field label="E-mail" name="email" type="email" placeholder="ana@email.com" required />
          <Field label="Telefone" name="phone" placeholder="(00) 00000-0000" required />
          <Field label="Data de nascimento" name="birthDate" type="date" required />
          <div className="form-actions"><button type="button" className="button secondary" onClick={() => setModal(null)}>Cancelar</button><button className="button primary" type="submit">Salvar paciente</button></div>
        </form>
      </Modal>}
      {modal === "appointment" && <Modal title="Agendar consulta" subtitle="Organize um novo horário na agenda." onClose={() => setModal(null)}>
        <form className="form-grid" onSubmit={addAppointment}>
          <label className="field full"><span>Paciente</span><select name="patientId" required defaultValue=""><option value="" disabled>Selecione um paciente</option>{patients.filter((p) => p.status === "Ativo").map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <Field label="Data" name="date" type="date" required />
          <Field label="Horário" name="time" type="time" required />
          <label className="field full"><span>Tipo de atendimento</span><select name="type"><option>Psicoterapia</option><option>Acompanhamento</option><option>Avaliação inicial</option><option>Retorno</option></select></label>
          <div className="form-actions"><button type="button" className="button secondary" onClick={() => setModal(null)}>Cancelar</button><button className="button primary" type="submit">Confirmar agendamento</button></div>
        </form>
      </Modal>}
      {modal === "note" && <Modal title="Nova evolução" subtitle="Registre informações relevantes do atendimento." onClose={() => setModal(null)}>
        <form className="form-grid" onSubmit={addNote}>
          <label className="field full"><span>Paciente</span><select name="patientId" required defaultValue=""><option value="" disabled>Selecione um paciente</option>{patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <Field label="Título" name="title" placeholder="Ex.: Evolução semanal" required />
          <label className="field full"><span>Descrição da evolução</span><textarea name="content" rows={5} placeholder="Registre a evolução do atendimento..." required /></label>
          <div className="form-actions"><button type="button" className="button secondary" onClick={() => setModal(null)}>Cancelar</button><button className="button primary" type="submit">Salvar evolução</button></div>
        </form>
      </Modal>}
      {toast && <div className="toast"><Check size={17} />{toast}<button onClick={() => setToast("")} aria-label="Fechar"><X size={15} /></button></div>}
    </div>
  );
}

function pageTitle(page: Page) {
  if (page === "patients") return "Pacientes";
  if (page === "appointments") return "Consultas";
  if (page === "records") return "Prontuários";
  return "Visão geral";
}

function Dashboard({ patients, appointments, activePatients, completed, upcoming, onNewAppointment, onNewPatient, onFinish }: {
  patients: Patient[]; appointments: Appointment[]; activePatients: number; completed: number; upcoming: number;
  onNewAppointment: () => void; onNewPatient: () => void; onFinish: (id: string) => void;
}) {
  return <>
    <PageHeading eyebrow="SEGUNDA-FEIRA, 09 DE NOVEMBRO DE 2026" title="Bom dia, Beatriz"
      description="Aqui está um resumo do que acontece no seu consultório hoje."
      action={<button className="button primary" onClick={onNewAppointment}><Plus size={17} /> Nova consulta</button>} />
    <div className="stats-grid">
      <StatCard label="Pacientes ativos" value={String(activePatients)} detail="+2 neste mês" icon={<Users />} trend="up" />
      <StatCard label="Consultas agendadas" value={String(upcoming)} detail="Na agenda" icon={<CalendarDays />} trend="up" />
      <StatCard label="Consultas concluídas" value={String(completed)} detail="No histórico" icon={<Check />} trend="down" />
      <StatCard label="Total de pacientes" value={String(patients.length)} detail="Cadastros realizados" icon={<ActivityIcon />} trend="up" />
    </div>
    <div className="dashboard-grid">
      <section className="panel appointments-panel">
        <div className="panel-heading"><div><h2>Agenda de hoje</h2><p>Seus próximos atendimentos</p></div><button className="text-button" onClick={onNewAppointment}>Adicionar horário <Plus size={15} /></button></div>
        <div className="appointment-list">
          {appointments.length === 0 && <div className="empty-state">Nenhuma consulta para hoje.</div>}
          {appointments.map((item) => <div className="appointment-row" key={item.id}>
            <div className="time-block"><strong>{item.time}</strong><span>{item.type}</span></div>
            <div className="appointment-person"><div className="avatar pastel">{getInitials(getPatientName(item.patientId, patients))}</div><div><strong>{getPatientName(item.patientId, patients)}</strong><span>{item.status === "Concluída" ? "Atendimento finalizado" : "Consulta presencial"}</span></div></div>
            {item.status === "Concluída" ? <span className="status completed">Concluída</span> : <button className="finish-button" onClick={() => onFinish(item.id)}>Finalizar <Check size={14} /></button>}
          </div>)}
        </div>
      </section>
      <section className="panel quick-panel"><div className="panel-heading"><div><h2>Acesso rápido</h2><p>Atalhos para sua rotina</p></div></div>
        <button className="quick-action" onClick={onNewPatient}><div className="quick-icon lavender"><Users size={19} /></div><span><strong>Cadastrar paciente</strong><small>Adicione uma pessoa ao consultório</small></span><Plus size={17} /></button>
        <button className="quick-action" onClick={onNewAppointment}><div className="quick-icon mint"><CalendarDays size={19} /></div><span><strong>Agendar consulta</strong><small>Organize os próximos horários</small></span><Plus size={17} /></button>
        <div className="tip-card"><div className="tip-icon">i</div><div><strong>Dica da semana</strong><p>Mantenha os prontuários atualizados após cada atendimento para facilitar o acompanhamento.</p></div></div>
      </section>
    </div>
    <section className="panel recent-panel"><div className="panel-heading"><div><h2>Pacientes recentes</h2><p>Últimos cadastros no sistema</p></div><span className="muted-link">{patients.length} pacientes</span></div>
      <div className="table-wrap"><table><thead><tr><th>Paciente</th><th>Contato</th><th>Cadastro</th><th>Status</th></tr></thead><tbody>
        {patients.slice(0, 4).map((patient) => <tr key={patient.id}><td><div className="table-person"><div className="avatar pastel">{getInitials(patient.name)}</div><strong>{patient.name}</strong></div></td><td>{patient.email}</td><td>{formatDate(patient.createdAt)}</td><td><span className={`status ${patient.status === "Ativo" ? "active" : "inactive"}`}>{patient.status}</span></td></tr>)}
      </tbody></table></div>
    </section>
  </>;
}

function Patients({ patients, search, setSearch, onAdd, onDelete, onOpen }: {
  patients: Patient[]; search: string; setSearch: (value: string) => void; onAdd: () => void;
  onDelete: (id: string) => void; onOpen: (id: string) => void;
}) {
  return <>
    <PageHeading eyebrow="GESTÃO DO CONSULTÓRIO" title="Pacientes" description="Gerencie os cadastros e acompanhe as informações dos pacientes."
      action={<button className="button primary" onClick={onAdd}><Plus size={17} /> Novo paciente</button>} />
    <section className="panel list-panel"><div className="list-toolbar"><div><h2>Todos os pacientes</h2><p>{patients.length} registros encontrados</p></div><SearchBox value={search} onChange={setSearch} placeholder="Buscar paciente..." /></div>
      <div className="table-wrap"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Data de nascimento</th><th>Status</th><th>Ações</th></tr></thead><tbody>
        {patients.map((patient) => <tr key={patient.id}><td><div className="table-person"><div className="avatar pastel">{getInitials(patient.name)}</div><strong>{patient.name}</strong></div></td><td>{patient.email}</td><td>{patient.phone}</td><td>{formatDate(patient.birthDate)}</td><td><span className={`status ${patient.status === "Ativo" ? "active" : "inactive"}`}>{patient.status}</span></td><td><div className="row-actions"><button onClick={() => onOpen(patient.id)}>Prontuário</button><button className="danger-text" onClick={() => onDelete(patient.id)}>Excluir</button></div></td></tr>)}
        {patients.length === 0 && <tr><td colSpan={6}><div className="empty-state">Nenhum paciente encontrado.</div></td></tr>}
      </tbody></table></div>
    </section>
  </>;
}

function Appointments({ appointments, patients, search, setSearch, onAdd, onStatus }: {
  appointments: Appointment[]; patients: Patient[]; search: string; setSearch: (value: string) => void;
  onAdd: () => void; onStatus: (id: string, status: Appointment["status"]) => void;
}) {
  return <>
    <PageHeading eyebrow="ORGANIZAÇÃO DA AGENDA" title="Consultas" description="Visualize e gerencie os atendimentos do consultório."
      action={<button className="button primary" onClick={onAdd}><Plus size={17} /> Nova consulta</button>} />
    <section className="panel list-panel"><div className="list-toolbar"><div><h2>Todos os atendimentos</h2><p>{appointments.length} consultas registradas</p></div><SearchBox value={search} onChange={setSearch} placeholder="Buscar por paciente..." /></div>
      <div className="table-wrap"><table><thead><tr><th>Paciente</th><th>Data</th><th>Horário</th><th>Atendimento</th><th>Status</th><th>Ações</th></tr></thead><tbody>
        {appointments.sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).map((item) => <tr key={item.id}><td><strong>{getPatientName(item.patientId, patients)}</strong></td><td>{formatDate(item.date)}</td><td>{item.time}</td><td>{item.type}</td><td><span className={`status ${item.status === "Concluída" ? "completed" : item.status === "Cancelada" ? "inactive" : "scheduled"}`}>{item.status}</span></td><td>{item.status === "Agendada" && <div className="row-actions"><button onClick={() => onStatus(item.id, "Concluída")}>Concluir</button><button className="danger-text" onClick={() => onStatus(item.id, "Cancelada")}>Cancelar</button></div>}</td></tr>)}
        {appointments.length === 0 && <tr><td colSpan={6}><div className="empty-state">Nenhuma consulta encontrada.</div></td></tr>}
      </tbody></table></div>
    </section>
  </>;
}

function Records({ notes, patients, onAdd, selectedPatient, onSelect }: {
  notes: ClinicalNote[]; patients: Patient[]; onAdd: () => void; selectedPatient: string; onSelect: (id: string) => void;
}) {
  const visibleNotes = notes.filter((note) => !selectedPatient || note.patientId === selectedPatient);
  return <>
    <PageHeading eyebrow="ACOMPANHAMENTO CLÍNICO" title="Prontuários" description="Consulte e registre evoluções dos atendimentos."
      action={<button className="button primary" onClick={onAdd}><Plus size={17} /> Nova evolução</button>} />
    <section className="panel records-panel"><div className="list-toolbar"><div><h2>Histórico de evoluções</h2><p>Registros clínicos por paciente</p></div>
      <label className="filter-select"><Users size={16} /><select value={selectedPatient} onChange={(event) => onSelect(event.target.value)}><option value="">Todos os pacientes</option>{patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select><ChevronDown size={15} /></label>
    </div>
      <div className="record-list">{visibleNotes.map((note) => <article className="record-card" key={note.id}><div className="record-date"><CalendarDays size={16} /><span>{formatDate(note.date)}</span></div><div className="record-content"><div className="record-title"><h3>{note.title}</h3><span>{getPatientName(note.patientId, patients)}</span></div><p>{note.content}</p></div></article>)}
        {visibleNotes.length === 0 && <div className="empty-state">Nenhuma evolução encontrada para este filtro.</div>}</div>
    </section>
    <p className="privacy-note">Ambiente demonstrativo. Utilize apenas dados fictícios; não registre informações clínicas reais.</p>
  </>;
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}
