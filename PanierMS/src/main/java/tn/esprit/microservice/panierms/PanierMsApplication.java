package tn.esprit.microservice.panierms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PanierMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PanierMsApplication.class, args);
	}

}
