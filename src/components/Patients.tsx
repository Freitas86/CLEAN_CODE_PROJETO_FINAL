import { Plus } from "lucide-react";
import {
  PageHeading,
  SearchBox,
} from "./Shared";
import type { Patient } from "../types";
import {
  formatDate,
  getInitials,
} from "../utils/clinicHelpers";

type PatientsProps = {
  patients: Patient[];
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onOpen: (id: string) => void;
};

export default function Patients({
  patients,
  search,
  setSearch,
  onAdd,
  onDelete,
  onOpen,
}: PatientsProps) {
  return <>
    <PageHeading
      eyebrow="GESTÃO DO CONSULTÓRIO"
      title="Pacientes"
      description="Gerencie os cadastros e acompanhe as informações dos pacientes."
      action={
        <button className="button primary" onClick={onAdd}>
          <Plus size={17} /> Novo paciente
        </button>
      }
    />

    <section className="panel list-panel">
      <div className="list-toolbar">
        <div>
          <h2>Todos os pacientes</h2>
          <p>{patients.length} registros encontrados</p>
        </div>

        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Buscar paciente..."
        />
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Data de nascimento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <div className="table-person">
                    <div className="avatar pastel">
                      {getInitials(patient.name)}
                    </div>
                    <strong>{patient.name}</strong>
                  </div>
                </td>

                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{formatDate(patient.birthDate)}</td>

                <td>
                  <span className={`status ${patient.status === "Ativo" ? "active" : "inactive"}`}>
                    {patient.status}
                  </span>
                </td>

                <td>
                  <div className="row-actions">
                    <button onClick={() => onOpen(patient.id)}>
                      Prontuário
                    </button>
                    <button
                      className="danger-text"
                      onClick={() => onDelete(patient.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    Nenhum paciente encontrado.
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