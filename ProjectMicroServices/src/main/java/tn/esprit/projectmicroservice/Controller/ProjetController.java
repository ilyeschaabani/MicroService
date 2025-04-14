package tn.esprit.projectmicroservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.projectmicroservice.Entity.Projet;
import tn.esprit.projectmicroservice.Service.ProjetService;
import tn.esprit.projectmicroservice.Service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projets")
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    @Autowired
    private UserService userService;  // Service pour récupérer un utilisateur par ID

    @PostMapping("/add")
    public Projet addProjet(@RequestBody Projet projet) {
        // Passer directement le projet sans fichiers
        return projetService.addProjet(projet);
    }

    @PutMapping("/update/{id}")
    public Projet updateProjet(@PathVariable String id, @RequestBody Projet projet) {
        return projetService.updateProjet(id, projet);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProjet(@PathVariable String id) {
        return projetService.deleteProjet(id);
    }

    @GetMapping("/all")
    public List<Projet> getAllProjets() {
        return projetService.getAllProjets();
    }

    @GetMapping("/{id}")
    public Projet getProjetById(@PathVariable String id) {
        return projetService.getProjetById(id);
    }

    @PutMapping("/validate-or-reject/{id}")
    public Projet validateOrRejectProjet(@PathVariable String id,
                                         @RequestParam boolean isValid,
                                         @RequestParam(required = false) String rejectionMotif) {
        return projetService.validateOrRejectProjet(id, isValid, rejectionMotif);
    }


    @PutMapping("/assignEncadrant/{projetId}")
    public ResponseEntity<Projet> assignEncadrant(
            @PathVariable String projetId,
            @RequestParam String encadrant) {

        try {
            Projet updatedProjet = projetService.assignEncadrant(projetId, encadrant);
            return ResponseEntity.ok(updatedProjet);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }



}
