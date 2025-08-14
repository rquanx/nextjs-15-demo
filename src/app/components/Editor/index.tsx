'use client'

import { useKrea } from "@/app/hooks/useKrea";
import { SessionPanel } from "./SessionPanel";
import { Display } from "./Display";
import { ModelsPanel } from "./ModelsPanel";
import { ChatPanel } from "./ChatPanel";
import { GeneratePanel } from "./GeneratePanel";

export default function Editor() {
  const { sessions, currentSession } = useKrea();
  return <div>
    <SessionPanel />
    <Display />
    <ChatPanel />
    <GeneratePanel />
    <ModelsPanel />
  </div>
}