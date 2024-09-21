import Logo from "../global/Logo";
import DashboardTab from "../dashboard/DashboardTab";

export default function Dashboard() {
  return (
    <div className="container">
      {/* Dashboard */}
      <div className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <p>Koushik Roy</p>
          <button className="text-violet-600 hover:text-violet-500">
            Log Out
          </button>
        </div>
      </div>
      <DashboardTab />
    </div>
  );
}
