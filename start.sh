#!/bin/bash

echo "🎮 阳光学校 - 生存通讯游戏启动脚本"
echo "=================================="

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    echo "请访问 https://nodejs.org/ 下载并安装 Node.js"
    echo ""
    echo "macOS 用户可以使用 Homebrew:"
    echo "brew install node"
    echo ""
    echo "安装完成后重新运行此脚本"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖包..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        echo "尝试清除缓存: npm cache clean --force"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已安装"
fi

echo ""
echo "🚀 启动开发服务器..."
echo "游戏将在浏览器中自动打开: http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "=================================="

# 启动开发服务器
npm run dev
