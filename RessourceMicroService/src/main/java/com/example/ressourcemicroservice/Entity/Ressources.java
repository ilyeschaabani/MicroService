package com.example.ressourcemicroservice.Entity;


import com.example.ressourcemicroservice.Entity.Enumeration.CategoryRessource;
import com.example.ressourcemicroservice.Entity.Enumeration.TypeRessource;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import java.util.Date;

@Document(collection = "ressources") // Spécifie la collection MongoDB
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Ressources {

    @Id
    @Field("idRessource") // Nom du champ dans MongoDB
    String idRessource;

    String titre;
    String description;

    // Enregistre en tant que chaîne pour éviter des erreurs avec MongoDB
    TypeRessource type;

    Date date;

    CategoryRessource category;

    /* Relation ManyToOne non supportée par MongoDB directement
    @ManyToOne
    User user;
    */
}