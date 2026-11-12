# Docker

## Installation

[Documentation officielle](https://docs.docker.com/engine/install/)

```bash
# Télécharger ou mettre à jour une image
docker pull image_name

# Exécuter une image en arrière-plan, nommer le conteneur et exposer un port
docker run -d -ti --name container_name -p host_port:container_port image_name

# Exécuter une image en arrière-plan, nommer le conteneur, exposer un port et monter un volume
docker run -d -ti --name container_name -p host_port:container_port -v host_folder:container_folder image_name

# Afficher les conteneurs en cours d'exécution
docker ps

# Afficher les images
docker images

# Afficher les statistiques en temps réel de tous les conteneurs en cours d'exécution
docker stats --all

# Arrêter un conteneur en cours d'exécution
docker stop container_name

# Construire une image à partir d'un Dockerfile
docker build -t my_debian .

# Envoyer une image sur DockerHub
docker push user/my_debian:latest

# Exporter une image au format .tar
docker save -o my_debian.tar my_debian

# Importer une image depuis un fichier .tar
docker load -i my_debian.tar
```

## Suppression

```bash
# Supprimer un conteneur
docker rm container_name

# Supprimer une image
docker rmi image_name

# Supprimer tous les conteneurs
docker rm $(docker ps -a -q)

# Supprimer toutes les images
docker rmi -f $(docker images -a -q)

# Supprimer toutes les images, conteneurs, réseaux inutilisés et le cache de construction
docker system prune

# Supprimer les images inutilisées
docker image prune
```

## Docker Compose

```bash
# Voir l'état des conteneurs définis dans un fichier docker-compose
docker-compose ps

# Valider la syntaxe d'un fichier docker-compose
docker-compose config

# Afficher les journaux de tous les services
docker-compose logs -f --tail 5

# Récupérer la dernière version de toutes les images définies dans un fichier docker-compose
docker-compose pull

# Redémarrer tous les conteneurs définis dans un fichier docker-compose
docker-compose up -d --remove-orphans
```

## Exemple de docker-compose.yml

```yaml
version: "3"
services:
  app:
    image: nginx
    container_name: nginx_app
    hostname: nginx
    restart: always
    ports:
      - "80:8787"
    volumes:
      - ./data:/data/
    environment:
      HOST: http://0.0.0.0:8787
    devices:
      - "/dev/sda:/dev/sda"
```
