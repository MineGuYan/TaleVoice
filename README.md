# TaleVoice

童话之声（TaleVoice）—— 一个 AI 故事语音生成平台。用户可以创建/导入故事文本，借助大语言模型生成或润色故事内容，再通过 Qwen TTS 把故事合成为高质量、可个性化音色的语音，串联起“故事写作 → 配音 → 文生图 → 视频合成”的故事生产线。

## 项目简介

TaleVoice 旨在把一段故事文本，自动转化为带有个性化音色的有声故事。核心能力：

- **用户体系**：注册、登录、登出、个人资料管理、修改/重置密码（JWT 鉴权）。
- **项目管理**：以“项目”组织故事，支持创建、修改、删除、分页查询与关键词搜索。
- **故事创作**：手动创建/编辑/删除故事，支持 AI 按主题、风格、关键词、章节数等参数生成与改写故事，并可导出为 `.txt`。
- **音色样本**：上传参考音频克隆音色，管理用户专属音色样本。
- **语音合成**：基于 Qwen TTS，结合指定音色与语速将故事章节合成为语音，支持任务化生成、列表查询、改名、在线播放与删除。
- **文件存储**：图片/音频统一上传至阿里云 OSS。
- **视频合成**：接口已预留，功能开发中。

## 项目目录结构

```
TaleVoice/
├── backend/                     # 后端服务（FastAPI）
│   ├── main.py                  # 应用入口：路由注册、中间件、生命周期、异常处理
│   ├── requirements.txt         # Python 依赖
│   ├── .env.example             # 环境变量示例
│   └── app/
│       ├── api/                 # 路由层：user / project / story / audio / voice_sample / video / common
│       ├── services/            # 业务逻辑层（含 ai_service、audio_service 等）
│       ├── models/              # SQLAlchemy 数据模型（t_user / t_project / t_story / t_audio ...）
│       ├── schemas/             # Pydantic 请求/响应模型
│       ├── core/                # 基础设施：config / database / security / middleware / logger / oss
│       ├── tasks/               # 异步任务（预留）
│       └── utils/               # 工具函数（预留）
├── frontend/
│   └── tale-voice/              # 前端应用（React + Vite）
│       └── src/
│           ├── app/             # 页面组件与路由（routes.ts）
│           ├── services/        # 接口调用（api.ts）
│           └── styles/          # 样式（Tailwind 等）
└── docs/                        # 项目文档（需求、设计、接口、数据库等）
```

## 技术栈

### 后端
- **语言/框架**：Python 3.12 + FastAPI 0.109
- **ASGI 服务器**：Uvicorn
- **ORM/数据库**：SQLAlchemy 2.0（异步）+ PostgreSQL（`asyncpg`）；测试使用 SQLite（`aiosqlite`）
- **鉴权**：JWT（`python-jose`）+ 密码哈希（`passlib[bcrypt]`）
- **AI 能力**：OpenAI（故事生成/分镜/配音脚本）、Qwen TTS（`qwen-tts`，语音合成）
- **对象存储**：阿里云 OSS（`oss2`）
- **校验/配置**：Pydantic 2 + pydantic-settings
- **测试**：pytest + pytest-asyncio + httpx

### 前端
- **框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **路由**：react-router 7
- **样式**：Tailwind CSS 4
- **UI 组件**：Radix UI、MUI、lucide-react、sonner、motion 等

## 系统架构

```
┌─────────────────────────┐        HTTP / JSON (/api)        ┌──────────────────────────────┐
│  前端 (React + Vite)     │  ───────────────────────────►   │  后端 (FastAPI)               │
│  - 页面与路由            │                                   │  api → services → models      │
│  - services/api.ts       │  ◄───────────────────────────   │  统一响应 {code,message,data} │
└─────────────────────────┘                                   └───────────────┬──────────────┘
                                                                               │
                          ┌────────────────────────────┬─────────────────────┼─────────────────────┐
                          ▼                            ▼                       ▼                     ▼
                   ┌─────────────┐            ┌───────────────┐       ┌───────────────┐     ┌──────────────┐
                   │ PostgreSQL  │            │  阿里云 OSS    │       │  OpenAI 大模型 │     │  Qwen TTS    │
                   │ (业务数据)   │            │ (图片/音频)    │       │ (故事生成)     │     │ (语音合成)    │
                   └─────────────┘            └───────────────┘       └───────────────┘     └──────────────┘
```

- 请求经 `CORS` 与 `RequestLoggingMiddleware` 中间件后进入路由层。
- 路由层（`app/api`）负责鉴权与参数校验，调用业务层（`app/services`）。
- 业务层通过 SQLAlchemy 异步会话操作数据库，并按需调用 OpenAI、Qwen TTS、OSS 等外部服务。
- 应用启动时自动 `create_all` 建表；`APIException` / `HTTPException` 统一转换为 `{code, message, data}` 响应。

## 快速开始

### 环境要求
- Python 3.12
- Node.js（建议 18+）与 pnpm/npm
- PostgreSQL 15+

### 1. 数据库建表

根据 `docs/database.sql` 文件创建数据库表。

### 2. 启动后端

```bash
cd backend
python -m venv .venv
# Windows
.\.venv\Scripts\activate
# macOS / Linux
# source .venv/bin/activate

pip install -r requirements.txt

# 配置环境变量：复制示例并按需填写
copy .env.example .env        # Windows
# cp .env.example .env        # macOS / Linux
# 在 .env 中填写 DATABASE_URL、SECRET_KEY、OSS、OpenAI、TTS 等配置

# 启动服务（默认 http://127.0.0.1:8000）
uvicorn main:app --reload
```

启动后可访问：
- 健康检查：`GET http://127.0.0.1:8000/health`
- 交互式文档（Swagger UI）：`http://127.0.0.1:8000/docs`

### 3. 启动前端

```bash
cd frontend/tale-voice
pnpm install            # 或 npm install
pnpm dev                # 或 npm run dev
```

前端通过 `VITE_API_BASE_URL` 指定后端地址，默认 `http://127.0.0.1:8000/api`（见 `frontend/tale-voice/.env`），如需覆盖可新建 `.env.local`。

### 3. 构建前端产物

```bash
pnpm build              # 或 npm run build，输出到 dist/
```
