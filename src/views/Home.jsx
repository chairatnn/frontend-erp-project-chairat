import { useEffect, useState } from "react";
import { UserTable } from "../components/UserTable";
import { AdminTable } from "../components/AdminTable";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { SaleTable } from "../components/SaleTable";
import { ProductionTable } from "../components/ProductionTable";
import { PurchaseTable } from "../components/PurchaseTable";
import { WarehouseTable } from "../components/WarehouseTable";

export default function Home() {
  const { user, authLoading, apiBase } = useOutletContext();
  const [view, setView] = useState(null);
  const [users, setUsers] = useState([]);

  const [question, setQuestion] = useState("");
  const [askLoading, setAskLoading] = useState(false);
  const [askError, setAskError] = useState(null);
  const [askResult, setAskResult] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(apiBase);
      setUsers(res.data.data);
    } catch {
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const askAi = async (e) => {
    e.preventDefault();
    const q = String(question || "").trim();

    if (!q) return;

    setAskLoading(true);
    setAskError(null);
    setAskResult(null);

    try {
      const response = await axios.post(
        `${apiBase}/auth/ai/ask`,
        { question: q, topK: 5 },
        { withCredentials: true }
      );
      console.log(response.data);
      setAskResult(response.data?.data || null);
      console.log(askResult);
    } catch (error) {
      const message =
        error?.response.data?.message ||
        error?.response.data?.error ||
        error?.response.data?.details ||
        error?.message;
      setAskError(message || "Failed to ask AI");
    } finally {
      setAskLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 gap-y-6 flex flex-col justify-start w-full">
      <section className="mt-2 text-white text-3xl md:text-4xl font-extrabold text-center">
        <h1>mini-ERP for StartUp</h1>
        <h1 className="text-2xl text-white py-2 hidden md:block">
          Generation Thailand JSD#11
        </h1>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-x-4 font-bold p-2">
        <button
          onClick={() => setView("sale")}
          className="w-full md:w-auto px-6 py-2 rounded-xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Sale&Mkt Department
        </button>
        <button
          onClick={() => setView("purchase")}
          className="w-full md:w-auto px-6 py-2 rounded-xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Purchase Department
        </button>
        <button
          onClick={() => setView("production")}
          className="w-full md:w-auto px-6 py-2 rounded-xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          Production Department
        </button>
        <button
          onClick={() => setView("warehouse")}
          className="w-full md:w-auto px-6 py-2 rounded-xl bg-blue-400 cursor-pointer border hover:bg-blue-300"
        >
          WareHouse Department
        </button>
      </section>

      <section className="w-full flex justify-center">
        <div className="w-full max-w-xl bg-gradient-to-r from-indigo-500 to-indigo-300 border rounded-2xl p-5">
          <div className="font-bold text-lg text-amber-300">
            Ask AI about products 🧠 ✨
          </div>
          {authLoading ? (
            <div className="text-sm mt-2">Checking login...</div>
          ) : user ? (
            <form onSubmit={askAi} className="mt-3 flex gap-x-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='e.g."Who are admins?"'
                className="flex-1 bg-white border rounded px-0.5 py-0.5"
              />
              <button
                type="submit"
                disabled={askLoading}
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white px-4 py-2 rounded"
              >
                {askLoading ? "Asking..." : "Ask"}
              </button>
            </form>
          ) : (
            <div className="text-white text-sm mt-2 font-bold">
              Please login to use the AI feature
            </div>
          )}
          {askError ? (
            <div className="mt-3 text-sm bg-rose-100 border border-rose-200 text-rose-900 p-3 rounded">
              {askError}
            </div>
          ) : null}
          {askResult ? (
            <div className="mt-3 text-sm">
              <div className="font-bold text-white">Answer</div>
              <div className="mt-1 whitespace-pre-wrap text-white">
                {askResult.answer || "(no answer)"}
              </div>
              <div className="font-bold mt-3 text-white">Sources</div>
              {Array.isArray(askResult.sources) && askResult.sources.length ? (
                <ul className="list-disc pl-6 mt-1 text-white">
                  {askResult.sources.map((s) => (
                    <li key={s._id}>
                      {s.username} ({s.role}) - {s.email}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-1">No sources found.</div>
              )}
            </div>
          ) : null}
        </div>
      </section>

      <section className="w-full flex justify-center gap-x-3">
        {view === "user" ? (
          <section className=" p-5  flex">
            <UserTable users={users} />
          </section>
        ) : view === "admin" ? (
          <section className=" p-5  flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <AdminTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div>Please login to access Admin Section</div>
            )}
          </section>
        ) : view === "sale" ? (
          <section className=" p-5  flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <SaleTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div>Please login to access Sale Section</div>
            )}
          </section>
        ) : view === "purchase" ? (
          <section className=" p-5  flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <PurchaseTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div>Please login to access Purchase Section</div>
            )}
          </section>
        ) : view === "production" ? (
          <section className=" p-5  flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <ProductionTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div>Please login to access Production Section</div>
            )}
          </section>
        ) : view === "warehouse" ? (
          <section className=" p-5  flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <WarehouseTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div>Please login to access Warehouse Section</div>
            )}
          </section>
        ) : null}
      </section>

      {/* <img src="artificial.gif" alt="dashboard image"
     className="relative z-10 w-auto h-auto object-cover rounded-lg shadow-lg p-0 md:p-4"
      /> */}
      {view === null && (
        <div className="w-full max-w-7xl mx-auto mt-0.5">
          <video
            className="w-full aspect-video object-cover rounded-3xl shadow-2xl border-4 border-white"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="city.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-center mt-2 text-gray-900 font-medium italic">
            © 2026 Chairat Nuansamniang. Welcome to mini-ERP for StartUp
          </p>
        </div>
      )}
    </div>
  );
}
