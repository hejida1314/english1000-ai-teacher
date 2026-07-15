# 长期保存到 GitHub

建议把这个项目放到你自己的 GitHub 仓库。这样就算 Codex 或 ChatGPT 没有上下文，代码也不会丢。

## 第一次保存

```powershell
git init
git add .
git commit -m "Create English1000 AI Teacher app"
```

然后去 GitHub 创建一个新仓库，例如：

```text
english1000-ai-teacher
```

把 GitHub 给你的远程地址加进来：

```powershell
git remote add origin https://github.com/YOUR_NAME/english1000-ai-teacher.git
git branch -M main
git push -u origin main
```

## 以后每次修改后

```powershell
git add .
git commit -m "Update English1000 app"
git push
```

## 下次 Codex 继续

只要告诉 Codex：

```text
从我的 GitHub 仓库 english1000-ai-teacher 继续
```

这样就不用依赖聊天记录。
