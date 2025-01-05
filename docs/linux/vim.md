# Vim

## Moving around in the text

| code | description                    |
| ---- | ------------------------------ |
| `0`  | Move to the beginning of line  |
| `$`  | Move to the end of line        |
| `w`  | Move word by word to the right |
| `b`  | Move word by word to the left  |
| `G`  | Move to the end of file        |
| `gg` | Move to the beginning of file  |

## Delete text

| code  | description                                     |
| ----- | ----------------------------------------------- |
| `dw`  | Delete a word                                   |
| `d2w` | Delete 2 words                                  |
| `d4`  | Delete 4 characters                             |
| `dd`  | Delete a line                                   |
| `6dd` | Delete 6 lines                                  |
| `d0`  | Delete from cursor to the beginning of the line |
| `d$`  | Delete from cursor to the end of the line       |

## Copy and paste text

| code  | description                  |
| ----- | ---------------------------- |
| `yw`  | Copy a word                  |
| `y2w` | Copy 2 words                 |
| `yy`  | Copy the line                |
| `y4`  | Copy 4 lines                 |
| `p`   | Paste a line or word         |
| `6p`  | Paste 6 times a line or word |

## Undoing changes

| code         | description                |
| ------------ | -------------------------- |
| `u`          | Undo previous actions      |
| `U`          | Undo all changes on a line |
| `CTRL` + `R` | Redo the undo              |

## Save, exit, search, etc.

| code             | description                   |
| ---------------- | ----------------------------- |
| `/`              | Search for a word             |
| `:w`             | Save                          |
| `:q`             | Quit or :q! to force close    |
| `:wq`            | Save and quit                 |
| `vim -x fichier` | Create a file with a password |
| `:X`             | Change the password           |

> To search for a word, press `ENTER` to validate
>
> `n` to search forward
>
> `SHIFT` + `n` to search backwards
