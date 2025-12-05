# Guide de Démarrage - Nuit de l'Info Gamification Tool

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 14 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (généralement inclus avec Node.js)
- Un terminal/console (PowerShell, CMD, ou Terminal)

## 🚀 Guide d'Exécution Étape par Étape

### Étape 1 : Vérifier l'installation de Node.js

Ouvrez un terminal et vérifiez que Node.js est installé :

```bash
node --version
npm --version
```

Vous devriez voir des numéros de version (ex: v18.17.0 et 9.6.7)

### Étape 2 : Naviguer vers le dossier du projet

```bash
cd C:\nuitInfo
```

### Étape 3 : Installer les dépendances du projet racine

```bash
npm install
```

Cette commande installe `concurrently` qui permet de lancer le backend et le frontend simultanément.

### Étape 4 : Installer les dépendances du serveur (Backend)

```bash
cd server
npm install
```

Cette étape installe :
- Express.js (serveur web)
- SQLite3 (base de données)
- bcryptjs (hashage des mots de passe)
- jsonwebtoken (authentification JWT)
- Et autres dépendances...

### Étape 5 : Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier `server/` :

```bash
# Dans le dossier server/
# Créez le fichier .env avec ce contenu :
```

**Contenu du fichier `server/.env`** :
```
PORT=4001
JWT_SECRET=nuit-info-super-secret-jwt-key-change-in-production-2024
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

**Note** : Si le fichier `.env` existe déjà, vérifiez qu'il contient ces valeurs.

### Étape 6 : Installer les dépendances du client (Frontend)

```bash
# Retourner au dossier racine
cd ..
cd client
npm install
```

Cette étape installe :
- React
- React Router
- Axios
- Tailwind CSS
- Et autres dépendances...

### Étape 7 : Retourner au dossier racine

```bash
cd ..
```

Vous devriez maintenant être dans `C:\nuitInfo`

### Étape 8 : Démarrer l'application

**Option A : Démarrer backend et frontend ensemble (Recommandé)**

```bash
npm run dev
```

Cette commande démarre automatiquement :
- Le serveur backend sur le port **4001**
- Le serveur frontend sur le port **4000**

**Option B : Démarrer séparément (2 terminaux)**

**Terminal 1 - Backend :**
```bash
npm run server
```

**Terminal 2 - Frontend :**
```bash
npm run client
```

### Étape 9 : Vérifier que tout fonctionne

1. **Backend** : Ouvrez votre navigateur et allez sur :
   ```
   http://localhost:4001/health
   ```
   Vous devriez voir : `{"status":"OK","message":"Server is running"}`

2. **Frontend** : Ouvrez votre navigateur et allez sur :
   ```
   http://localhost:4000
   ```
   Vous devriez voir la page de connexion.

### Étape 10 : Se connecter avec le compte admin

Lors du premier démarrage, un compte admin est créé automatiquement :

- **Username** : `admin`
- **Password** : `00000000`

1. Allez sur `http://localhost:4000/login`
2. Entrez les identifiants ci-dessus
3. Cliquez sur "Se connecter"

## 📝 Commandes Utiles

### Arrêter l'application
Appuyez sur `Ctrl + C` dans le terminal où l'application tourne.

### Réinstaller les dépendances
Si vous rencontrez des problèmes, réinstallez toutes les dépendances :

```bash
npm run install-all
```

### Vérifier les ports
Assurez-vous que les ports 4000 et 4001 ne sont pas utilisés par d'autres applications.

## 🔧 Résolution de Problèmes

### Problème : "Port already in use"
**Solution** : Fermez l'application qui utilise le port ou changez le port dans les fichiers de configuration.

### Problème : "Module not found"
**Solution** : Réinstallez les dépendances :
```bash
cd server && npm install
cd ../client && npm install
```

### Problème : "Cannot connect to backend"
**Solution** : 
1. Vérifiez que le serveur backend est démarré
2. Vérifiez l'URL dans `client/src/services/api.js` : `http://localhost:4001/api`

### Problème : "Database error"
**Solution** : 
1. Supprimez le fichier `server/data/database.db` s'il existe
2. Redémarrez le serveur (la base de données sera recréée automatiquement)

## 📁 Structure des Dossiers

```
nuitInfo/
├── server/              # Backend (Node.js + Express + SQLite)
│   ├── config/          # Configuration base de données
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middlewares (auth, validation)
│   ├── routes/          # Routes API
│   ├── data/           # Base de données SQLite (créée auto)
│   ├── .env            # Variables d'environnement
│   └── index.js        # Point d'entrée serveur
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── components/ # Composants réutilisables
│   │   ├── pages/      # Pages de l'application
│   │   └── services/   # Services API
│   └── package.json
└── package.json        # Configuration projet racine
```

## ✅ Checklist de Vérification

Avant de démarrer, vérifiez :

- [ ] Node.js est installé (`node --version`)
- [ ] npm est installé (`npm --version`)
- [ ] Vous êtes dans le dossier `C:\nuitInfo`
- [ ] Toutes les dépendances sont installées
- [ ] Le fichier `server/.env` existe et est configuré
- [ ] Les ports 4000 et 4001 sont disponibles

## 🎯 Prochaines Étapes

Une fois l'application démarrée :

1. **Connectez-vous** avec le compte admin
2. **Créez des équipes** dans la section "Teams"
3. **Créez des défis** dans la section "Challenges"
4. **Enregistrez des scores** dans la section "Scores"
5. **Visualisez les statistiques** dans le Dashboard

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les messages d'erreur dans la console
2. Vérifiez que tous les services sont démarrés
3. Consultez les logs du serveur backend

---

**Bon développement ! 🚀**

