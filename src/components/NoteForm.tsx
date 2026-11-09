
import type { Patient } from "../types";
import { Field } from "./Shared";

interface NoteFormProps {
  patients: Patient[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function NoteForm({
  patients,
  onSubmit,
  onCancel,
}: NoteFormProps) {
  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <label className="field full">
        <span>Paciente</span>
        <select name="patientId" required defaultValue="">
          <option value="" disabled>
            Selecione um paciente
          </option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </label>

      <Field
        label="Título"
        name="title"
        placeholder="Ex.: Evolução semanal"
        required
      />

      <label className="field full">
        <span>Descrição da evolução</span>
        <textarea
          name="content"
          rows={5}
          placeholder="Registre a evolução do atendimento..."
          required
        />
      </label>

      <div className="form-actions">
        <button
          type="button"
          className="button secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button className="button primary" type="submit">
          Salvar evolução
        </button>
      </div>
    </form>
  );
}
