package com.example.microserviceevaluation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "evaluations")
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEvaluation;

    @Column(nullable = false)
    private int scoreMaximum; // Le score maximum du quiz

    private int scoreObtenu; // Score obtenu par l'étudiant

    private int note; // Note finale obtenue

    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", nullable = false)
    private LocalDateTime dateDebut; // Date de début de l’évaluation

    @Column(columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", nullable = false)
    private LocalDateTime dateFin; // Date de fin de l’évaluation

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime datePassage; // Date où l'étudiant a passé l’évaluation

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EtatEvaluation etatEvaluation; // Etat de l'évaluation (en cours, terminé, annulé, etc.)

    @PrePersist
    protected void onCreate() {
        if (dateDebut == null) {
            dateDebut = LocalDateTime.now();
        }
        if (dateFin == null) {
            dateFin = dateDebut.plusHours(1); // Par défaut, une évaluation dure 1 heure
        }
    }
}
