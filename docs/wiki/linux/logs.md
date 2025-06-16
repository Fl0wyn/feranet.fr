# Logs

## Comprendre les logs serveur Linux et leur rôle

### Importance des logs pour la sécurité et le diagnostic

Les logs système sous Linux jouent un rôle essentiel dans la gestion, le diagnostic et la sécurité d'un serveur. Ils permettent de :

- Retracer les événements du système
- Identifier des erreurs au démarrage
- Surveiller l'activité des utilisateurs
- Détecter d'éventuelles tentatives de connexion non autorisées

Une bonne maîtrise de l'analyse des logs permet de réagir rapidement face à un dysfonctionnement ou une menace de sécurité. En consultant régulièrement les logs de démarrage Linux et les logs de connexion, un administrateur peut anticiper les problèmes et renforcer la sécurité du serveur.

### Emplacement des fichiers de logs principaux

Sous Linux, la majorité des fichiers de logs sont stockés dans le répertoire `/var/log`. Voici quelques-uns des fichiers les plus utilisés pour l'analyse :

```bash
/var/log/syslog ou /var/log/messages     # Informations générales sur le système
/var/log/auth.log ou /var/log/secure     # Connexions SSH, authentifications et tentatives échouées (Debian/Ubuntu vs CentOS/RHEL)
/var/log/dmesg                           # Messages du noyau au démarrage
/var/log/boot.log                        # Messages relatifs à la séquence de démarrage
/var/log/faillog et /var/log/lastlog     # Suivi des échecs d'authentification et dernières connexions
```

Pour une vision consolidée des événements, l'outil `journalctl`, utilisé avec `systemd`, permet de consulter l'ensemble des logs système de manière centralisée et filtrée, notamment ceux liés au démarrage et aux connexions utilisateur.

## Analyser les logs de démarrage

### Utilisation de journalctl pour les logs de démarrage

Sous les distributions Linux utilisant systemd, la commande `journalctl` est l'outil principal pour consulter les logs de démarrage. Elle permet d'extraire toutes les informations liées à la séquence de démarrage, depuis le moment où le noyau est chargé jusqu'au lancement complet du système.

Pour visualiser les logs du dernier démarrage :

```bash
journalctl -b
```

Pour afficher les logs d'un démarrage spécifique (numéroté à partir de 0, le plus récent) :

```bash
journalctl -b -1     # Affiche les logs de l'avant-dernier démarrage
```

Vous pouvez également filtrer par niveau de gravité ou par unité systemd spécifique :

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
