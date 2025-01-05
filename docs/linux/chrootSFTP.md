# Chroot SFTP

Linux rights reminder

```bash
# Change owner
chown -R <user>:<group> <path>

# Change rights
chmod -R 755 <path>
# 0 : - - - (aucun droit)
# 1 : - - x (exécution)
# 2 : - w - (écriture)
# 3 : - w x (écriture et exécution)
# 4 : r - - (lecture seule)
# 5 : r - x (lecture et exécution)
# 6 : r w - (lecture et écriture)
# 7 : r w x (lecture, écriture et exécution)
```

> In the example, the user myuser will be chrooted in the directory myuser

Add group 'sftp_users' and user 'myuser'

```bash
groupadd sftp_users
useradd -G sftp_users myuser
```

Add user password (optional)

```bash
echo "myuser:<my_password>" | chpasswd
```

Create directory

```bash
mkdir -p /var/share/myuser
```

Adding right

```bash
chown -R root:root /var/share
chmod -R 755 /var/share
chown myuser:sftp_users /var/share/myuser
```

`/etc/ssh/sshd_config`

```bash
Subsystem sftp internal-sftp

Match Group sftp_users
        ChrootDirectory /var/share/%u
        ForceCommand internal-sftp
        AllowTcpForwarding no
        X11Forwarding no
```
