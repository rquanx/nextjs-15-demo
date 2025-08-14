import { Session } from "@/app/hooks/useKrea";
import { Add } from "../Icon/Add";
import { Delete } from "../Icon/Delete";
import { useState } from "react";
import dayjs from "dayjs";

interface SessionInfoProps {
  session: Session;
  onDelete: (id: string) => void;
  selected: boolean;
}

function SessionInfo({ session, onDelete, selected }: SessionInfoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  return (
    <div
      className={`bg-[var(--color-primary-250)] dark:bg-[var(--color-primary-850)] relative group flex items-center justify-center w-[52px] h-[52px] rounded-[10px] ${selected ? 'border-[#007aff] border-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex items-center justify-center w-full h-full">
        {session.preview?.src && (
          <img
            src={session.preview.src}
            alt="Preview"
            className="w-full h-full object-contain rounded-[10px]"
          />
        )}
      </div>
      {isHovered && <div
        onMouseEnter={() => setIsDeleteHovered(true)}
        onMouseLeave={() => setIsDeleteHovered(false)}
        className="group-hover:dark:thin-border absolute -top-1.5 -bottom-1.5 -left-1.5 flex origin-left items-center rounded-[10px] group-hover:scale-x-100 group-hover:scale-y-100 group-hover:opacity-100
				group-hover:bg-[var(--color-primary-150)] group-hover:dark:bg-[var(--color-primary-850)]
				scale-x-[0.95] max-w-56 scale-y-[0.98] pr-2 left-12.5 pl-1 opacity-0
				transition-[scale] svelte-ssa8x0" >
        <div className="cursor-pointer pr-[40px] relative w-fit text-[var(--color-primary-1000)] dark:text-[var(--color-primary-0)] ml-2 flex flex-row transition-opacity duration-200 ease-out svelte-ssa8x0">
          <div className="w-fit flex flex-col">
            <p className="w-fit font-book truncate text-sm leading-none svelte-ssa8x0 whitespace-nowrap overflow-hidden text-ellipsis">temp description</p>
            <p className="text-[var(--color-primary-400)] text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">{dayjs(session.createdAt).isSame(dayjs(), 'day') ? 'Today' : dayjs(session.createdAt).format('MMM D, YYYY')}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(session.id);
            }}
            className="absolute rounded-[8px] right-[-4px] flex items-center justify-center bottom-[-12px] w-[20px] h-[20px] hover:text-white cursor-pointer hover:bg-[red]"
          >
            {isDeleteHovered && <Delete className="w-[12px] h-[12px]" />}
          </button>
        </div>

      </div>}
    </div>
  );
}

interface SessionPanelProps {
  sessions: Session[];
  currentSession?: Session;
  newSession: () => void;
  deleteSession: (id: string) => void;
  changeSession: (id: string) => void;
}

export const Divider = () => {
  return <div className="flex w-full items-center justify-center svelte-ssa8x0 mb-2">
    <p className="text-[var(--color-primary-400)] dark:text-[var(--color-primary-500)] text-xxs text-center leading-none font-medium tracking-wider uppercase svelte-ssa8x0 hidden"></p>
    <hr className="bg-[var(--color-primary-300)] dark:bg-[var(--color-primary-800)] h-[3px] w-5 rounded-full border-0 svelte-ssa8x0" />
  </div>
}

export function SessionPanel({ sessions, currentSession, newSession, deleteSession, changeSession }: SessionPanelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-full flex flex-col no-scrollbar">
      {/* 头部 */}
      <div
        onClick={newSession}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group mb-3 flex items-center justify-center w-[52px] h-[52px] relative z-10 block aspect-square shrink-0 rounded-[4px] transition-transform duration-200 ease-out hover:scale-105
				 dark:bg-[var(--color-primary-900)] bg-white shadow-[0_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer"
      >
        <Add className="w-[16px] h-[16px]" />
        {isHovered && <div className="group-hover:dark:thin-border absolute -top-1.5 -bottom-1.5 -left-1.5 flex origin-left items-center rounded-[10px] group-hover:scale-x-100 group-hover:scale-y-100 group-hover:opacity-100
				group-hover:bg-[var(--color-primary-150)] group-hover:dark:bg-[var(--color-primary-850)]
				w-fit max-w-56 scale-x-[0.95] scale-y-[0.98] pr-4 left-13 pd-1 opacity-0
				transition-[scale] svelte-ssa8x0" >
          <div className="text-[var(--color-primary-1000)] dark:text-[var(--color-primary-0)] ml-2 flex w-full flex-col transition-opacity duration-200 ease-out svelte-ssa8x0">
            <p className="font-book truncate text-sm leading-none svelte-ssa8x0">New Session</p>
          </div>
        </div>}
      </div>
      <Divider />
      {/* 会话列表 */}
      <div className="flex flex-col flex-1 gap-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`pointer-events-auto shrink-0 rounded-md bg-cover bg-center transition-[transform,scale,box-shadow] duration-200 ease-out hover:scale-105`}
            onClick={() => changeSession(session.id)}
          >
            <SessionInfo
              selected={currentSession?.id === session.id}
              session={session}
              onDelete={deleteSession}
            />
          </div>
        ))}
      </div>
    </div>
  );
}