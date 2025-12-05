const http = require('http');

console.log('🧪 Test de connexion au serveur backend...\n');

const options = {
  hostname: 'localhost',
  port: 4001,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`✅ Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ Réponse:', data);
    console.log('\n🎉 Le serveur backend fonctionne correctement!');
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('❌ Erreur de connexion:', error.message);
  console.log('\n⚠️  Le serveur backend n\'est pas démarré.');
  console.log('💡 Solution: Démarrez le serveur avec "npm start" dans le dossier server/');
  process.exit(1);
});

req.end();

