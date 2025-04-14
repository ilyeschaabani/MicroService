package tn.esprit.projectmicroservice.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use auto-generated IDs for MySQL
    private Long id; // unique ID (use Long for auto-generated IDs)

    private String username; // username
    private String role; // role (ADMIN, ETUDIANT, ENCADRANT)
    private String email; // email (optional)
}
