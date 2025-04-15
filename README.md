# 🎓 Projet de Gestion de Ressources Éducatives - Microservices

Ce projet est une plateforme distribuée basée sur une architecture **microservices**. Il permet de gérer des ressources pédagogiques, des utilisateurs, des formations, des évaluations, et bien plus.

## 🧱 Structure du Projet

| Dossier/Fichier                  | Description |
|----------------------------------|-------------|
| `.idea/`                         | Fichiers de configuration IntelliJ IDEA. |
| `AccompagnementPFEMicroService/` | Microservice pour la gestion des accompagnements PFE. |
| `Authentification-MicroService/` | Microservice d'authentification et gestion des utilisateurs. |
| `EurekaServer/`                  | Serveur de découverte **Eureka** (Netflix OSS). |
| `FormationMS/`                   | Microservice de gestion des formations. |
| `Frontend/frontend/`            | Application **Angular** pour l'interface utilisateur. |
| `Gateway/`                       | **API Gateway** pour router les requêtes vers les microservices. |
| `MicroserviceEvaluation/`       | Microservice pour gérer les évaluations. |
| `RessourceMicroService/`        | Microservice de gestion des ressources pédagogiques. |
| `nomPrenomClasseExamen/`        | Microservice de gestion des examens. |
| `docker-compose.yml`            | Fichier de configuration Docker pour lancer les services. |
| `init.sql`                       | Script SQL d'initialisation de la base de données. |

## 🛠️ Technologies Utilisées

- **Spring Boot** (microservices, sécurité, REST API)
- **Angular** (frontend)
- **Docker & Docker Compose**
- **Eureka (Service Discovery)**
- **Spring Cloud Gateway**
- **MySQL** (ou autre base relationnelle)
- **JWT** (authentification)

## 🚀 Lancer le Projet

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/<utilisateur>/<nom-du-repo>.git
   cd <nom-du-repo>
