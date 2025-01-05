# Bash

## List of packages to install

```bash
LIST_OF_PACKAGES_TO_INSTALL=(
    nano
    git
)

apt install ${LIST_OF_PACKAGES_TO_INSTALL[@]}
dnf install ${LIST_OF_PACKAGES_TO_INSTALL[@]}
```

## Date format

```bash
DATE=$(date +%d-%m-%Y)

echo $DATE
```

## Message format

```bash
SUCCESS=$(echo -e "[\e[42m\e[1m SUCCESS \e[0m"])
ERROR=$(echo -e "[\e[41m\e[1m ERROR \e[0m"])
WARNING=$(echo -e "[\e[43m\e[1m WARNING \e[0m"])
INFORMATION=$(echo -e "\e[36m\e[1m->\e[0m")

# ✔
# ✘

echo $SUCCESS
echo $ERROR
echo $WARNING
echo $INFORMATION
```

## Verification of Internet access

```bash
ping -q -c 2 cloudflare.com >/dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "up"
else
    echo "down"
fi
```

## Multi SSH connection

```bash
LIST=$(
    cat <<EOF
22;pi@192.168.1.10
2222;pi@192.168.1.20
EOF
)

for i in $LIST; do

  iping=$(echo "$i" | cut -d@ -f2)
  ping -c1 $iping &>/dev/null

  if [ $? = 0 ]; then
    issh=$(echo "$i" | tr -s ';' ' ')
    iuser=$(echo "$i" | cut -d'@' -f1 | cut -d';' -f2)
    scp -P $issh:/home/$iuser/
    ssh -p $issh 'touch file_test'
  fi

done
```

## .bashrc file

```bash
export LS_OPTIONS='--color=auto'
eval "$(dircolors)"
alias ls='ls $LS_OPTIONS'
alias ll='ls $LS_OPTIONS -lFh'
alias l='ls $LS_OPTIONS -lFhA'

alias mv="mv -i"
alias cp="cp -i"
alias rm="rm -i"

alias ip='ip -c -br -f inet a'
alias free='free --kilo -h -w'
alias cat='pygmentize -g -O style=emacs' # pip install pygments
alias df='df -hT | egrep -v "loop|overlay"'
alias ss='ss -posant'

export HISTTIMEFORMAT="%d/%m/%y %T  "
```
