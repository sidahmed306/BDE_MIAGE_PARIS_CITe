# 🔧 Résolution : Port 4000 déjà utilisé

## ❌ Problème
```
Error: Port 4000 is already in use
```

## ✅ SOLUTIONS

### Solution 1 : Arrêter le processus (Recommandé)

**Option A : Script automatique (Windows)**

Double-cliquez sur le fichier :
```
kill-port-4000.bat
```

**Option B : Commande manuelle**

Ouvrez PowerShell en tant qu'administrateur et exécutez :

```powershell
# Trouver le processus
netstat -ano | findstr :4000

# Arrêter le processus (remplacez PID par le numéro trouvé)
taskkill /PID <PID> /F
```

**Option C : Script PowerShell**

```powershell
.\kill-port.ps1 -Port 4000
```

### Solution 2 : Changer le port du frontend

Si vous ne pouvez pas arrêter le processus, changez le port :

1. **Modifier `client/package.json`** :
```json
"start": "cross-env PORT=4002 craco start"
```

2. **Modifier `client/src/services/api.js`** :
```javascript
const API_BASE_URL = 'http://localhost:4001/api';
// (Pas besoin de changer, le backend reste sur 4001)
```

3. **Redémarrer le frontend** :
```bash
cd client
npm start
```

Le frontend sera maintenant sur le port **4002** au lieu de 4000.

### Solution 3 : Utiliser un autre port temporairement

Créez un fichier `client/.env` :
```
PORT=4002
```

Puis redémarrez le frontend.

## 🔍 Vérifier quel processus utilise le port

```powershell
netstat -ano | findstr :4000
```

Cela affichera le PID (Process ID) du processus.

## ✅ Après avoir résolu le problème

1. **Arrêtez** le processus qui utilise le port 4000
2. **Redémarrez** le frontend :
```bash
cd client
npm start
```

3. **Vérifiez** que le frontend démarre correctement sur le port 4000

## 🎯 Commandes rapides

```bash
# Trouver le processus
netstat -ano | findstr :4000

# Arrêter le processus (remplacez PID)
taskkill /PID <PID> /F

# Redémarrer le frontend
cd client
npm start
```

---

**Le port 4000 devrait maintenant être libre ! 🚀**

