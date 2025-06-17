# 使用官方 Node.js LTS 镜像
FROM node:22-alpine

# 创建工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 生成生产环境构建
RUN npm run build

# 生产环境启动
CMD ["npm", "start"]
