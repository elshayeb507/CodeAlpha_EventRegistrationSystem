import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ، يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-card-top">
          <FaGraduationCap size={34} color="var(--gold)" />
          <h3 className="text-white mt-2 mb-0">تسجيل الدخول</h3>
        </div>

        <div className="auth-card-body">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2">
                <FaEnvelope className="text-gold" /> البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label d-flex align-items-center gap-2">
                <FaLock className="text-gold" /> كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-gold w-100 py-2"
              disabled={loading}
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </button>
          </form>

          <p className="text-center text-muted mt-4 mb-0">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-gold fw-semibold">
              أنشئ حساباً جديداً
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
