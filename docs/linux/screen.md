# Screen

## List of Commands

| Code                              | Description                             |
| --------------------------------- | --------------------------------------- |
| `screen -S session1`              | Create a new screen with a session name |
| `screen -ls`                      | Show existing screens                   |
| `screen -r`                       | Attach an existing screen               |
| `screen -r 13313`                 | Attach to screen 13313 or session1      |
| `screen -d 13313`                 | Force the detachment of screen 13313    |
| `screen -wipe`                    | Remove a dead screen                    |
| `screen -dmS session1 apt update` | Run the apt update command in session1  |

## Navigation Between Terminals

| Code                 | Description                                 |
| -------------------- | ------------------------------------------- |
| `CTRL` + `a` and `d` | Detach the screen                           |
| `CTRL` + `a` and `D` | Exit the screen                             |
| `CTRL` + `a` and `n` | Go to the next terminal                     |
| `CTRL` + `a` and `p` | Go to the previous terminal                 |
| `CTRL` + `a` and `2` | Go to terminal 2                            |
| `CTRL` + `a` and `w` | List the current terminals with their names |
