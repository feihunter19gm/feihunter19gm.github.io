HTML 游戏文件放置说明

当前入口：
- 游戏列表页：source/games/index.html
- MD 在线模拟器：source/games/md/index.html
- MD ROM 放置目录：source/games/md/roms/

新增 HTML 小游戏：
1. 把完整游戏文件夹复制到 source/games/ 下，例如：
   source/games/my-html-game/index.html

2. 执行：
   npm run clean
   npm run build

3. 本地或线上访问：
   /games/my-html-game/

4. 如果要在游戏列表页显示，编辑：
   source/games/index.html
   复制一张 .card 卡片并修改链接。

MD 模拟器说明：
- 打开 /games/md/
- 本地测试：点击“选择本地 ROM”，不会上传到服务器。
- 站点加载：把合法 ROM 放入 source/games/md/roms/，在页面右侧填写 ./roms/文件名。

版权提醒：
请不要把未授权的商业 ROM 上传到公开网站。模拟器页面只提供网页运行框架。
