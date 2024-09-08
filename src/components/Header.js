import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img src="/acc-logo.png" alt="Logo" className="h-8 mr-2" />{" "}
        {/* Add your logo here */}
        <span className="text-xl font-semibold">Dashboard</span>
      </div>

      {/* Right Side: Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
}
