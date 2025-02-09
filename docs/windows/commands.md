# Windows Commands

## Restart a Server

| Hour  | Command                |
| ----- | ---------------------- |
| 05:00 | `shutdown /r /t 18000` |
| 10:00 | `shutdown /r /t 36000` |
| 15:00 | `shutdown /r /t 54000` |
| 20:00 | `shutdown /r /t 72000` |

### Restart a Remote Server

```powershell
shutdown /r /m \\srv-distant /t 10
```

## Active Directory Commands

```powershell
# Display the Domain Controllers
nltest /dclist:%USERDOMAIN%

# Display DC synchronization status
repadmin /replsum
```

## Terminal Services Commands

```powershell
# Show users and login time
query user

# Show connected sessions
query session

# Disconnect the user's session by ID
reset session [ID]
```

## NTP Resynchronization

### Server

```powershell
net stop w32time
w32tm /config /manualpeerlist:"time.windows.com,0x8 fr.pool.ntp.org,0x8" /syncfromflags:MANUAL /reliable:yes
net start w32time
w32tm /resync
w32tm /query /status
```

### Client

```powershell
w32tm /config /syncfromflags:domhier /update
net stop w32time && net start w32time
```

## Disable BitLocker

Open PowerShell as administrator and enter the following command:

```powershell
Disable-Bitlocker -MountPoint "C:"
```

## Delete a Network Drive

Delete the following key in the registry:

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MountPoints2
```

## Delete Administrative Shares on Windows 10

Delete the following registry key:

```reg
REG ADD HKLM\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters /v AutoShareWks /t REG_DWORD /d 0 /f
```

Restart the service:

```powershell
Restart-Service LanmanServer -Force
```
