"""
视频合成模块API路由

视频合成相关功能尚在开发中，所有接口暂时返回统一的开发中提示信息。
"""

from fastapi import APIRouter

from app.schemas.common import ResponseModel

router = APIRouter(prefix="/api/video", tags=["视频合成模块"])

FEATURE_IN_DEVELOPMENT_MESSAGE = "当前功能尚在开发中..."


def _in_development_response() -> ResponseModel:
    return ResponseModel(code=200, message=FEATURE_IN_DEVELOPMENT_MESSAGE, data=None)


@router.post("", response_model=ResponseModel)
async def create_video():
    """生成视频"""
    return _in_development_response()


@router.get("", response_model=ResponseModel)
async def get_video_list():
    """获取视频列表"""
    return _in_development_response()


@router.put("", response_model=ResponseModel)
async def update_video_title():
    """修改视频标题"""
    return _in_development_response()


@router.get("/export", response_model=ResponseModel)
async def export_videos():
    """视频批量导出"""
    return _in_development_response()


@router.get("/{videoId}", response_model=ResponseModel)
async def get_video(videoId: str):
    """获取视频"""
    return _in_development_response()


@router.delete("/{videoId}", response_model=ResponseModel)
async def delete_video(videoId: str):
    """删除视频"""
    return _in_development_response()
