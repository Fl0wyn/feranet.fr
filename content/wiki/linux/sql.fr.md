# SQL

## Commandes de base

### MySQL

#### Démarrer le service MySQL

```bash
sudo systemctl start mysql
```

#### Sécuriser l'installation de MySQL

```bash
sudo mysql_secure_installation
```

#### Se connecter à MySQL

```bash
mysql -u root -p
```

#### Créer une base de données

```sql
CREATE DATABASE database_name;
```

#### Créer un utilisateur

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

#### Accorder des privilèges

```sql
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

### PostgreSQL

#### Démarrer le service PostgreSQL

```bash
sudo systemctl start postgresql
```

#### Se connecter à PostgreSQL

```bash
sudo -i -u postgres
psql
```

#### Créer une base de données

```sql
CREATE DATABASE database_name;
```

#### Créer un utilisateur

```sql
CREATE USER username WITH PASSWORD 'password';
```

#### Accorder des privilèges

```sql
GRANT ALL PRIVILEGES ON DATABASE database_name TO username;
```

## Commandes SQL de base

### Sélectionner des données

```sql
SELECT * FROM table_name;
SELECT column1, column2 FROM table_name;
```

### Insérer des données

```sql
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```

### Modifier des données

```sql
UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
```

### Supprimer des données

```sql
DELETE FROM table_name WHERE condition;
```
