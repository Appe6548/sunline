@echo off
chcp 65001 >nul
echo 🎮 阳光学校 - 生存通讯游戏启动脚本
echo ==================================

REM 检查 Node.js 是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装
    echo 请访问 https://nodejs.org/ 下载并安装 Node.js
    echo.
    echo 安装完成后重新运行此脚本
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
node --version
npm --version
echo.

REM 检查依赖是否安装
if not exist "node_modules" (
    echo 📦 正在安装依赖包...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        echo 尝试清除缓存: npm cache clean --force
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
) else (
    echo ✅ 依赖已安装
)

echo.
echo 🚀 启动开发服务器...
echo 游戏将在浏览器中自动打开: http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo ==================================

REM 启动开发服务器
npm run dev

pause
