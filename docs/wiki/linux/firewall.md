# Firewall

## UFW

### Configuration

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

To allow incoming connections:

```bash
sudo ufw allow ssh
sudo ufw allow "WWW Full"
```

To delete a rule:

```bash
sudo ufw delete allow 80
```

To check the status of UFW:

```bash
sudo ufw status
```

Enable UFW:

```bash
sudo ufw enable
```

To list available applications:

```bash
sudo ufw app list
```

## Fail2ban

### Configuration

Copy the configuration file to prevent it from being overwritten during an update:

```bash
cd /etc/fail2ban
cp jail.conf jail.local
```

Edit the `jail.local` file:

```bash
# List of ignored IP addresses or DNS hosts
ignoreip = 127.0.0.1/8 ::1

# Ban Time
bantime = 2h

# Time between each ban
findtime = 20m

# Number of failures before a ban
maxretry = 6
```

To enable jails, create a `jail-d.conf` file in the `/etc/fail2ban/jail.d` directory and add the jail name with the value `True`.
Example with **ssh** and **apache2** jails:

```bash
[sshd]
port = 2222
enabled = true

[apache-auth]
enabled = true
```

### List of Commands

```bash
# Display status of active jails
fail2ban-client status

# Display status of a specific active jail
fail2ban-client status sshd

# Unban an IP address
fail2ban-client unban 1.2.3.4

# Unban an IP address from a specific service
fail2ban-client set sshd unban 1.2.3.4
```

## Iptables

### Configuration

Copy the list of iptables rules to the file `/root/firewall.sh`, modify them, and make it executable:

```bash
curl -L https://git.io/JeSL5 > /root/firewall.sh
chmod +x /root/firewall.sh
```

Test and verify the execution of the script:

```bash
bash /root/firewall.sh
iptables -L
```

Make the rules non-volatile:

```bash
iptables-save > /etc/firewall.conf
```

Open `/etc/network/if-up.d/iptables` and add the following:

```bash
#!/bin/bash
iptables-restore < /etc/firewall.conf
```

Make it executable:

```bash
chmod +x /etc/network/if-up.d/iptables
```

### Administration

Change the rules:

```bash
vim /root/firewall.sh
bash /root/firewall.sh
iptables-save > /etc/firewall.conf
```

See the forbidden IP addresses from the `banip.txt` file:

```bash
iptables -L INPUT -nv --line-numbers | grep DROP
```

See the banned IP addresses of ipset:

```bash
ipset -L
```

> Create a `banip.txt` file and add the IPs to ban manually.
