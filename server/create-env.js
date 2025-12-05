const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = `PORT=4001
JWT_SECRET=nuit-info-super-secret-jwt-key-change-in-production-2024
JWT_EXPIRES_IN=24h
NODE_ENV=development
`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Fichier .env créé avec succès!');
} else {
  console.log('ℹ️  Le fichier .env existe déjà');
}

