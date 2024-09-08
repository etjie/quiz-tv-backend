import { useState, useEffect } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import axios from "axios";
import Header from "../components/Header";

export default function Results() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get today's date for default
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await axios.get("/api/quiz-results");
        setResults(data);
        setFilteredResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, []);

  const filterResults = () => {
    let filtered = [...results];

    if (searchTerm) {
      filtered = filtered.filter(
        (result) =>
          result.User.email.includes(searchTerm) ||
          result.User.phoneNumber.includes(searchTerm)
      );
    }

    if (startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T23:59:59`);

      filtered = filtered.filter((result) => {
        const resultDate = new Date(result.createdAt);
        return resultDate >= start && resultDate <= end;
      });
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredResults(filtered);
  };

  useEffect(() => {
    filterResults();
  }, [searchTerm, startDate, endDate]);

  const resetDates = () => {
    // Reset dates back to today's date
    setStartDate(today);
    setEndDate(today);
    setSearchTerm(""); // Optional: Reset search term as well
  };

  const exportToExcel = () => {
    // Format hasil filter ke dalam Excel
    const dataForExcel = filteredResults.map((result, index) => ({
      "No.": index + 1, // Kolom Nomor
      Nama: result.User.name,
      Email: result.User.email,
      "Nomor Telepon": result.User.phoneNumber,
      Skor: result.score,
      Tanggal: format(new Date(result.createdAt), "yyyy-MM-dd HH:mm:ss"),
    }));

    const fileName = `Hasil_Quiz_${Math.random()
      .toString(36)
      .substring(2, 8)}_${format(new Date(), "yyyyMMdd")}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hasil");

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl mb-4">Hasil Quiz</h2>

        <div className="flex mb-6 space-x-4">
          <input
            type="text"
            placeholder="Cari berdasarkan email atau nomor telepon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/5 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={resetDates}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>

        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="p-4 w-4">No.</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Email</th>
              <th className="p-4">Nomor Telepon</th>
              <th className="p-4">Skor</th>
              <th className="p-4">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result, index) => (
              <tr key={result.id} className="border-b">
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4">{result.User.name}</td>
                <td className="p-4">{result.User.email}</td>
                <td className="p-4">{result.User.phoneNumber}</td>
                <td className="p-4">{result.score}</td>
                <td className="p-4">
                  {format(new Date(result.createdAt), "yyyy-MM-dd HH:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={exportToExcel}
          className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Unduh ke Excel
        </button>
      </div>
    </div>
  );
}
