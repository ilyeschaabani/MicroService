package tn.esprit.projectmicroservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.projectmicroservice.Entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {  // Change String to Long for the primary key type
    Optional<User> findByUsername(String username); // Add this method
    Optional<User> findById(Long id); // Find a user by ID (now Long)

    List<User> findByRole(String role); // Find users by role
}
