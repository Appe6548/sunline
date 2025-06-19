# 安装指南 - 阳光学校生存游戏

## 系统要求

- macOS 10.15+ / Windows 10+ / Linux
- 至少 2GB 可用内存
- 现代浏览器 (Chrome, Firefox, Safari, Edge)

## 详细安装步骤

### 1. 安装 Node.js

#### macOS 用户:
```bash
# 方法1: 使用 Homebrew (推荐)
brew install node

# 方法2: 从官网下载
# 访问 https://nodejs.org/
# 下载 LTS 版本的 .pkg 文件并安装
```

#### Windows 用户:
```bash
# 方法1: 使用 Chocolatey
choco install nodejs

# 方法2: 从官网下载
# 访问 https://nodejs.org/
# 下载 LTS 版本的 .msi 文件并安装
```

#### Linux 用户:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL/Fedora
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
```

### 2. 验证安装

```bash
node --version
npm --version
```

应该显示版本号，例如：
```
v18.17.0
9.6.7
```

### 3. 安装项目依赖

在项目目录中运行：

```bash
npm install
```

如果遇到权限问题，可以尝试：
```bash
sudo npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

成功启动后，你会看到类似的输出：
```
  VITE v4.4.5  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 5. 打开游戏

在浏览器中访问 `http://localhost:3000`

## 常见问题解决

### 问题1: npm install 失败
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题2: 端口被占用
```bash
# 使用不同端口
npm run dev -- --port 3001
```

### 问题3: 权限错误 (macOS/Linux)
```bash
# 修复 npm 权限
sudo chown -R $(whoami) ~/.npm
```

### 问题4: Windows 上的路径问题
确保在 PowerShell 或 Command Prompt 中运行命令，避免使用 Git Bash。

## 性能优化建议

1. **关闭不必要的浏览器标签页** - 游戏使用动画效果，需要一定的内存
2. **使用现代浏览器** - Chrome 或 Firefox 的最新版本
3. **确保稳定的网络连接** - 虽然是本地运行，但初始加载需要网络

## 开发模式 vs 生产模式

### 开发模式 (推荐用于游戏体验)
```bash
npm run dev
```
- 热重载
- 详细错误信息
- 开发工具支持

### 生产模式 (更快的性能)
```bash
npm run build
npm run preview
```
- 优化的代码
- 更快的加载速度
- 更小的文件大小

## 故障排除

如果遇到任何问题，请按以下步骤操作：

1. **检查 Node.js 版本**: 确保使用 Node.js 16 或更高版本
2. **清除缓存**: `npm cache clean --force`
3. **重新安装依赖**: 删除 `node_modules` 文件夹后重新运行 `npm install`
4. **检查防火墙**: 确保端口 3000 没有被防火墙阻止
5. **重启终端**: 有时环境变量需要重新加载

## 联系支持

如果以上步骤都无法解决问题，请提供以下信息：
- 操作系统版本
- Node.js 版本
- 错误信息的完整输出
- 执行的具体命令

---

**提示**: 首次启动可能需要几分钟来下载和安装依赖包，请耐心等待。
