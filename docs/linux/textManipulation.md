# Text manipulation

## sed

| code                                    | description                                           |
| --------------------------------------- | ----------------------------------------------------- |
| `sed '1d'`                              | Delete the first line                                 |
| `sed '$d'`                              | Delete the last line                                  |
| `sed -e '2d; 4d'`                       | Delete lines 2 and 4                                  |
| `sed '2,5d'`                            | Delete lines 2 to 5                                   |
| `sed '/word/d'`                         | Delete lines containing the word 'word'               |
| `sed -e '/word1/d;/word2/d'`            | Delete lines containing the words 'word1' and 'word2' |
| `sed 's/.*word.*//g'`                   | Delete lines containing the string 'word'             |
| `sed '/^$/d'`                           | Delete empty lines                                    |
| `sed 's/word//g'`                       | Delete the word 'word' from a line                    |
| `sed -e 's/string1/string2/g'`          | Replace the string 'string1' with 'string2'           |
| `sed -i 's/string1/string2/g' file.txt` | Replace the string 'string1' with 'string2' in a file |
| `sed 's/^./\u&/'`                       | Capitalize the first letter of a word or phrase       |
| `sed -n '2p'`                           | Only display the 2nd line                             |
| `sed '2i word'`                         | Add 'word' to the 2nd line                            |
| `sed '$a word'`                         | Add 'word' to the last line                           |
| `sed 's/^/word1/'`                      | Add 'word1' to the beginning of every line            |
| `sed 's/$/word2/'`                      | Add 'word2' to the end of every line                  |
| `sed '/^word1.*/i word2' file.txt`      | Add 'word2' before 'word1'                            |
| `sed '/^word1.*/a word2' file.txt`      | Add 'word2' after 'word1'                             |
| `sed '$ s/.$//'`                        | Delete the last character of the last line            |
| `sed '1s/^.//'`                         | Delete the first character of the first line          |
| `sed 's/\.word3$//g' `                  | Delete the word word3 from the last lines             |

## cut

| code                            | description                                                       |
| ------------------------------- | ----------------------------------------------------------------- |
| `cut -c2`                       | Display the 2nd character                                         |
| `cut -c1-10`                    | Display from the 1st to the 10th character                        |
| `cut -c-5`                      | Display up to the 5th character                                   |
| `cut -c3-`                      | Display from the 3rd character                                    |
| `cut -c2,4`                     | Display the 2nd and 10th character                                |
| `cut -d; -f2`                   | Display the 2nd field separated by ';'                            |
| `cut -d; --complement -s -f1,3` | Display all fields separated by ';' except the 1st and 3rd fields |

## tr

| code             | description                            |
| ---------------- | -------------------------------------- |
| `tr -d 'wd'`     | Delete the characters 'w' and 'd'      |
| `tr -s 'a' 'b'`  | Convert the character 'a' to 'b'       |
| `tr [A-Z] [a-z]` | Convert uppercase letters to lowercase |

## awk

| code                                        | description                                          |
| ------------------------------------------- | ---------------------------------------------------- |
| `awk '{print $2}'`                          | Print the 2nd field                                  |
| `awk '{print $1,$4}'`                       | Print the 1st and 4th field                          |
| `awk '{print $NF}'`                         | Print the last field                                 |
| `awk '{$2="";print}'`                       | Print without the 2nd field                          |
| `awk '{$3="";$NF="";print}'`                | Print without the 3rd and last field                 |
| `awk '/word/ {print $6}'`                   | Print the 6th field containing 'word'                |
| `awk -F\; '{print $2,$1}'`                  | Reverse the 2nd and 1st field with the delimiter ';' |
| `awk '{print substr($2, 1, length($2)-3)}'` | Remove the last 3 characters from the 2nd field      |

## head & tail

| code      | description                                                 |
| --------- | ----------------------------------------------------------- |
| `head -3` | Display the first 3 lines                                   |
| `tail -4` | Display the last 4 lines                                    |
| `tail -f` | Display the lines as they are added to the file as it grows |

## grep

| code                     | description                                               |
| ------------------------ | --------------------------------------------------------- |
| `grep -i word`           | Display the line containing the string 'word' in any case |
| `grep -A 2 word`         | Display 2 lines below the string 'word'                   |
| `grep -B 3 word`         | Display 3 lines above the string 'word'                   |
| `grep -w 'word'`         | Display the line containing the exact string 'word'       |
| `grep -v word`           | Do not display the line containing the string 'word'      |
| `grep -r word /home/me/` | Recursively search for the string 'word' in '/home/me/'   |
| `egrep 'word1\|word2'`   | Search for the words 'word1' and 'word2'                  |
| `egrep '(word1.*word2)'` | Search for the words 'word1' and 'word2' on the same line |
| `grep "."`               | Remove empty lines                                        |
| `grep -c`                | Display the number of selected lines                      |

## sort

| code              | description                                    |
| ----------------- | ---------------------------------------------- |
| `sort`            | Sort alphabetically                            |
| `sort -r`         | Sort in reverse order                          |
| `sort -n`         | Sort numerically                               |
| `sort -k 2,2`     | Sort by the 2nd field                          |
| `sort -t: -k 3,3` | Sort by the 3rd field using ':' as a separator |

## wc

| code    | description                              |
| ------- | ---------------------------------------- |
| `wc -l` | Count the number of lines in a file      |
| `wc -w` | Count the number of words in a file      |
| `wc -m` | Count the number of characters in a file |

## uniq

| code      | description                         |
| --------- | ----------------------------------- |
| `uniq`    | Delete duplicate lines              |
| `uniq -d` | Display only duplicate lines        |
| `uniq -u` | Display only the lines present once |
| `uniq -c` | Counting duplicate lines            |

## du

| code               | description                          |
| ------------------ | ------------------------------------ |
| `du -h`            | Display size in readable form        |
| `du -c`            | Show size with total                 |
| `du --max-depth=2` | Display size with two subdirectories |

## find & rename

```bash
# Recursively delete all files that contain "jpg".
find . -type f -name "*jpg*" -exec rm -rf "{}" \;

# Recursively copy all files that contain "jpg" by adding "_TEMP".
find . -type f -name '*jpg' -print0 | xargs -0 -i cp -p "{}" {}_TEMP

# Rename all .html files to .php
rename 's/\.html$/\.php/' *.html
```
