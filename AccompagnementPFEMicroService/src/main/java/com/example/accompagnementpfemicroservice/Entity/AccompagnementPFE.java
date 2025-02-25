package com.example.accompagnementpfemicroservice.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccompagnementPFE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idAccompagnement;
    String etudiant;
    String encadrant;
    String sujet;
    Float avancement;

    public AccompagnementPFE(){}

    public AccompagnementPFE(String etudiant, String encadrant, String sujet, Float avancement) {
        this.etudiant = etudiant;
        this.encadrant = encadrant;
        this.sujet = sujet;
        this.avancement = avancement;
    }
}
