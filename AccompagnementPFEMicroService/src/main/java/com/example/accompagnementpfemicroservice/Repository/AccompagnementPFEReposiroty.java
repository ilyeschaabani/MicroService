package com.example.accompagnementpfemicroservice.Repository;

import com.example.accompagnementpfemicroservice.Entity.AccompagnementPFE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccompagnementPFEReposiroty extends JpaRepository<AccompagnementPFE, Long> { // Changed to Long
    List<AccompagnementPFE> findByEtudiantContainingIgnoreCase(String etudiant);
    List<AccompagnementPFE> findByAvancementGreaterThan(Float avancement);



}
