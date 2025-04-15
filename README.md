# 📦 Première Intégration - Aperçu des Microservices

Cette première intégration regroupe les principaux microservices de la plateforme dans une architecture **cohérente et conteneurisée**, prête à être lancée avec Docker Compose.

## 🧩 Composants Intégrés

| Composant                        | Statut         | Description |
|----------------------------------|----------------|-------------|
| `Authentification-MicroService` | ✅ Dockerisé    | Gère les connexions et l’authentification avec JWT. |
| `EurekaServer`                  | ✅ Intégré      | Service de découverte des microservices (Service Registry). |
| `Gateway`                       | ✅ Intégré      | Point d’entrée unique pour toutes les requêtes. |
| `Frontend`                      | ✅ Disponible   | Interface utilisateur Angular. |
| `FormationMS`                   | ✅ Docker v2    | Gère les entités et données liées aux formations. |
| `MicroserviceEvaluation`        | ✅ Intégré      | Gestion des évaluations utilisateurs. |
| `AccompagnementPFEMicroService`| ✅ Intégré      | Suivi des projets de fin d’études (PFE). |
| `RessourceMicroService`         | ✅ Intégré      | Gestion des ressources pédagogiques. |
| `ProjectMicroServices`          | 🛠️ En cours     | Composant générique pour la gestion de projets. |

## ⚙️ Fichiers Importants

| Fichier              | Description |
|----------------------|-------------|
| `docker-compose.yml` | Fichier principal pour lancer l’ensemble des services avec Docker. |
| `init.sql`           | Script d’initialisation de la base de données (création des tables et insertion des données de base). |

---

