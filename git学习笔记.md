# git学习笔记

### git初始化

```
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/LiuJian-TJPU/111.git
git push -u origin master
```

- **git init**
  - 初始化一个git仓库
- **git add README.md(可选)**
  - 增加一个redeme文件

- **git commit -m 'first commit'**
  - 提交到本地仓库并添加注释

- **git remote add origin `https://github.com/.../...git`**
  - 添加远程仓库GitHub

- **git push -u origin master**
  - 将本地仓库代码提交到远程仓库的master分支

- **git pull**
  - 从远程仓库里拉取最新的代码



```
yarn upgrade-interactive --latest
```
- **"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"**
  - 配置vscode默认的terminal

- 配置git提交模板
- touch m.template
- git config --global commit.tempalte C:\m.template