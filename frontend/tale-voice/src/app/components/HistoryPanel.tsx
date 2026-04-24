import { useState, useEffect } from "react";
import { Clock, Image, Video, Trash2, RefreshCw, Check } from "lucide-react";
import { Link } from "react-router";

interface GeneratedItem {
  id: string;
  type: "image" | "video";
  url: string;
  timestamp: number;
  storyId: string;
  prompt?: string;
}

export function HistoryPanel() {
  const [history, setHistory] = useState<GeneratedItem[]>([]);

  useEffect(() => {
    // 从本地存储加载历史记录
    const storedHistory = localStorage.getItem("generationHistory");
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error("Failed to parse history:", error);
        setHistory([]);
      }
    }
  }, []);

  const handleDelete = (itemId: string) => {
    const updatedHistory = history.filter(item => item.id !== itemId);
    setHistory(updatedHistory);
    localStorage.setItem("generationHistory", JSON.stringify(updatedHistory));
  };

  const handleReuse = (item: GeneratedItem) => {
    // 这里可以实现将生成的内容应用到当前故事的逻辑
    console.log("Reusing item:", item);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-[#faf8ff] mb-6 flex items-center gap-2">
        <Clock className="h-6 w-6" />
        生成历史
      </h2>

      {history.length === 0 ? (
        <div className="text-center py-16 bg-[#231c40]/45 rounded-xl border border-[#63549f]/30">
          <p className="text-[#a7a8b7]">暂无生成历史</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item) => (
            <div key={item.id} className="rounded-xl border border-[#63549f]/30 bg-[#231c40]/45 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {item.type === "image" ? (
                    <Image className="h-5 w-5 text-[#6b75c9]" />
                  ) : (
                    <Video className="h-5 w-5 text-[#6b75c9]" />
                  )}
                  <span className="text-sm font-medium text-[#f4f0ff]">
                    {item.type === "image" ? "生成的图片" : "生成的视频"}
                  </span>
                </div>
                <div className="text-xs text-[#a7a8b7]">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="mb-4">
                {item.type === "image" ? (
                  <div className="rounded-lg overflow-hidden h-40">
                    <img 
                      src={item.url} 
                      alt="Generated image" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-lg overflow-hidden h-40 bg-[#111209]">
                    <video 
                      src={item.url} 
                      className="w-full h-full object-cover"
                      controls
                    />
                  </div>
                )}
              </div>

              {item.prompt && (
                <div className="mb-4">
                  <p className="text-xs text-[#a7a8b7] mb-1">提示词:</p>
                  <p className="text-sm text-[#e6e0ff] truncate">{item.prompt}</p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleReuse(item)}
                  className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-[#312752] py-2 text-sm text-[#eee9ff] transition-colors hover:bg-[#3a2d63]"
                >
                  <Check className="h-4 w-4" />
                  应用
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg bg-red-500/20 p-2 text-red-400 transition-colors hover:bg-red-500/30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
