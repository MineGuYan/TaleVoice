import { Link, useNavigate, useParams } from "react-router";
import { BookOpen, ArrowLeft, Video, Download, Save, X, Upload, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { AppHeader } from "./AppHeader";

interface Story {
  id: string;
  title: string;
  videos?: string[];
}

interface VideoSegment {
  id: string;
  url: string;
  duration: number;
}

function findStoryInLocal(storyId: string): Story | null {
  const storedStories = localStorage.getItem("stories");
  if (!storedStories) return null;
  const stories = JSON.parse(storedStories);
  return stories.find((s: Story) => s.id === storyId) || null;
}

export function VideoMerge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [videoSegments, setVideoSegments] = useState<VideoSegment[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mergedVideoUrl, setMergedVideoUrl] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (id) {
      const localStory = findStoryInLocal(id);
      if (localStory) {
        setStory(localStory);
        // 模拟视频片段
        if (!localStory.videos) {
          setVideoSegments([
            {
              id: "1",
              url: "https://neeko-copilot.bytedance.net/api/sample-video-1",
              duration: 5
            },
            {
              id: "2",
              url: "https://neeko-copilot.bytedance.net/api/sample-video-2",
              duration: 5
            }
          ]);
        }
      }
    }
  }, [id]);

  const handleAddVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 模拟添加视频
      const newSegment: VideoSegment = {
        id: Date.now().toString(),
        url: URL.createObjectURL(files[0]),
        duration: 5
      };
      setVideoSegments([...videoSegments, newSegment]);
    }
  };

  const handleRemoveVideo = (segmentId: string) => {
    setVideoSegments(videoSegments.filter(segment => segment.id !== segmentId));
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAudioFile(files[0]);
    }
  };

  const handleMerge = async () => {
    if (videoSegments.length < 2) {
      setError("至少需要两个视频片段");
      return;
    }

    setLoading(true);
    setError("");
    setProgress(0);

    try {
      // 模拟合成过程
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 生成模拟合成视频
      const mergedVideo = `https://neeko-copilot.bytedance.net/api/merge-videos?segments=${videoSegments.length}&hasAudio=${!!audioFile}`;
      setMergedVideoUrl(mergedVideo);
    } catch (err) {
      setError("合成视频失败，请稍后重试");
      console.error("合成视频失败:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!mergedVideoUrl) return;
    const link = document.createElement("a");
    link.href = mergedVideoUrl;
    link.download = `merged-video-${Date.now()}.mp4`;
    link.click();
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 左侧：视频片段管理 */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-[#63549f]/30 bg-[#231c40]/45 p-6">
              <h2 className="text-2xl font-bold text-[#faf8ff] mb-6">视频合成</h2>
              
              <div className="space-y-6">
                {/* 视频片段列表 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-[#e6e0ff]">
                      视频片段 ({videoSegments.length})
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleAddVideo}
                      className="hidden"
                      id="video-upload"
                    />
                    <label 
                      htmlFor="video-upload"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#312752] px-3 py-1 text-sm text-[#faf8ff] transition-colors hover:bg-[#3a2d63] cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      添加视频
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    {videoSegments.map((segment, index) => (
                      <div key={segment.id} className="flex items-center gap-3 rounded-lg border border-[#63549f]/35 bg-[#312752] p-3">
                        <div className="w-16 h-16 bg-[#231c40] rounded overflow-hidden">
                          <video src={segment.url} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#faf8ff]">片段 {index + 1}</p>
                          <p className="text-xs text-[#a7a8b7]">{segment.duration}秒</p>
                        </div>
                        <button
                          onClick={() => handleRemoveVideo(segment.id)}
                          className="rounded-full bg-red-500/20 p-2 text-red-400 transition-colors hover:bg-red-500/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {videoSegments.length === 0 && (
                      <div className="flex items-center justify-center h-24 bg-[#231c40]/75 rounded-lg">
                        <p className="text-[#a7a8b7]">添加视频片段</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 音频选择 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    音频文件
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label 
                    htmlFor="audio-upload"
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#63549f]/35 bg-[#312752] p-4 cursor-pointer"
                  >
                    <Upload className="h-5 w-5 text-[#a7a8b7]" />
                    <span className="text-[#a7a8b7]">
                      {audioFile ? audioFile.name : "点击上传音频文件"}
                    </span>
                  </label>
                </div>

                {/* 合成按钮 */}
                <button
                  onClick={handleMerge}
                  disabled={loading || videoSegments.length < 2}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#63549f] py-3 text-[#faf8ff] transition-colors hover:bg-[#6b75c9] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Video className="h-5 w-5" />
                  {loading ? "合成中..." : "合成视频"}
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：结果预览 */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#63549f]/30 bg-[#231c40]/45 p-6">
              <h3 className="text-lg font-semibold text-[#f4f0ff] mb-4">合成结果</h3>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-[#63549f] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <div className="w-full bg-[#312752] rounded-full h-2 mb-2">
                    <div 
                      className="bg-[#63549f] h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-[#e6e0ff]">合成进度: {progress}%</p>
                </div>
              ) : mergedVideoUrl ? (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden">
                    <video 
                      src={mergedVideoUrl} 
                      controls 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#63549f] py-2 text-[#faf8ff] transition-colors hover:bg-[#6b75c9]"
                  >
                    <Download className="h-4 w-4" />
                    下载最终视频
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-[#231c40]/75 rounded-lg">
                  <p className="text-[#a7a8b7]">点击合成按钮开始处理视频</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
