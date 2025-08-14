'use client'

import { useKrea } from "@/app/hooks/useKrea";
import { SessionPanel } from "./SessionPanel";
import { Display } from "./Display";
import { ModelsPanel } from "./ModelsPanel";
import { ChatPanel } from "./ChatPanel";
import { GeneratePanel } from "./GeneratePanel";

export default function Editor() {
  const { sessions,
    currentSession,
    newSession,
    addSession,
    models,
    currentModelId,
    setCurrentModelId,
    generate,
    changeSession,
    deleteSession } = useKrea();
    // TODO: 将组件需要的属性传递给组件
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 左侧会话面板 */}
      <div className="w-64 bg-white border-r border-gray-200">
        <SessionPanel 
          sessions={sessions}
          currentSession={currentSession}
          newSession={newSession}
          changeSession={changeSession}
          deleteSession={deleteSession}
        />
      </div>

      {/* 中间主要内容区域 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <Display 
            currentSession={currentSession}
          />
        </div>
        <div className="h-64 border-t border-gray-200 bg-white">
          <ChatPanel 
            currentSession={currentSession}
            generate={generate}
          />
        </div>
      </div>

      {/* 右侧面板 */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="flex-1 overflow-auto">
          <GeneratePanel 
            addSession={addSession}
          />
        </div>
        <div className="h-64 border-t border-gray-200">
          <ModelsPanel 
            models={models}
            currentModelId={currentModelId}
            setCurrentModelId={setCurrentModelId}
          />
        </div>
      </div>
    </div>
  );
}