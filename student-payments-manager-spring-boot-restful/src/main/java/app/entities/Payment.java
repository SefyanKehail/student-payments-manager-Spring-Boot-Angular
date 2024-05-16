package app.entities;

import app.enums.PaymentStatus;
import app.enums.PaymentType;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @Builder
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private double amount;

    private PaymentType type;

    private PaymentStatus status;

    private String file;

    @ManyToOne
    private Student student;
}
