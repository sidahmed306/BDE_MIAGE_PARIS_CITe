# Documentation API - Nuit de l'Info

## Endpoint d'Inscription (Register)

### POST /api/auth/register

Crée un nouveau compte utilisateur.

#### URL
```
POST http://localhost:4001/api/auth/register
```

#### Headers
```
Content-Type: application/json
```

#### Body (JSON)
```json
{
  "username": "nom_utilisateur",
  "email": "email@example.com",
  "password": "motdepasse123"
}
```

#### Paramètres requis
- `username` (string, 3-30 caractères) : Nom d'utilisateur unique
  - Ne peut contenir que des lettres, chiffres et underscores
- `email` (string) : Adresse email valide et unique
- `password` (string, min 6 caractères) : Mot de passe

#### Réponses

**Succès (201 Created)**
```json
{
  "message": "Compte créé avec succès!"
}
```

**Erreur de validation (400 Bad Request)**
```json
{
  "error": "Validation failed",
  "errors": [
    {
      "msg": "Le nom d'utilisateur doit contenir entre 3 et 30 caractères",
      "param": "username",
      "location": "body"
    }
  ]
}
```

**Erreur - Utilisateur existe déjà (400 Bad Request)**
```json
{
  "error": "Ce nom d'utilisateur est déjà utilisé"
}
```
ou
```json
{
  "error": "Cet email est déjà utilisé"
}
```

**Erreur serveur (500 Internal Server Error)**
```json
{
  "error": "Internal server error"
}
```

#### Exemple avec cURL
```bash
curl -X POST http://localhost:4001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Exemple avec JavaScript (fetch)
```javascript
fetch('http://localhost:4001/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

#### Règles de validation
1. **Username** :
   - Minimum 3 caractères
   - Maximum 30 caractères
   - Uniquement lettres, chiffres et underscores (a-z, A-Z, 0-9, _)
   - Doit être unique

2. **Email** :
   - Format email valide
   - Doit être unique

3. **Password** :
   - Minimum 6 caractères
   - Pas de maximum (recommandé: max 128 caractères)

#### Notes
- Le mot de passe est automatiquement hashé avec bcrypt avant stockage
- Le rôle par défaut est "user" (peut être changé en "admin" par un administrateur)
- L'API est publique (pas besoin d'authentification pour s'inscrire)

