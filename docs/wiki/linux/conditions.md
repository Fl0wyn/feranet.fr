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

## Character Strings

| Code                   | Description |
| ---------------------- | ----------- |
| `$string1 = $string2`  | Identical   |
| `$string1 != $string2` | Different   |
| `-z $string`           | Empty       |
| `-n $string`           | Not empty   |

## Numbers

| Code              | Description      |
| ----------------- | ---------------- |
| `$num1 -eq $num2` | Equal            |
| `$num1 -ne $num2` | Not equal        |
| `$num1 -lt $num2` | Lower than       |
| `$num1 -le $num2` | Lower or equal   |
| `$num1 -gt $num2` | Greater than     |
| `$num1 -ge $num2` | Greater or equal |

## Files

| Code                | Description |
| ------------------- | ----------- |
| `-e $my_file`       | Exists      |
| `-d $my_file`       | Folder      |
| `-f $my_file`       | File        |
| `-L $my_file`       | Symlink     |
| `-r $my_file`       | Readable    |
| `-w $my_file`       | Writable    |
| `-x $my_file`       | Executable  |
| `$file1 -nt $file2` | Newer than  |
| `$file1 -ot $file2` | Older than  |
