# MongoDB

### Ubuntu/Debian

Importer la clé GPG publique de MongoDB :

```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
```

Créer le fichier de liste des sources pour MongoDB :

```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

Mettre à jour la base de données des paquets et installer MongoDB :

```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## Gestion du service

### Démarrer MongoDB

```bash
sudo systemctl start mongod
```

### Activer le démarrage automatique de MongoDB au lancement du système

```bash
sudo systemctl enable mongod
```

### Vérifier l'état du service

```bash
sudo systemctl status mongod
```

### Arrêter MongoDB

```bash
sudo systemctl stop mongod
```

### Redémarrer MongoDB

```bash
sudo systemctl restart mongod
```

## Configuration

Le fichier de configuration principal se trouve à l'emplacement `/etc/mongod.conf`.

### Configuration de base

```yaml
# mongod.conf

# Emplacement de stockage des données
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

# Emplacement d'écriture des journaux
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# Interfaces réseau
net:
  port: 27017
  bindIp: 127.0.0.1

# Gestion des processus
processManagement:
  timeZoneInfo: /usr/share/zoneinfo
```

### Activer l'authentification

Modifier `/etc/mongod.conf` :

```yaml
security:
  authorization: enabled
```

### Autoriser les connexions à distance

Modifier le paramètre `bindIp` dans `/etc/mongod.conf` :

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0 # Écouter sur toutes les interfaces
```

**Attention** : ne le faites que si des règles de pare-feu adaptées sont en place.

## Commandes MongoDB de base

### Se connecter à MongoDB

```bash
mongosh
```

### Opérations sur les bases de données

```javascript
// Afficher toutes les bases de données
show dbs

// Utiliser une base de données (la crée si elle n'existe pas)
use myapp

// Afficher la base de données courante
db

// Supprimer la base de données
db.dropDatabase()
```

### Opérations sur les collections

```javascript
// Afficher les collections
show collections

// Créer une collection
db.createCollection("users")

// Supprimer une collection
db.users.drop()
```

### Opérations sur les documents

#### Insérer des documents

```javascript
// Insérer un document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
});

// Insérer plusieurs documents
db.users.insertMany([
  { name: "Alice", email: "alice@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 35 },
]);
```

#### Rechercher des documents

```javascript
// Rechercher tous les documents
db.users.find();

// Rechercher avec une condition
db.users.find({ age: { $gt: 25 } });

// Rechercher un seul document
db.users.findOne({ name: "John Doe" });

// Rechercher avec une projection
db.users.find({}, { name: 1, email: 1, _id: 0 });
```

#### Mettre à jour des documents

```javascript
// Mettre à jour un document
db.users.updateOne({ name: "John Doe" }, { $set: { age: 31 } });

// Mettre à jour plusieurs documents
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });
```

#### Supprimer des documents

```javascript
// Supprimer un document
db.users.deleteOne({ name: "John Doe" });

// Supprimer plusieurs documents
db.users.deleteMany({ age: { $lt: 25 } });
```

## Gestion des utilisateurs

### Créer un utilisateur administrateur

Commencez par vous connecter à MongoDB sans authentification :

```bash
mongosh
```

Basculer sur la base de données admin et créer un utilisateur administrateur :

```javascript
use admin
db.createUser({
  user: "admin",
  pwd: "securepassword",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})
```

### Créer un utilisateur de base de données

```javascript
use myapp
db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: ["readWrite"]
})
```

### Se connecter avec authentification

```bash
mongosh -u admin -p --authenticationDatabase admin
```

## Sauvegarde et restauration

### Créer une sauvegarde

```bash
# Sauvegarder toutes les bases de données
mongodump --out /backup/mongodb/

# Sauvegarder une base de données spécifique
mongodump --db myapp --out /backup/mongodb/

# Sauvegarder avec authentification
mongodump --username admin --password --authenticationDatabase admin --out /backup/mongodb/
```

### Restaurer à partir d'une sauvegarde

```bash
# Restaurer toutes les bases de données
mongorestore /backup/mongodb/

# Restaurer une base de données spécifique
mongorestore --db myapp /backup/mongodb/myapp/

# Restaurer avec authentification
mongorestore --username admin --password --authenticationDatabase admin /backup/mongodb/
```

## Optimisation des performances

### Index

```javascript
// Créer un index
db.users.createIndex({ email: 1 });

// Créer un index composé
db.users.createIndex({ name: 1, age: -1 });

// Créer un index de texte
db.users.createIndex({ name: "text", description: "text" });

// Lister les index
db.users.getIndexes();

// Supprimer un index
db.users.dropIndex({ email: 1 });
```

### Performances des requêtes

```javascript
// Expliquer l'exécution d'une requête
db.users.find({ email: "john@example.com" }).explain("executionStats");

// Utiliser des hints pour forcer l'utilisation d'un index
db.users.find({ email: "john@example.com" }).hint({ email: 1 });
```

## Surveillance

### Statistiques de la base de données

```javascript
// Statistiques de la base de données
db.stats();

// Statistiques d'une collection
db.users.stats();

// État du serveur
db.serverStatus();
```

### Vérifier les opérations en cours

```javascript
// Afficher les opérations en cours
db.currentOp();

// Arrêter une opération
db.killOp(123456);
```

### Analyse des journaux

```bash
# Consulter les journaux de MongoDB
sudo tail -f /var/log/mongodb/mongod.log

# Rechercher les requêtes lentes
sudo grep "slow" /var/log/mongodb/mongod.log
```

## Bonnes pratiques de sécurité

1. **Activer l'authentification** : activez toujours l'authentification en production
2. **Utiliser des mots de passe robustes** : utilisez des mots de passe complexes pour les utilisateurs de bases de données
3. **Sécurité réseau** : liez le service à des interfaces précises et utilisez des pare-feu
4. **Mises à jour régulières** : gardez MongoDB à jour avec la dernière version stable
5. **Stratégie de sauvegarde** : mettez en place des procédures de sauvegarde régulières
6. **Surveiller les accès** : surveillez les accès et les opérations sur la base de données
7. **SSL/TLS** : activez SSL/TLS pour chiffrer les connexions

### Activer SSL/TLS

Modifier `/etc/mongod.conf` :

```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
```

## Dépannage

### Problèmes courants

#### Le service ne démarre pas

```bash
# Vérifier l'état du service
sudo systemctl status mongod

# Consulter les journaux
sudo journalctl -u mongod

# Consulter les journaux de MongoDB
sudo tail -f /var/log/mongodb/mongod.log
```

#### Problèmes de connexion

```bash
# Vérifier si MongoDB est à l'écoute
sudo netstat -tlnp | grep :27017

# Tester la connexion
mongosh --host localhost --port 27017
```

#### Problèmes d'espace disque

```bash
# Vérifier l'utilisation du disque
df -h /var/lib/mongodb

# Vérifier la taille des bases de données
mongosh --eval "db.adminCommand('listCollections').cursor.firstBatch.forEach(printjson)"
```

### Problèmes de performances

```javascript
// Vérifier les opérations lentes
db.currentOp({ secs_running: { $gt: 5 } });

// Profiler les requêtes lentes
db.setProfilingLevel(2, { slowms: 100 });
db.system.profile.find().sort({ ts: -1 }).limit(5);
```

## Commandes utiles

```bash
# Vérifier la version de MongoDB
mongod --version

# Valider les fichiers de données
mongod --dbpath /var/lib/mongodb --repair

# Compacter la base de données
mongosh --eval "db.runCommand({compact: 'collection_name'})"

# Obtenir l'aide du shell MongoDB
mongosh --help
```
