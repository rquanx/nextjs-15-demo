import { useKrea } from "@/app/hooks/useKrea";
import { Download } from "../Icon/Download";

export function Display() {
  // TODO: 从 props 中获取这些信息
  const { currentSession } = useKrea();

  const handleDownload = (base64: string) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!currentSession) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        请选择或创建一个会话
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <div className="grid grid-cols-2 gap-6">
        {currentSession.generates.map((generate) => (
          <div key={generate.id} className="space-y-4">
            {/* 原始图片 */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={generate.sourceBase64}
                alt="Source"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDownload(generate.sourceBase64)}
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* 生成的图片列表 */}
            <div className="grid grid-cols-2 gap-4">
              {generate.generateBase64.map((base64, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={base64}
                    alt={`Generated ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDownload(base64)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* 提示词 */}
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {generate.prompt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}