# SSH

## Connect to a remote machine

```bash
# On port 22
ssh root@1.2.3.4

# On port 5678
ssh -p 5678 root@1.2.3.4
```

## Login without password

```bash
# Generating a key

# -o : Save the key in the new openssh format
# -a : Number of key derivation function rounds
# -t : Specify the type of key being created
# -f : Output directory for the key
# -C : Add a comment to the key

ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "email@example.com"

# Sending the key to the remote machine
ssh-copy-id -i .ssh/id_ed25519.pub root@1.2.3.4
```

## Send a file from the client to the server

```bash
scp file.sh root@1.2.3.4:/home/eve

# On port 5678
scp -P 5678 file.sh root@1.2.3.4:/home/eve

# Send a folder
scp -r folder root@1.2.3.4:/home/eve
```

## Send a file from the server to the client

```bash
scp root@1.2.3.4:file.sh /home/eve

# On port 5678
scp -P 5678 root@1.2.3.4:file.sh /home/eve

# Send a folder
scp -r root@1.2.3.4:folder /home/eve
```

## Execute a command

```bash
ssh root@1.2.3.4 'df -h'

# On port 5678
ssh -P 5678 root@1.2.3.4 'df -h'
```

## Run a script

```bash
ssh root@1.2.3.4 './scripts.sh'

# On port 5678
ssh -P 5678 root@1.2.3.4 './scripts.sh'
```

## Execute a function inside a script

```bash
ssh root@1.2.3.4 "$(declare -f fonction_creation); fonction_creation" > /dev/null 2>&1

# On port 5678
ssh -P 5678 root@1.2.3.4 "$(declare -f fonction_creation); fonction_creation" > /dev/null 2>&1
```

## SSH tunnel

```bash
ssh root@1.2.3.4 -L 2500:127.0.0.1:3000 -N -v

# On port 5678
ssh -P 5678  root@1.2.3.4 -L 2500:127.0.0.1:3000 -N -v
```

## Other useful commands

```bash
# Test your configuration and debug
sshd -T

# List available ciphers on your server
ssh -Q cipher

# List authentication ciphers
ssh -Q cipher-auth

# List MACs
ssh -Q mac

# List algorithms
ssh -Q kex

# List keys
ssh -Q key
```

## Securing the configuration

Modify permissions to avoid errors

```bash
chmod 0700 ~/.ssh
chmod 0600 ~/.ssh/id_ed25519
chmod 0644 ~/.ssh/authorized_keys
```

Make a copy of the configuration file `/etc/ssh/sshd_config`

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

Edit the configuration file `/etc/ssh/sshd_config`

```bash
# Interface & Port
Port 5678
AddressFamily any
ListenAddress 0.0.0.0
ListenAddress ::

HostKey /etc/ssh/ssh_host_ed25519_key

Protocol 2

SyslogFacility AUTHPRIV
LogLevel VERBOSE

# Authentication restriction
LoginGraceTime 30s
PermitRootLogin no
StrictModes yes
MaxAuthTries 3
MaxSessions 5

PubkeyAuthentication yes
AllowUsers bob
AuthorizedKeysFile  .ssh/authorized_keys

HostbasedAuthentication no
IgnoreRhosts yes

# To disable tunneled clear text passwords, change to no here!
PermitEmptyPasswords no
PasswordAuthentication no

# Change to no to disable s/key passwords
ChallengeResponseAuthentication no

UsePAM yes

AllowAgentForwarding no
AllowTcpForwarding no
GatewayPorts no
X11Forwarding no
PermitTTY yes
PermitUserEnvironment no
PrintMotd no
PrintLastLog no

#TCPKeepAlive yes
#PermitUserEnvironment no
#Compression delayed
#ClientAliveInterval 0
#ClientAliveCountMax 3
#ShowPatchLevel no
UseDNS yes
PidFile /var/run/sshd.pid
MaxStartups 10:30:100
PermitTunnel no
#ChrootDirectory none
VersionAddendum none

# no default banner path
Banner none
DebianBanner no

# Accept locale-related environment variables
AcceptEnv LANG LC_*

# override default of no subsystems
Subsystem   sftp   /usr/libexec/openssh/sftp-server
```

```bash
# Regeneration of server ED25519 key
sudo rm -f /etc/ssh/ssh_host_*
sudo ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key -N ""

# Removing weak Diffie-Hellman moduli
sudo awk '$5 >= 3071' /etc/ssh/moduli > /etc/ssh/moduli.safe
sudo mv -f /etc/ssh/moduli.safe /etc/ssh/moduli

# Disabling DSA/ECDSA & RSA keys
sudo sed -i 's/^HostKey \/etc\/ssh\/ssh_host_\(dsa\|ecdsa\|rsa\)_key$/\#HostKey \/etc\/ssh\/ssh_host_\1_key/g' /etc/ssh/sshd_config

# Restricting ciphers, key exchange, and authentication methods
# Injecting our ciphers, key and authentication methods
echo -e "\nKexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512\nCiphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr\nMACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com" >> /etc/ssh/sshd_config

# Denying SSH connections to everyone except our IP addresses
echo "sshd: ALL" >> /etc/hosts.deny
echo "sshd: 1.2.3.4, 5.6.7.8" >> /etc/hosts.allow

# Restarting the sshd service
sudo systemctl restart sshd.service

# Testing the server
# ssh-audit website: https://www.ssh-audit.com/
# ssh-audit python tool: https://github.com/jtesta/ssh-audit
```

## Host configuration

Create and modify the `.ssh/config` file in the root of the user's folder

```bash
Host john
    HostName example.com
    User root
    Port 5678

Host eve
    HostName 1.2.3.4
    User pi
    IdentityFile ~/.ssh/id_ed25519
```

Connect to ssh using the `.ssh/config` file

```bash
ssh john
ssh eve
```

> Add the commands to be executed on a new SSH connection in the `/etc/ssh/sshrc` file
