# Git

## Configuration

### Définir le nom d'utilisateur et l'adresse e-mail globaux

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Vérifier la configuration

```bash
git config --list
```

## Commandes de base

### Initialiser un dépôt

```bash
git init
```

### Cloner un dépôt

```bash
git clone https://github.com/user/repo.git
```

### Ajouter des fichiers à la zone d'index

```bash
git add filename
```

### Valider les modifications

```bash
git commit -m "Commit message"
```

### Envoyer les modifications vers le dépôt distant

```bash
git push origin branch_name
```

### Récupérer les modifications du dépôt distant

```bash
git pull origin branch_name
```

## Gestion des branches

### Créer une nouvelle branche

```bash
git branch branch_name
```

### Basculer sur une branche

```bash
git checkout branch_name
```

### Créer une nouvelle branche et basculer dessus

```bash
git checkout -b branch_name
```

### Fusionner une branche

```bash
git merge branch_name
```

### Supprimer une branche

```bash
git branch -d branch_name
```

## Consulter l'historique

### Afficher l'historique des commits

```bash
git log
```

### Afficher l'historique des commits sous forme de graphe

```bash
git log --graph --oneline --all
```

## Annuler des modifications

### Retirer un fichier de la zone d'index

```bash
git reset HEAD filename
```

### Annuler un commit

```bash
git revert commit_id
```

### Revenir à un commit précédent

```bash
git reset --hard commit_id
```
