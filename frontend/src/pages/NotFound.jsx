import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaCompass } from "react-icons/fa";

export default function NotFound() {
  return (
    <Container className="text-center py-5">
      <FaCompass size={54} className="text-gold mb-3" />
      <h2>الصفحة غير موجودة</h2>
      <p className="text-muted mb-4">قد يكون الرابط غير صحيح أو تم حذف الصفحة</p>
      <Link to="/" className="btn btn-gold px-4">
        الرجوع للرئيسية
      </Link>
    </Container>
  );
}
