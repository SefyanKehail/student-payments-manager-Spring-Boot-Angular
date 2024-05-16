package app;

import app.entities.Payment;
import app.entities.Student;
import app.enums.PaymentStatus;
import app.enums.PaymentType;
import app.repositories.PaymentRepository;
import app.repositories.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class StudentPaymentsManagerRestfulApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentPaymentsManagerRestfulApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(
            StudentRepository studentRepository,
            PaymentRepository paymentRepository
    ) {
        return args -> {
            // some dummy data

            studentRepository.save(
                    Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Sefyan")
                            .lastName("Kehail")
                            .code("123")
                            .programId("II-BDCC")
                            .build()
            );
            studentRepository.save(
                    Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Yasmine")
                            .lastName("Khalfi")
                            .code("1234")
                            .programId("II-BDCC")
                            .build()
            );
            studentRepository.save(
                    Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Ayoub")
                            .lastName("Iklil")
                            .code("12345")
                            .programId("II-BDCC")
                            .build()
            );

            // Payments

            PaymentType[] paymentTypes = PaymentType.values();
            PaymentStatus[] paymentStatus = PaymentStatus.values();
            Random random = new Random();

            studentRepository.findAll().forEach(
                    student -> {
                        System.out.println(student);
                        int paymentsCount = (int) (Math.random() * 10) + 1;
                        for (int i = 0; i < paymentsCount; i++) {
                            Payment payment = Payment.builder()
                                    .type(paymentTypes[random.nextInt(paymentTypes.length)])
                                    .status(paymentStatus[random.nextInt(paymentStatus.length)])
                                    .amount((int) (Math.random() * 30000))
                                    .date(LocalDate.now())
                                    .student(student)
                                    .build();

                            System.out.println(payment);
                            paymentRepository.save(payment);
                        }
                    }
            );

            System.out.println("\n\n\n ****************************** \n\n\n");
            System.out.println(studentRepository.findByCode("123"));
            System.out.println("\n\n\n ****************************** \n\n\n");        };
    }
}
