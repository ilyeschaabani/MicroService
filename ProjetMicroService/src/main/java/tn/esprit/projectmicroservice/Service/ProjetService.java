package tn.esprit.projectmicroservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.projectmicroservice.Entity.Projet;
import tn.esprit.projectmicroservice.Entity.User;
import tn.esprit.projectmicroservice.Repository.*;
import tn.esprit.projectmicroservice.Entity.Enumeration.StatutProjet;

import java.util.List;

@Service
public class ProjetService {

    private final ProjetRepository projetRepository;
    private final UserRepository userRepository;


    @Autowired
    public ProjetService(
            ProjetRepository projetRepository,
            UserRepository userRepository
    ){
        this.projetRepository = projetRepository;
        this.userRepository = userRepository;
    }

    public Projet addProjet(Projet projet) {
        // Ajoute directement le projet sans gestion des fichiers
        return projetRepository.save(projet);
    }

    public Projet updateProjet(String id, Projet newProjet) {
        return projetRepository.findById(id)
                .map(existingProjet -> {
                    existingProjet.setTitre(newProjet.getTitre());
                    existingProjet.setDescription(newProjet.getDescription());
                    existingProjet.setPorteurProjet(newProjet.getPorteurProjet());
                    existingProjet.setEncadrant(newProjet.getEncadrant());
                    existingProjet.setEspaceCollaboratif(newProjet.getEspaceCollaboratif());
                    existingProjet.setStatutProjet(newProjet.getStatutProjet());
                    existingProjet.setEmail(newProjet.getEmail());
                    existingProjet.setTelephone(newProjet.getTelephone());
                    existingProjet.setTechnologies(newProjet.getTechnologies());
                    existingProjet.setObjectifs(newProjet.getObjectifs());
                    existingProjet.setBenefices(newProjet.getBenefices());
                    existingProjet.setRejectionMotif(newProjet.getRejectionMotif()); // Ajout du motif de rejet
                    return projetRepository.save(existingProjet);
                })
                .orElseThrow(() -> new RuntimeException("Projet non trouvé avec l'ID : " + id));
    }

    public String deleteProjet(String id) {
        return projetRepository.findById(id)
                .map(projet -> {
                    projetRepository.deleteById(id);
                    return "Projet supprimé avec succès";
                })
                .orElseThrow(() -> new RuntimeException("Projet non trouvé avec l'ID : " + id));
    }



    public Projet getProjetById(String id) {
        return projetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projet non trouvé avec l'ID : " + id));
    }

    public Projet validateOrRejectProjet(String id, boolean isValid, String rejectionMotif) {
        return projetRepository.findById(id)
                .map(projet -> {
                    if (isValid) {
                        projet.setStatutProjet(StatutProjet.EN_COURS);
                        projet.setRejectionMotif(null); // Effacer le motif de rejet si accepté
                    } else {
                        projet.setStatutProjet(StatutProjet.EN_ATTENTE);
                        projet.setRejectionMotif(rejectionMotif); // Stocker le motif de rejet
                    }
                    return projetRepository.save(projet);
                })
                .orElseThrow(() -> new RuntimeException("Projet non trouvé avec l'ID : " + id));
    }

    public List<Projet> getAllProjets() {
        List<Projet> projets = projetRepository.findAll();

        projets.forEach(projet -> {
            if (projet.getEncadrant() != null && !projet.getEncadrant().isEmpty()) {
                userRepository.findByUsername(projet.getEncadrant()) // Use findByUsername
                        .ifPresent(user -> projet.setEncadrant(user.getUsername()));
            }
        });

        return projets;
    }

    public Projet assignEncadrant(String projetId, String encadrantId) {
        return projetRepository.findById(projetId)
                .map(projet -> {
                    User encadrant = userRepository.findByUsername(encadrantId) // Use findByUsername
                            .orElseThrow(() -> new RuntimeException("Encadrant non trouvé"));

                    if (!"ENCADRANT".equals(encadrant.getRole())) {
                        throw new RuntimeException("L'utilisateur n'est pas un encadrant");
                    }

                    projet.setEncadrant(encadrant.getUsername()); // Store the username instead of the ID
                    return projetRepository.save(projet);
                })
                .orElseThrow(() -> new RuntimeException("Projet non trouvé"));
    }


}

