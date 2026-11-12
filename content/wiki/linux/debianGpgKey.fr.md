# Clé GPG Debian

[Liste des clés](https://ftp-master.debian.org/keys.html)

::: info
Dans cet exemple, nous utilisons la clé `0D6C9793`. La clé `0D6C9793` correspond aux 8 derniers caractères de l'empreinte.
:::

## Télécharger la clé

```bash
gpg --keyserver pgpkeys.mit.edu --recv-key 0D6C9793
```

## Ajouter la clé

```bash
gpg -a --export 0D6C9793 | sudo apt-key add -
```

[Source](https://www.debian.org/doc/manuals/securing-debian-manual/deb-pack-sign.en.html)
