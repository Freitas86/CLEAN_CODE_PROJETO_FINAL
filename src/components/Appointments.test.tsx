
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Appointments from "./Appointments";
import type { Appointment, Patient } from "../types";

describe("Appointments", () => {
  it("aplica a classe visual correspondente a cada status", () => {
    const patients: Patient[] = [
      {
        id: "p-1",
        name: "Mariana Costa",
        email: "mariana@example.com",
        phone: "48999990000",
        birthDate: "1990-05-10",
        status: "Ativo",
        createdAt: "2026-01-01",
      },
    ];

    const appointments: Appointment[] = [
      {
        id: "a-1",
        patientId: "p-1",
        date: "2026-11-10",
        time: "09:00",
        type: "Consulta",
        status: "Agendada",
        notes: "",
      },
      {
        id: "a-2",
        patientId: "p-1",
        date: "2026-11-10",
        time: "10:00",
        type: "Consulta",
        status: "Concluída",
        notes: "",
      },
      {
        id: "a-3",
        patientId: "p-1",
        date: "2026-11-10",
        time: "11:00",
        type: "Consulta",
        status: "Cancelada",
        notes: "",
      },
    ];

    render(
      <Appointments
        appointments={appointments}
        patients={patients}
        search=""
        setSearch={vi.fn()}
        onAdd={vi.fn()}
        onStatus={vi.fn()}
      />
    );

    expect(screen.getByText("Agendada")).toHaveClass("scheduled");
    expect(screen.getByText("Concluída")).toHaveClass("completed");
    expect(screen.getByText("Cancelada")).toHaveClass("inactive");
  });
});
