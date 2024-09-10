import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    localStorage.removeItem("username");
    router.push("/login"); // Redirect to login page
  };

  const handleChangePassword = () => {
    router.push("/change-password"); // Redirect to login page
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <span className="text-xl font-semibold">Dashboard</span>
      </div>

      {/* Right Side: Logout Button */}
      <div>
        <button
          onClick={handleChangePassword}
          className="bg-gray-200 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 mr-4 rounded"
        >
          Ubah Password
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
