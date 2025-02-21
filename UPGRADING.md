# UPGRADING GUIDE

## Adding Upstream Remote
To fetch updates from the official repository, add the upstream remote:

```sh
git remote add upstream git@github.com:codecov/gazebo.git
```

## Fetching and Checking Out a Tag
To update your local branch with the latest code from a specific tag:

```sh
git fetch upstream
```

List available tags:

```sh
git tag
```

Checkout the desired tag (e.g., `v25.2.7`) into your local branch:

```sh
git checkout tags/v25.2.7 -b my-branch
```

## Merging Updates & Resolving Conflicts
If you need to merge updates into your working branch:

```sh
git merge [previous-version]
```

If there are conflicts, resolve them manually, then stage the resolved files:

```sh
git add <resolved-files>
git commit -m "Resolved merge conflicts"
```

Push the changes to your repository:

```sh
git push origin my-branch
```

You're now updated! 🚀

