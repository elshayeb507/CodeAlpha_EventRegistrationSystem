import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCalendarCheck, FaInbox } from "react-icons/fa";
import api from "../api/axios";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get("/events");
        // نرتّب الفعاليات القادمة أولاً
        const sorted = [...data].sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date)
        );
        setEvents(sorted);
      } catch (err) {
        setError("تعذّر تحميل الفعاليات، تأكد إن السيرفر شغال");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <section className="hero-section">
        <Container style={{ position: "relative", zIndex: 1 }}>
          <span className="hero-eyebrow">منصة الفعاليات الجامعية</span>
          <h1 className="hero-title">
            اكتشف الفعاليات القادمة <br /> وسجّل مكانك بضغطة واحدة
          </h1>
          <p className="hero-sub">
            من الندوات العلمية لحفلات التخرج، كل الفعاليات في مكان واحد
            بمقاعد محدودة وتسجيل فوري.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <div className="d-flex align-items-center gap-2 mb-4">
          <FaCalendarCheck className="text-gold" size={20} />
          <h4 className="mb-0">الفعاليات المتاحة</h4>
        </div>

        {loading && <Loader label="جاري تحميل الفعاليات..." />}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && events.length === 0 && (
          <div className="empty-state">
            <FaInbox size={48} />
            <h5>لا توجد فعاليات متاحة حالياً</h5>
            <p className="text-muted">تابعنا، سنضيف فعاليات جديدة قريباً</p>
          </div>
        )}

        <Row className="g-4">
          {events.map((event) => (
            <Col key={event.id} xs={12} md={6} lg={4}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
