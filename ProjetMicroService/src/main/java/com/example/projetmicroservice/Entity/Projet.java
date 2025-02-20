package com.example.projetmicroservice.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import com.example.projetmicroservice.Entity.StatutProjet;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Projet {
    @Id
    String idProjet;
    String titre;
    String description;
    String porteurProjet;
    String Encadrant;
    Boolean espaceCollaboratif;
    StatutProjet statutProjet;
    public Projet() {
    }

    public Projet(String titre, String description, String porteurProjet, String encadrant, Boolean espaceCollaboratif, StatutProjet statutProjet) {
        this.titre = titre;
        this.description = description;
        this.porteurProjet = porteurProjet;
        Encadrant = encadrant;
        this.espaceCollaboratif = espaceCollaboratif;
        this.statutProjet = statutProjet;
    }

    public String getIdProjet() {
        return idProjet;
    }

    public void setIdProjet(String idProjet) {
        this.idProjet = idProjet;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPorteurProjet() {
        return porteurProjet;
    }

    public void setPorteurProjet(String porteurProjet) {
        this.porteurProjet = porteurProjet;
    }

    public String getEncadrant() {
        return Encadrant;
    }

    public void setEncadrant(String encadrant) {
        Encadrant = encadrant;
    }

    public Boolean getEspaceCollaboratif() {
        return espaceCollaboratif;
    }

    public void setEspaceCollaboratif(Boolean espaceCollaboratif) {
        this.espaceCollaboratif = espaceCollaboratif;
    }

    public StatutProjet getStatutProjet() {
        return statutProjet;
    }

    public void setStatutProjet(StatutProjet statutProjet) {
        this.statutProjet = statutProjet;
    }
}