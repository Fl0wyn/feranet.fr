# Kubernetes

## Basic Commands

### Get Cluster Information

```bash
kubectl cluster-info
```

### Get Nodes

```bash
kubectl get nodes
```

### Get Pods

```bash
kubectl get pods
```

### Get Services

```bash
kubectl get services
```

### Describe a Pod

```bash
kubectl describe pod pod_name
```

### Create a Deployment

```bash
kubectl create deployment nginx --image=nginx
```

### Expose a Deployment

```bash
kubectl expose deployment nginx --port=80 --type=NodePort
```

### Scale a Deployment

```bash
kubectl scale deployment nginx --replicas=3
```

### Delete a Deployment

```bash
kubectl delete deployment nginx
```

## Configuration Files

### Deployment Configuration

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

### Service Configuration

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
