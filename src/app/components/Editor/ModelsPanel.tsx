import { Model } from "@/app/hooks/useKrea";
import { Selected } from "../Icon/Selected";

interface ModelsPanelProps {
  models: Model[];
  currentModelId: string;
  setCurrentModelId: (modelId: string) => void;
}

export function ModelsPanel({ models, currentModelId, setCurrentModelId }: ModelsPanelProps) {

  return (
    <div className="h-full p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">选择模型</h3>
      <div className="space-y-3">
        {models.map((model) => (
          <div
            key={model.name}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${currentModelId === model.name
                ? "bg-blue-50 border border-blue-200"
                : "hover:bg-gray-50"
              }`}
            onClick={() => setCurrentModelId(model.name)}
          >
            <div className="flex items-start gap-3">
              {/* 模型图标 */}
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={model.icon}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 模型信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-medium text-gray-900">{model.name}</div>
                  {currentModelId === model.name && (
                    <Selected className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-1">{model.desc}</div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {model.tags.map((tag) => (
                    <div
                      key={tag.name}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                    >
                      {typeof tag.icon === "string" ? (
                        <img src={tag.icon} alt={tag.name} className="w-3 h-3" />
                      ) : (
                        tag.icon
                      )}
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}