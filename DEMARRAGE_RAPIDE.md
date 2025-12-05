# 🚀 Démarrage Rapide - Nuit de l'Info

## ⚠️ PROBLÈME : ERR_CONNECTION_REFUSED

Cette erreur signifie que le **serveur backend n'est pas démarré**.

## ✅ SOLUTION : Démarrer le Backend

### Option 1 : Démarrer Backend + Frontend ensemble (Recommandé)

**Dans le terminal, depuis `C:\nuitInfo` :**

```bash
npm run dev
```

Cette commande démarre automatiquement :
- ✅ Backend sur le port **4001**
- ✅ Frontend sur le port **4000**

### Option 2 : Démarrer séparément (2 terminaux)

**Terminal 1 - Backend :**
```bash
cd C:\nuitInfo\server
npm start
```

Vous devriez voir :
```
Connected to SQLite database
Database tables initialized
✅ Default admin user created:
   Username: admin
   Password: 00000000
   Role: admin
Server running on port 4001
```

**Terminal 2 - Frontend :**
```bash
cd C:\nuitInfo\client
npm start
```

## 🔍 Vérification

### 1. Vérifier que le backend fonctionne

Ouvrez votre navigateur et allez sur :
```
http://localhost:4001/health
```

Vous devriez voir :
```json
{"status":"OK","message":"Server is running"}
```

### 2. Vérifier que le frontend fonctionne

Ouvrez votre navigateur et allez sur :
```
http://localhost:4000
```

Vous devriez voir la page de connexion.

## 📝 Checklist

Avant de démarrer, vérifiez :

- [ ] Vous êtes dans le dossier `C:\nuitInfo`
- [ ] Les dépendances sont installées (`npm run install-all`)
- [ ] Le fichier `server/.env` existe
- [ ] Aucun autre programme n'utilise les ports 4000 et 4001

## 🐛 Si le problème persiste

### Vérifier que le port 4001 est libre

**Windows PowerShell :**
```powershell
netstat -ano | findstr :4001
```

Si quelque chose utilise le port, tuez le processus ou changez le port dans `server/.env`.

### Réinstaller les dépendances

```bash
cd server
npm install
cd ../client
npm install
```

### Vérifier les logs

Regardez les messages dans le terminal où le serveur backend tourne. Vous devriez voir :
- "Connected to SQLite database"
- "Database tables initialized"
- "Server running on port 4001"

## 🎯 Ordre d'exécution correct

1. **D'abord** : Démarrer le backend (port 4001)
2. **Ensuite** : Démarrer le frontend (port 4000)
3. **Enfin** : Ouvrir `http://localhost:4000` dans le navigateur

---

**Important** : Le backend DOIT être démarré avant le frontend, sinon vous aurez l'erreur `ERR_CONNECTION_REFUSED`.

