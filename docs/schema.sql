-- =============================================================
-- TaleVoice 数据库建表语句
-- 数据库: PostgreSQL (postgresql+asyncpg)
-- 依据: backend/app/models/ 下的 SQLAlchemy 模型自动整理
-- 说明:
--   1. 主键(*_id)与 t_audio_voice_rel.id 在应用层使用 uuid4 生成 (String(64))。
--   2. create_time / update_time 在模型中由 Python 端 datetime.now 赋值，
--      此处额外提供 DEFAULT CURRENT_TIMESTAMP 以便直接执行 SQL 写入时也有默认值。
--   3. 建表顺序遵循外键依赖关系。
-- =============================================================

-- -------------------------------------------------------------
-- 用户表
-- -------------------------------------------------------------
CREATE TABLE t_user (
    user_id     VARCHAR(64)  NOT NULL,
    username    VARCHAR(64)  NOT NULL,
    password    VARCHAR(256) NOT NULL,
    email       VARCHAR(128) NOT NULL,
    avatar      VARCHAR(512),
    create_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_t_user PRIMARY KEY (user_id),
    CONSTRAINT uk_t_user_username UNIQUE (username),
    CONSTRAINT uk_t_user_email UNIQUE (email)
);

CREATE INDEX idx_t_user_username ON t_user (username);
CREATE INDEX idx_t_user_email ON t_user (email);

COMMENT ON TABLE t_user IS '用户表，存储用户基本信息与认证信息';

-- -------------------------------------------------------------
-- 音色样本表
-- -------------------------------------------------------------
CREATE TABLE t_voice_sample (
    voice_id    VARCHAR(64)  NOT NULL,
    voice_name  VARCHAR(128) NOT NULL,
    user_id     VARCHAR(64)  NOT NULL,
    audio_url   VARCHAR(512),
    is_default  INTEGER      NOT NULL DEFAULT 0,
    create_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_t_voice_sample PRIMARY KEY (voice_id),
    CONSTRAINT fk_t_voice_sample_user FOREIGN KEY (user_id) REFERENCES t_user (user_id)
);

CREATE INDEX idx_t_voice_sample_user_id ON t_voice_sample (user_id);

COMMENT ON TABLE t_voice_sample IS '音色样本表，存储用户上传的参考音频信息';

-- -------------------------------------------------------------
-- 项目表
-- -------------------------------------------------------------
CREATE TABLE t_project (
    project_id  VARCHAR(64)  NOT NULL,
    title       VARCHAR(256) NOT NULL,
    description TEXT,
    style       VARCHAR(128),
    user_id     VARCHAR(64)  NOT NULL,
    create_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_t_project PRIMARY KEY (project_id),
    CONSTRAINT fk_t_project_user FOREIGN KEY (user_id) REFERENCES t_user (user_id)
);

CREATE INDEX idx_t_project_user_id ON t_project (user_id);

COMMENT ON TABLE t_project IS '项目表，存储用户创建的故事项目信息';

-- -------------------------------------------------------------
-- 故事章节表
-- -------------------------------------------------------------
CREATE TABLE t_story (
    story_id       VARCHAR(64)  NOT NULL,
    title          VARCHAR(256) NOT NULL,
    summary        TEXT,
    content        TEXT         NOT NULL,
    chapter_number INTEGER      NOT NULL,
    project_id     VARCHAR(64)  NOT NULL,
    create_time    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_t_story PRIMARY KEY (story_id),
    CONSTRAINT fk_t_story_project FOREIGN KEY (project_id) REFERENCES t_project (project_id)
);

CREATE INDEX idx_t_story_project_id ON t_story (project_id);

COMMENT ON TABLE t_story IS '故事章节表，存储故事章节的标题、内容和摘要';

-- -------------------------------------------------------------
-- 语音表
-- -------------------------------------------------------------
CREATE TABLE t_audio (
    audio_id    VARCHAR(64)  NOT NULL,
    story_id    VARCHAR(64)  NOT NULL,
    title       VARCHAR(256) NOT NULL,
    user_id     VARCHAR(64)  NOT NULL,
    file_url    VARCHAR(512),
    speech_rate VARCHAR(10)  NOT NULL DEFAULT '1.00',
    status      INTEGER      NOT NULL DEFAULT 0,
    create_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_t_audio PRIMARY KEY (audio_id),
    CONSTRAINT fk_t_audio_story FOREIGN KEY (story_id) REFERENCES t_story (story_id),
    CONSTRAINT fk_t_audio_user FOREIGN KEY (user_id) REFERENCES t_user (user_id)
);

CREATE INDEX idx_t_audio_story_id ON t_audio (story_id);
CREATE INDEX idx_t_audio_user_id ON t_audio (user_id);

COMMENT ON TABLE t_audio IS '语音表，存储生成的语音文件信息';

-- -------------------------------------------------------------
-- 语音-音色关联表
-- -------------------------------------------------------------
CREATE TABLE t_audio_voice_rel (
    id          VARCHAR(64) NOT NULL,
    audio_id    VARCHAR(64) NOT NULL,
    voice_id    VARCHAR(64) NOT NULL,
    create_time TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_t_audio_voice_rel PRIMARY KEY (id),
    CONSTRAINT fk_t_audio_voice_rel_audio FOREIGN KEY (audio_id) REFERENCES t_audio (audio_id),
    CONSTRAINT fk_t_audio_voice_rel_voice FOREIGN KEY (voice_id) REFERENCES t_voice_sample (voice_id)
);

CREATE INDEX idx_t_audio_voice_rel_audio_id ON t_audio_voice_rel (audio_id);
CREATE INDEX idx_t_audio_voice_rel_voice_id ON t_audio_voice_rel (voice_id);

COMMENT ON TABLE t_audio_voice_rel IS '语音-音色关联表，记录语音使用的音色';
