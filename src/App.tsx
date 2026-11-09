
import { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  Bell, Check, Menu, X,
} from "lucide-react";
import Sidebar, { type Page } from "./components/Sidebar";
import Modal from "./components/Modal";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";
import Records from "./components/Records";
import PatientForm from "./components/PatientForm";
import AppointmentForm from "./components/AppointmentForm";
import NoteForm from "./components/NoteForm";
import { initialAppointments, initialNotes, initialPatients } from "./data/seed";
import type { Appointment, ClinicalNote, Patient } from "./types";
import { getPatientName } from "./utils/clinicHelpers";

const STORAGE_KEYS = {
  patients: "clinicflow-patients",
  appointments: "clinicflow-appointments",
  notes: "clinicflow-notes",
};

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [patients, setPatients] = useLocalStorage(STORAGE_KEYS.patients, initialPatients);
  const [appointments, setAppointments] = useLocalStorage(STORAGE_KEYS.appointments, initialAppointments);
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.notes, initialNotes);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"patient" | "appointment" | "note" | null>(null);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");

  const today = "2026-11-09";

  const todaysAppointments = useMemo(() => appointments
    .filter((item) => item.date === today && item.status !== "Cancelada")
    .sort((a, b) => a.time.localeCompare(b.time)), [appointments]);

  const activePatients = patients.filter((patient) => patient.status === "Ativo").length;
  const completed = appointments.filter((item) => item.status === "Concluída").length;
  const upcoming = appointments.filter((item) => item.status === "Agendada").length;

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function addPatient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const patient: Patient = {
      id: makeId("p"),
      name: String(form.get("name")).trim(),
      email: String(form.get("email")).trim(),
      phone: String(form.get("phone")).trim(),
      birthDate: String(form.get("birthDate")),
      status: "Ativo",
      createdAt: today,
    };

    setPatients((current) => [patient, ...current]);
    setModal(null);
    notify("Paciente cadastrado com sucesso.");
  }

  function addAppointment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const appointment: Appointment = {
      id: makeId("a"),
      patientId: String(form.get("patientId")),
      date: String(form.get("date")),
      time: String(form.get("time")),
      type: String(form.get("type")),
      status: "Agendada",
      notes: "",
    };

    setAppointments((current) => [...current, appointment]);
    setModal(null);
    notify("Consulta agendada com sucesso.");
  }

  function addNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const note: ClinicalNote = {
      id: makeId("n"),
      patientId: String(form.get("patientId")),
      date: today,
      title: String(form.get("title")).trim(),
      content: String(form.get("content")).trim(),
    };

    setNotes((current) => [note, ...current]);
    setModal(null);
    notify("Evolução registrada com sucesso.");
  }

  function updateAppointmentStatus(id: string, status: Appointment["status"]) {
    setAppointments((current) =>
      current.map((item) => item.id === id ? { ...item, status } : item)
    );

    notify(
      status === "Concluída"
        ? "Consulta marcada como concluída."
        : "Consulta cancelada."
    );
  }

  function removePatient(id: string) {
    if (!window.confirm("Deseja realmente excluir este paciente?")) return;

    setPatients((current) => current.filter((patient) => patient.id !== id));
    notify("Paciente removido.");
  }

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.email} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredAppointments = appointments.filter((item) =>
    getPatientName(item.patientId, patients)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setSearch("");
        }}
        open={mobileMenu}
        onClose={() => setMobileMenu(false)}
      />

      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button menu-trigger"
            onClick={() => setMobileMenu(true)}
            aria-label="Abrir menu"
          >
            <Menu size={21} />
          </button>

          <div className="breadcrumb">
            Clínica <span>/</span> <strong>{pageTitle(activePage)}</strong>
          </div>

          <div className="topbar-actions">
            <button className="icon-button notification" aria-label="Notificações">
              <Bell size={19} />
              <i />
            </button>

            <div className="topbar-date">Segunda-feira, 09 de novembro</div>
            <div className="avatar small">BL</div>
          </div>
        </header>

        <div className="content">
          {activePage === "dashboard" && (
            <Dashboard
data={{
patients,
appointments: todaysAppointments,
activePatients,
completed,
upcoming,
      }}
      actions={{
onNewAppointment: () => setModal("appointment"),
onNewPatient: () => setModal("patient"),
onFinish: (id) => updateAppointmentStatus(id, "Concluída"),
      }}
    />
          )}

          {activePage === "patients" && (
            <Patients
              patients={filteredPatients}
              search={search}
              setSearch={setSearch}
              onAdd={() => setModal("patient")}
              onDelete={removePatient}
              onOpen={(id) => {
                setSelectedPatient(id);
                setActivePage("records");
              }}
            />
          )}

          {activePage === "appointments" && (
            <Appointments
              appointments={filteredAppointments}
              patients={patients}
              search={search}
              setSearch={setSearch}
              onAdd={() => setModal("appointment")}
              onStatus={updateAppointmentStatus}
            />
          )}

          {activePage === "records" && (
            <Records
              notes={notes}
              patients={patients}
              onAdd={() => setModal("note")}
              selectedPatient={selectedPatient}
              onSelect={setSelectedPatient}
            />
          )}
        </div>
      </main>

      {modal === "patient" && (
        <Modal
          title="Novo paciente"
          subtitle="Preencha os dados para cadastrar um paciente."
          onClose={() => setModal(null)}
        >
          <PatientForm
            onSubmit={addPatient}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}

      {modal === "appointment" && (
        <Modal
          title="Agendar consulta"
          subtitle="Organize um novo horário na agenda."
          onClose={() => setModal(null)}
        >
          <AppointmentForm
            patients={patients}
            onSubmit={addAppointment}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}

      {modal === "note" && (
        <Modal
          title="Nova evolução"
          subtitle="Registre informações relevantes do atendimento."
          onClose={() => setModal(null)}
        >
          <NoteForm
            patients={patients}
            onSubmit={addNote}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}

      {toast && (
        <div className="toast">
          <Check size={17} />
          {toast}
          <button onClick={() => setToast("")} aria-label="Fechar">
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

function pageTitle(page: Page) {
  if (page === "patients") return "Pacientes";
  if (page === "appointments") return "Consultas";
  if (page === "records") return "Prontuários";
  return "Visão geral";
}
