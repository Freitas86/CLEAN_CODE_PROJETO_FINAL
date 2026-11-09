import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

describe("ClinicFlow", () => {
  it("exibe o painel inicial com os indicadores do consultório", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Bom dia, Beatriz" })).toBeInTheDocument();
    expect(screen.getByText("Pacientes ativos")).toBeInTheDocument();
    expect(screen.getByText("Agenda de hoje")).toBeInTheDocument();
  });

  it("filtra pacientes pelo texto informado na busca", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Pacientes" }));

    const search = screen.getByPlaceholderText("Buscar paciente...");
    fireEvent.change(search, { target: { value: "Mariana" } });

    expect(screen.getByText("Mariana Costa")).toBeInTheDocument();
    expect(screen.queryByText("Rafael Mendes")).not.toBeInTheDocument();
  });

  it("cadastra um paciente e persiste os dados no armazenamento local", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Pacientes" }));
    fireEvent.click(screen.getByRole("button", { name: "Novo paciente" }));

    fireEvent.change(screen.getByLabelText("Nome completo"), { target: { value: "Joana Teste" } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "joana@example.com" } });
    fireEvent.change(screen.getByLabelText("Telefone"), { target: { value: "48999990000" } });
    fireEvent.change(screen.getByLabelText("Data de nascimento"), { target: { value: "1995-04-12" } });
    fireEvent.click(screen.getByRole("button", { name: "Salvar paciente" }));

    expect(screen.getByText("Joana Teste")).toBeInTheDocument();
    const storedPatients = JSON.parse(localStorage.getItem("clinicflow-patients") ?? "[]");
    expect(storedPatients).toHaveLength(6);
    expect(storedPatients[0].name).toBe("Joana Teste");
  });

  it("permite concluir uma consulta agendada", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Consultas" }));

    
	const appointmentRow = screen
	  .getAllByText("Mariana Costa")
	  .map((element) => element.closest("tr"))
	  .find((row): row is HTMLTableRowElement => row !== null);

	expect(appointmentRow).not.toBeNull();

	fireEvent.click(
	  within(appointmentRow as HTMLElement).getByRole("button", { name: "Concluir" })
	);


    expect(within(appointmentRow as HTMLElement).getByText("Concluída")).toBeInTheDocument();
    const storedAppointments = JSON.parse(localStorage.getItem("clinicflow-appointments") ?? "[]");
    expect(storedAppointments.find((item: { id: string }) => item.id === "a-201").status).toBe("Concluída");
  });

  it("filtra o histórico de evoluções por paciente", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Prontuários" }));

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "p-101" } });

    expect(screen.getByText("Evolução semanal")).toBeInTheDocument();
    expect(screen.queryByText("Acompanhamento")).not.toBeInTheDocument();
  });

  it("solicita confirmação antes de excluir um paciente", () => {
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Pacientes" }));
    const patientRow = screen.getByText("Mariana Costa").closest("tr");

    fireEvent.click(within(patientRow as HTMLElement).getByRole("button", { name: "Excluir" }));

    expect(confirm).toHaveBeenCalledOnce();
    expect(screen.getByText("Mariana Costa")).toBeInTheDocument();
  });
});
