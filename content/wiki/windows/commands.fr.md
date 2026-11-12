# Commandes Windows

## Redémarrer un serveur

| Heure | Commande               |
| ----- | ---------------------- |
| 05:00 | `shutdown /r /t 18000` |
| 10:00 | `shutdown /r /t 36000` |
| 15:00 | `shutdown /r /t 54000` |
| 20:00 | `shutdown /r /t 72000` |

### Redémarrer un serveur distant

```powershell
shutdown /r /m \\srv-distant /t 10
```

## Commandes Active Directory

```powershell
# Afficher les contrôleurs de domaine
nltest /dclist:%USERDOMAIN%

# Afficher l'état de synchronisation des contrôleurs de domaine
repadmin /replsum
```

## Commandes des services Terminal Server

```powershell
# Afficher les utilisateurs et leur heure de connexion
query user

# Afficher les sessions connectées
query session

# Déconnecter la session d'un utilisateur à partir de son ID
reset session [ID]
```

## Resynchronisation NTP

### Serveur

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

## Désactiver BitLocker

Ouvrez PowerShell en tant qu'administrateur et saisissez la commande suivante :

```powershell
Disable-Bitlocker -MountPoint "C:"
```

## Supprimer un lecteur réseau

Supprimez la clé suivante dans le registre :

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MountPoints2
```

## Supprimer les partages administratifs sous Windows 10

Supprimez la clé de registre suivante :

```reg
REG ADD HKLM\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters /v AutoShareWks /t REG_DWORD /d 0 /f
```

Redémarrez le service :

```powershell
Restart-Service LanmanServer -Force
```

## Ajouter une fonction d'alias dans PowerShell
Créer ou modifier le profil PowerShell

```powershell
New-Item -ItemType File -Path $PROFILE -Force
```

```powershell
notepad $PROFILE
```

Ajouter la fonction d'alias
```powershell
function monscript {
    & "C:\Scripts\mon_script.ps1"
}
```

Recharger le profil
```powershell
. $PROFILE
```
