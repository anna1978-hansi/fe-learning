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

### 为什么不能直接双击 `index.html`？

因为双击是 `file://` 协议，浏览器会拦截页面用 `fetch` 读取本地文件（安全策略）。  
而我们的页面需要读取 `manifest.json` 和代码文件，所以必须用 `http://` 访问（本地服务器或 GitHub Pages 都是 `http/https`）。

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

## 4. 开启 GitHub Pages（GitHub Actions 模式）

1. 打开仓库页面 -> `Settings`  
2. 左侧点击 `Pages`  
3. `Build and deployment` 里选择：
   - `Source`: `GitHub Actions`
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

推送后会触发 `.github/workflows/deploy.yml`：  
- 先生成并校验 `manifest.json` 是否是最新  
- 再自动部署到 GitHub Pages

---

## 6. 常见问题

- 页面提示缺少 `manifest.json`：先执行 `node scripts/generate-manifest.mjs`，并提交推送。  
- 新文件看不到：通常是忘了重新生成 `manifest.json`。  
- 打开是 404：检查 `Pages` 的 `Source` 是否是 `GitHub Actions`。  
- 中文路径打不开：本项目前端已做 URL 编码处理，通常可正常显示。

---

## 7. 推送后如何确认部署成功（推荐按顺序排查）

1. 打开仓库的 `Settings -> Pages`，确认 Source 是 `GitHub Actions`。  
Why: 现在部署入口是 workflow，不再是分支直发。

2. 打开仓库 `Actions`，看 `Deploy Notes Site` 是否成功。  
Why: Pages 发布是异步的，通常要 1-3 分钟，失败会在这里给错误日志。

3. 访问：`https://<你的用户名>.github.io/<仓库名>/`  
Why: 项目仓库的 Pages URL 一定带仓库名路径。

4. 如果页面旧内容没更新，强制刷新（Mac: `Cmd + Shift + R`）。  
Why: 浏览器可能缓存旧静态资源。

5. 如果仍不对，再执行一次：
```bash
node scripts/generate-manifest.mjs
git add manifest.json
git commit -m "refresh manifest"
git push
```
Why: 你新增/改动文件后，`manifest.json` 必须同步更新，否则页面不知道有新文件。
