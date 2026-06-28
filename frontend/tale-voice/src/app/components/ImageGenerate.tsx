import { Link, useNavigate, useParams } from "react-router";
import { BookOpen, ArrowLeft, Sparkles, Download, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { AppHeader } from "./AppHeader";

interface Story {
  id: string;
  title: string;
  content: string;
  cover?: string;
}

function findStoryInLocal(storyId: string): Story | null {
  const storedStories = localStorage.getItem("stories");
  if (!storedStories) return null;
  const stories = JSON.parse(storedStories);
  return stories.find((s: Story) => s.id === storyId) || null;
}

export function ImageGenerate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cartoon");
  const [size, setSize] = useState("1024x1024");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      const localStory = findStoryInLocal(id);
      if (localStory) {
        setStory(localStory);
        setPrompt(localStory.content.substring(0, 500));
      }
    }
  }, [id]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("请输入提示词");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 生成模拟图片
      const generatedImages = Array(quantity).fill(0).map(() => {
        return `https://neeko-copilot.bytedance.net/api/text2image?prompt=${encodeURIComponent(prompt)}&size=${size}`;
      });
      
      setImages(generatedImages);
    } catch (err) {
      setError("生成图片失败，请稍后重试");
      console.error("生成图片失败:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToCover = async () => {
    if (!selectedImage || !story) return;

    try {
      // 更新本地故事封面
      const storedStories = localStorage.getItem("stories");
      if (storedStories) {
        const stories = JSON.parse(storedStories);
        const updatedStories = stories.map((s: Story) => 
          s.id === story.id ? { ...s, cover: selectedImage } : s
        );
        localStorage.setItem("stories", JSON.stringify(updatedStories));
        setStory({ ...story, cover: selectedImage });
      }
    } catch (err) {
      setError("应用封面失败");
      console.error("应用封面失败:", err);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
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
          {/* 左侧：参数配置 */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-[#63549f]/30 bg-[#231c40]/45 p-6">
              <h2 className="text-2xl font-bold text-[#faf8ff] mb-6">AI 文生图</h2>
              
              <div className="space-y-6">
                {/* 提示词输入 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    提示词
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full rounded-lg border border-[#63549f]/35 bg-[#312752] px-4 py-3 text-[#faf8ff] min-h-[120px]"
                    placeholder="输入描述性文本，例如：一只可爱的小猫在花园里玩耍..."
                  />
                </div>

                {/* 风格选择 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    风格
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full rounded-lg border border-[#63549f]/35 bg-[#312752] px-4 py-2 text-[#faf8ff]"
                  >
                    <option value="cartoon">卡通风格</option>
                    <option value="realistic">写实风格</option>
                    <option value="anime">动漫风格</option>
                    <option value="fantasy">奇幻风格</option>
                  </select>
                </div>

                {/* 尺寸选择 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    尺寸
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full rounded-lg border border-[#63549f]/35 bg-[#312752] px-4 py-2 text-[#faf8ff]"
                  >
                    <option value="512x512">512x512</option>
                    <option value="1024x1024">1024x1024</option>
                    <option value="1024x1536">1024x1536</option>
                    <option value="1536x1024">1536x1024</option>
                  </select>
                </div>

                {/* 数量选择 */}
                <div>
                  <label className="block text-sm font-medium text-[#e6e0ff] mb-2">
                    生成数量
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full rounded-lg border border-[#63549f]/35 bg-[#312752] px-4 py-2 text-[#faf8ff]"
                  />
                </div>

                {/* 生成按钮 */}
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#63549f] py-3 text-[#faf8ff] transition-colors hover:bg-[#6b75c9] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-5 w-5" />
                  {loading ? "生成中..." : "生成图片"}
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：结果预览 */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#63549f]/30 bg-[#231c40]/45 p-6">
              <h3 className="text-lg font-semibold text-[#f4f0ff] mb-4">生成结果</h3>
              
              {images.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className={`rounded-lg overflow-hidden border-2 ${selectedImage === image ? 'border-purple-500' : 'border-transparent'}`}>
                          <img 
                            src={image} 
                            alt={`Generated ${index + 1}`} 
                            className="w-full h-48 object-cover cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                          />
                        </div>
                        <button
                          onClick={() => handleDownload(image)}
                          className="absolute top-2 right-2 rounded-full bg-black/50 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          title="下载"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {selectedImage && (
                    <div className="flex gap-3">
                      <button
                        onClick={handleApplyToCover}
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#63549f] py-2 text-[#faf8ff] transition-colors hover:bg-[#6b75c9]"
                      >
                        <Save className="h-4 w-4" />
                        应用为封面
                      </button>
                      <button
                        onClick={() => handleDownload(selectedImage)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#312752] py-2 text-[#faf8ff] transition-colors hover:bg-[#3a2d63]"
                      >
                        <Download className="h-4 w-4" />
                        下载图片
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-[#231c40]/75 rounded-lg">
                  <p className="text-[#a7a8b7]">点击生成按钮开始创建图片</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
