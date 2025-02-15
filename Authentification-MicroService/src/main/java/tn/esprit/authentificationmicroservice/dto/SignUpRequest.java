package tn.esprit.authentificationmicroservice.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import tn.esprit.authentificationmicroservice.Entity.Enum.Role;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignUpRequest {
    String nom;
    String prenom;
    String email;
    String password;
    Role role;
    //String photo;
    String telephone;
    String adresse;


}
