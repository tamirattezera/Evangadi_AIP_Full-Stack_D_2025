function AppointmentList({ appointments, onComplete }) {
  return (
    <section className="mt-8">
      {/* Section header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Today's Appointments
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage today's scheduled appointments.
        </p>
      </div>

      {/* Appointment list */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <ul className="divide-y divide-slate-200">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              {/* Appointment information */}
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {appointment.customer}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Appointment #{appointment.id}
                </p>
              </div>

              {/* Appointment actions */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium capitalize text-slate-600">
                  {appointment.status}
                </span>

                {appointment.status !== "completed" && (
                  <button
                    type="button"
                    onClick={() => onComplete(appointment.id)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Complete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AppointmentList;
