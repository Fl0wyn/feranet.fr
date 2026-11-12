# Chroot SFTP

## Rappel sur les droits Linux

```bash
# Changer le propriétaire
chown -R <user>:<group> <path>

# Changer les droits
chmod -R 755 <path>
# 0 : --- (aucun droit)
# 1 : --x (exécution)
# 2 : -w- (écriture)
# 3 : -wx (écriture et exécution)
# 4 : r-- (lecture seule)
# 5 : r-x (lecture et exécution)
# 6 : rw- (lecture et écriture)
# 7 : rwx (lecture, écriture et exécution)
```

> Dans cet exemple, l'utilisateur `myuser` sera confiné (chroot) dans le répertoire `myuser`.

## Ajouter un groupe et un utilisateur

```bash
groupadd sftp_users
useradd -G sftp_users myuser
```

## Ajouter un mot de passe à l'utilisateur (facultatif)

```bash
echo "myuser:<my_password>" | chpasswd
```

## Créer le répertoire

```bash
mkdir -p /var/share/myuser
```

## Définir les permissions

```bash
chown -R root:root /var/share
chmod -R 755 /var/share
chown myuser:sftp_users /var/share/myuser
```

## Modifier la configuration SSH

Modifier `/etc/ssh/sshd_config` :

```bash
Subsystem sftp internal-sftp

Match Group sftp_users
        ChrootDirectory /var/share/%u
        ForceCommand internal-sftp
        AllowTcpForwarding no
        X11Forwarding no
```
