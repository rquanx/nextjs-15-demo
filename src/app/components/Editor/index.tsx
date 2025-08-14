'use client'

import { useState, useCallback, useEffect } from "react";
import { useKrea } from "@/app/hooks/useKrea";
import { SessionPanel } from "./SessionPanel";
import { Delete } from "../Icon/Delete";
import { Download } from "../Icon/Download";
import { Display } from "./Display";
import { ModelsPanel } from "./ModelsPanel";
import { ChatPanel } from "./ChatPanel";
import { GeneratePanel } from "./GeneratePanel";

interface ContextMenuState {
  type: 'session' | 'display' | null;
  position: { x: number; y: number };
  sessionId?: string;
}

export default function Editor() {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    type: null,
    position: { x: 0, y: 0 }
  });

  const handleContextMenu = useCallback((type: 'session' | 'display', x: number, y: number, sessionId?: string) => {
    setContextMenu({
      type,
      position: { x, y },
      sessionId
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu({
      type: null,
      position: { x: 0, y: 0 }
    });
  }, []);

  useEffect(() => {
    const handleGlobalClick = () => {
      closeContextMenu();
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [closeContextMenu]);

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
  return (
    <div className="flex h-screen bg-withe relative">
      {/* 左侧会话面板 */}
      {sessions.length > 0 && <div className="absolute left-[3px] top-[50%] translate-y-[-50%] w-[72px] h-[384px] p-[10px] rounded-[10px] select-none
			bg-[#f1f1f1] dark:bg-[#000] z-1">
        <SessionPanel
          sessions={sessions}
          currentSession={currentSession}
          newSession={newSession}
          changeSession={changeSession}
          deleteSession={deleteSession}
          onContextMenu={handleContextMenu}
        />
      </div>}

      {/* 中间主要内容区域 */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-auto">
          <Display
            addSession={addSession}
            currentSession={currentSession}
            onContextMenu={handleContextMenu}
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

      {/* 右键菜单 */}
      {contextMenu.type && (
        <div
          className={`${contextMenu.type === 'display' ? 'bg-[var(--color-primary-150)]/75' : 'bg-white'} fixed thin-border 
          rounded-[10px] p-1.5 z-[9999] w-fit min-w-32
          border-[var(--border)] border-[1px] shadow-[0_12px_14px_-8px_rgba(0,0,0,0.15)]
          `}
          style={{
            left: `${contextMenu.position.x}px`,
            top: `${contextMenu.position.y}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'session' && (
            <button
              className="w-full leading-[16px] text-[12px] flex items-center justify-between gap-4 rounded-[5px] py-[4px] pr-1 pl-2 hover:bg-red-600/15 hover:text-red-600 text-[black]"
              onClick={(e) => {
                e.stopPropagation();
                if (contextMenu.sessionId) {
                  deleteSession(contextMenu.sessionId);
                }
                closeContextMenu();
              }}
            >
              <span>Delete</span>
              <Delete className="bg-transparent ml-[4px] w-[12px] h-[12px]" />
            </button>
          )}
          {contextMenu.type === 'display' && currentSession?.preview?.src && (
            <button
              className="w-full leading-[16px] text-[12px] flex items-center justify-between gap-4 rounded-[5px] py-[4px] pr-1 pl-2 hover:bg-black/10 dark:hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = currentSession.preview.src;
                link.download = `image-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                closeContextMenu();
              }}
            >
              <span>Download</span>
              <Download className="bg-transparent ml-[4px] w-[12px] h-[12px]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}