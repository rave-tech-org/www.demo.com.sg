## Introduction

This project will serve as a submodule for every future project we build. It aims to include a variety of reusable UI elements and functionalities.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

# Project Folder Structure

```
src/
├── app/
├── components/
│   ├── elements/
│   │   └── **/*.(tsx|ts|scss)
│   └── pages/
│       └── **/section-(one~ten)/*.(tsx|ts|scss)
└── styles/
    └── *.(scss|css)
```

# Elements (Generic Components)


# Update new changes from rave-ui using git submodule

If this is your first time interacting with the submodule or you just cloned the main repository:

```
git submodule update --init --recursive
```

If the submodule already exists and you want to pull the latest changes:

```
git submodule update --remote --merge

git add rave-ui
git commit -m "feat: Update rave-ui submodule to latest version"
git push

```