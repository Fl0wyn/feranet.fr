# Cron

## Commands

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `crontab -e`         | Edit the crontab for the current user   |
| `crontab -l`         | List the current user's crontab         |
| `crontab -r`         | Remove the current user's crontab       |
| `crontab -u user -l` | List the crontab for the specified user |

## Syntax

Each line in a crontab file represents a scheduled task. The syntax is as follows:

```plaintext
* * * * * <command to execute>
| | | | |
| | | | ----- Day of the week (0 - 7) [where 0 and 7 = Sunday]
| | | ------- Month (1 - 12)
| | --------- Day of the month (1 - 31)
| ----------- Hour (0 - 23)
------------- Minute (0 - 59)
```

### Special Characters

- `*` : Every value
- `,` : Multiple values (e.g., `1,15` means the 1st and 15th)
- `-` : Range of values (e.g., `1-5` means from the 1st to the 5th)
- `/` : Step values (e.g., `*/10` means every 10 units)

### Special Entries

- `@reboot` : Run once, at startup
- `@hourly` : Run once an hour
- `@daily` : Run once a day
- `@weekly` : Run once a week
- `@monthly` : Run once a month
- `@yearly` : Run once a year

## Examples

### Run a Script Daily at Midnight

```bash
0 0 * * * /home/user/scripts/backup.sh
```

### Various Frequencies

```bash
# Every 5 minutes
*/5 * * * * <command>

# Every Sunday at 10:15 PM
15 22 * * 0 <command>

# Every weekday at 8:00 AM
0 8 * * 1-5 <command>

# On the 1st of every month at midnight
0 0 1 * * <command>

# Every other day at 3:00 AM
0 3 */2 * * <command>

# From the 1st to the 10th of every month at 3:00 AM
0 3 1-10 * * <command>
```

## Useful Tools

- [crontab-generator.org](https://crontab-generator.org): Generate crontab lines by selecting your needs.
- [crontab.guru](https://crontab.guru): Validate and understand crontab syntax.
