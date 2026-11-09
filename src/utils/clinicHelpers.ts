import type { Patient } from "../types";

export function formatDate(date: string) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function getPatientName(patientId: string, patients: Patient[]) {
  return patients.find((patient) => patient.id === patientId)?.name
    ?? "Paciente não encontrado";
}

export function getInitials(name: string) {
  return name.split(" ").slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}