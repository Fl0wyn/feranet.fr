# PM2

## Commandes de base

```bash
pm2 save             # Enregistrer les processus actuels
pm2 startup          # Configurer PM2 pour qu'il démarre automatiquement au démarrage du système
pm2 ls               # Liste des processus actifs
pm2 log {{app_name}} # Afficher les journaux de l'application
pm2 monit            # Afficher le moniteur
pm2 kill                  # Arrêter le démon pm2
pm2 resurrect             # Recharger les processus enregistrés
```

## Démarrer une application

```bash
# Démarrer une application avec un nom personnalisé, un utilisateur et une mémoire maximale
pm2 start app.js --name "myapp" -u acs2i --max-memory-restart 1000M

# Démarrer une application avec un nom personnalisé et une commande personnalisée
pm2 start npm --name "myapp" -- run dev
```
