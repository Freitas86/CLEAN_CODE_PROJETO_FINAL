
import { Field } from "./Shared";

interface PatientFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function PatientForm({
  onSubmit,
  onCancel,
}: PatientFormProps) {
  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <Field
        label="Nome completo"
        name="name"
        placeholder="Ex.: Ana Souza"
        required
      />

      <Field
        label="E-mail"
        name="email"
        type="email"
        placeholder="ana@email.com"
        required
      />

      <Field
        label="Telefone"
        name="phone"
        placeholder="(00) 00000-0000"
        required
      />

      <Field
        label="Data de nascimento"
        name="birthDate"
        type="date"
        required
      />

      <div className="form-actions">
        <button
          type="button"
          className="button secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button className="button primary" type="submit">
          Salvar paciente
        </button>
      </div>
    </form>
  );
}
