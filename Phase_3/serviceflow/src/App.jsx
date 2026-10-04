import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import StatCard from "./components/dashboard/StatCard";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 p-6 lg:p-8">
            <section>
              <p className="text-sm font-medium text-slate-500">
                Monday, October 4, 2026
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Good morning, Daniel
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here's what's happening with your business today.
              </p>
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard
                label="Customers"
                value={24}
                description="Total active customers"
              />

              <StatCard
                label="Today's Appointments"
                value={12}
                description="Scheduled for today"
              />

              <StatCard
                label="Pending"
                value={8}
                description="Appointments awaiting confirmation"
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
