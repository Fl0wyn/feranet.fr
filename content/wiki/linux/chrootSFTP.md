# Chroot SFTP

## Linux Rights Reminder

```bash
# Change owner
chown -R <user>:<group> <path>

# Change rights
chmod -R 755 <path>
# 0 : --- (no rights)
# 1 : --x (execute)
# 2 : -w- (write)
# 3 : -wx (write and execute)
# 4 : r-- (read only)
# 5 : r-x (read and execute)
# 6 : rw- (read and write)
# 7 : rwx (read, write, and execute)
```

> In this example, the user `myuser` will be chrooted in the directory `myuser`.

## Add Group and User

```bash
groupadd sftp_users
useradd -G sftp_users myuser
```

## Add User Password (Optional)

```bash
echo "myuser:<my_password>" | chpasswd
```

## Create Directory

```bash
mkdir -p /var/share/myuser
```

## Set Permissions

```bash
chown -R root:root /var/share
chmod -R 755 /var/share
chown myuser:sftp_users /var/share/myuser
```

## Update SSH Configuration

Edit `/etc/ssh/sshd_config`:

```bash
Subsystem sftp internal-sftp

Match Group sftp_users
        ChrootDirectory /var/share/%u
        ForceCommand internal-sftp
        AllowTcpForwarding no
        X11Forwarding no
```
