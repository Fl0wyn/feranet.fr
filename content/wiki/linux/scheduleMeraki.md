# Meraki Auto Reboot

[Meraki API Documentation](https://developer.cisco.com/meraki/api-v1/#!reboot-device)

## Retrieve API Key and Serial Number

- **Serial Number**: Organization > License Info > Devices
- **API Key**: Organization > Settings > Dashboard API access

## Crontab

Schedule the reboot script to run at 7 AM daily:

```bash
0 7 * * * /usr/bin/bash /root/schedule_reboot_meraki.sh
```

## Script

Create the script `/root/schedule_reboot_meraki.sh`:

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
