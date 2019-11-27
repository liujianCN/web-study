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

```
feat(): 描述

#Body

#Footer

# - type: 
#   feat：新功能（feature）
#   fix：修补bug
#   docs：文档（documentation）
#   style： 格式（不影响代码运行的变动）
#   refactor：重构（即不是新增功能，也不是修改bug的代码变动）
#   test：增加测试
#   chore：构建过程或辅助工具的变动
#
# - scope: (可以为空)
#     scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
# - subject
#     提交描述
#空一行
# - Body:
#   Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。
#   More detailed explanatory text, if necessary. Wrap it to
#   about 72 characters or so.
#   Further paragraphs come after blank lines.
#   Bullet points are okay, too
#   Use a hanging indent
#   有两个注意点。
#   1. 使用第一人称现在时，比如使用change而不是changed或changes。
#   2. 应该说明代码变动的动机，以及与以前行为的对比。
#
#空一行
# - Footer:
#   Footer 部分只用于两种情况。
#   1. 不兼容变动: BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。
#   2. 关闭 Issue: Closes #123, #245, #992
#   3. 还有一种特殊情况：Revert
#     如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。
#     revert: feat(pencil): add 'graphiteWidth' option
#     This reverts commit 667ecc1654a317a13331b17617d973392f415f02
#     Body部分的格式是固定的，必须写成This reverts commit hash
```