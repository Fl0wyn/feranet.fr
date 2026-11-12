# Conditions

## if

```bash
if [ test_1 ] ; then
  echo "test 1"
elif [ test_2 ] ; then
  echo "test 2"
else
  echo "test 3"
fi
```

## test

```bash
test test_1
  echo "test 1"
```

## case

```bash
case VARIABLE in
  "a")
    echo "1"
    ;;
  "b")
    echo "2"
    ;;
  "c")
    echo "3"
    ;;
  *)
    echo "0"
    ;;
esac
```

## Chaînes de caractères

| Code                   | Description |
| ---------------------- | ----------- |
| `$string1 = $string2`  | Identiques  |
| `$string1 != $string2` | Différentes |
| `-z $string`           | Vide        |
| `-n $string`           | Non vide    |

## Nombres

| Code              | Description       |
| ----------------- | ----------------- |
| `$num1 -eq $num2` | Égal              |
| `$num1 -ne $num2` | Différent         |
| `$num1 -lt $num2` | Inférieur à       |
| `$num1 -le $num2` | Inférieur ou égal |
| `$num1 -gt $num2` | Supérieur à       |
| `$num1 -ge $num2` | Supérieur ou égal |

## Fichiers

| Code                | Description     |
| ------------------- | --------------- |
| `-e $my_file`       | Existe          |
| `-d $my_file`       | Dossier         |
| `-f $my_file`       | Fichier         |
| `-L $my_file`       | Lien symbolique |
| `-r $my_file`       | Lisible         |
| `-w $my_file`       | Modifiable      |
| `-x $my_file`       | Exécutable      |
| `$file1 -nt $file2` | Plus récent que |
| `$file1 -ot $file2` | Plus ancien que |
