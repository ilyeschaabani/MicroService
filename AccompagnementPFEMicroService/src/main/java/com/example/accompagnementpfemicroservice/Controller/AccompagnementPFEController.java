package com.example.accompagnementpfemicroservice.Controller;

import com.example.accompagnementpfemicroservice.Entity.AccompagnementPFE;
import com.example.accompagnementpfemicroservice.Service.AccompagnementPFEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.nio.charset.StandardCharsets;

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

    //Recherche par nom d'étudiant
    @GetMapping("/etudiant/{name}")
    public List<AccompagnementPFE> getByEtudiant(@PathVariable String name) {
        return service.findByEtudiant(name);
    }
    //Filtrer par taux d’avancement supérieur à un seuil
    @GetMapping("/avancement/superieur/{value}")
    public List<AccompagnementPFE> getByAvancementGreater(@PathVariable Float value) {
        return service.findByAvancementGreaterThan(value);
    }
//nombre total d’accompagnements.
    @GetMapping("/count")
    public long countAccompagnements() {
        return service.countAll();
    }

    @GetMapping("/export/csv")
    public ResponseEntity<Resource> exportCSV() {
        String csvContent = service.exportAccompagnementsToCSV();
        ByteArrayResource resource = new ByteArrayResource(csvContent.getBytes(StandardCharsets.UTF_8));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=accompagnements.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .contentLength(resource.contentLength())
                .body(resource);
    }
}
