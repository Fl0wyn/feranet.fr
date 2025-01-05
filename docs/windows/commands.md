# Windows commands

## Restart a server

| hour  | command                |
| ----- | ---------------------- |
| 05:00 | `shutdown /r /t 18000` |
| 10h00 | `shutdown /r /t 36000` |
| 15h00 | `shutdown /r /t 54000` |
| 20h00 | `shutdown /r /t 72000` |

Restart a remote server

```powershell
shutdown /r /m \\srv-distant /t 10
```

## AD commands

```powershell
# Display the DC
nltest /dclist:%USERDOMAIN%

# Display the DC synchronization
repadmin /replsum
```

## Commandes TSE

```powershell
# Show users and login time
query user

# Show connected sessions
query session

# Disconnect the user's session [ID}
reset session [ID]
```

## NTP resynchronization

Server

```powershell
net stop w32time
w32tm /config /manualpeerlist:"time.windows.com,0x8 fr.pool.ntp.org,0x8" /syncfromflags:MANUAL /reliable:yes
net start w32time
w32tm /resync
w32tm /query /status
```

Client

```powershell
w32tm /config /syncfromflags:domhier /update
net stop w32time && net start w32time
```

## Disable Bit Locker

Open PowerShell as administrator and enter the following command

```powershell
Disable-Bitlocker -MountPoint "C:"
```

## Delete a network drive

Delete the following key in the registry

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MountPoints2
```

## Delete administrative shares on Windows 10

**HKLM\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters**

```reg
REG ADD HKLM\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters /v AutoShareWks /t REG_DWORD /d 0 /f
```

```powershell
Restart-Service LanmanServer -Force
```

[it-connect.fr](https://www.it-connect.fr/les-partages-administratifs-sous-windows-10/)
