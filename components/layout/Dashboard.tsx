import Logo from "../global/Logo";
import DashboardTab from "../dashboard/DashboardTab";
import { getUserData, logoutUser } from "@/data/auth/authentication";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const userData = await getUserData();

  const logoutButtonClick = async () => {
    "use server";

    logoutUser();

    redirect("/login");
  };

  return (
    <div className="container">
      {/* Dashboard */}
      <div className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <p>{userData.data.fullName}</p>
          <form>
            <button
              formAction={logoutButtonClick}
              className="text-violet-600 hover:text-violet-500"
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
      <DashboardTab />
    </div>
  );
}
