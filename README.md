# 前端学习笔记站（GitHub Pages）

这个项目已经改成“静态笔记站”模式：  
- 左侧显示文件树  
- 右侧显示 `js/jsx` 等文件代码  
- 可搜索、可复制代码  
- 直接部署到 GitHub Pages 就能访问

---

## 1. 本地先生成文件清单

在项目根目录执行：

```bash
node scripts/generate-manifest.mjs
```

执行成功后会生成 `manifest.json`，网站会根据它显示你的笔记文件。

---

## 2. （可选）本地预览网站

如果你装了 Python：

```bash
python3 -m http.server 8000
```

然后浏览器打开：`http://localhost:8000`

---

## 3. 新建 GitHub 仓库并上传

先去 GitHub 网页新建一个仓库（比如叫 `fe-learning-notes`），然后在终端执行：

```bash
git init
git add .
git commit -m "init notes site"
git branch -M main
git remote add origin https://github.com/<你的用户名>/fe-learning-notes.git
git push -u origin main
```

如果你更习惯 SSH，也可以把 `origin` 换成：

```bash
git remote add origin git@github.com:<你的用户名>/fe-learning-notes.git
```

---

## 4. 开启 GitHub Pages

1. 打开仓库页面 -> `Settings`  
2. 左侧点击 `Pages`  
3. `Build and deployment` 里选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
4. 保存后等待 1-3 分钟

最后会得到网址：

`https://<你的用户名>.github.io/fe-learning-notes/`

---

## 5. 后续更新笔记的固定流程

每次你新增/修改文件后，按这几步：

```bash
node scripts/generate-manifest.mjs
git add .
git commit -m "update notes"
git push
```

推送后 GitHub Pages 会自动更新。

---

## 6. 常见问题

- 页面提示缺少 `manifest.json`：先执行 `node scripts/generate-manifest.mjs`，并提交推送。  
- 新文件看不到：通常是忘了重新生成 `manifest.json`。  
- 打开是 404：检查 `Pages` 的分支是否是 `main` + `/ (root)`。  
- 中文路径打不开：本项目前端已做 URL 编码处理，通常可正常显示。

