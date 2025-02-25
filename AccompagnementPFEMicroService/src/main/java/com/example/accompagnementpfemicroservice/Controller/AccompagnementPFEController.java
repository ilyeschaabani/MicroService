package com.example.accompagnementpfemicroservice.Controller;

import com.example.accompagnementpfemicroservice.Entity.AccompagnementPFE;
import com.example.accompagnementpfemicroservice.Service.AccompagnementPFEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accompagnement")
@CrossOrigin(origins = "*") // Autoriser les requêtes cross-origin
public class AccompagnementPFEController {

    @Autowired
    private AccompagnementPFEService service;

    // Créer un accompagnement
    @PostMapping
    public AccompagnementPFE createAccompagnement(@RequestBody AccompagnementPFE accompagnement) {
        return service.createAccompagnement(accompagnement);
    }

    // Récupérer tous les accompagnements
    @GetMapping("/all")
    public List<AccompagnementPFE> getAllAccompagnements() {
        return service.getAllAccompagnements();
    }

    // Récupérer un accompagnement par ID
    @GetMapping("/{id}")
    public Optional<AccompagnementPFE> getAccompagnementById(@PathVariable Long id) { // Changed to Long
        return service.getAccompagnementById(id);
    }

    // Mettre à jour un accompagnement
    @PutMapping("/{id}")
    public AccompagnementPFE updateAccompagnement(@PathVariable Long id, @RequestBody AccompagnementPFE updatedAccompagnement) { // Changed to Long
        return service.updateAccompagnement(id, updatedAccompagnement);
    }

    // Supprimer un accompagnement
    @DeleteMapping("/{id}")
    public void deleteAccompagnement(@PathVariable Long id) { // Changed to Long
        service.deleteAccompagnement(id);
    }
}
