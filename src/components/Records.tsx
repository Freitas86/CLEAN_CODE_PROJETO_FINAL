
import {
  CalendarDays,
  ChevronDown,
  Users,
} from "lucide-react";
import { PageHeading } from "./Shared";
import type { ClinicalNote, Patient } from "../types";
import {
  formatDate,
  getPatientName,
} from "../utils/clinicHelpers";

type RecordsProps = {
  notes: ClinicalNote[];
  patients: Patient[];
  onAdd: () => void;
  selectedPatient: string;
  onSelect: (id: string) => void;
};

export default function Records({
  notes,
  patients,
  onAdd,
  selectedPatient,
  onSelect,
}: RecordsProps) {
  const visibleNotes = notes.filter(
    (note) => !selectedPatient || note.patientId === selectedPatient
  );

  return <>
    <PageHeading
      eyebrow="ACOMPANHAMENTO CLÍNICO"
      title="Prontuários"
      description="Consulte e registre evoluções dos atendimentos."
      action={
        <button className="button primary" onClick={onAdd}>
          <span>+</span> Nova evolução
        </button>
      }
    />

    <section className="panel records-panel">
      <div className="list-toolbar">
        <div>
          <h2>Histórico de evoluções</h2>
          <p>Registros clínicos por paciente</p>
        </div>

        <label className="filter-select">
          <Users size={16} />
          <select
            value={selectedPatient}
            onChange={(event) => onSelect(event.target.value)}
          >
            <option value="">Todos os pacientes</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <ChevronDown size={15} />
        </label>
      </div>

      <div className="record-list">
        {visibleNotes.map((note) => (
          <article className="record-card" key={note.id}>
            <div className="record-date">
              <CalendarDays size={16} />
              <span>{formatDate(note.date)}</span>
            </div>

            <div className="record-content">
              <div className="record-title">
                <h3>{note.title}</h3>
                <span>{getPatientName(note.patientId, patients)}</span>
              </div>
              <p>{note.content}</p>
            </div>
          </article>
        ))}

        {visibleNotes.length === 0 && (
          <div className="empty-state">
            Nenhuma evolução encontrada para este filtro.
          </div>
        )}
      </div>
    </section>

    <p className="privacy-note">
      Ambiente demonstrativo. Utilize apenas dados fictícios; não registre informações clínicas reais.
    </p>
  </>;
}
