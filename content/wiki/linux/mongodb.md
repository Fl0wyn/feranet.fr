# MongoDB

### Ubuntu/Debian

Import the MongoDB public GPG key:

```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
```

Create the list file for MongoDB:

```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

Update the package database and install MongoDB:

```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## Service Management

### Start MongoDB

```bash
sudo systemctl start mongod
```

### Enable MongoDB to start on boot

```bash
sudo systemctl enable mongod
```

### Check service status

```bash
sudo systemctl status mongod
```

### Stop MongoDB

```bash
sudo systemctl stop mongod
```

### Restart MongoDB

```bash
sudo systemctl restart mongod
```

## Configuration

The main configuration file is located at `/etc/mongod.conf`.

### Basic Configuration

```yaml
# mongod.conf

# Where to store data
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

# Where to write logging data
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# Network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1

# Process management
processManagement:
  timeZoneInfo: /usr/share/zoneinfo
```

### Enable Authentication

Edit `/etc/mongod.conf`:

```yaml
security:
  authorization: enabled
```

### Allow Remote Connections

Edit the `bindIp` setting in `/etc/mongod.conf`:

```yaml
net:
  port: 27017
  bindIp: 0.0.0.0 # Listen on all interfaces
```

**Warning**: Only do this if you have proper firewall rules in place.

## Basic MongoDB Commands

### Connect to MongoDB

```bash
mongosh
```

### Database Operations

```javascript
// Show all databases
show dbs

// Use a database (creates if doesn't exist)
use myapp

// Show current database
db

// Drop database
db.dropDatabase()
```

### Collection Operations

```javascript
// Show collections
show collections

// Create collection
db.createCollection("users")

// Drop collection
db.users.drop()
```

### Document Operations

#### Insert Documents

```javascript
// Insert one document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
});

// Insert multiple documents
db.users.insertMany([
  { name: "Alice", email: "alice@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 35 },
]);
```

#### Find Documents

```javascript
// Find all documents
db.users.find();

// Find with condition
db.users.find({ age: { $gt: 25 } });

// Find one document
db.users.findOne({ name: "John Doe" });

// Find with projection
db.users.find({}, { name: 1, email: 1, _id: 0 });
```

#### Update Documents

```javascript
// Update one document
db.users.updateOne({ name: "John Doe" }, { $set: { age: 31 } });

// Update multiple documents
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });
```

#### Delete Documents

```javascript
// Delete one document
db.users.deleteOne({ name: "John Doe" });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 25 } });
```

## User Management

### Create Admin User

First, connect to MongoDB without authentication:

```bash
mongosh
```

Switch to admin database and create an admin user:

```javascript
use admin
db.createUser({
  user: "admin",
  pwd: "securepassword",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})
```

### Create Database User

```javascript
use myapp
db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: ["readWrite"]
})
```

### Connect with Authentication

```bash
mongosh -u admin -p --authenticationDatabase admin
```

## Backup and Restore

### Create Backup

```bash
# Backup all databases
mongodump --out /backup/mongodb/

# Backup specific database
mongodump --db myapp --out /backup/mongodb/

# Backup with authentication
mongodump --username admin --password --authenticationDatabase admin --out /backup/mongodb/
```

### Restore from Backup

```bash
# Restore all databases
mongorestore /backup/mongodb/

# Restore specific database
mongorestore --db myapp /backup/mongodb/myapp/

# Restore with authentication
mongorestore --username admin --password --authenticationDatabase admin /backup/mongodb/
```

## Performance Tuning

### Indexes

```javascript
// Create index
db.users.createIndex({ email: 1 });

// Create compound index
db.users.createIndex({ name: 1, age: -1 });

// Create text index
db.users.createIndex({ name: "text", description: "text" });

// List indexes
db.users.getIndexes();

// Drop index
db.users.dropIndex({ email: 1 });
```

### Query Performance

```javascript
// Explain query execution
db.users.find({ email: "john@example.com" }).explain("executionStats");

// Use hints to force index usage
db.users.find({ email: "john@example.com" }).hint({ email: 1 });
```

## Monitoring

### Database Statistics

```javascript
// Database stats
db.stats();

// Collection stats
db.users.stats();

// Server status
db.serverStatus();
```

### Check Current Operations

```javascript
// Show current operations
db.currentOp();

// Kill operation
db.killOp(123456);
```

### Log Analysis

```bash
# View MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Search for slow queries
sudo grep "slow" /var/log/mongodb/mongod.log
```

## Security Best Practices

1. **Enable Authentication**: Always enable authentication in production
2. **Use Strong Passwords**: Use complex passwords for database users
3. **Network Security**: Bind to specific interfaces and use firewalls
4. **Regular Updates**: Keep MongoDB updated to the latest stable version
5. **Backup Strategy**: Implement regular backup procedures
6. **Monitor Access**: Monitor database access and operations
7. **SSL/TLS**: Enable SSL/TLS for encrypted connections

### Enable SSL/TLS

Edit `/etc/mongod.conf`:

```yaml
net:
  port: 27017
  bindIp: 127.0.0.1
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
```

## Troubleshooting

### Common Issues

#### Service Won't Start

```bash
# Check service status
sudo systemctl status mongod

# Check logs
sudo journalctl -u mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

#### Connection Issues

```bash
# Check if MongoDB is listening
sudo netstat -tlnp | grep :27017

# Test connection
mongosh --host localhost --port 27017
```

#### Disk Space Issues

```bash
# Check disk usage
df -h /var/lib/mongodb

# Check database sizes
mongosh --eval "db.adminCommand('listCollections').cursor.firstBatch.forEach(printjson)"
```

### Performance Issues

```javascript
// Check slow operations
db.currentOp({ secs_running: { $gt: 5 } });

// Profile slow queries
db.setProfilingLevel(2, { slowms: 100 });
db.system.profile.find().sort({ ts: -1 }).limit(5);
```

## Useful Commands

```bash
# Check MongoDB version
mongod --version

# Validate data files
mongod --dbpath /var/lib/mongodb --repair

# Compact database
mongosh --eval "db.runCommand({compact: 'collection_name'})"

# Get MongoDB shell help
mongosh --help
```
