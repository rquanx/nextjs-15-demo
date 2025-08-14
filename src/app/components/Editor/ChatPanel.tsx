import { useState } from "react";
import { Session } from "@/app/hooks/useKrea";
import { Generate } from "../Icon/Generate";
import { Inspiration } from "../Icon/Inspiration";

interface ChatPanelProps {
  currentSession?: Session;
  generate: (activeImage: string, prompt: string, num: number) => Promise<void>;
}

export function ChatPanel({ currentSession, generate }: ChatPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [num, setNum] = useState(1);

  const handleGenerate = async () => {
    if (!currentSession || !prompt.trim() || isGenerating) return;

    try {
      setIsGenerating(true);

      await generate(currentSession.preview?.src, prompt.trim(), num);
      setPrompt("");
    } catch (error) {
      console.error("Failed to generate:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[var(--color-primary-150)]/75 rounded-[20px] p-[8px] flex flex-row w-[90vw] max-w-[750px] h-[104px] gap-2">
      <div className="flex gap-2 flex-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write what you want to change in your image and click generate, or pick a preset and choose from many options!"
          className="h-full w-full resize-none rounded-[10px] px-[12px] py-[8px]
        border-0 bg-black/5 text-base! transition-[background-color] 
        outline-none
        duration-400 ease-out placeholder:text-black/40 hover:bg-black/10 focus:ring-0 
        sm:text-lg dark:bg-white/5 dark:placeholder:text-white/30 dark:hover:bg-white/5 svelte-1h0p8mr"
        />
        <button className="rounded-[10px] bg-black/5 flex items-center justify-center h-full w-[102px] hover:bg-black/10 cursor-pointer">
          <Inspiration className="w-[14px] h-[14px]" />
        </button>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="h-6 flex">
          <button
            onClick={() => setNum(1)}
            className={`cursor-pointer h-full flex-1  ${num === 1 ? 'bg-black' : 'bg-white'} ${num === 1 ? 'text-white' : 'text-black'} rounded-l-[10px]`}>1</button>
          <button
            onClick={() => setNum(2)}
            className={`cursor-pointer h-full flex-1  ${num === 2 ? 'bg-black' : 'bg-white'} ${num === 2 ? 'text-white' : 'text-black'} rounded-r-[10px]`}>2</button>
        </div>
        <button onClick={handleGenerate} disabled={!prompt} className=" disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center ba-white w-34 gap-1.5 h-[56px] bg-[white] rounded-[10px] cursor-pointer">
          <span className="w-[20px] h-[20px]"><Generate /></span> <span>Generate</span>
        </button>
      </div>
    </div>
  );
}