package com.example.accompagnementpfemicroservice.Service;

import com.example.accompagnementpfemicroservice.Entity.AccompagnementPFE;
import com.example.accompagnementpfemicroservice.Repository.AccompagnementPFEReposiroty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AccompagnementPFEService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    @Autowired
    private AccompagnementPFEReposiroty repository;

    // Ajouter un nouvel accompagnement
    public AccompagnementPFE createAccompagnement(AccompagnementPFE accompagnement) {
        // Simuler l'attribution automatique d'un encadrant
        if (accompagnement.getEncadrant() == null || accompagnement.getEncadrant().isEmpty()) {
            accompagnement.setEncadrant(assignEncadrant(accompagnement));
        }

        accompagnement.setNotificationEnvoyee(true); // simulate notification logic

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
            accompagnement.setSujetValide(updatedAccompagnement.getSujetValide());
            accompagnement.setSujet(updatedAccompagnement.getSujet());
            accompagnement.setAvancement(updatedAccompagnement.getAvancement());
            return repository.save(accompagnement);
        }).orElseThrow(() -> new RuntimeException("Accompagnement non trouvé avec l'ID : " + id));
    }

    // Supprimer un accompagnement par ID
    public void deleteAccompagnement(Long id) { // Changed to Long
        repository.deleteById(id);
    }
// Recherche par nom d'étudiant
    public List<AccompagnementPFE> findByEtudiant(String etudiant) {
        return repository.findByEtudiantContainingIgnoreCase(etudiant);
    }

    public List<AccompagnementPFE> findByAvancementGreaterThan(Float threshold) {
        return repository.findByAvancementGreaterThan(threshold);
    }

    public long countAll() {
        return repository.count();
    }

    public String exportAccompagnementsToCSV() {
        List<AccompagnementPFE> accompagnements = repository.findAll();
        StringWriter writer = new StringWriter();
        PrintWriter printWriter = new PrintWriter(writer);

        // Header
        printWriter.println("ID,Etudiant,Encadrant,Sujet,Avancement,Spécialité,Compétences,Niveau,Notification");

        for (AccompagnementPFE a : accompagnements) {
            printWriter.printf("%d,%s,%s,%s,%.2f,%s,%s,%s,%s%n",
                    a.getIdAccompagnement(),
                    a.getEtudiant(),
                    a.getEncadrant(),
                    a.getSujet(),
                    a.getAvancement(),
                    a.getSpecialite(),
                    a.getCompetences(),
                    a.getNiveau(),
                    a.getNotificationEnvoyee() != null ? a.getNotificationEnvoyee().toString() : "false"
            );
        }

        return writer.toString();
    }



    // Méthode fictive pour assigner un encadrant automatiquement
    private String assignEncadrant(AccompagnementPFE accompagnement) {
        // Logique simple basée sur la spécialité (exemple)
        switch (accompagnement.getSpecialite().toLowerCase()) {
            case "informatique":
                return "Dr. Yassine";
            case "telecom":
                return "Mme. Fethi";
            default:
                return "Encadrant Générique";
        }
    }
    public void saveFile(MultipartFile file) throws IOException {
        File dir = new File(uploadDir);
        if (!dir.exists() && !dir.mkdirs()) {
            throw new IOException("Impossible de créer le répertoire : " + uploadDir);
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);
        Files.copy(file.getInputStream(), path);
    }

    public Resource downloadFile(String fileName) {
        File file = new File(uploadDir, fileName);
        if (!file.exists()) {
            throw new RuntimeException("Fichier introuvable : " + fileName);
        }
        return new FileSystemResource(file);
    }
    public String getUploadDir() {
        return uploadDir;
    }


}
