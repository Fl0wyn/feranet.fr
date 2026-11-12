# Manipulation de texte

## sed

| Code                                    | Description                                                    |
| --------------------------------------- | -------------------------------------------------------------- |
| `sed '1d'`                              | Supprimer la première ligne                                    |
| `sed '$d'`                              | Supprimer la dernière ligne                                    |
| `sed -e '2d; 4d'`                       | Supprimer les lignes 2 et 4                                    |
| `sed '2,5d'`                            | Supprimer les lignes 2 à 5                                     |
| `sed '/word/d'`                         | Supprimer les lignes contenant le mot 'word'                   |
| `sed -e '/word1/d;/word2/d'`            | Supprimer les lignes contenant les mots 'word1' et 'word2'     |
| `sed 's/.*word.*//g'`                   | Supprimer les lignes contenant la chaîne 'word'                |
| `sed '/^$/d'`                           | Supprimer les lignes vides                                     |
| `sed 's/word//g'`                       | Supprimer le mot 'word' d'une ligne                            |
| `sed -e 's/string1/string2/g'`          | Remplacer la chaîne 'string1' par 'string2'                    |
| `sed -i 's/string1/string2/g' file.txt` | Remplacer la chaîne 'string1' par 'string2' dans un fichier    |
| `sed 's/^./\u&/'`                       | Mettre en majuscule la première lettre d'un mot ou d'une phrase |
| `sed -n '2p'`                           | Afficher uniquement la 2e ligne                                |
| `sed '2i word'`                         | Ajouter 'word' à la 2e ligne                                   |
| `sed '$a word'`                         | Ajouter 'word' à la dernière ligne                             |
| `sed 's/^/word1/'`                      | Ajouter 'word1' au début de chaque ligne                       |
| `sed 's/$/word2/'`                      | Ajouter 'word2' à la fin de chaque ligne                       |
| `sed '/^word1.*/i word2' file.txt`      | Ajouter 'word2' avant 'word1'                                  |
| `sed '/^word1.*/a word2' file.txt`      | Ajouter 'word2' après 'word1'                                  |
| `sed '$ s/.$//'`                        | Supprimer le dernier caractère de la dernière ligne            |
| `sed '1s/^.//'`                         | Supprimer le premier caractère de la première ligne            |
| `sed 's/\.word3$//g' `                  | Supprimer le mot 'word3' des dernières lignes                  |

## cut

| Code                            | Description                                                                |
| ------------------------------- | -------------------------------------------------------------------------- |
| `cut -c2`                       | Afficher le 2e caractère                                                   |
| `cut -c1-10`                    | Afficher du 1er au 10e caractère                                           |
| `cut -c-5`                      | Afficher jusqu'au 5e caractère                                             |
| `cut -c3-`                      | Afficher à partir du 3e caractère                                          |
| `cut -c2,4`                     | Afficher le 2e et le 4e caractère                                          |
| `cut -d; -f2`                   | Afficher le 2e champ séparé par ';'                                        |
| `cut -d; --complement -s -f1,3` | Afficher tous les champs séparés par ';' sauf les 1er et 3e champs         |

## tr

| Code             | Description                                |
| ---------------- | ------------------------------------------ |
| `tr -d 'wd'`     | Supprimer les caractères 'w' et 'd'        |
| `tr -s 'a' 'b'`  | Convertir le caractère 'a' en 'b'          |
| `tr [A-Z] [a-z]` | Convertir les majuscules en minuscules     |

## awk

| Code                                        | Description                                                  |
| ------------------------------------------- | ------------------------------------------------------------ |
| `awk '{print $2}'`                          | Afficher le 2e champ                                         |
| `awk '{print $1,$4}'`                       | Afficher les 1er et 4e champs                                |
| `awk '{print $NF}'`                         | Afficher le dernier champ                                    |
| `awk '{$2="";print}'`                       | Afficher sans le 2e champ                                    |
| `awk '{$3="";$NF="";print}'`                | Afficher sans le 3e champ et le dernier champ                |
| `awk '/word/ {print $6}'`                   | Afficher le 6e champ des lignes contenant 'word'             |
| `awk -F\; '{print $2,$1}'`                  | Inverser les 2e et 1er champs avec le délimiteur ';'         |
| `awk '{print substr($2, 1, length($2)-3)}'` | Supprimer les 3 derniers caractères du 2e champ              |

## head & tail

| Code      | Description                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `head -3` | Afficher les 3 premières lignes                                               |
| `tail -4` | Afficher les 4 dernières lignes                                               |
| `tail -f` | Afficher les lignes au fur et à mesure qu'elles sont ajoutées au fichier      |

## grep

| Code                     | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `grep -i word`           | Afficher la ligne contenant la chaîne 'word', quelle que soit la casse     |
| `grep -A 2 word`         | Afficher les 2 lignes situées sous la chaîne 'word'                        |
| `grep -B 3 word`         | Afficher les 3 lignes situées au-dessus de la chaîne 'word'                |
| `grep -w 'word'`         | Afficher la ligne contenant exactement la chaîne 'word'                    |
| `grep -v word`           | Ne pas afficher la ligne contenant la chaîne 'word'                        |
| `grep -r word /home/me/` | Rechercher récursivement la chaîne 'word' dans '/home/me/'                 |
| `egrep 'word1\|word2'`   | Rechercher les mots 'word1' et 'word2'                                     |
| `egrep '(word1.*word2)'` | Rechercher les mots 'word1' et 'word2' sur la même ligne                   |
| `grep "."`               | Supprimer les lignes vides                                                 |
| `grep -c`                | Afficher le nombre de lignes sélectionnées                                 |

## sort

| Code              | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `sort`            | Trier par ordre alphabétique                          |
| `sort -r`         | Trier dans l'ordre inverse                            |
| `sort -n`         | Trier numériquement                                   |
| `sort -k 2,2`     | Trier selon le 2e champ                               |
| `sort -t: -k 3,3` | Trier selon le 3e champ avec ':' comme séparateur     |

## wc

| Code    | Description                                    |
| ------- | ---------------------------------------------- |
| `wc -l` | Compter le nombre de lignes d'un fichier       |
| `wc -w` | Compter le nombre de mots d'un fichier         |
| `wc -m` | Compter le nombre de caractères d'un fichier   |

## uniq

| Code      | Description                                    |
| --------- | ---------------------------------------------- |
| `uniq`    | Supprimer les lignes en double                 |
| `uniq -d` | Afficher uniquement les lignes en double       |
| `uniq -u` | Afficher uniquement les lignes uniques         |
| `uniq -c` | Compter les lignes en double                   |

## du

| Code               | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `du -h`            | Afficher la taille dans un format lisible            |
| `du -c`            | Afficher la taille avec le total                     |
| `du --max-depth=2` | Afficher la taille avec deux niveaux de sous-dossiers |

## find & rename

```bash
# Supprimer récursivement tous les fichiers qui contiennent "jpg".
find . -type f -name "*jpg*" -exec rm -rf "{}" \;

# Copier récursivement tous les fichiers qui contiennent "jpg" en ajoutant "_TEMP".
find . -type f -name '*jpg' -print0 | xargs -0 -i cp -p "{}" {}_TEMP

# Renommer tous les fichiers .html en .php
rename 's/\.html$/\.php/' *.html
```
