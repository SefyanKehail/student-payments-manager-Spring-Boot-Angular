package app.repositories;

import app.entities.Payment;
import app.entities.Student;
import app.enums.PaymentStatus;
import app.enums.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudentCode(String studentCode);
    List<Payment> findByStatus(PaymentStatus paymentStatus);
    List<Payment> findByType(PaymentType paymentType);
}
