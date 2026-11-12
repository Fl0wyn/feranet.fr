# Réseau

## Afficher la configuration réseau

```bash
ip a # Afficher toutes les interfaces
ip a show eth0 # Afficher la configuration de eth0
sudo netplan status --all # Afficher l'état de netplan
ifconfig -a # Afficher toutes les interfaces (obsolète)
```

## Afficher la table de routage

```bash
ip route # Afficher la table de routage
sudo ip route add default via 192.168.40.2 dev eth0 # Ajouter une route par défaut
```

## Tester la connectivité réseau

```bash
ping -c 4 1.1.1.1 # Ping de 1.1.1.1
ping -c 4 google.com # Ping de google.com
traceroute 1.1.1.1 # Traceroute UDP
traceroute -T 1.1.1.1 # Traceroute TCP
mtr -T -P 443 -c 10 google.fr # MTR vers google.fr
```

## Diagnostic réseau

```bash
sudo lsof -i -Pn # Lister les fichiers ouverts
sudo ss -tulnp # Afficher les sockets en écoute
sudo tcpdump -i eth0 port 53 # Capturer le trafic sur le port 53
netstat -tulnp # Afficher les statistiques réseau
```

## Requêtes DNS

```bash
nslookup -query=TXT google.fr # Requête DNS TXT
dig @8.8.8.8 google.fr AAA +trace # Requête DNS AAA
host google.fr # Résolution DNS
```

## Analyse du réseau

```bash
nmap -p- google.fr # Scanner tous les ports
nmap -p 80,443 -Pn google.fr # Scanner les ports 80 et 443
nmap -sP 192.168.40.0/24 # Scanner le réseau
```
