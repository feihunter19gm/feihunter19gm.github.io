HTML 游戏文件放置说明

示例游戏入口：
source/games/makyo-toitsusen/index.html

把一个完整 HTML 游戏文件夹复制到 source/games/ 下。执行 npm run build 后，
它会被直接复制到 public/games/，部署静态网站即可在浏览器运行。

首页的“启动游戏”按钮已指向：
/games/makyo-toitsusen/index.html

如需增加游戏：
1. 复制首页 themes/butterfly/layout/index.pug 中的 .makyo-game-card 区块。
2. 修改 data-game-title 和 data-game-url。
3. 确保 data-game-url 与 source/games/ 下实际入口一致。
