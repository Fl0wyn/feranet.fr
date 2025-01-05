# Meraki auto reboot

https://developer.cisco.com/meraki/api-v1/#!reboot-device

Activate the API key and retrieve the serial number

**Sérial number** : Organization > License Info > Devices

**API KEY** : Organization > Settings > Dashboard API access

Crontab

```bash
0 7 * * * /usr/bin/bash /root/schedule_reboot_meraki.sh
```

Script

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
