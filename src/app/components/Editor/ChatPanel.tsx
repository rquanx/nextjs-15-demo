import { useState } from "react";
import { useKrea } from "@/app/hooks/useKrea";
import { Generate } from "../Icon/Generate";

export function ChatPanel() {
  // TODO: 从 props 中获取这些信息
  const { currentSession, generate } = useKrea();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!currentSession || !prompt.trim() || isGenerating) return;

    try {
      setIsGenerating(true);
      // 获取当前会话中最新的图片
      const latestGenerate = currentSession.generates[currentSession.generates.length - 1];
      const sourceImage = latestGenerate ? latestGenerate.base64 : currentSession.previewImage;
      
      await generate(sourceImage, prompt.trim(), currentSession.generates.length + 1);
      setPrompt("");
    } catch (error) {
      console.error("Failed to generate:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="flex-1"></div>
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="输入提示词..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
        />
        <button
          onClick={handleGenerate}
          disabled={!currentSession || !prompt.trim() || isGenerating}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            !currentSession || !prompt.trim() || isGenerating
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition-colors`}
        >
          <Generate className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`} />
          <span>生成</span>
        </button>
      </div>
    </div>
  );
}