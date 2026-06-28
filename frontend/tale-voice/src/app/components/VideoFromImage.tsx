import { Link, useParams } from "react-router";
import { ArrowLeft, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { AppHeader } from "./AppHeader";

interface Story {
  id: string;
  title: string;
  cover?: string;
  images?: string[];
}

function findStoryInLocal(storyId: string): Story | null {
  const storedStories = localStorage.getItem("stories");
  if (!storedStories) return null;
  const stories = JSON.parse(storedStories);
  return stories.find((s: Story) => s.id === storyId) || null;
}

export function VideoFromImage() {
  const { id } = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [duration, setDuration] = useState(5);
  const [fps, setFps] = useState(30);
  const [intensity, setIntensity] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (id) {
      const localStory = findStoryInLocal(id);
      if (localStory) {
        setStory(localStory);
        if (localStory.cover) {
          setSelectedImage(localStory.cover);
        }
      }
    }
  }, [id]);

  const handleGenerate = async () => {
    if (!selectedImage) {
      setError("请选择一张图片");
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");

    try {
      const token = localStorage.getItem("token") || "";
      const res = await api.video.generate(
        {
          projectId: id || "",
          imageIds: [selectedImage],
          style: "",
          prompt: `时长:${duration}s 帧率:${fps}fps 动作强度:${intensity}%`,
        },
        token,
      );
      setNotice(res.message || "当前功能尚在开发中...");
    } catch (err) {
      setError("生成视频失败，请稍后重试");
      console.error("生成视频失败:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111209] text-[#ddd6ff]">
        故事不存在
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111209] via-[#231c40] to-[#111209] text-white">
      <AppHeader activeTab="create" />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <Link to={`/story/${id}`} className="inline-flex items-center gap-2 text-[#d8ddff] transition-colors hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" />
          返回故事详情
        </Link>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 p-3 text-red-200">
            {error}
          </div>
        )}

        {notice && (
          <div className="mb-6 rounded-lg border border-[#63549f]/40 bg-[#63549f]/20 p-3 text-[#d8ddff]">
            {notice}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 左侧：参数配置 */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-[#63549f]/30 bg-[#231c40]/45 p-6">
              <h2 className="text-2xl font-bold text-[#faf8ff] mb-6">AI 图生视频</h2>
              
              <div className="space-y-6">
                {/* 图片选择 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    选择图片
                  </label>
                  <div className="rounded-lg overflow-hidden border border-[#63549f]/35 bg-[#312752] p-4">
                    {selectedImage ? (
                      <div className="relative">
                        <img 
                          src={selectedImage} 
                          alt="Selected" 
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48 text-[#a7a8b7]">
                        请选择一张图片
                      </div>
                    )}
                  </div>
                </div>

                {/* 视频时长 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    视频时长: {duration}秒
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* 帧率 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    帧率: {fps}fps
                  </label>
                  <input
                    type="range"
                    min="24"
                    max="60"
                    value={fps}
                    onChange={(e) => setFps(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* 动作强度 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    动作强度: {intensity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* 生成按钮 */}
                <button
                  onClick={handleGenerate}
                  disabled={loading || !selectedImage}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#63549f] py-3 text-[#faf8ff] transition-colors hover:bg-[#6b75c9] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Video className="h-5 w-5" />
                  {loading ? "生成中..." : "生成视频"}
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：结果预览 */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#63549f]/30 bg-[#231c40]/45 p-6">
              <h3 className="text-lg font-semibold text-[#f4f0ff] mb-4">生成结果</h3>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-[#63549f] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-[#e6e0ff]">处理中...</p>
                </div>
              ) : notice ? (
                <div className="flex flex-col items-center justify-center h-64 bg-[#231c40]/75 rounded-lg">
                  <Video className="h-10 w-10 text-[#63549f] mb-3" />
                  <p className="text-[#d8ddff] text-center px-6">{notice}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-[#231c40]/75 rounded-lg">
                  <p className="text-[#a7a8b7]">点击生成按钮开始创建视频</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
