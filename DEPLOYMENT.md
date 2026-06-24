# 网站发布与更新

网站地址：`https://yuyumax.top`

发布方式：GitHub Actions 自动构建并发布到 GitHub Pages。

## 首次设置

1. 在 GitHub 创建公开仓库：`feihunter19gm.github.io`。
2. 将本项目全部文件推送到该仓库的 `main` 分支。
3. 在仓库 **Settings → Pages → Build and deployment** 中，选择 **GitHub Actions**。
4. 在仓库 **Settings → Pages → Custom domain** 填入 `yuyumax.top` 并保存。
5. 在阿里云云解析 DNS 中添加：

| 主机记录 | 记录类型 | 记录值 |
| --- | --- | --- |
| `@` | `A` | `185.199.108.153` |
| `@` | `A` | `185.199.109.153` |
| `@` | `A` | `185.199.110.153` |
| `@` | `A` | `185.199.111.153` |
| `www` | `CNAME` | `feihunter19gm.github.io` |

DNS 生效后，回到 GitHub Pages 勾选 **Enforce HTTPS**。

## 日常更新

1. 添加文章：在 `source/_posts/` 新建 Markdown 文件。
2. 添加音乐：将音频放到 `source/music/`。
3. 添加预览图片：将图片放到 `source/gallery/`。
4. 添加 HTML 游戏：将完整游戏文件夹放到 `source/games/`。
5. 添加 APK：放到 `source/downloads/makyo-toitsusen.apk`。
6. 提交并推送到 GitHub `main` 分支。GitHub Actions 会自动更新网站。

本地检查可执行：`npm run build`。
