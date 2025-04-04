package tn.esprit.projectmicroservice.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.projectmicroservice.Entity.User;
import tn.esprit.projectmicroservice.Repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Endpoint to get encadrants
    @GetMapping("/encadrants")
    public List<User> getEncadrants() {
        return userRepository.findByRole("ENCADRANT");
    }

    // Endpoint to get all users (just an example)
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userRepository.findAll();  // Fetch all users from the database
    }
}
