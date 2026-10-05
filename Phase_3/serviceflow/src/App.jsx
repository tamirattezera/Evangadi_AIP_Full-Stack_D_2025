import { useState } from "react";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import StatCard from "./components/dashboard/StatCard";
import AppointmentList from "./components/appointments/AppointmentList";

function App() {
  // ============================================================
  // STATE
  // ============================================================

  // Source of truth for customers
  const [customerCount, setCustomerCount] = useState(24);

  // Source of truth for appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customer: "Eden Yeaulshet",
      status: "confirmed",
    },
    {
      id: 2,
      customer: "Sara Ali",
      status: "pending",
    },
    {
      id: 3,
      customer: "Daniel John",
      status: "pending",
    },
  ]);

  // User's currently selected appointment filter
  const [statusFilter, setStatusFilter] = useState("all");

  // ============================================================
  // DERIVED VALUES
  // ============================================================

  // Derived from appointments — no separate state needed
  const appointmentCount = appointments.length;

  // Derived from appointments — no separate state needed
  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "pending",
  ).length;

  // Derived from appointments + statusFilter
  const filteredAppointments =
    statusFilter === "all"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === statusFilter,
        );

  // Available appointment filters
  const filters = ["all", "pending", "confirmed", "completed"];

  // ============================================================
  // EVENT HANDLERS
  // ============================================================

  function handleAddCustomer() {
    setCustomerCount((currentCount) => currentCount + 1);
  }

  function handleAddAppointment() {
    setAppointments((currentAppointments) => [
      ...currentAppointments,
      {
        id: currentAppointments.length + 1,
        customer: "New Customer",
        status: "pending",
      },
    ]);
  }

  function handleCompleteAppointment(id) {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "completed" }
          : appointment,
      ),
    );
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 p-6 lg:p-8">
            {/* ==================================================
                DASHBOARD INTRODUCTION
            ================================================== */}
            <section>
              <p className="text-sm font-medium text-slate-500">
                Monday, October 5, 2026
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Good morning, Eden
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here's what's happening with your business today.
              </p>
            </section>

            {/* ==================================================
                DASHBOARD STATISTICS
            ================================================== */}
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard
                label="Customers"
                value={customerCount}
                description="Total active customers"
              />

              <StatCard
                label="Today's Appointments"
                value={appointmentCount}
                description="Scheduled for today"
              />

              <StatCard
                label="Pending"
                value={pendingCount}
                description="Appointments awaiting confirmation"
              />
            </section>

            {/* ==================================================
                DEVELOPMENT CONTROLS
            ================================================== */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleAddCustomer}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Add Customer
              </button>

              <button
                type="button"
                onClick={handleAddAppointment}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Add Appointment
              </button>
            </div>

            {/* ==================================================
                APPOINTMENT FILTERS
            ================================================== */}
            <section className="mt-8">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Filter Appointments
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View appointments by their current status.
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const isActive = statusFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setStatusFilter(filter)}
                      className={
                        isActive
                          ? "rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium capitalize text-white"
                          : "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium capitalize text-slate-700 hover:bg-slate-50"
                      }
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </section>
            <AppointmentList
              appointments={filteredAppointments}
              onComplete={handleCompleteAppointment}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
