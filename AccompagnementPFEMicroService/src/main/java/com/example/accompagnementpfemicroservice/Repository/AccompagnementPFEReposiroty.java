package com.example.accompagnementpfemicroservice.Repository;

import com.example.accompagnementpfemicroservice.Entity.AccompagnementPFE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccompagnementPFEReposiroty extends JpaRepository<AccompagnementPFE, Long> { // Changed to Long
}
