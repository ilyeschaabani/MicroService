package com.example.projetmicroservice.Controller;

import com.example.projetmicroservice.Service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.projetmicroservice.Entity.Projet;

import java.util.List;

@RestController
@RequestMapping("/api/projets")
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    @PostMapping("/add")
    public Projet addProjet(@RequestBody Projet projet) {
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

    @GetMapping("/get/{id}")
    public Projet getProjetById(@PathVariable String id) {
        return projetService.getProjetById(id);
    }
}

