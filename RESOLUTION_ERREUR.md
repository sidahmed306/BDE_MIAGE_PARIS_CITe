# 🔧 Résolution de l'erreur ERR_CONNECTION_REFUSED

## ❌ Problème
```
POST http://localhost:4001/api/auth/login net::ERR_CONNECTION_REFUSED
```

**Cause** : Le serveur backend n'est **PAS démarré** sur le port 4001.

## ✅ SOLUTION IMMÉDIATE

### Étape 1 : Ouvrir un NOUVEAU terminal

Ouvrez un **nouveau terminal PowerShell** (gardez celui du frontend ouvert).

### Étape 2 : Aller dans le dossier server

```bash
cd C:\nuitInfo\server
```

### Étape 3 : Vérifier que le fichier .env existe

```bash
dir .env
```

Si le fichier n'existe pas, créez-le :
```bash
node create-env.js
```

### Étape 4 : Démarrer le serveur backend

```bash
npm start
```

**Vous devriez voir :**
```
✅ Fichier .env créé avec succès! (si c'était la première fois)
Connected to SQLite database
Database tables initialized
✅ Default admin user created:
   Username: admin
   Password: 00000000
   Role: admin
Server running on port 4001
Environment: development
```

### Étape 5 : Vérifier que le backend fonctionne

Dans votre navigateur, ouvrez :
```
http://localhost:4001/health
```

Vous devriez voir :
```json
{"status":"OK","message":"Server is running"}
```

### Étape 6 : Retourner au frontend

Maintenant, dans votre application frontend (qui devrait déjà être ouverte sur `http://localhost:4000`), essayez de vous connecter à nouveau.

## 🎯 Solution Complète (2 Terminaux)

### Terminal 1 - Backend
```bash
cd C:\nuitInfo\server
npm start
```
**Laissez ce terminal ouvert !** Le serveur doit rester en cours d'exécution.

### Terminal 2 - Frontend
```bash
cd C:\nuitInfo\client
npm start
```

## 🚀 Solution Automatique (1 Terminal)

Depuis `C:\nuitInfo` :

```bash
npm run dev
```

Cette commande démarre automatiquement backend ET frontend ensemble.

## ✅ Vérification Finale

1. **Backend** : `http://localhost:4001/health` → Doit retourner `{"status":"OK"}`
2. **Frontend** : `http://localhost:4000` → Doit afficher la page de connexion
3. **Connexion** : Utilisez `admin` / `00000000`

## ⚠️ Important

- Le backend DOIT être démarré AVANT d'utiliser le frontend
- Ne fermez PAS le terminal où le backend tourne
- Si vous fermez le terminal, le backend s'arrête et l'erreur revient

## 🐛 Si ça ne fonctionne toujours pas

1. **Vérifiez que le port 4001 est libre** :
```powershell
netstat -ano | findstr :4001
```

2. **Vérifiez les dépendances** :
```bash
cd C:\nuitInfo\server
npm install
```

3. **Vérifiez les logs** dans le terminal du backend pour voir les erreurs

---

**Le backend est maintenant démarré ! Vous pouvez vous connecter. 🎉**

