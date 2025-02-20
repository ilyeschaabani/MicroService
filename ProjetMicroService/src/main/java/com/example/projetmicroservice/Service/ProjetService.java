package com.example.projetmicroservice.Service;

import com.example.projetmicroservice.Entity.Projet;
import com.example.projetmicroservice.Repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetService {

    @Autowired
    private ProjetRepository projetRepository;

    public Projet addProjet(Projet projet) {
        return projetRepository.save(projet);
    }

    public Projet updateProjet(String id, Projet newProjet) {
        Optional<Projet> existingProjetOpt = projetRepository.findById(id);
        if (existingProjetOpt.isPresent()) {
            Projet existingProjet = existingProjetOpt.get();
            existingProjet.setTitre(newProjet.getTitre());
            existingProjet.setDescription(newProjet.getDescription());
            existingProjet.setPorteurProjet(newProjet.getPorteurProjet());
            existingProjet.setEncadrant(newProjet.getEncadrant());
            existingProjet.setEspaceCollaboratif(newProjet.getEspaceCollaboratif());
            existingProjet.setStatutProjet(newProjet.getStatutProjet());
            return projetRepository.save(existingProjet);
        }
        return null;
    }

    public String deleteProjet(String id) {
        if (projetRepository.findById(id).isPresent()) {
            projetRepository.deleteById(id);
            return "Projet supprimé";
        }
        return "Projet non trouvé";
    }

    public List<Projet> getAllProjets() {
        return projetRepository.findAll();
    }

    public Projet getProjetById(String id) {
        return projetRepository.findById(id).orElse(null);
    }
}