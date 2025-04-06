package tn.esprit.authentificationmicroservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.authentificationmicroservice.Entity.Enum.Role;
import tn.esprit.authentificationmicroservice.Entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String Email);
    User findByRole (Role role);
}
