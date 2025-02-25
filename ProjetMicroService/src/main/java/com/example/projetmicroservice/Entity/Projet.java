package com.example.projetmicroservice.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Projet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    String idProjet;
    String titre;
    String description;
    String porteurProjet;
    String encadrant;
    Boolean espaceCollaboratif;

    @Enumerated(EnumType.STRING)
    StatutProjet statutProjet;
}
