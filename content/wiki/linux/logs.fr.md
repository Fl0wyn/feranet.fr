# Journaux (logs) d'un serveur Linux

> Ce guide s'appuie sur [l'article de Quick-Tutoriel consacré aux logs d'un serveur Linux](https://quick-tutoriel.com/logs-serveur-linux/) de Guillaume Reynaud.

## Comprendre les journaux d'un serveur Linux

### Importance pour la sécurité et le dépannage

Les journaux système de Linux jouent un rôle essentiel dans la gestion, le diagnostic et la sécurité d'un serveur. Ils permettent aux administrateurs de :

- Suivre les événements du système
- Identifier les erreurs de démarrage
- Surveiller l'activité des utilisateurs
- Détecter les tentatives d'accès non autorisées

Maîtriser l'analyse des journaux permet de réagir rapidement en cas de dysfonctionnement ou de menace pour la sécurité. Consulter régulièrement les journaux de démarrage et de connexion aide à prévenir les problèmes et à renforcer la sécurité du serveur.

### Emplacement des principaux fichiers de journaux

La plupart des fichiers de journaux Linux sont stockés dans le répertoire `/var/log`. Voici les fichiers les plus couramment utilisés :

```bash
/var/log/syslog or /var/log/messages     # Informations générales sur le système
/var/log/auth.log or /var/log/secure     # Connexions SSH, authentifications, tentatives échouées (Debian/Ubuntu vs CentOS/RHEL)
/var/log/dmesg                           # Messages du noyau au démarrage
/var/log/boot.log                        # Messages de la séquence de démarrage
/var/log/faillog and /var/log/lastlog    # Échecs d'authentification et dernières connexions
```

Pour obtenir une vue consolidée des événements, `journalctl`, utilisé avec `systemd`, offre un accès centralisé et filtré aux journaux du système, notamment ceux liés au démarrage et aux connexions des utilisateurs.

## Analyser les journaux de démarrage

### Utiliser journalctl pour les journaux de démarrage

Sur les distributions Linux qui utilisent systemd, `journalctl` est l'outil principal pour consulter les journaux de démarrage. Il extrait toutes les informations relatives à la séquence de démarrage, du chargement du noyau jusqu'au démarrage complet du système.

Pour afficher les journaux du dernier démarrage :

```bash
journalctl -b
```

Pour afficher les journaux d'un démarrage précis (numérotés à partir de 0, le plus récent) :

```bash
journalctl -b -1     # Afficher les journaux de l'avant-dernier démarrage
```

Vous pouvez aussi filtrer par niveau de gravité ou par unité systemd :

```bash
journalctl -b -p err                  # Afficher uniquement les erreurs du dernier démarrage
journalctl -u ssh.service             # Afficher les journaux du service SSH
journalctl --since "1 hour ago"       # Afficher les journaux de la dernière heure
```

### La commande last et le fichier wtmp

Sous Linux, la commande `last` lit le contenu des fichiers `/var/log/wtmp` et `/var/log/btmp`.

Pour savoir quand la machine a été éteinte :

```bash
last -x shutdown --time-format iso
```

Pour savoir quand la machine a été redémarrée :

```bash
last -x reboot --time-format iso
```

Le paramètre `-x` affiche également les arrêts du système et les changements de niveau d'exécution.

Fichiers importants :

- Le fichier `wtmp` contient l'historique de toutes les ouvertures et fermetures de session du système (arrêt, redémarrage)
- Le fichier `btmp` contient toutes les tentatives de connexion échouées

Ces fichiers ne peuvent pas être lus directement avec un éditeur de texte. Pour les lire dans un format plus lisible :

```bash
last -f /var/log/btmp    # Lire les échecs de connexion
last -f /var/log/wtmp    # Lire l'historique des connexions
```

### Interpréter les messages de démarrage

Les messages de démarrage fournissent de précieuses informations sur le bon fonctionnement des différents composants du système, notamment :

- Le chargement du noyau et des modules
- La détection du matériel
- Le montage des systèmes de fichiers
- Le démarrage des services systemd

Il est essentiel d'identifier les messages d'erreur (souvent signalés par `Failed` ou `Error`) qui peuvent ralentir ou bloquer le démarrage du serveur. De même, des messages comme `Job running`, `Timeout` ou `Dependency failed` indiquent des problèmes de dépendances ou des services mal configurés.

## Sécuriser votre système grâce à l'analyse des journaux

### Analyser /var/log/auth.log pour les connexions SSH

L'un des fichiers les plus importants pour surveiller l'activité SSH sur un serveur Linux est `/var/log/auth.log` (ou `/var/log/secure` sur CentOS/RHEL). Il enregistre toutes les tentatives d'authentification, réussies comme échouées, ainsi que les élévations de privilèges via sudo.

Pour examiner ces journaux de connexion Linux :

```bash
grep sshd /var/log/auth.log
```

Cela permet d'identifier quels utilisateurs se sont connectés, quand, depuis quelle adresse IP, et s'ils ont été authentifiés avec succès. Cette analyse est essentielle pour auditer les connexions SSH et garantir la traçabilité des accès à votre serveur.

### Détecter les tentatives de connexion échouées

Les tentatives de connexion échouées sont des indicateurs clés d'une possible tentative d'intrusion. Elles apparaissent souvent dans les journaux sous la forme : `Failed password for invalid user ...`

Pour extraire rapidement ces événements :

```bash
grep "Failed password" /var/log/auth.log
```

Pour obtenir une vue plus concise, triée par adresse IP :

```bash
awk '/Failed password/ {print $(NF-3)}' /var/log/auth.log | sort | uniq -c | sort -nr
```

Cela vous aide à identifier les adresses IP à l'origine de nombreux échecs et à mettre en place des contre-mesures (comme fail2ban ou des règles de pare-feu) pour renforcer la sécurité de votre serveur Linux.

## Mettre en place la rotation des journaux

Vous pouvez définir les durées de conservation des journaux en modifiant le fichier `/etc/logrotate.conf`.

Voici quelques paramètres importants :

```bash
# Configuration de base de logrotate
monthly              # Rotation mensuelle (alternatives : daily, weekly)
create 0664 root utmp # Permissions des fichiers créés
rotate 4             # Nombre de fichiers à conserver
minsize 1M           # Taille minimale avant rotation
compress             # Compresser les anciens journaux
```

Autres paramètres utiles :

- `compress` : les fichiers de journaux secondaires seront compressés
- `delaycompress` : reporte la compression du journal précédent au cycle suivant
- `notifempty` : ne fait pas de rotation des journaux vides
- `prerotate`, `postrotate/endscript` : commandes à exécuter avant/après la rotation

Pour forcer l'exécution de logrotate :

```bash
logrotate -f /etc/logrotate.conf
```

Pour déboguer la configuration :

```bash
logrotate -d /etc/logrotate.conf
```

## Commandes utiles pour l'analyse des journaux

```bash
# Afficher les 10 dernières lignes d'un fichier de journal et suivre son évolution
tail -f /var/log/syslog

# Rechercher dans les journaux d'authentification les connexions réussies
grep "Accepted password" /var/log/auth.log

# Afficher les utilisateurs ayant utilisé sudo
grep sudo /var/log/auth.log | grep COMMAND

# Extraire les adresses IP qui ont tenté de se connecter
grep sshd /var/log/auth.log | grep -i "invalid user" | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr

# Afficher les journaux d'un service précis
journalctl -u apache2.service --since today
```

## Outils de surveillance du système

> Cette section s'appuie sur [l'article de Korben consacré à btop++](https://korben.info/btop-alternative-htop-monitoring-systeme-gpu.html).

### btop++ : un moniteur système avancé

btop++ est un moniteur de ressources qui affiche les informations sur le processeur, la mémoire, les disques, le réseau et les processus dans une interface claire et intuitive. C'est une alternative améliorée à des outils comme top et htop.

#### Installation

Sur Debian/Ubuntu :

```bash
apt install btop
```

Sur Fedora/RHEL :

```bash
dnf install btop
```

Avec Homebrew (macOS/Linux) :

```bash
brew install btop
```

#### Fonctionnalités

- Utilisation du processeur en temps réel, avec le détail par cœur
- Surveillance de la mémoire et du swap
- Statistiques d'utilisation et d'E/S des disques
- Surveillance de la bande passante réseau
- Gestion des processus avec tri et filtrage
- Prise en charge de la surveillance des GPU (NVIDIA, AMD, Intel)
- Thèmes et disposition personnalisables

#### Utilisation de base

Lancez simplement :

```bash
btop
```

#### Raccourcis clavier

- `Esc` : quitter btop
- `F2` : menu des paramètres
- `m` : changer le mode d'affichage de la mémoire
- `p` : afficher les processus
- `1` : basculer entre l'affichage du processeur en moyenne et celui de tous les cœurs
- `h` : afficher l'aide
- `q` : quitter

btop++ offre une vue complète des ressources du système avec une interface moderne, ce qui en fait un excellent outil pour surveiller et dépanner des serveurs Linux.

## FAQ - Analyse des journaux sur les serveurs Linux

> Cette section reprend les questions fréquemment posées de [l'article original de Quick-Tutoriel](https://quick-tutoriel.com/logs-serveur-linux/).

### Comment accéder aux journaux de démarrage d'un serveur Linux ?

Vous pouvez consulter les journaux de démarrage de Linux avec la commande `journalctl -b`. Elle affiche tous les messages du journal générés depuis le dernier démarrage du système. Pour analyser un démarrage précédent, utilisez `journalctl -b -n`, où n est le numéro du démarrage (en remontant depuis le démarrage actuel).

### Où trouver les journaux de connexion SSH sous Linux ?

Les journaux de connexion SSH sont généralement stockés dans `/var/log/auth.log` (sur les distributions Debian/Ubuntu) ou `/var/log/secure` (sur CentOS/RHEL). Ces journaux enregistrent les connexions réussies et échouées.

### Comment détecter les tentatives de connexion échouées ?

Vous pouvez utiliser la commande suivante pour repérer les tentatives échouées dans le fichier de journal :

```bash
grep "Failed password" /var/log/auth.log
```

C'est utile pour auditer les connexions SSH et identifier d'éventuelles attaques par force brute.

### Quels outils utiliser pour analyser les journaux Linux ?

En plus de `journalctl`, vous pouvez utiliser des outils tels que :

- `logwatch` : pour générer des rapports quotidiens des journaux
- `logrotate` : pour gérer l'archivage des journaux
- ELK Stack (Elasticsearch, Logstash, Kibana) ou Loggly pour une analyse avancée des journaux avec visualisation
- `btop++` : pour la surveillance du système en temps réel

### Pourquoi est-il important de surveiller les journaux d'un serveur Linux ?

Une analyse régulière des journaux permet de :

- Identifier rapidement les erreurs système ou les problèmes de configuration
- Détecter les tentatives d'intrusion ou les connexions suspectes
- Maintenir un haut niveau de sécurité sur votre serveur Linux
- Suivre les activités des utilisateurs et l'utilisation des ressources
- Diagnostiquer les problèmes de performance avant qu'ils ne deviennent critiques
