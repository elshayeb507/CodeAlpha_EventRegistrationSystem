import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowLeft } from "react-icons/fa";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventCard({ event }) {
  const isPast = new Date(event.event_date) < new Date();

  return (
    <div className="event-card">
      <div className="event-card-header">
        <span className="fw-semibold">{event.title}</span>
        <span className={`capacity-pill ${isPast ? "full" : ""}`}>
          {isPast ? "انتهت" : "متاحة"}
        </span>
      </div>

      <div className="event-card-body">
        {event.description && (
          <p className="text-muted mb-1" style={{ fontSize: "0.92rem" }}>
            {event.description.length > 90
              ? event.description.slice(0, 90) + "..."
              : event.description}
          </p>
        )}

        <div className="event-meta">
          <FaCalendarAlt />
          <span>{formatDate(event.event_date)}</span>
        </div>

        {event.location && (
          <div className="event-meta">
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>
        )}

        <div className="event-meta">
          <FaUsers />
          <span>{event.capacity} مقعد</span>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="btn btn-outline-navy mt-auto d-flex align-items-center justify-content-center gap-2"
        >
          التفاصيل والتسجيل
          <FaArrowLeft style={{ transform: "scaleX(-1)" }} />
        </Link>
      </div>
    </div>
  );
}
