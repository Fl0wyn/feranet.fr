# Kubernetes

## Commandes de base

### Obtenir les informations du cluster

```bash
kubectl cluster-info
```

### Lister les nœuds

```bash
kubectl get nodes
```

### Lister les pods

```bash
kubectl get pods
```

### Lister les services

```bash
kubectl get services
```

### Décrire un pod

```bash
kubectl describe pod pod_name
```

### Créer un déploiement

```bash
kubectl create deployment nginx --image=nginx
```

### Exposer un déploiement

```bash
kubectl expose deployment nginx --port=80 --type=NodePort
```

### Mettre à l'échelle un déploiement

```bash
kubectl scale deployment nginx --replicas=3
```

### Supprimer un déploiement

```bash
kubectl delete deployment nginx
```

## Fichiers de configuration

### Configuration d'un déploiement

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.14.2
          ports:
            - containerPort: 80
```

### Configuration d'un service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: NodePort
```
