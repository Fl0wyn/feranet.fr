# Debian GPG Key

[List of keys](https://ftp-master.debian.org/keys.html)

::: info
In this example, we will use the key `0D6C9793`. The key `0D6C9793` is the last 8 digits of the fingerprint.
:::

## Download Key

```bash
gpg --keyserver pgpkeys.mit.edu --recv-key 0D6C9793
```

## Add Key

```bash
gpg -a --export 0D6C9793 | sudo apt-key add -
```

[Source](https://www.debian.org/doc/manuals/securing-debian-manual/deb-pack-sign.en.html)
