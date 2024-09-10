import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../components/Header";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate new password and confirmation
    if (newPassword !== confirmNewPassword) {
      setError("Konfirmasi kata sandi tidak cocok");
      return;
    }

    setLoading(true);

    try {
      // Send a POST request to change the password
      const response = await axios.post("/api/admin", {
        action: "change-password",
        username: localStorage.getItem("username"),
        oldPassword,
        newPassword,
      });
      console.log(
        JSON.stringify(
          {
            action: "change-password",
            username: localStorage.getItem("username"),
            oldPassword,
            newPassword,
          },
          null,
          2
        )
      );

      if (response.status === 200) {
        setSuccess("Kata sandi berhasil diubah");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");

        setTimeout(() => {
          handleLogout();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Gagal mengubah kata sandi");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    localStorage.removeItem("username");
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl mb-4 text-gray-600">Ubah Kata Sandi</h2>

        <form
          onSubmit={handleChangePassword}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="oldPassword"
            >
              Kata Sandi Lama
            </label>
            <input
              type="password"
              placeholder="Masukkan kata sandi lama Anda"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              Kata Sandi Baru
            </label>
            <input
              type="password"
              placeholder="Masukkan kata sandi baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmNewPassword"
            >
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type="password"
              placeholder="Konfirmasi kata sandi baru"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {success && (
            <p className="text-green-500 text-xs italic">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? "Mengubah Kata Sandi..." : "Ubah Kata Sandi"}
          </button>
        </form>
      </div>
    </div>
  );
}
