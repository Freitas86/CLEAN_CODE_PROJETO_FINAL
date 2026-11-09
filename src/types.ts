export type PatientStatus = "Ativo" | "Inativo";
export type AppointmentStatus = "Agendada" | "Concluída" | "Cancelada";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  status: PatientStatus;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: AppointmentStatus;
  notes: string;
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  date: string;
  title: string;
  content: string;
}
