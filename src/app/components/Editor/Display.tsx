import { Session } from "@/app/hooks/useKrea";

import { useState, useEffect } from "react";
import { Upload } from "../Icon/Upload";
import { SelectAssets } from "../Icon/SelectAssets";

interface DisplayProps {
  currentSession?: Session;
  addSession: (base64: string, prompt: string) => void;
}

const NoneSession = ({ currentSession, addSession }: DisplayProps) => {
  const [isDragging, setIsDragging] = useState(false);

  if (!currentSession) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          addSession(base64, '');
        };
        reader.readAsDataURL(file);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          addSession(base64, '');
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div
        className="h-full flex flex-col items-center justify-center"
      >
        <div
          className={`bg-[var(--color-primary-100)] w-[420px] h-[508px] p-[96px_40px_48px_40px] rounded-[32px] 
            flex flex-col items-center justify-end transition-colors outline-none  ${isDragging ? 'border-[#007aff] border-2' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex gap-2 w-full h-14">
            <label className="cursor-pointer transition-colors 
            text-[var(--color-primary-0)] bg-[var(--color-action)] hover:bg-[var(--color-action-hover)]  transition-color flex h-full w-1/2
            items-center justify-center rounded-[14px] ease-out
		  duration-150 svelte-1h0p8mr">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Upload className="text-white" />
              <span className="pl-[2px]">Upload image</span>
            </label>
            <button className="cursor-pointer rounded-[14px] transition-colors flex items-center justify-center 
            bg-[var(--color-action)]/15 hover:bg-[var(--color-action-hover)]/15 text-[var(--color-action)] h-full w-1/2 svelte-1h0p8mr">
              <SelectAssets />
              <span className="pl-[2px]">Select asset</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const InteractiveSession = ({ currentSession }: Pick<DisplayProps, 'currentSession'>) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset transform when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentSession?.preview?.src]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const zoomFactor = 0.1;
    const newScale = Math.max(0.1, scale + (delta > 0 ? zoomFactor : -zoomFactor));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouse up listener to window to handle cases where mouse is released outside the component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden
      cursor-grab"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      <img
        draggable={false}
        src={currentSession?.preview?.src}
        alt="Generated"
        className="max-w-full max-h-full object-contain select-none"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
        }}
      />
    </div>
  );
}

export function Display({ currentSession, addSession }: DisplayProps) {

  if (!currentSession) {
    return <NoneSession currentSession={currentSession} addSession={addSession} />
  }
  return <InteractiveSession currentSession={currentSession} />
}