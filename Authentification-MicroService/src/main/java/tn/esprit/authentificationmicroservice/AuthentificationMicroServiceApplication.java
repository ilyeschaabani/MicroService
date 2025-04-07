package tn.esprit.authentificationmicroservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tn.esprit.authentificationmicroservice.Entity.Enum.Role;
import tn.esprit.authentificationmicroservice.Entity.User;
import tn.esprit.authentificationmicroservice.Repository.UserRepository;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthentificationMicroServiceApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(AuthentificationMicroServiceApplication.class, args);
	}
	public void run(String... args) throws Exception {
		User admineaccount = userRepository.findByRole(Role.ADMIN);
		if(admineaccount == null) {
			User user = new User();
			user.setEmail("admine@admine.com");
			user.setNom("admine");
			user.setPrenom("admine");
			user.setTelephone("12345678");
			user.setAdresse("admine");
			user.setPassword(new BCryptPasswordEncoder().encode("admine"));
			user.setRole(Role.ADMIN);
			userRepository.save(user);
		}


	}


}
