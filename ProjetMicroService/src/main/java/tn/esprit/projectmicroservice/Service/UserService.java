package tn.esprit.projectmicroservice.Service;

import tn.esprit.projectmicroservice.Entity.User;
import tn.esprit.projectmicroservice.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;  // Dependency injection for UserRepository

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Method to get a user by ID (now Long)
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + userId));
    }

    // Method to check if the user is an admin
    public boolean isAdmin(User user) {
        return "ADMIN".equals(user.getRole());  // If the role is ADMIN, then the user is an admin
    }

    // Method to check if the user is an encadrant
    public boolean isEncadrant(User user) {
        return "ENCADRANT".equals(user.getRole()); // If the role is ENCADRANT, then the user is an encadrant
    }

    // Method to check if the user is an étudiant
    public boolean isEtudiant(User user) {
        return "ETUDIANT".equals(user.getRole()); // If the role is ETUDIANT, then the user is an étudiant
    }
}
