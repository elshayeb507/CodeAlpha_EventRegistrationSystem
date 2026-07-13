import { Modal, Button } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmModal({
  show,
  title = "تأكيد العملية",
  message,
  confirmLabel = "تأكيد",
  cancelLabel = "إلغاء",
  variant = "danger",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Body className="text-center py-4">
        <div
          className="d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#f6e4e4",
          }}
        >
          <FaExclamationTriangle size={22} color="var(--danger)" />
        </div>
        <h5 className="mb-2">{title}</h5>
        <p className="text-muted mb-4">{message}</p>

        <div className="d-flex justify-content-center gap-2">
          <Button variant="light" onClick={onCancel} className="px-4">
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            className={variant === "danger" ? "px-4" : "btn-gold px-4"}
          >
            {confirmLabel}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
