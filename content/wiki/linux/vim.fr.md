# Vim

## Se déplacer dans le texte

| Code | Description                        |
| ---- | ---------------------------------- |
| `0`  | Aller au début de la ligne         |
| `$`  | Aller à la fin de la ligne         |
| `w`  | Avancer mot par mot vers la droite |
| `b`  | Avancer mot par mot vers la gauche |
| `G`  | Aller à la fin du fichier          |
| `gg` | Aller au début du fichier          |

## Supprimer du texte

| Code  | Description                                     |
| ----- | ----------------------------------------------- |
| `dw`  | Supprimer un mot                                |
| `d2w` | Supprimer 2 mots                                |
| `d4`  | Supprimer 4 caractères                          |
| `dd`  | Supprimer une ligne                             |
| `6dd` | Supprimer 6 lignes                              |
| `d0`  | Supprimer du curseur jusqu'au début de la ligne |
| `d$`  | Supprimer du curseur jusqu'à la fin de la ligne |

## Copier et coller du texte

| Code  | Description                       |
| ----- | --------------------------------- |
| `yw`  | Copier un mot                     |
| `y2w` | Copier 2 mots                     |
| `yy`  | Copier la ligne                   |
| `y4`  | Copier 4 lignes                   |
| `p`   | Coller une ligne ou un mot        |
| `6p`  | Coller 6 fois une ligne ou un mot |

## Annuler des modifications

| Code         | Description                                  |
| ------------ | -------------------------------------------- |
| `u`          | Annuler les actions précédentes              |
| `U`          | Annuler toutes les modifications d'une ligne |
| `CTRL` + `R` | Rétablir l'annulation                        |

## Enregistrer, quitter, rechercher, etc.

| Code             | Description                                  |
| ---------------- | -------------------------------------------- |
| `/`              | Rechercher un mot                            |
| `:w`             | Enregistrer                                  |
| `:q`             | Quitter, ou `:q!` pour forcer la fermeture   |
| `:wq`            | Enregistrer et quitter                       |
| `vim -x fichier` | Créer un fichier protégé par un mot de passe |
| `:X`             | Changer le mot de passe                      |

> Pour rechercher un mot, appuyez sur `ENTRÉE` pour valider
>
> `n` pour rechercher vers l'avant
>
> `SHIFT` + `n` pour rechercher vers l'arrière
