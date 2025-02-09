# Archives

## List

| Format   | Created                                  | Extraction                 |
| -------- | ---------------------------------------- | -------------------------- |
| .tar     | `tar cvf archive.tar files/folders`      | `tar xvf archive.tar`      |
| .tar.gz  | `tar zcvf archive.tar.gz files/folders`  | `tar zxvf archive.tar.gz`  |
| .tar.bz2 | `tar jcvf archive.tar.bz2 files/folders` | `tar jxvf archive.tar.bz2` |
| .tbz2    | `tar jcvf archive.tbz2 files/folders`    | `tar jxvf archive.tbz2`    |
| .tgz     | `tar zcvf archive.tgz files/folders`     | `tar zxvf archive.tgz`     |
| .bz2     | `bzip2 -k files`                         | `bunzip2 archive.bz2`      |
| .gz      | `gzip -k files`                          | `gunzip archive.gz`        |
| .rar     | `rar a archive.rar files`                | `unrar x archive.rar`      |
| .zip     | `zip archive.zip files`                  | `unzip archive.zip`        |
| .7z      | `7z a archive.7z files`                  | `7z x archive.7z`          |

## Function

```bash
# Usage: ex <file>
ex () {
  if [ -f $1 ] ; then
    case $1 in
      *.tar)       tar xf $1    ;;
      *.tar.gz)    tar xzf $1   ;;
      *.tar.bz2)   tar xjf $1   ;;
      *.tbz2)      tar xjf $1   ;;
      *.tgz)       tar xzf $1   ;;
      *.bz2)       bunzip2 $1   ;;
      *.gz)        gunzip $1    ;;
      *.rar)       unrar x $1   ;;
      *.zip)       unzip $1     ;;
      *.7z)        7z x $1      ;;
      *)           echo "'$1' cannot be extracted via ex()" ;;
    esac
  else
    echo "'$1' is not a valid file"
  fi
}
```
