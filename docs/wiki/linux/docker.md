# Docker

## Installation

[Official documentation](https://docs.docker.com/engine/install/)

```bash
# Download or update an image
docker pull image_name

# Run an image in the background, name the container, and expose a port
docker run -d -ti --name container_name -p host_port:container_port image_name

# Run an image in the background, name the container, expose a port, and mount a volume
docker run -d -ti --name container_name -p host_port:container_port -v host_folder:container_folder image_name

# Show running containers
docker ps

# Show images
docker images

# Show real-time stats for all running containers
docker stats --all

# Stop a running container
docker stop container_name

# Build an image from a Dockerfile
docker build -t my_debian .

# Push an image to DockerHub
docker push user/my_debian:latest

# Export an image as .tar
docker save -o my_debian.tar my_debian

# Import an image from .tar
docker load -i my_debian.tar
```

## Remove

```bash
# Remove a container
docker rm container_name

# Remove an image
docker rmi image_name

# Remove all containers
docker rm $(docker ps -a -q)

# Remove all images
docker rmi -f $(docker images -a -q)

# Remove all unused images, containers, networks, and build cache
docker system prune

# Remove unused images
docker image prune
```

## Docker Compose

```bash
# See the status of containers defined in a docker-compose file
docker-compose ps

# Validate the syntax of a docker-compose file
docker-compose config

# Display logs for all services
docker-compose logs -f --tail 5

# Pull the latest version of all images defined in a docker-compose file
docker-compose pull

# Restart all containers defined in a docker-compose file
docker-compose up -d --remove-orphans
```

## docker-compose.yml Example

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
