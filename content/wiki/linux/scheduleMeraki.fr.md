# Redémarrage automatique Meraki

[Documentation de l'API Meraki](https://developer.cisco.com/meraki/api-v1/#!reboot-device)

## Récupérer la clé d'API et le numéro de série

- **Numéro de série** : Organization > License Info > Devices
- **Clé d'API** : Organization > Settings > Dashboard API access

## Crontab

Planifier l'exécution du script de redémarrage tous les jours à 7 h :

```bash
0 7 * * * /usr/bin/bash /root/schedule_reboot_meraki.sh
```

## Script

Créer le script `/root/schedule_reboot_meraki.sh` :

```bash
#!/bin/bash
SERIAL=""
APIKEY=""

curl -L --request POST \
  --url https://api.meraki.com/api/v1/devices/$SERIAL/reboot \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header "X-Cisco-Meraki-API-Key: $APIKEY"
```
