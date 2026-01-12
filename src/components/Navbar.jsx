import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar({ user, authLoading, authError, login, logout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const ok = await login({ email, password });

    setSubmitting(false);

    if (ok) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <nav>
      <div className="flex flex-col md:flex-row justify-between px-10 items-center w-full bg-blue-500 h-15 border-b-2 border-black gap-x-4 text-xl text-white ">
        <ul className="flex items-center gap-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-amber-500"
              onClick={() => {
                if (window.location.pathname === "/") {
                  window.location.reload();
                }
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="/DashBoard" className="hover:text-amber-500">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/AboutUs" className="hover:text-amber-500">
              AboutUs
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-x-2">
          {authLoading ? (
            <span className="text-base">Checking auth session...</span>
          ) : user ? (
            <>
              <span className="text-base">
                Logged in as :{" "}
                <span className="text-amber-400">{user.username}</span>
              </span>
              <button
                onClick={logout}
                className="text-white hover:text-amber-400 text-base px-1 py-1 rounded-xl text-decoration: underline"
              >
                Logout
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                required
                type="email"
                className="bg-white text-black px-2 rounded border text-base w-40 md:w-50"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                type="password"
                minLength={8}
                className="bg-white text-black px-2 rounded border text-base w-20 md:w-30"
              />
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer bg-indigo-600 text-white hover:text-amber-400 px-2 py-0 rounded text-base"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
      {authError ? <div>{authError}</div> : null}
    </nav>
  );
}
