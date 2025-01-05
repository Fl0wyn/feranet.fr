# Share SAMBA

## Server

```bash
sudo apt install samba
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.back
```

`/etc/samba/smb.conf`

```bash
[share]
   path = /home/user/share
   browseable = yes
   read only = no
```

```bash
sudo smbpasswd -a user
sudo service smbd restart
```

## Client

Installation

```bash
sudo apt install smbclient cifs-utils
mkdir /home/share
```

Add authentication information

`/etc/samba/user`

```bash
username=<user>
password=<password>
```

Mount the directory automatically on boot

`/etc/fstab`

```bash
//SRV-WINDOWS/prod/share /home/share cifs  credentials=/etc/samba/user,noexec  0 0
```
