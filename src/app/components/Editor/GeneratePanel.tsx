import { useRef } from "react";
import { Inspiration } from "../Icon/Inspiration";

interface GeneratePanelProps {
  addSession: (base64: string, prompt: string) => void;
}

export function GeneratePanel({ addSession }: GeneratePanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        addSession(base64, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full p-4">
      {/* 上传区域 */}
      <div
        className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <Inspiration className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <div className="text-sm text-gray-600">点击或拖拽图片到这里</div>
          <div className="text-xs text-gray-400 mt-1">支持 PNG、JPG 格式</div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* 提示词建议 */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">提示词建议</h3>
        <div className="space-y-2">
          {[
            "添加更多细节和纹理",
            "改变图片的风格为水彩画",
            "将背景改为夜景",
            "添加更多光影效果",
            "改变季节为秋天",
          ].map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}