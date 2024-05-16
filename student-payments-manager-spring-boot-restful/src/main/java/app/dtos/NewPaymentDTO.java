package app.dtos;

import app.enums.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor @NoArgsConstructor
public class NewPaymentDTO {
    LocalDate date;
    double amount;
    PaymentType type;
    String studentCode;
}
