# SQL

## Basic Commands

### MySQL

#### Start MySQL Service

```bash
sudo systemctl start mysql
```

#### Secure MySQL Installation

```bash
sudo mysql_secure_installation
```

#### Login to MySQL

```bash
mysql -u root -p
```

#### Create a Database

```sql
CREATE DATABASE database_name;
```

#### Create a User

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

#### Grant Privileges

```sql
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

### PostgreSQL

#### Start PostgreSQL Service

```bash
sudo systemctl start postgresql
```

#### Login to PostgreSQL

```bash
sudo -i -u postgres
psql
```

#### Create a Database

```sql
CREATE DATABASE database_name;
```

#### Create a User

```sql
CREATE USER username WITH PASSWORD 'password';
```

#### Grant Privileges

```sql
GRANT ALL PRIVILEGES ON DATABASE database_name TO username;
```

## Basic SQL Commands

### Select Data

```sql
SELECT * FROM table_name;
SELECT column1, column2 FROM table_name;
```

### Insert Data

```sql
INSERT INTO table_name (column1, column2) VALUES (value1, value2);
```

### Update Data

```sql
UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
```

### Delete Data

```sql
DELETE FROM table_name WHERE condition;
```
