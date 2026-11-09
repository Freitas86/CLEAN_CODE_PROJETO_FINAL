
import { Field } from "./Shared";
import type { Patient } from "../types";

interface AppointmentFormProps {
  patients: Patient[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function AppointmentForm({
  patients,
  onSubmit,
  onCancel,
}: AppointmentFormProps) {
  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <label className="field full">
        <span>Paciente</span>
        <select name="patientId" required defaultValue="">
          <option value="" disabled>
            Selecione um paciente
          </option>
          {patients
            .filter((patient) => patient.status === "Ativo")
            .map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
        </select>
      </label>

      <Field label="Data" name="date" type="date" required />

      <Field label="Horário" name="time" type="time" required />

      <label className="field full">
        <span>Tipo de atendimento</span>
        <select name="type">
          <option>Psicoterapia</option>
          <option>Acompanhamento</option>
          <option>Avaliação inicial</option>
          <option>Retorno</option>
        </select>
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
          Confirmar agendamento
        </button>
      </div>
    </form>
  );
}
