export default function Loader({ label = "جاري التحميل..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div
        className="spinner-border"
        style={{ color: "var(--gold)", width: "2.2rem", height: "2.2rem" }}
        role="status"
      />
      <p className="mt-3 text-muted mb-0">{label}</p>
    </div>
  );
}
