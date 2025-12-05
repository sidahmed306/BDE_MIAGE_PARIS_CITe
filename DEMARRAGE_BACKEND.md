# 🔧 Guide de Démarrage du Backend

## ❌ Problème : Backend ne fonctionne pas

## ✅ SOLUTION ÉTAPE PAR ÉTAPE

### Étape 1 : Aller dans le dossier server

```bash
cd C:\nuitInfo\server
```

### Étape 2 : Vérifier que les dépendances sont installées

```bash
npm install
```

**Attendez que l'installation se termine** (environ 1-2 minutes)

### Étape 3 : Vérifier que le fichier .env existe

```bash
node create-env.js
```

Cela créera le fichier `.env` s'il n'existe pas.

### Étape 4 : Démarrer le serveur

```bash
npm start
```

### Étape 5 : Vérifier les messages

Vous devriez voir dans le terminal :

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

### Étape 6 : Tester le serveur

Ouvrez un **nouveau terminal** et testez :

```bash
cd C:\nuitInfo\server
node test-server.js
```

Ou ouvrez dans votre navigateur :
```
http://localhost:4001/health
```

Vous devriez voir :
```json
{"status":"OK","message":"Server is running"}
```

## 🐛 Résolution des problèmes

### Problème : "Cannot find module"
**Solution** :
```bash
cd server
npm install
```

### Problème : "Port 4001 already in use"
**Solution** :
1. Trouvez le processus : `netstat -ano | findstr :4001`
2. Notez le PID (dernier nombre)
3. Tuez-le : `taskkill /PID <numéro> /F`
4. Ou changez le port dans `server/.env`

### Problème : "Error opening database"
**Solution** :
1. Vérifiez que le dossier `server/data/` existe
2. Supprimez `server/data/database.db` s'il est corrompu
3. Redémarrez le serveur

### Problème : "JWT_SECRET is not defined"
**Solution** :
1. Vérifiez que `server/.env` existe
2. Exécutez : `node create-env.js`

## ✅ Checklist

- [ ] Vous êtes dans `C:\nuitInfo\server`
- [ ] `npm install` a été exécuté avec succès
- [ ] Le fichier `.env` existe dans `server/`
- [ ] `npm start` a été exécuté
- [ ] Vous voyez "Server running on port 4001" dans le terminal
- [ ] `http://localhost:4001/health` fonctionne

## 🎯 Une fois le backend démarré

1. **Ne fermez PAS le terminal** où le backend tourne
2. Le backend doit rester en cours d'exécution
3. Vous pouvez maintenant utiliser le frontend

---

**Le backend devrait maintenant fonctionner ! 🚀**

