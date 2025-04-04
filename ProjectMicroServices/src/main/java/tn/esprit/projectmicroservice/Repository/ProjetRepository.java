package tn.esprit.projectmicroservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.projectmicroservice.Entity.Projet;
public interface ProjetRepository extends JpaRepository<Projet, String> {
}
