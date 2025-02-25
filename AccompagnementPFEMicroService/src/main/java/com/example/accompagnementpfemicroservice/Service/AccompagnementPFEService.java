package com.example.accompagnementpfemicroservice.Service;

import com.example.accompagnementpfemicroservice.Entity.AccompagnementPFE;
import com.example.accompagnementpfemicroservice.Repository.AccompagnementPFEReposiroty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccompagnementPFEService {

    @Autowired
    private AccompagnementPFEReposiroty repository;

    // Ajouter un nouvel accompagnement
    public AccompagnementPFE createAccompagnement(AccompagnementPFE accompagnement) {
        return repository.save(accompagnement);
    }

    // Récupérer tous les accompagnements
    public List<AccompagnementPFE> getAllAccompagnements() {
        return repository.findAll();
    }

    // Récupérer un accompagnement par ID
    public Optional<AccompagnementPFE> getAccompagnementById(Long id) { // Changed to Long
        return repository.findById(id);
    }

    // Mettre à jour un accompagnement
    public AccompagnementPFE updateAccompagnement(Long id, AccompagnementPFE updatedAccompagnement) { // Changed to Long
        return repository.findById(id).map(accompagnement -> {
            accompagnement.setEtudiant(updatedAccompagnement.getEtudiant());
            accompagnement.setEncadrant(updatedAccompagnement.getEncadrant());
            accompagnement.setSujet(updatedAccompagnement.getSujet());
            accompagnement.setAvancement(updatedAccompagnement.getAvancement());
            return repository.save(accompagnement);
        }).orElseThrow(() -> new RuntimeException("Accompagnement non trouvé avec l'ID : " + id));
    }

    // Supprimer un accompagnement par ID
    public void deleteAccompagnement(Long id) { // Changed to Long
        repository.deleteById(id);
    }
}
