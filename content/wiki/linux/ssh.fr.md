# SSH

## Se connecter à une machine distante

```bash
# Sur le port 22
ssh root@1.2.3.4

# Sur le port 5678
ssh -p 5678 root@1.2.3.4
```

## Se connecter sans mot de passe

### Générer une clé

```bash
# -o : Enregistrer la clé au nouveau format openssh
# -a : Nombre de tours de la fonction de dérivation de clé
# -t : Préciser le type de clé à créer
# -f : Emplacement de sortie de la clé
# -C : Ajouter un commentaire à la clé

ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "email@example.com"
```

### Envoyer la clé à la machine distante

```bash
ssh-copy-id -i .ssh/id_ed25519.pub root@1.2.3.4
```

## Envoyer un fichier du client vers le serveur

```bash
scp file.sh root@1.2.3.4:/home/eve

# Sur le port 5678
scp -P 5678 file.sh root@1.2.3.4:/home/eve

# Envoyer un dossier
scp -r folder root@1.2.3.4:/home/eve
```

## Envoyer un fichier du serveur vers le client

```bash
scp root@1.2.3.4:file.sh /home/eve

# Sur le port 5678
scp -P 5678 root@1.2.3.4:file.sh /home/eve

# Envoyer un dossier
scp -r root@1.2.3.4:folder /home/eve
```

## Exécuter une commande

```bash
ssh root@1.2.3.4 'df -h'

# Sur le port 5678
ssh -P 5678 root@1.2.3.4 'df -h'
```

## Lancer un script

```bash
ssh root@1.2.3.4 './scripts.sh'

# Sur le port 5678
ssh -P 5678 root@1.2.3.4 './scripts.sh'
```

## Exécuter une fonction d'un script

```bash
ssh root@1.2.3.4 "$(declare -f fonction_creation); fonction_creation" > /dev/null 2>&1

# Sur le port 5678
ssh -P 5678 root@1.2.3.4 "$(declare -f fonction_creation); fonction_creation" > /dev/null 2>&1
```

## Tunnel SSH

```bash
ssh root@1.2.3.4 -L 2500:127.0.0.1:3000 -N -v

# Sur le port 5678
ssh -P 5678 root@1.2.3.4 -L 2500:127.0.0.1:3000 -N -v
```

## Autres commandes utiles

```bash
# Tester votre configuration et déboguer
sshd -T

# Lister les algorithmes de chiffrement disponibles sur votre serveur
ssh -Q cipher

# Lister les algorithmes de chiffrement d'authentification
ssh -Q cipher-auth

# Lister les MAC
ssh -Q mac

# Lister les algorithmes
ssh -Q kex

# Lister les clés
ssh -Q key
```

## Sécuriser la configuration

### Modifier les permissions pour éviter les erreurs

```bash
chmod 0700 ~/.ssh
chmod 0600 ~/.ssh/id_ed25519
chmod 0644 ~/.ssh/authorized_keys
```

### Sauvegarder le fichier de configuration

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

### Modifier le fichier de configuration

Modifier `/etc/ssh/sshd_config` :

```bash
# Interface & Port
Port 5678
AddressFamily any
ListenAddress 0.0.0.0
ListenAddress ::

HostKey /etc/ssh/ssh_host_ed25519_key

Protocol 2

SyslogFacility AUTHPRIV
LogLevel VERBOSE

# Restriction de l'authentification
LoginGraceTime 30s
PermitRootLogin no
StrictModes yes
MaxAuthTries 3
MaxSessions 5

PubkeyAuthentication yes
AllowUsers bob
AuthorizedKeysFile  .ssh/authorized_keys

HostbasedAuthentication no
IgnoreRhosts yes

# Pour désactiver les mots de passe en clair via tunnel, mettre no ici !
PermitEmptyPasswords no
PasswordAuthentication no

# Mettre no pour désactiver les mots de passe s/key
ChallengeResponseAuthentication no

UsePAM yes

AllowAgentForwarding no
AllowTcpForwarding no
GatewayPorts no
X11Forwarding no
PermitTTY yes
PermitUserEnvironment no
PrintMotd no
PrintLastLog no

#TCPKeepAlive yes
#PermitUserEnvironment no
#Compression delayed
#ClientAliveInterval 0
#ClientAliveCountMax 3
#ShowPatchLevel no
UseDNS yes
PidFile /var/run/sshd.pid
MaxStartups 10:30:100
PermitTunnel no
#ChrootDirectory none
VersionAddendum none

# Pas de chemin de bannière par défaut
Banner none
DebianBanner no

# Accepter les variables d'environnement liées à la langue
AcceptEnv LANG LC_*

# Remplacer la valeur par défaut (aucun sous-système)
Subsystem   sftp   /usr/libexec/openssh/sftp-server
```

### Régénérer la clé ED25519 du serveur

```bash
sudo rm -f /etc/ssh/ssh_host_*
sudo ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key -N ""
```

### Supprimer les modules Diffie-Hellman faibles

```bash
sudo awk '$5 >= 3071' /etc/ssh/moduli > /etc/ssh/moduli.safe
sudo mv -f /etc/ssh/moduli.safe /etc/ssh/moduli
```

### Désactiver les clés DSA/ECDSA et RSA

```bash
sudo sed -i 's/^HostKey \/etc\/ssh\/ssh_host_\(dsa\|ecdsa\|rsa\)_key$/\#HostKey \/etc\/ssh\/ssh_host_\1_key/g' /etc/ssh/sshd_config
```

### Restreindre les algorithmes de chiffrement, d'échange de clés et les méthodes d'authentification

```bash
echo -e "\nKexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512\nCiphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr\nMACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com" >> /etc/ssh/sshd_config
```

### Refuser les connexions SSH à tous, sauf à certaines adresses IP

```bash
echo "sshd: ALL" >> /etc/hosts.deny
echo "sshd: 1.2.3.4, 5.6.7.8" >> /etc/hosts.allow
```

### Redémarrer le service SSH

```bash
sudo systemctl restart sshd.service
```

### Tester le serveur

- [Site web ssh-audit](https://www.ssh-audit.com/)
- [Outil Python ssh-audit](https://github.com/jtesta/ssh-audit)

## Configuration des hôtes

### Créer et modifier le fichier `.ssh/config`

```bash
Host john
    HostName example.com
    User root
    Port 5678

Host eve
    HostName 1.2.3.4
    User pi
    IdentityFile ~/.ssh/id_ed25519
```

### Se connecter en SSH avec le fichier `.ssh/config`

```bash
ssh john
ssh eve
```

> Ajoutez les commandes à exécuter à chaque nouvelle connexion SSH dans le fichier `/etc/ssh/sshrc`.
