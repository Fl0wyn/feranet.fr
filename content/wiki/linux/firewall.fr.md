# Pare-feu

## UFW

### Configuration

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Pour autoriser les connexions entrantes :

```bash
sudo ufw allow ssh
sudo ufw allow "WWW Full"
```

Pour supprimer une règle :

```bash
sudo ufw delete allow 80
```

Pour vérifier l'état d'UFW :

```bash
sudo ufw status
```

Activer UFW :

```bash
sudo ufw enable
```

Pour lister les applications disponibles :

```bash
sudo ufw app list
```

## Fail2ban

### Configuration

Copiez le fichier de configuration afin d'éviter qu'il soit écrasé lors d'une mise à jour :

```bash
cd /etc/fail2ban
cp jail.conf jail.local
```

Modifiez le fichier `jail.local` :

```bash
# Liste des adresses IP ou des hôtes DNS ignorés
ignoreip = 127.0.0.1/8 ::1

# Durée du bannissement
bantime = 2h

# Intervalle de temps entre chaque bannissement
findtime = 20m

# Nombre d'échecs avant un bannissement
maxretry = 6
```

Pour activer des jails, créez un fichier `jail-d.conf` dans le répertoire `/etc/fail2ban/jail.d` et ajoutez le nom de la jail avec la valeur `True`.
Exemple avec les jails **ssh** et **apache2** :

```bash
[sshd]
port = 2222
enabled = true

[apache-auth]
enabled = true
```

### Liste des commandes

```bash
# Afficher l'état des jails actives
fail2ban-client status

# Afficher l'état d'une jail active précise
fail2ban-client status sshd

# Débannir une adresse IP
fail2ban-client unban 1.2.3.4

# Débannir une adresse IP d'un service précis
fail2ban-client set sshd unban 1.2.3.4
```

## Iptables

### Configuration

Copiez la liste des règles iptables dans le fichier `/root/firewall.sh`, modifiez-les, puis rendez-le exécutable :

```bash
curl -L https://git.io/JeSL5 > /root/firewall.sh
chmod +x /root/firewall.sh
```

Testez et vérifiez l'exécution du script :

```bash
bash /root/firewall.sh
iptables -L
```

Rendez les règles persistantes :

```bash
iptables-save > /etc/firewall.conf
```

Ouvrez `/etc/network/if-up.d/iptables` et ajoutez ce qui suit :

```bash
#!/bin/bash
iptables-restore < /etc/firewall.conf
```

Rendez-le exécutable :

```bash
chmod +x /etc/network/if-up.d/iptables
```

### Administration

Modifier les règles :

```bash
vim /root/firewall.sh
bash /root/firewall.sh
iptables-save > /etc/firewall.conf
```

Voir les adresses IP interdites à partir du fichier `banip.txt` :

```bash
iptables -L INPUT -nv --line-numbers | grep DROP
```

Voir les adresses IP bannies d'ipset :

```bash
ipset -L
```

> Créez un fichier `banip.txt` et ajoutez-y manuellement les adresses IP à bannir.
