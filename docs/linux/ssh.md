# SSH

## Connect to a Remote Machine

```bash
# On port 22
ssh root@1.2.3.4

# On port 5678
ssh -p 5678 root@1.2.3.4
```

## Login Without Password

### Generate a Key

```bash
# -o : Save the key in the new openssh format
# -a : Number of key derivation function rounds
# -t : Specify the type of key being created
# -f : Output directory for the key
# -C : Add a comment to the key

ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "email@example.com"
```

### Send the Key to the Remote Machine

```bash
ssh-copy-id -i .ssh/id_ed25519.pub root@1.2.3.4
```

## Send a File from the Client to the Server

```bash
scp file.sh root@1.2.3.4:/home/eve

# On port 5678
scp -P 5678 file.sh root@1.2.3.4:/home/eve

# Send a folder
scp -r folder root@1.2.3.4:/home/eve
```

## Send a File from the Server to the Client

```bash
scp root@1.2.3.4:file.sh /home/eve

# On port 5678
scp -P 5678 root@1.2.3.4:file.sh /home/eve

# Send a folder
scp -r root@1.2.3.4:folder /home/eve
```

## Execute a Command

```bash
ssh root@1.2.3.4 'df -h'

# On port 5678
ssh -P 5678 root@1.2.3.4 'df -h'
```

## Run a Script

```bash
ssh root@1.2.3.4 './scripts.sh'

# On port 5678
ssh -P 5678 root@1.2.3.4 './scripts.sh'
```

## Execute a Function Inside a Script

```bash
ssh root@1.2.3.4 "$(declare -f fonction_creation); fonction_creation" > /dev/null 2>&1

# On port 5678
ssh -P 5678 root@1.2.3.4 "$(declare -f fonction_creation); fonction_creation" > /dev/null 2>&1
```

## SSH Tunnel

```bash
ssh root@1.2.3.4 -L 2500:127.0.0.1:3000 -N -v

# On port 5678
ssh -P 5678 root@1.2.3.4 -L 2500:127.0.0.1:3000 -N -v
```

## Other Useful Commands

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

## Securing the Configuration

### Modify Permissions to Avoid Errors

```bash
chmod 0700 ~/.ssh
chmod 0600 ~/.ssh/id_ed25519
chmod 0644 ~/.ssh/authorized_keys
```

### Backup Configuration File

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
```

### Edit Configuration File

Edit `/etc/ssh/sshd_config`:

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

### Regenerate Server ED25519 Key

```bash
sudo rm -f /etc/ssh/ssh_host_*
sudo ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key -N ""
```

### Remove Weak Diffie-Hellman Moduli

```bash
sudo awk '$5 >= 3071' /etc/ssh/moduli > /etc/ssh/moduli.safe
sudo mv -f /etc/ssh/moduli.safe /etc/ssh/moduli
```

### Disable DSA/ECDSA & RSA Keys

```bash
sudo sed -i 's/^HostKey \/etc\/ssh\/ssh_host_\(dsa\|ecdsa\|rsa\)_key$/\#HostKey \/etc\/ssh\/ssh_host_\1_key/g' /etc/ssh/sshd_config
```

### Restrict Ciphers, Key Exchange, and Authentication Methods

```bash
echo -e "\nKexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512\nCiphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr\nMACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com" >> /etc/ssh/sshd_config
```

### Deny SSH Connections to Everyone Except Specific IP Addresses

```bash
echo "sshd: ALL" >> /etc/hosts.deny
echo "sshd: 1.2.3.4, 5.6.7.8" >> /etc/hosts.allow
```

### Restart SSH Service

```bash
sudo systemctl restart sshd.service
```

### Test the Server

- [ssh-audit website](https://www.ssh-audit.com/)
- [ssh-audit python tool](https://github.com/jtesta/ssh-audit)

## Host Configuration

### Create and Modify the `.ssh/config` File

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

### Connect to SSH Using the `.ssh/config` File

```bash
ssh john
ssh eve
```

> Add the commands to be executed on a new SSH connection in the `/etc/ssh/sshrc` file.
