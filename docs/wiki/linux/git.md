# Git

## Configuration

### Set Global Username and Email

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Check Configuration

```bash
git config --list
```

## Basic Commands

### Initialize a Repository

```bash
git init
```

### Clone a Repository

```bash
git clone https://github.com/user/repo.git
```

### Add Files to Staging Area

```bash
git add filename
```

### Commit Changes

```bash
git commit -m "Commit message"
```

### Push Changes to Remote Repository

```bash
git push origin branch_name
```

### Pull Changes from Remote Repository

```bash
git pull origin branch_name
```

## Branching

### Create a New Branch

```bash
git branch branch_name
```

### Switch to a Branch

```bash
git checkout branch_name
```

### Create and Switch to a New Branch

```bash
git checkout -b branch_name
```

### Merge a Branch

```bash
git merge branch_name
```

### Delete a Branch

```bash
git branch -d branch_name
```

## Viewing History

### Show Commit History

```bash
git log
```

### Show Commit History with Graph

```bash
git log --graph --oneline --all
```

## Undoing Changes

### Unstage a File

```bash
git reset HEAD filename
```

### Revert a Commit

```bash
git revert commit_id
```

### Reset to a Previous Commit

```bash
git reset --hard commit_id
```
