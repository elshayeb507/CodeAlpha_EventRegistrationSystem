import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Badge } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
  FaTrash,
} from "react-icons/fa";
import api from "../api/axios";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/AuthContext";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isOrganizer } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [registering, setRegistering] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchEvent = async () => {
    try {
      const { data } = await api.get(`/events/${id}`);
      setEvent(data);
    } catch {
      setMessage({ type: "danger", text: "الفعالية غير موجودة" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setRegistering(true);
    setMessage({ type: "", text: "" });
    try {
      await api.post(`/registrations/${id}`);
      setMessage({ type: "success", text: "تم تسجيلك في الفعالية بنجاح 🎉" });
    } catch (err) {
      setMessage({
        type: "danger",
        text: err.response?.data?.message || "تعذّر إتمام التسجيل",
      });
    } finally {
      setRegistering(false);
    }
  };

  const handleDeleteEvent = async () => {
    setShowDeleteConfirm(false);
    try {
      await api.delete(`/events/${id}`);
      navigate("/");
    } catch (err) {
      setMessage({
        type: "danger",
        text: err.response?.data?.message || "تعذّر حذف الفعالية",
      });
    }
  };

  if (loading) return <Loader label="جاري تحميل تفاصيل الفعالية..." />;

  if (!event) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger">الفعالية غير موجودة</div>
        <Link to="/" className="btn btn-outline-navy mt-2">
          الرجوع للفعاليات
        </Link>
      </Container>
    );
  }

  const isPast = new Date(event.event_date) < new Date();

  return (
    <>
      <section className="detail-hero">
        <Container>
          <Link to="/" className="text-gold d-inline-flex align-items-center gap-2 mb-3">
            <FaArrowRight style={{ transform: "scaleX(-1)" }} />
            رجوع للفعاليات
          </Link>
          <h1 className="text-white mb-2">{event.title}</h1>
          {isPast && <Badge bg="secondary">انتهى موعد الفعالية</Badge>}
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-4">
          <Col lg={8}>
            <div className="detail-card mb-4">
              <h5 className="mb-3">عن الفعالية</h5>
              <p className="text-muted">
                {event.description || "لا يوجد وصف مضاف لهذه الفعالية."}
              </p>
            </div>

            {message.text && (
              <div className={`alert alert-${message.type}`}>{message.text}</div>
            )}
          </Col>

          <Col lg={4}>
            <div className="detail-card">
              <div className="event-meta mb-3">
                <FaCalendarAlt />
                <span>{formatDate(event.event_date)}</span>
              </div>
              {event.location && (
                <div className="event-meta mb-3">
                  <FaMapMarkerAlt />
                  <span>{event.location}</span>
                </div>
              )}
              <div className="event-meta mb-4">
                <FaUsers />
                <span>{event.capacity} مقعد إجمالي</span>
              </div>

              {!isOrganizer && (
                <button
                  className="btn btn-gold w-100 py-2"
                  onClick={handleRegister}
                  disabled={registering || isPast}
                >
                  {isPast
                    ? "انتهى التسجيل"
                    : registering
                    ? "جاري التسجيل..."
                    : "سجّل مكانك الآن"}
                </button>
              )}

              {isOrganizer && (
                <button
                  className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <FaTrash /> حذف الفعالية
                </button>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <ConfirmModal
        show={showDeleteConfirm}
        title="حذف الفعالية"
        message="هل أنت متأكد من حذف هذه الفعالية؟ سيتم إلغاء جميع التسجيلات المرتبطة بها ولا يمكن التراجع عن هذا الإجراء."
        confirmLabel="نعم، احذف الفعالية"
        cancelLabel="تراجع"
        onConfirm={handleDeleteEvent}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
}
