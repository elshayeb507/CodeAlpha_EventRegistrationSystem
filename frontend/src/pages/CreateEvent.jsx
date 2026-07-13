import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import api from "../api/axios";

const initialForm = {
  title: "",
  description: "",
  location: "",
  event_date: "",
  capacity: 10,
};

export default function CreateEvent() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/events", {
        ...form,
        capacity: Number(form.capacity),
      });
      navigate(`/events/${data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "تعذّر إضافة الفعالية");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 640 }}>
      <div className="d-flex align-items-center gap-2 mb-4">
        <FaPlusCircle className="text-gold" size={20} />
        <h4 className="mb-0">إضافة فعالية جديدة</h4>
      </div>

      <div className="detail-card">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">عنوان الفعالية</label>
            <input
              type="text"
              name="title"
              className="form-control"
              required
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">الوصف</label>
            <textarea
              name="description"
              className="form-control"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">المكان</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-8">
              <label className="form-label">تاريخ ووقت الفعالية</label>
              <input
                type="datetime-local"
                name="event_date"
                className="form-control"
                required
                value={form.event_date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">عدد المقاعد</label>
              <input
                type="number"
                name="capacity"
                className="form-control"
                required
                min={1}
                value={form.capacity}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-gold w-100 py-2" disabled={loading}>
            {loading ? "جاري الإضافة..." : "إضافة الفعالية"}
          </button>
        </form>
      </div>
    </Container>
  );
}
