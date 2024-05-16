package app.web;

import app.dtos.NewPaymentDTO;
import app.entities.Payment;
import app.enums.PaymentStatus;
import app.enums.PaymentType;
import app.repositories.PaymentRepository;
import app.repositories.StudentRepository;
import app.services.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PaymentRestController {
    private PaymentRepository paymentRepository;
    private PaymentService paymentService;
    private StudentRepository studentRepository;

    public PaymentRestController(
            PaymentRepository paymentRepository, PaymentService paymentService, StudentRepository studentRepository
    ) {
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
        this.studentRepository = studentRepository;
    }

    @GetMapping(path = "/payments")
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    @GetMapping(path = "/payments/student/{code}")
    public List<Payment> getPaymentsByStudentCode(@PathVariable String code) {
        return paymentRepository.findByStudentCode(code);
    }

    @GetMapping(path = "/payments/status")
    public List<Payment> getPaymentsByStatus(@RequestParam PaymentStatus value) {
        return paymentRepository.findByStatus(value);
    }

    @GetMapping(path = "/payments/type")
    public List<Payment> getPaymentsByType(@RequestParam PaymentType value) {
        return paymentRepository.findByType(value);
    }

    @GetMapping(path = "/payments/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentRepository.findById(id).get();
    }

    @PostMapping(path = "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment save(
            @RequestParam MultipartFile file,
            NewPaymentDTO newPaymentDTO
    ) throws IOException {
        return paymentService.save(file, newPaymentDTO);
    }

    @GetMapping(value = "/payments/file/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long id) throws IOException {
        return this.paymentService.getPaymentFile(id);
    }
}
