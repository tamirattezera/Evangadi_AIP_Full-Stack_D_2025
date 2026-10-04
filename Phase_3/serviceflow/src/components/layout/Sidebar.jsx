function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-6 py-5">
          <h1 className="text-xl font-bold text-slate-900">ServiceFlow</h1>
          <p className="mt-1 text-xs text-slate-500">Business Operations</p>
        </div>

        <nav className="flex-1 px-4 py-6">
          <a
            href="#"
            className="block rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="mt-1 block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Customers
          </a>

          <a
            href="#"
            className="mt-1 block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Services
          </a>

          <a
            href="#"
            className="mt-1 block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Appointments
          </a>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
