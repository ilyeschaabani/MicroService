📦 Première Intégration - Aperçu des Microservices
La première intégration regroupe les premiers microservices de la plateforme dans une architecture cohérente, prêts à être exécutés avec Docker Compose.

🧩 Composants Intégrés

Composant	Statut	Description
Authentification-MicroService	✅ Dockerisé	Gère les connexions et l'authentification (JWT).
EurekaServer	✅ Intégré	Service de découverte des microservices.
Gateway	✅ Intégré	Point d’entrée pour l’ensemble des services.
Frontend	✅ Disponible	Interface utilisateur Angular.
FormationMS	✅ Docker v2	Gère les formations.
MicroserviceEvaluation	✅ Intégré	Module d’évaluation des utilisateurs.
AccompagnementPFEMicroService	✅ Intégré	Suivi des projets de fin d'études.
RessourceMicroService	✅ Intégré	Gestion des ressources pédagogiques.
ProjectMicroServices	🛠️ En cours	Composant générique pour divers projets.
⚙️ Fichiers Importants
docker-compose.yml : Lancement unifié de tous les services via Docker.

init.sql : Création des tables et données de base pour MySQL.
