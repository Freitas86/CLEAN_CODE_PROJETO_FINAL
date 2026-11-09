
import { CalendarDays, Check, Plus, Users } from "lucide-react";
import {
  ActivityIcon,
  PageHeading,
  StatCard,
} from "./Shared";
import type { Appointment, Patient } from "../types";
import {
  formatDate,
  getInitials,
  getPatientName,
} from "../utils/clinicHelpers";

type DashboardData = {
  patients: Patient[];
  appointments: Appointment[];
  activePatients: number;
  completed: number;
  upcoming: number;
};

type DashboardActions = {
  onNewAppointment: () => void;
  onNewPatient: () => void;
  onFinish: (id: string) => void;
};

type DashboardProps = {
  data: DashboardData;
  actions: DashboardActions;
};

export default function Dashboard({ data, actions }: DashboardProps) {
  const {
    patients,
    appointments,
    activePatients,
    completed,
    upcoming,
  } = data;

  const {
    onNewAppointment,
    onNewPatient,
    onFinish,
  } = actions;

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
