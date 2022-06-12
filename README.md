# Groupomania

## 1) Objectif

- Créer un réseau social interne pour l'entreprise Groupomania.

https://user-images.githubusercontent.com/79447999/132387415-1a1cd061-5271-4224-b338-59e065f5db7f.mp4

## 2) Technologies utilisées

- Pour le frontend : `React`
- Pour le backend : `Node.js`,`Express.js`
- La base de données : `MySQL`

## 3) Cahier des charges

- Le site doit comprendre un système d'authentification.
- La creation du compte doit être simple et rapide.
- Le réseau social doit être accessible sur mobile.
- La modification et la suppression du profil doit être possible.
- Le réseau social doit contenir un lieu où les salariés partagent des GIFS, des images, des articles.
- Les salariés doivent pouvoir réagir aux publications.
- Un administrateur doit pouvoir modérer les publications et les commentaires.

# Pré-requis

- Avoir `Npm` et `Node.js` installé sur sa machine.

# Instructions

0. Cloner le dossier `git clone https://github.com/theo-laurent/TheoLaurent_7_15022021.git`

## Backend

1. Se placer dans le dossier backend , dans le terminal VSCode `cd backend`.
2. Installer les dépendances avec `npm install`.
3. Importer la base de données `db_groupomania.sql` afin de trouver une base déja configurée.
4. Renommer le fichier `example.env` en `.env` et modifier les variables d'environnements avec vos propres valeurs.
5. Lancer le serveur en executant `node server.js` ou `nodemon` (port 3000)

## Frontend

1. Se placer dans le dossier frontend, dans le terminal VSCode `cd frontend`.
2. Installer les dépendances avec `npm install`.
3. Démarrer `npm start`, une page va s'ouvrir sinon rendez vous sur `http://localhost:3000/`
4. Les identifiants du compte administrateur sont fournis dans le fichier `compte_administrateur.txt`.
