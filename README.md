# Auth API

API Node.js simple permettant de gérer une **authentification par email et mot de passe** avec génération de **JSON Web Tokens (JWT)**.  
Les utilisateurs sont stockés en mémoire et les mots de passe sont sécurisés via **bcrypt**.

## Fonctionnalités

- Inscription d’utilisateurs (register)
- Connexion avec vérification du mot de passe
- Hashage sécurisé des mots de passe
- Génération de tokens JWT
- Middleware de protection des routes

## Technos utilisées

- **Node.js**
- **Express**
- **bcrypt**
- **jsonwebtoken (JWT)**

## Améliorations futures

- Stockage de la clé dans un **.env**
- Héberger l'API définitivement pour l'utiliser dans mes projets personnels 
