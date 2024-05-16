package app.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class Student {
    @Id 
    private String id;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String code;

    private String programId;

    private String photo;

//    @OneToMany(mappedBy = "student", targetEntity = Payment.class, fetch = FetchType.EAGER)
//    private Collection<Payment> payments;
}
