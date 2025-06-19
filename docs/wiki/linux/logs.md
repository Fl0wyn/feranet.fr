# Linux Server Logs

> This guide is based on [Quick-Tutoriel's article on Linux server logs](https://quick-tutoriel.com/logs-serveur-linux/) by Guillaume Reynaud.

## Understanding Linux Server Logs

### Importance for Security and Troubleshooting

Linux system logs play a crucial role in server management, diagnostics, and security. They enable administrators to:

- Track system events
- Identify boot errors
- Monitor user activity
- Detect unauthorized access attempts

Mastering log analysis allows for quick responses to system malfunctions or security threats. Regular review of boot and connection logs helps prevent problems and strengthen server security.

### Main Log File Locations

Most Linux log files are stored in the `/var/log` directory. Here are the most commonly used files:

```bash
/var/log/syslog or /var/log/messages     # General system information
/var/log/auth.log or /var/log/secure     # SSH connections, authentications, failed attempts (Debian/Ubuntu vs CentOS/RHEL)
/var/log/dmesg                           # Kernel messages at boot
/var/log/boot.log                        # Boot sequence messages
/var/log/faillog and /var/log/lastlog    # Authentication failures and last connections
```

For a consolidated view of events, `journalctl` used with `systemd` provides centralized and filtered access to system logs, especially those related to boot and user connections.

## Analyzing Boot Logs

### Using journalctl for Boot Logs

On Linux distributions using systemd, `journalctl` is the main tool for viewing boot logs. It extracts all information related to the boot sequence, from kernel loading to complete system startup.

To view logs from the latest boot:

```bash
journalctl -b
```

To display logs from a specific boot (numbered from 0, most recent):

```bash
journalctl -b -1     # Show logs from the second-most recent boot
```

You can also filter by severity level or specific systemd unit:

```bash
journalctl -b -p err                  # Show only errors from the last boot
journalctl -u ssh.service             # Show SSH service logs
journalctl --since "1 hour ago"       # Show logs from the last hour
```

### Last Command and wtmp File

In Linux, the `last` command reads the contents of the `/var/log/wtmp` and `/var/log/btmp` files.

To see when the machine was shut down:

```bash
last -x shutdown --time-format iso
```

To see when the machine was rebooted:

```bash
last -x reboot --time-format iso
```

The `-x` parameter also displays system shutdowns and run level changes.

Important files:

- The `wtmp` file contains a record of all system logins and logouts (shutdown, reboot)
- The `btmp` file contains all failed login attempts

These files cannot be read directly with a text editor. To read them in a more readable format:

```bash
last -f /var/log/btmp    # Read login failures
last -f /var/log/wtmp    # Read login history
```

### Interpreting Boot Messages

Boot messages provide valuable information about the proper functioning of various system components, including:

- Kernel and module loading
- Hardware detection
- Filesystem mounting
- systemd service startup

It's essential to identify error messages (often indicated by `Failed` or `Error`) that can slow down or block server boot. Similarly, messages like `Job running`, `Timeout`, or `Dependency failed` indicate dependency problems or misconfigured services.

## Securing Your System Through Log Analysis

### Analyzing /var/log/auth.log for SSH Connections

One of the most important files for monitoring SSH activity on a Linux server is `/var/log/auth.log` (or `/var/log/secure` on CentOS/RHEL). It records all authentication attempts, both successful and failed, as well as privilege elevations via sudo.

To examine these Linux connection logs:

```bash
grep sshd /var/log/auth.log
```

This allows you to identify which users connected, when, from which IP address, and whether they were successfully authenticated. This analysis is essential for auditing SSH connections and maintaining access traceability on your server.

### Detecting Failed Connection Attempts

Failed connection attempts are key indicators of a potential intrusion attempt. They often appear in logs as: `Failed password for invalid user ...`

To quickly extract these events:

```bash
grep "Failed password" /var/log/auth.log
```

For a more concise view sorted by IP address:

```bash
awk '/Failed password/ {print $(NF-3)}' /var/log/auth.log | sort | uniq -c | sort -nr
```

This helps you identify IP addresses responsible for multiple failures and implement countermeasures (such as fail2ban or firewall rules) to strengthen your Linux server's security.

## Setting Up Log Rotation

You can define log retention periods by editing the `/etc/logrotate.conf` file.

Here are some important parameters:

```bash
# Basic logrotate configuration
monthly              # Rotation occurs monthly (alternatives: daily, weekly)
create 0664 root utmp # Permissions for created files
rotate 4             # Number of files to keep
minsize 1M           # Minimum size before rotation
compress             # Compress old logs
```

Other useful parameters:

- `compress`: Secondary log files will be compressed
- `delaycompress`: Delays compression of the previous log to the next cycle
- `notifempty`: Don't rotate empty logs
- `prerotate`, `postrotate/endscript`: Commands to execute before/after rotation

To force logrotate execution:

```bash
logrotate -f /etc/logrotate.conf
```

To debug the configuration:

```bash
logrotate -d /etc/logrotate.conf
```

## Useful Commands for Log Analysis

```bash
# Display the last 10 lines of a log file and follow its evolution
tail -f /var/log/syslog

# Search authentication logs for successful connections
grep "Accepted password" /var/log/auth.log

# Show users who used sudo
grep sudo /var/log/auth.log | grep COMMAND

# Extract IP addresses that attempted to connect
grep sshd /var/log/auth.log | grep -i "invalid user" | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr

# Show logs related to a specific service
journalctl -u apache2.service --since today
```

```bash
journalctl -b -p err                  # Affiche uniquement les erreurs du dernier démarrage
journalctl -u ssh.service             # Affiche les logs du service SSH
journalctl --since "1 hour ago"       # Affiche les logs de la dernière heure
```

### Commande Last et fichier wtmp

Sous Linux, la commande `last` permet de lire le contenu des fichiers `/var/log/wtmp` et `/var/log/btmp`.

Pour connaître les dates et heures où la machine s'est arrêtée :

```bash
last -x shutdown --time-format iso
```

Pour connaître les dates et heures où la machine a redémarré :

```bash
last -x reboot --time-format iso
```

Le paramètre `-x` permet d'afficher également les arrêts du système et les modifications de niveau d'exécution (run level).

Les fichiers importants :

- Le fichier `wtmp` contient une trace de toutes les connexions et déconnexions du système (arrêt, reboot).
- Le fichier `btmp` contient tous les échecs de connexions à votre système.

Ces fichiers ne peuvent pas être lus directement avec un éditeur de texte. Pour les lire de façon plus agréable :

```bash
last -f /var/log/btmp    # Lire les échecs de connexion
last -f /var/log/wtmp    # Lire l'historique des connexions
```

### Interprétation des messages de démarrage

Les messages de démarrage fournissent des indications précieuses sur le bon fonctionnement des différents composants du système. Ils incluent notamment :

- Le chargement du noyau et des modules
- La détection du matériel
- Le montage des systèmes de fichiers
- Le démarrage des services systemd

Il est essentiel d'identifier les messages d'erreur (souvent signalés par `Failed` ou `Error`) qui peuvent ralentir ou bloquer le démarrage du serveur. De même, les messages comme `Job running`, `Timeout`, ou `Dependency failed` indiquent des problèmes de dépendances ou de services mal configurés.

## Sécuriser votre système grâce à l'analyse des logs

### Analyse de /var/log/auth.log pour les connexions SSH

L'un des fichiers les plus importants pour suivre l'activité des connexions SSH sur un serveur Linux est le fichier `/var/log/auth.log` (ou `/var/log/secure` sur CentOS/RHEL). Il enregistre toutes les tentatives d'authentification, qu'elles soient réussies ou échouées, ainsi que les élévations de privilèges via sudo.

Pour examiner ces logs de connexion Linux :

```bash
grep sshd /var/log/auth.log
```

Cela vous permettra d'identifier quels utilisateurs se sont connectés, à quel moment, depuis quelle adresse IP, et s'ils ont été authentifiés avec succès. Cette analyse est essentielle pour auditer les connexions SSH et maintenir la traçabilité des accès sur votre serveur.

### Détection des tentatives de connexion échouées

Les tentatives de connexion échouées sont des indicateurs clés d'une éventuelle tentative d'intrusion. Elles apparaissent souvent dans les logs sous la forme : `Failed password for invalid user ...`

Pour extraire rapidement ces événements :

```bash
grep "Failed password" /var/log/auth.log
```

Pour une vue plus synthétique classée par adresses IP :

```bash
awk '/Failed password/ {print $(NF-3)}' /var/log/auth.log | sort | uniq -c | sort -nr
```

Cela vous permet de repérer les adresses IP à l'origine de plusieurs échecs, et de mettre en place des contre-mesures (comme fail2ban ou des règles de pare-feu) pour renforcer la sécurité de votre serveur Linux.

## Mettre en place la rotation des fichiers log

Il est possible de définir la durée de conservation des logs. Pour ce faire, vous devez éditer le fichier `/etc/logrotate.conf`.

Voici quelques paramètres importants :

```bash
# Configuration de base de logrotate
monthly              # La rotation s'effectue tous les mois (alternative: daily, weekly)
create 0664 root utmp # Droits des fichiers créés
rotate 4             # Nombre de fichiers à conserver
minsize 1M           # Taille minimale avant rotation
compress             # Compression des anciens logs
```

D'autres paramètres utiles :

- `compress` : Les fichiers logs secondaires seront compressés
- `delaycompress` : Reporte la compression du journal précédent au prochain cycle
- `notifempty` : Ne pas permuter le journal lorsqu'il est vide
- `prerotate`, `postrotate/endscript` : Commandes à exécuter avant/après la rotation

Pour forcer l'exécution de logrotate :

```bash
logrotate -f /etc/logrotate.conf
```

Pour déboguer la configuration :

```bash
logrotate -d /etc/logrotate.conf
```

## Commandes utiles pour analyser les logs

```bash
# Afficher les 10 dernières lignes d'un fichier log et suivre son évolution
tail -f /var/log/syslog

# Rechercher dans les logs d'authentification les connexions réussies
grep "Accepted password" /var/log/auth.log

# Afficher les utilisateurs ayant utilisé sudo
grep sudo /var/log/auth.log | grep COMMAND

# Extraire les adresses IP qui ont tenté de se connecter
grep sshd /var/log/auth.log | grep -i "invalid user" | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr

# Afficher les logs liés à un service spécifique
journalctl -u apache2.service --since today
```
