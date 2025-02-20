package com.example.projetmicroservice.Repository;

import com.example.projetmicroservice.Entity.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetRepository extends JpaRepository<Projet, String> {
}
