# Partage SAMBA

## Serveur

### Installation

```bash
sudo apt install samba
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.back
```

### Configuration

Modifier `/etc/samba/smb.conf` :

```bash
[share]
   path = /home/user/share
   browseable = yes
   read only = no
```

### Définir le mot de passe de l'utilisateur

```bash
sudo smbpasswd -a user
sudo service smbd restart
```

## Client

### Installation

```bash
sudo apt install smbclient cifs-utils
mkdir /home/share
```

### Ajouter les informations d'authentification

Créer `/etc/samba/user` :

```bash
username=<user>
password=<password>
```

### Monter le répertoire automatiquement au démarrage

Modifier `/etc/fstab` :

```bash
//SRV-WINDOWS/prod/share /home/share cifs  credentials=/etc/samba/user,noexec  0 0
```
