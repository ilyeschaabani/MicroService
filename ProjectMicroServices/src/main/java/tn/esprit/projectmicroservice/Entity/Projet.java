package tn.esprit.projectmicroservice.Entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.*;
import tn.esprit.projectmicroservice.Entity.Enumeration.StatutProjet;

@Entity
@Table(name = "projets") // Use a table name instead of MongoDB collection
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Projet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use auto-generated IDs for MySQL
    Long idProjet;
    String titre;
    String description;
    String porteurProjet;
    String encadrant;
    Boolean espaceCollaboratif;
    @Enumerated(EnumType.STRING) // Ensure the enum is stored as a string
    StatutProjet statutProjet;
    String email;
    String telephone;
    String technologies;
    String objectifs;
    String benefices;
    String rejectionMotif; // Add rejection motive field
}
