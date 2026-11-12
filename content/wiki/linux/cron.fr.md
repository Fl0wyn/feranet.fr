# Cron

## Commandes

| Commande             | Description                                   |
| -------------------- | --------------------------------------------- |
| `crontab -e`         | Modifier la crontab de l'utilisateur courant  |
| `crontab -l`         | Lister la crontab de l'utilisateur courant    |
| `crontab -r`         | Supprimer la crontab de l'utilisateur courant |
| `crontab -u user -l` | Lister la crontab de l'utilisateur indiqué    |

## Syntaxe

Chaque ligne d'un fichier crontab représente une tâche planifiée. La syntaxe est la suivante :

```plaintext
* * * * * <command to execute>
| | | | |
| | | | ----- Jour de la semaine (0 - 7) [où 0 et 7 = dimanche]
| | | ------- Mois (1 - 12)
| | --------- Jour du mois (1 - 31)
| ----------- Heure (0 - 23)
------------- Minute (0 - 59)
```

### Caractères spéciaux

- `*` : Toutes les valeurs
- `,` : Plusieurs valeurs (par ex. `1,15` signifie le 1er et le 15)
- `-` : Plage de valeurs (par ex. `1-5` signifie du 1er au 5)
- `/` : Valeurs par pas (par ex. `*/10` signifie toutes les 10 unités)

### Entrées spéciales

- `@reboot` : Exécuter une fois, au démarrage
- `@hourly` : Exécuter une fois par heure
- `@daily` : Exécuter une fois par jour
- `@weekly` : Exécuter une fois par semaine
- `@monthly` : Exécuter une fois par mois
- `@yearly` : Exécuter une fois par an

## Exemples

### Exécuter un script tous les jours à minuit

```bash
0 0 * * * /home/user/scripts/backup.sh
```

### Fréquences diverses

```bash
# Toutes les 5 minutes
*/5 * * * * <command>

# Tous les dimanches à 22 h 15
15 22 * * 0 <command>

# Tous les jours de la semaine à 8 h 00
0 8 * * 1-5 <command>

# Le 1er de chaque mois à minuit
0 0 1 * * <command>

# Un jour sur deux à 3 h 00
0 3 */2 * * <command>

# Du 1er au 10 de chaque mois à 3 h 00
0 3 1-10 * * <command>
```

## Outils utiles

- [crontab-generator.org](https://crontab-generator.org) : Générer des lignes de crontab en sélectionnant vos besoins.
- [crontab.guru](https://crontab.guru) : Valider et comprendre la syntaxe de crontab.
