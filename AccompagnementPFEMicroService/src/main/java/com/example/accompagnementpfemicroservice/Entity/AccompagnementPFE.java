package com.example.accompagnementpfemicroservice.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "pfe")
public class AccompagnementPFE {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idAccompagnement;

    String etudiant;
    String encadrant;
    String sujet;
    Float avancement;
    private Boolean sujetValide = false;

    // ✅ Champs supplémentaires pour le formulaire étudiant
    String specialite;
    String competences; // peut être une chaîne comma-separated (ex: "Java,Spring,SQL")
    String niveau; // L3, M1, M2, etc.

    // Notification envoyée ? (optionnel)
    Boolean notificationEnvoyee;
}
