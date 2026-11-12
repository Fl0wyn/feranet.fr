# Screen

## Liste des commandes

| Code                              | Description                                    |
| --------------------------------- | ---------------------------------------------- |
| `screen -S session1`              | Créer un nouveau screen avec un nom de session |
| `screen -ls`                      | Afficher les screens existants                 |
| `screen -r`                       | Se rattacher à un screen existant              |
| `screen -r 13313`                 | Se rattacher au screen 13313 ou à session1     |
| `screen -d 13313`                 | Forcer le détachement du screen 13313          |
| `screen -wipe`                    | Supprimer un screen mort                       |
| `screen -dmS session1 apt update` | Exécuter la commande apt update dans session1  |

## Navigation entre les terminaux

| Code                 | Description                                  |
| -------------------- | -------------------------------------------- |
| `CTRL` + `a` et `d`  | Détacher le screen                           |
| `CTRL` + `a` et `D`  | Quitter le screen                            |
| `CTRL` + `a` et `n`  | Aller au terminal suivant                    |
| `CTRL` + `a` et `p`  | Aller au terminal précédent                  |
| `CTRL` + `a` et `2`  | Aller au terminal 2                          |
| `CTRL` + `a` et `w`  | Lister les terminaux actuels avec leurs noms |
