# TaleVoice
一款讲童话故事的软件

## 后端启动步骤

### 1. 安装依赖

首先，确保已安装Python 3.12和Pip。然后，导航到后端项目目录并安装依赖：

```bash
cd TaleVoice/backend
pip install -r requirements.txt
```

### 2. 数据库配置

创建PostgreSQL数据库，然后根据`docs/database.sql`文件创建数据库表。
启动数据库服务，并确保在`.env`文件中配置数据库连接。

### 3. 配置环境变量

将`.env.example`文件复制为`.env`，并根据实际情况修改配置项。

```bash
# 复制示例配置文件
cp .env.example .env

# 编辑.env文件，设置数据库连接、JWT密钥等
```

### 4. 启动后端
```bash
uvicorn main:app --reload
```

## 前端启动步骤

### 1. 安装依赖

导航到前端项目目录并安装依赖：

```bash
cd TaleVoice/frontend/tale-voice
npm install
```
### 2. 启动前端
```bash
npm run dev
```