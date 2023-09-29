
1

1
Revochat

Une application de chat sécurisée et privée

Introduction

Revochat est une application de chat en développement qui vise à être plus sécurisée et plus privée que les applications de chat existantes. Elle utilise un cryptage de bout en bout pour protéger les communications des utilisateurs et ne collecte aucune donnée personnelle.

Fonctionnalités

Chats privés et de groupe
Partage de fichiers
Appels vocaux et vidéo
Émoticônes et GIFs
Historique de discussion
Sécurité

Cryptage de bout en bout pour toutes les communications
Pas de collecte de données personnelles
Authentification à deux facteurs
Installation

Pour installer Revochat, vous devez cloner le dépôt GitHub et installer les dépendances npm :

git clone https://github.com/revochat/Revochat.git
cd Revochat
npm i
Lancement

Pour lancer Revochat, exécutez la commande suivante :

npm start
Configuration

Pour configurer Revochat, vous devez créer un fichier .env dans le répertoire racine du projet et y définir les variables d'environnement suivantes :

BASE_URI: L'URL de base de l'application
MONGO_USERNAME: Le nom d'utilisateur de la base de données MongoDB
MONGO_PASSWORD: Le mot de passe de la base de données MongoDB
MONGO_URL: L'URL de la base de données MongoDB
Exemple de fichier .env

BASE_URI=http://localhost:3000
MONGO_USERNAME=revochat
MONGO_PASSWORD=password
MONGO_URL=mongodb://localhost:27017/revochat
Code d'exemple

Le code d'exemple suivant montre comment utiliser les variables d'environnement définies dans le fichier .env :

JavaScript
const BASE_URI = process.env.BASE_URI;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = process.env.MONGO_URL;

// ...

const mongoClient = new MongoClient(MONGO_URL, {
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
});

// ...

app.get("/", (req, res) => {
  res.send({
    message: "Hello, world!",
    baseUri: BASE_URI,
  });
});
Utilisez le code avec précaution. En savoir plus
Pour en savoir plus

Pour en savoir plus sur Revochat, veuillez consulter la documentation sur le site Web du projet.

Contribuer

Si vous souhaitez contribuer à Revochat, veuillez consulter les instructions de contribution sur le site Web du projet.

Licence

Revochat est distribué sous la licence MIT.