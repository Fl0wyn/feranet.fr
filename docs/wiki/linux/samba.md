# Share SAMBA

## Server

### Installation

```bash
sudo apt install samba
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.back
```

### Configuration

Edit `/etc/samba/smb.conf`:

```bash
[share]
   path = /home/user/share
   browseable = yes
   read only = no
```

### Set User Password

```bash
sudo smbpasswd -a user
sudo service smbd restart
```

## Client

### Installation

```bash
sudo apt install smbclient cifs-utils
mkdir /home/share
```

### Add Authentication Information

Create `/etc/samba/user`:

```bash
username=<user>
password=<password>
```

### Mount Directory Automatically on Boot

Edit `/etc/fstab`:

```bash
//SRV-WINDOWS/prod/share /home/share cifs  credentials=/etc/samba/user,noexec  0 0
```
