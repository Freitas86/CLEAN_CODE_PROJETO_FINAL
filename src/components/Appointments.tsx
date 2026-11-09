
import { Plus } from "lucide-react";
import {
  PageHeading,
  SearchBox,
} from "./Shared";
import type { Appointment, Patient } from "../types";
import {
  formatDate,
  getPatientName,
} from "../utils/clinicHelpers";

type AppointmentsProps = {
  appointments: Appointment[];
  patients: Patient[];
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
  onStatus: (id: string, status: Appointment["status"]) => void;
};

export default function Appointments({
  appointments,
  patients,
  search,
  setSearch,
  onAdd,
  onStatus,
}: AppointmentsProps) {
  return <>
    <PageHeading
      eyebrow="ORGANIZAÇÃO DA AGENDA"
      title="Consultas"
      description="Visualize e gerencie os atendimentos do consultório."
      action={
        <button className="button primary" onClick={onAdd}>
          <Plus size={17} /> Nova consulta
        </button>
      }
    />

    <section className="panel list-panel">
      <div className="list-toolbar">
        <div>
          <h2>Todos os atendimentos</h2>
          <p>{appointments.length} consultas registradas</p>
        </div>

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Buscar por paciente..."
        />
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Atendimento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {appointments
              .sort((a, b) =>
                `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{getPatientName(item.patientId, patients)}</strong>
                  </td>
                  <td>{formatDate(item.date)}</td>
                  <td>{item.time}</td>
                  <td>{item.type}</td>
                  <td>
                    <span className={`status ${
                      item.status === "Concluída"
                        ? "completed"
                        : item.status === "Cancelada"
                          ? "inactive"
                          : "scheduled"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === "Agendada" && (
                      <div className="row-actions">
                        <button onClick={() => onStatus(item.id, "Concluída")}>
                          Concluir
                        </button>
                        <button
                          className="danger-text"
                          onClick={() => onStatus(item.id, "Cancelada")}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    Nenhuma consulta encontrada.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  </>;
}
