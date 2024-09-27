# ITI-GP-CLIENT

# common command line for push changes

## Create a new branch

```bash
git checkout -b <new-branch-name>
```

## Check the current branch

```bash
git branch --show-current
```

## Move to another branch

```bash
git checkout <branch-name>
```

## List all branches

```bash
git branch
```

## Push changes to GitHub

```bash
git add .
git commit -m "Your commit message"
git push origin <branch-name>
```

## Pull and Push in two steps:

```bash
git pull origin <branch-name>
git push origin <branch-name>
```

## Rebase and push after pulling

```bash
git pull --rebase origin <branch-name> && git push origin <branch-name>
```
