import type { Appointment, ClinicalNote, Patient } from "../types";

export const initialPatients: Patient[] = [
  { id: "p-101", name: "Mariana Costa", email: "mariana@email.com", phone: "(48) 99912-3456", birthDate: "1994-05-18", status: "Ativo", createdAt: "2026-02-12" },
  { id: "p-102", name: "Rafael Mendes", email: "rafael@email.com", phone: "(48) 99876-1234", birthDate: "1988-11-03", status: "Ativo", createdAt: "2026-03-02" },
  { id: "p-103", name: "Camila Oliveira", email: "camila@email.com", phone: "(48) 99123-9876", birthDate: "2001-08-27", status: "Ativo", createdAt: "2026-04-21" },
  { id: "p-104", name: "Lucas Ferreira", email: "lucas@email.com", phone: "(48) 99222-4444", birthDate: "1990-01-14", status: "Inativo", createdAt: "2026-01-09" },
  { id: "p-105", name: "Beatriz Santos", email: "bia@email.com", phone: "(48) 99777-8888", birthDate: "1997-06-09", status: "Ativo", createdAt: "2026-05-11" },
];

export const initialAppointments: Appointment[] = [
  { id: "a-201", patientId: "p-101", date: "2026-11-09", time: "09:00", type: "Psicoterapia", status: "Agendada", notes: "" },
  { id: "a-202", patientId: "p-102", date: "2026-11-09", time: "10:00", type: "Acompanhamento", status: "Agendada", notes: "" },
  { id: "a-203", patientId: "p-103", date: "2026-11-09", time: "11:30", type: "Psicoterapia", status: "Concluída", notes: "Sessão realizada." },
  { id: "a-204", patientId: "p-105", date: "2026-11-10", time: "14:00", type: "Avaliação inicial", status: "Agendada", notes: "" },
  { id: "a-205", patientId: "p-101", date: "2026-11-11", time: "09:00", type: "Psicoterapia", status: "Agendada", notes: "" },
];

export const initialNotes: ClinicalNote[] = [
  { id: "n-301", patientId: "p-101", date: "2026-11-02", title: "Evolução semanal", content: "Paciente relatou avanços na organização da rotina. Manter acompanhamento das estratégias combinadas." },
  { id: "n-302", patientId: "p-102", date: "2026-10-29", title: "Acompanhamento", content: "Realizada revisão dos objetivos definidos no início do acompanhamento." },
];
