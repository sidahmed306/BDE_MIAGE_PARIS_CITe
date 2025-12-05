# 🚀 Guide de Démarrage Complet - Étape par Étape

## ⚠️ PROBLÈME RÉSOLU : Dépendances manquantes

Les dépendances du backend n'étaient pas installées. Elles sont maintenant installées.

## 📋 ÉTAPES COMPLÈTES POUR DÉMARRER L'APPLICATION

### Étape 1 : Vérifier que vous êtes dans le bon dossier

```bash
cd C:\nuitInfo
```

### Étape 2 : Installer TOUTES les dépendances

```bash
npm run install-all
```

Cette commande installe :
- ✅ Dépendances du projet racine
- ✅ Dépendances du serveur (backend)
- ✅ Dépendances du client (frontend)

**Temps estimé : 2-3 minutes**

### Étape 3 : Vérifier que le fichier .env existe

Le fichier `.env` sera créé automatiquement au premier démarrage, mais vous pouvez le créer manuellement :

```bash
cd server
node create-env.js
```

Ou créez-le manuellement dans `server/.env` :
```
PORT=4001
JWT_SECRET=nuit-info-super-secret-jwt-key-change-in-production-2024
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

### Étape 4 : Démarrer l'application

**Option A : Démarrer tout ensemble (RECOMMANDÉ)**

Depuis `C:\nuitInfo` :

```bash
npm run dev
```

Cette commande démarre automatiquement :
- ✅ Backend sur le port **4001**
- ✅ Frontend sur le port **4000**

**Option B : Démarrer séparément (2 terminaux)**

**Terminal 1 - Backend :**
```bash
cd C:\nuitInfo\server
npm start
```

**Terminal 2 - Frontend :**
```bash
cd C:\nuitInfo\client
npm start
```

### Étape 5 : Vérifier que tout fonctionne

1. **Backend** : Ouvrez `http://localhost:4001/health`
   - ✅ Doit afficher : `{"status":"OK","message":"Server is running"}`

2. **Frontend** : Ouvrez `http://localhost:4000`
   - ✅ Doit afficher la page de connexion

3. **Connexion** :
   - Username : `admin`
   - Password : `00000000`

## 🔍 Messages attendus dans le terminal

### Backend (Terminal 1)
```
✅ Fichier .env créé avec succès!
Connected to SQLite database
Database tables initialized
✅ Default admin user created:
   Username: admin
   Password: 00000000
   Role: admin
Server running on port 4001
Environment: development
```

### Frontend (Terminal 2)
```
Compiled successfully!

You can now view nuit-info-client in the browser.

  Local:            http://localhost:4000
  On Your Network:  http://192.168.x.x:4000
```

## ❌ Erreurs courantes et solutions

### Erreur : "Cannot find module"
**Solution** : Réinstallez les dépendances
```bash
cd server
npm install
```

### Erreur : "Port 4001 already in use"
**Solution** : 
1. Trouvez le processus : `netstat -ano | findstr :4001`
2. Tuez-le ou changez le port dans `server/.env`

### Erreur : "ERR_CONNECTION_REFUSED"
**Solution** : Le backend n'est pas démarré. Démarrez-le d'abord !

### Erreur : "Database error"
**Solution** : 
1. Supprimez `server/data/database.db`
2. Redémarrez le serveur (la base sera recréée)

## ✅ Checklist finale

Avant de commencer à utiliser l'application :

- [ ] Toutes les dépendances sont installées
- [ ] Le fichier `server/.env` existe
- [ ] Le backend est démarré (port 4001)
- [ ] Le frontend est démarré (port 4000)
- [ ] `http://localhost:4001/health` fonctionne
- [ ] `http://localhost:4000` affiche la page de connexion
- [ ] Vous pouvez vous connecter avec admin/00000000

## 🎯 Commandes rapides

```bash
# Depuis C:\nuitInfo

# Installer tout
npm run install-all

# Démarrer tout
npm run dev

# Démarrer seulement le backend
npm run server

# Démarrer seulement le frontend
npm run client
```

## 📝 Notes importantes

1. **Ordre de démarrage** : Backend AVANT frontend
2. **Ne fermez pas les terminaux** : Les serveurs doivent rester en cours d'exécution
3. **Premier démarrage** : Le compte admin est créé automatiquement
4. **Base de données** : Créée automatiquement dans `server/data/database.db`

---

**Votre application est maintenant prête ! 🎉**

