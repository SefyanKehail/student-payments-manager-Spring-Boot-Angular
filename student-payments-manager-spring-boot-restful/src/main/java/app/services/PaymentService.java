package app.services;

import app.dtos.NewPaymentDTO;
import app.entities.Payment;
import app.enums.PaymentStatus;
import app.enums.PaymentType;
import app.repositories.PaymentRepository;
import app.repositories.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {

    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    public PaymentService(PaymentRepository paymentRepository, StudentRepository studentRepository) {
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    public Payment save(
            MultipartFile file,
            NewPaymentDTO newPaymentDTO
            ) throws IOException {
        // Get / Set path for payment files storage
        Path storageFolderPath = Paths.get(System.getProperty("user.home"), "SPM-storage", "students-data", "payments");

        if (!Files.exists(storageFolderPath)) {
            Files.createDirectories(storageFolderPath);
        }

        // Validate

        // save file
        String storageFileName = UUID.randomUUID().toString();
        Path storageFilePath = Paths.get(storageFolderPath.toString(), storageFileName + ".pdf");
        Files.copy(file.getInputStream(), storageFilePath);


        // save in db
        return paymentRepository.save(
                Payment.builder()
                        .date(newPaymentDTO.getDate())
                        .amount(newPaymentDTO.getAmount())
                        .status(PaymentStatus.CREATED)
                        .type(newPaymentDTO.getType())
                        .file(storageFilePath.toUri().toString())
                        .student(studentRepository.findByCode(newPaymentDTO.getStudentCode()))
                        .build()
        );
    }

    public byte[] getPaymentFile(Long id) throws IOException {
        Payment payment = paymentRepository.findById(id).get();

        // get bytes
        // get Path object
        // get URI object that helps us remove file:/// prefix
        // absolute path with file:/// prefix

        return Files.readAllBytes(
                Path.of(
                        URI.create(
                                payment.getFile()
                        )
                )
        );
    }
}
