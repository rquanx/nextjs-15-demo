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
    changeSessionImage,
    deleteSession } = useKrea();
  // TODO: 将组件需要的属性传递给组件
  return (
    <div className="flex h-screen bg-withe relative">
      {/* 左侧会话面板 */}
      <div className="absolute left-[3px] top-[50%] translate-y-[-50%] w-[72px] h-[384px] p-[10px] rounded-[10px] select-none
			bg-[#f1f1f1] dark:bg-[#000] z-1">
        <SessionPanel
          sessions={sessions}
          currentSession={currentSession}
          newSession={newSession}
          changeSession={changeSession}
          deleteSession={deleteSession}
        />
      </div>

      {/* 中间主要内容区域 */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-auto">
          <Display
            addSession={addSession}
            currentSession={currentSession}
          />
        </div>
        {currentSession && <div className="fixed bottom-[16px] left-[50%] translate-x-[-50%]">
          <ChatPanel
            currentSession={currentSession}
            generate={generate}
          />
        </div>}
      </div>

      {/* 右侧面板 */}
      <div className="fixed right-[16px] top-[50%] translate-y-[-50%]">
        <GeneratePanel
          changeSessionImage={changeSessionImage}
          session={currentSession}
        />
      </div>
      <div className="fixed bottom-[8px] left-[16px]">
        <ModelsPanel
          models={models}
          currentModelId={currentModelId}
          setCurrentModelId={setCurrentModelId}
        />
      </div>
    </div>
  );
}