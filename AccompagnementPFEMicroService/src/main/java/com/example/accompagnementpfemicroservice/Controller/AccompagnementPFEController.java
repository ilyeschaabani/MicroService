package com.example.accompagnementpfemicroservice.Controller;

import com.example.accompagnementpfemicroservice.Entity.AccompagnementPFE;
import com.example.accompagnementpfemicroservice.Service.AccompagnementPFEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")  // Ajout dans le contrôleur

@RestController
@RequestMapping("/api/accompagnement")
public class AccompagnementPFEController {

    @Autowired
    private AccompagnementPFEService service;

    // Créer un accompagnement
    @PostMapping
    public ResponseEntity<?> createAccompagnement(@RequestBody AccompagnementPFE accompagnement) {
        AccompagnementPFE created = service.createAccompagnement(accompagnement);
        return ResponseEntity.ok().body(Map.of(
                "message", "Encadrant assigné automatiquement : " + created.getEncadrant(),
                "data", created
        ));
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

    // Route pour uploader un fichier

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            service.saveFile(file);
            return ResponseEntity.ok("Fichier uploadé avec succès !");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'upload : " + e.getMessage());
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Resource resource = service.downloadFile(fileName);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<Map<String, Object>>> listFiles() {
        File dir = new File(service.getUploadDir());
        if (!dir.exists() || !dir.isDirectory()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }

        // Liste tous les fichiers dans le répertoire
        String[] files = dir.list((directory, fileName) -> new File(directory, fileName).isFile());
        if (files != null) {
            List<Map<String, Object>> fileDetails = new ArrayList<>();

            for (String fileName : files) {
                File file = new File(dir, fileName);
                Map<String, Object> fileInfo = new HashMap<>();
                fileInfo.put("fileName", fileName);
                fileInfo.put("fileType", "application/octet-stream"); // Ou utiliser une logique pour détecter le type de fichier
                fileInfo.put("uploadDate", new Date(file.lastModified()));
                fileDetails.add(fileInfo);
            }

            return ResponseEntity.ok(fileDetails); // Retourne les informations détaillées des fichiers
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

}

