---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

TaleVoice 项目数据模型，基于 PostgreSQL 数据库表结构

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer

# 用户模块

## POST 用户注册

POST /api/user/register

> Body 请求参数

```json
{
  "username": "zhangsan",
  "password": "123456",
  "email": "zhangsan@example.com"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» username|body|string| 是 | 昵称|none|
|» password|body|string| 是 | 密码|SHA-256加密发送|
|» email|body|string| 是 | 邮箱|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "注册成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none|响应码|后端自定义响应码|
|» message|string|true|none|响应消息|后端对code的说明|
|» data|null|true|none||none|

## POST 用户登录

POST /api/user/login

> Body 请求参数

```json
{
  "username": "zhangsan",
  "password": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» username|body|string| 是 | 昵称|none|
|» password|body|string| 是 | 密码|SHA-256加密发送|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "登录成功",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|string|true|none|登录令牌|jwt令牌|

## POST 用户登出

POST /api/user/logout

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "登出成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 获取个人信息

GET /api/user/profile

> Body 请求参数

```yaml
{}

```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "userId": "1001",
    "username": "zhangsan",
    "email": "zhangsan@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "createTime": "2026-01-01T00:00:00Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» userId|string|true|none|用户ID|none|
|»» username|string|true|none|昵称|none|
|»» email|string|true|none|邮箱|none|
|»» avatar|string|true|none|头像|头像的URL地址|
|»» createTime|string|true|none|创建时间|none|

## PUT 修改个人信息

PUT /api/user/profile

> Body 请求参数

```json
{
  "username": "zhangsan",
  "email": "newemail@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» username|body|string¦null| 是 | 昵称|不可与他人重复，若重复会返回失败|
|» email|body|string¦null| 是 | 邮箱|none|
|» avatar|body|string¦null| 是 | 头像|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||1为成功，0为失败|
|» message|string|true|none||none|
|» data|null|true|none||none|

## PUT 密码修改

PUT /api/user/password

> Body 请求参数

```json
{
  "oldPassword": "123456",
  "newPassword": "654321"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» oldPassword|body|string| 是 | 旧密码|SHA-256加密发送|
|» newPassword|body|string| 是 | 新密码|SHA-256加密发送|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "密码修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## POST 密码重置

POST /api/user/password/reset

> Body 请求参数

```json
{
  "email": "zhangsan@example.com"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» email|body|string| 是 | 邮箱|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "重置邮件已发送，请查收邮箱",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

# 用户模块/参考音频

## POST 克隆音频样本上传

POST /api/user/audio

> Body 请求参数

```yaml
audio: ""
voiceName: 妈妈的声音

```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» audio|body|string(binary)| 否 ||要克隆的音频文件|
|» voiceName|body|string| 否 ||自定义音色名称|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "创建成功",
  "data": "voice-01"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|string|true|none|音频样本ID|none|

## PUT 修改克隆音频样本名称

PUT /api/user/audio

> Body 请求参数

```json
{
  "voiceId": "string",
  "voiceName": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» voiceId|body|string| 是 | 音频ID|none|
|» voiceName|body|string| 是 | 自定义音色名称|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 获取克隆音频样本列表

GET /api/user/audio

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": [
    {
      "voiceId": "string",
      "voiceName": "string",
      "default": true
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none|克隆音频样本列表|none|
|»» voiceId|string|true|none|音频ID|none|
|»» voiceName|string|true|none|自定义音色名称|none|
|»» default|boolean|true|none|是否为系统自带音色|none|

## DELETE 克隆音频样本删除

DELETE /api/user/audio/{voiceId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|voiceId|path|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

# 项目模块

## POST 项目创建

POST /api/project

> Body 请求参数

```json
{
  "title": "string",
  "description": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» title|body|string| 是 | 项目标题|none|
|» description|body|string¦null| 是 | 项目简介|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "创建成功",
  "data": "project-01"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|string|true|none|项目ID|none|

## PUT 修改项目

PUT /api/project

> Body 请求参数

```json
{
  "projectId": "string",
  "title": "string",
  "description": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» projectId|body|string| 是 | 项目ID|none|
|» title|body|string¦null| 是 | 项目标题|none|
|» description|body|string¦null| 是 | 项目描述|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## DELETE 项目删除

DELETE /api/project/{projectId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||none|
|Authorization|header|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 项目列表

GET /api/project/list

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|page|query|integer| 是 ||第几页|
|pageSize|query|integer| 是 ||每页多少条|
|title|query|string| 否 ||搜索功能，支持部分匹配|
|Authorization|header|string| 是 ||none|

#### 详细说明

**title**: 搜索功能，支持部分匹配

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "date": {
    "total": 0,
    "lists": {
      "projectId": "string",
      "title": "string",
      "description": "string",
      "style": "string"
    }
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» date|object|true|none||none|
|»» total|integer|true|none|返回的项目总数|none|
|»» lists|object|true|none|项目列表|none|
|»»» projectId|string|true|none|项目ID|none|
|»»» title|string|true|none|项目标题|none|
|»»» description|string¦null|true|none|项目简介|none|
|»»» style|string¦null|true|none|项目风格|none|

# 故事导入模块

## GET 获取故事内容

GET /api/story/list/{projectId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||none|
|Authorization|header|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "title": "string",
    "content": "string",
    "createTime": "string",
    "updateTime": "string"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» title|string|true|none|故事标题|none|
|»» content|string|true|none|故事内容|none|
|»» createTime|string|true|none|创建时间|none|
|»» updateTime|string|true|none|更新时间|none|

## POST 创建故事内容

POST /api/story

> Body 请求参数

```json
{
  "projectId": "string",
  "title": "string",
  "content": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» projectId|body|string| 是 | 项目ID|none|
|» title|body|string| 是 | 章节标题|none|
|» content|body|string| 是 | 章节内容|若用户选择文件导入，则由前端解析为string|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## PUT 编辑故事内容

PUT /api/story

> Body 请求参数

```json
{
  "projectId": "string",
  "title": "string",
  "content": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» projectId|body|string| 是 | 项目ID|none|
|» title|body|string¦null| 是 | 章节标题|none|
|» content|body|string¦null| 是 | 章节内容|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## DELETE 删除故事内容

DELETE /api/story/{projectId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||项目ID|
|Authorization|header|string| 否 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 故事导出

GET /api/story/export/{projectId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|path|string| 是 ||项目ID|
|Authorization|header|string| 否 ||none|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回一个文件（.txt），
浏览器会自动下载

示例响应头：
Content-Type: text/plain
Content-Disposition: attachment; filename="故事_勇敢的小兔子.txt"|Inline|

### 返回数据结构

## POST AI故事生成

POST /api/story/ai

> Body 请求参数

```json
{
  "projectId": "string",
  "theme": "string",
  "style": "string",
  "keyword": "string",
  "prompt": "string",
  "number": "string",
  "length": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» projectId|body|string| 是 | 项目ID|none|
|» theme|body|string| 是 | 主题|none|
|» style|body|string¦null| 是 | 风格|none|
|» keyword|body|string¦null| 是 | 关键词|none|
|» prompt|body|string¦null| 是 | 要求|none|
|» number|body|string¦null| 是 | 章节数量|如：3~6章|
|» length|body|string¦null| 是 | 每章长度|如：medium|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "生成成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## PUT AI故事内容修改

PUT /api/story/ai

> Body 请求参数

```json
{
  "projectId": "string",
  "theme": "string",
  "style": "string",
  "keyword": "string",
  "prompt": "string",
  "number": "string",
  "length": "string",
  "rewrite": true
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|body|body|object| 是 ||none|
|» projectId|body|string| 是 | 项目ID|none|
|» theme|body|string¦null| 是 | 主题|none|
|» style|body|string¦null| 是 | 风格|none|
|» keyword|body|string¦null| 是 | 关键词|none|
|» prompt|body|string| 是 | 要求|none|
|» number|body|string¦null| 是 | 章节数量|如：3~6章|
|» length|body|string¦null| 是 | 长度|如：medium|
|» rewrite|body|boolean| 是 | 是否重写|若为true则直接重写不参考当前内容|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

# 语音模块

## POST 语音生成

POST /api/audio

> Body 请求参数

```json
{
  "storyId": "string",
  "voiceId": "string",
  "speechRate": 0
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» storyId|body|string| 是 | 项目ID|要进行语言生成的章节|
|» voiceId|body|string| 是 | 克隆音频ID列表|想要使用的个性化音色，多个时会自动合理分配角色|
|» speechRate|body|number| 是 | 语速|0.5~2|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "生成成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» audioId|string|true|none|音频ID|none|
|»» title|string|true|none|语音标题|刚生成时是默认标题，如“音频1”|
|»» storyId|string|true|none||none|
|»» status|integer|true|none||none|
|»» fileUrl|string|true|none||none|

## GET 获取语音列表

GET /api/audio

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|storyId|query|string| 是 ||项目ID|
|page|query|integer| 否 ||第几页|
|pageSize|query|integer| 否 ||每页多少条|
|title|query|string| 否 ||根据语音昵称搜索，支持部分匹配|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "total": 0,
    "lists": [
      {
        "audioId": "string",
        "title": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none|返回的语音总数|none|
|»» lists|[object]|true|none|语音列表|none|
|»»» audioId|string|true|none|语音ID|none|
|»»» title|string|true|none|语音标题|刚生成时是默认标题|

## PUT 修改语音标题

PUT /api/audio

> Body 请求参数

```json
{
  "audioId": "string",
  "title": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» audioId|body|string| 是 | 语音ID|none|
|» title|body|string| 是 | 标题|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 获取语音

GET /api/audio/{audioId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|audioId|path|string| 是 ||语音ID|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|会返回一个音频文件，可用于在线播放，也可供用户导出|Inline|

### 返回数据结构

## DELETE 删除语音

DELETE /api/audio/{audioId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|audioId|path|string| 是 ||语音ID|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 语音批量导出

GET /api/audio/export

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|audioIds|query|array[string]| 否 ||要导出的音频ID列表|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回一个压缩包（.zip），
浏览器会自动下载|Inline|

### 返回数据结构

# 插图模块

## POST AI生成插图

POST /api/image

> Body 请求参数

```json
{
  "projectId": "string",
  "style": "string",
  "prompt": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» projectId|body|string| 是 | 项目ID|none|
|» style|body|string| 是 | 风格|none|
|» prompt|body|string| 是 | 要求|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "生成成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 获取插图列表

GET /api/image

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|query|string| 否 ||项目ID|
|page|query|integer| 否 ||第几页|
|pageSize|query|integer| 否 || 每页多少条|
|title|query|string| 否 ||根据插图标题搜索，支持部分匹配|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "total": 0,
    "lists": [
      {
        "imageId": "string",
        "title": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none|返回的插图总数|none|
|»» lists|[object]|true|none||none|
|»»» imageId|string|false|none|插图ID|none|
|»»» title|string|false|none|插图标题|刚生成时为默认标题，如“插图-1”|

## PUT 修改插图标题

PUT /api/image

> Body 请求参数

```json
{
  "imageId": "string",
  "title": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» imageId|body|string| 是 | 插图ID|none|
|» title|body|string| 是 | 插图标题|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 获取插图

GET /api/image/{imageId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|imageId|path|string| 是 ||插图ID|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|会返回一个图片文件，可用于在线预览，也可供用户导出|Inline|

### 返回数据结构

## DELETE 删除插图

DELETE /api/image/{imageId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|imageId|path|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 插图批量导出

GET /api/image/export

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|imageIds|query|array[string]| 否 ||要导出的插图ID列表|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回一个压缩包（.zip），
浏览器会自动下载|Inline|

### 返回数据结构

# 视频合成模块

## POST 生成视频

POST /api/video

> Body 请求参数

```json
{
  "projectId": "string",
  "imageIds": [
    "string"
  ],
  "style": "string",
  "prompt": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» projectId|body|string| 是 | 项目ID|none|
|» imageIds|body|[string]| 是 | 参考的插图ID列表|none|
|» style|body|string¦null| 是 | 风格|none|
|» prompt|body|string| 是 | 要求|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "生成成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 获取视频列表

GET /api/video

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|projectId|query|string| 否 ||项目ID|
|page|query|integer| 否 ||第几页|
|pageSize|query|integer| 否 ||每页多少条|
|title|query|string| 否 ||根据语音昵称搜索，支持部分匹配|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "total": 0,
    "lists": [
      {
        "videoId": "string",
        "title": "string"
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none|返回的视频总数|none|
|»» lists|[object]|true|none||none|
|»»» videoId|string|false|none|视频ID|none|
|»»» title|string|false|none|视频标题|刚生成时为默认值，如“视频-1”|

## PUT 修改视频标题

PUT /api/video

> Body 请求参数

```json
{
  "videoId": "string",
  "title": "string"
}
```

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|body|body|object| 是 ||none|
|» videoId|body|string| 是 | 视频ID|none|
|» title|body|string| 是 | 视频标题|none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "修改成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 获取视频

GET /api/video/{imageId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|imageId|path|string| 是 ||none|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|会返回一个视频文件，可用于在线播放，也可供用户导出|Inline|

### 返回数据结构

## DELETE 删除视频

DELETE /api/video/{videoId}

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|videoId|path|string| 是 ||none|

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## GET 视频批量导出

GET /api/video/export

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|videoIds|query|string| 否 ||要导出的视频ID列表|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|返回一个压缩包（.zip），
浏览器会自动下载|Inline|

### 返回数据结构

# 通用模块

## POST 图片上传

POST /common/upload

### 请求参数

|名称|位置|类型|必选|中文名|说明|
|---|---|---|---|---|---|
|Authorization|header|string| 否 ||none|
|Content-Type|header|string| 否 ||必须为示例值|

> 返回示例

> 200 Response

```json
{
  "code": 1,
  "msg": "ea minim cillum fugiat magna",
  "data": "https://www.baidu.com"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|string|true|none||返回阿里云OSS链接|

# 数据模型

<h2 id="tocS_User">User</h2>

<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "zhangsan",
  "email": "zhangsan@example.com",
  "password_hash": "$2b$12$...",
  "avatar_url": "https://example.com/avatars/xxx.jpg",
  "created_at": "2026-04-15T10:30:00Z"
}

```

用户表 - 存储系统用户的基本信息，包括认证信息和个人资料

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string(uuid)|true|none||用户唯一标识|
|username|string|true|none||用户名|
|email|string(email)|true|none||邮箱地址|
|password_hash|string|true|none||密码哈希值（bcrypt加密）|
|avatar_url|string|false|none||头像URL|
|created_at|string(date-time)|true|none||创建时间|

<h2 id="tocS_Story">Story</h2>

<a id="schemastory"></a>
<a id="schema_Story"></a>
<a id="tocSstory"></a>
<a id="tocsstory"></a>

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "小红帽的故事",
  "content": "从前有一个可爱的小女孩...",
  "created_at": "2026-04-15T10:30:00Z",
  "updated_at": "2026-04-15T10:30:00Z",
  "project_id": "550e8400-e29b-41d4-a716-446655440002"
}

```

故事表 - 存储用户创建的故事文本内容，包括标题、正文、分类等信息

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string(uuid)|true|none||故事唯一标识|
|user_id|string(uuid)|true|none||创建者用户ID（外键 → users.id）|
|title|string|true|none||故事标题|
|content|string|true|none||故事正文内容|
|created_at|string(date-time)|true|none||创建时间|
|updated_at|string(date-time)|true|none||更新时间（自动更新）|
|project_id|string(uuid)|false|none||关联的项目ID（外键 → projects.id）|

<h2 id="tocS_Project">Project</h2>

<a id="schemaproject"></a>
<a id="schema_Project"></a>
<a id="tocSproject"></a>
<a id="tocsproject"></a>

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "story_id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "小红帽故事音频版",
  "description": "基于小红帽故事的儿童有声读物",
  "project_type": "audio",
  "style": "default",
  "file_url": "https://cdn.example.com/projects/xxx.mp3",
  "thumbnail_url": "https://cdn.example.com/projects/xxx.jpg",
  "duration": 300,
  "status": "completed",
  "created_at": "2026-04-15T10:30:00Z",
  "updated_at": "2026-04-15T10:30:00Z"
}

```

项目表 - 存储生成的音频或视频项目，包括文件信息、状态、生成参数等

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string(uuid)|true|none||项目唯一标识|
|user_id|string(uuid)|true|none||创建者用户ID（外键 → users.id）|
|story_id|string(uuid)|false|none||关联的故事ID（外键 → stories.id）|
|title|string|true|none||项目标题|
|description|string|false|none||项目详细描述内容|
|project_type|string|true|none||项目类型: audio/video|
|style|string|false|none||项目风格|
|file_url|string|false|none||项目文件URL|
|thumbnail_url|string|false|none||缩略图URL|
|duration|integer|false|none||项目时长（秒）|
|status|string|true|none||状态: pending/processing/completed/failed|
|created_at|string(date-time)|true|none||创建时间|
|updated_at|string(date-time)|true|none||更新时间（自动更新）|

#### 枚举值

|属性|值|
|---|---|
|project_type|audio|
|project_type|video|
|status|pending|
|status|processing|
|status|completed|
|status|failed|

<h2 id="tocS_VoiceModel">VoiceModel</h2>

<a id="schemavoicemodel"></a>
<a id="schema_VoiceModel"></a>
<a id="tocSvoicemodel"></a>
<a id="tocsvoicemodel"></a>

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440004",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "我的声音模型",
  "model_url": "https://cdn.example.com/models/xxx.pth",
  "sample_url": "https://cdn.example.com/samples/xxx.mp3",
  "sample_duration": 60,
  "status": "ready",
  "similarity": 0.85,
  "created_at": "2026-04-15T10:30:00Z",
  "updated_at": "2026-04-15T10:30:00Z"
}

```

声音模型表 - 存储用户的个性化声音模型信息，包括模型文件、训练状态等

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string(uuid)|true|none||模型唯一标识|
|user_id|string(uuid)|true|none||所有者用户ID（外键 → users.id）|
|name|string|true|none||模型名称|
|model_url|string|false|none||模型文件URL|
|sample_url|string|false|none||样本音频URL|
|sample_duration|integer|false|none||样本音频时长（秒）|
|status|string|true|none||状态: training/ready/failed|
|similarity|number(float)|true|none||声音相似度（0-1）|
|created_at|string(date-time)|true|none||创建时间|
|updated_at|string(date-time)|true|none||更新时间（自动更新）|

#### 枚举值

|属性|值|
|---|---|
|status|training|
|status|ready|
|status|failed|

<h2 id="tocS_AudioFile">AudioFile</h2>

<a id="schemaaudiofile"></a>
<a id="schema_AudioFile"></a>
<a id="tocSaudiofile"></a>
<a id="tocsaudiofile"></a>

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440005",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "背景音乐01",
  "file_url": "https://cdn.example.com/audio/xxx.mp3",
  "title": "欢快的背景音乐",
  "created_at": "2026-04-15T10:30:00Z",
  "updated_at": "2026-04-15T10:30:00Z",
  "project_id": "550e8400-e29b-41d4-a716-446655440002"
}

```

音频表 - 存储用户的个性化音频信息，包括音频文件、训练状态等

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|string(uuid)|true|none||音频唯一标识|
|user_id|string(uuid)|true|none||所有者用户ID（外键 → users.id）|
|name|string|true|none||音频名称|
|file_url|string|false|none||音频文件URL|
|title|string|true|none||音频标题|
|created_at|string(date-time)|true|none||创建时间|
|updated_at|string(date-time)|true|none||更新时间（自动更新）|
|project_id|string(uuid)|false|none||关联的项目ID（外键 → projects.id）|

