import { Model } from "@/app/hooks/useKrea";
import { Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem, useDisclosure } from "@heroui/react";
import { useRef, useState } from "react";
import { ArrowDown } from "../Icon/ArrowDown";
import { Selected } from "../Icon/Selected";


export const ModelItem = ({ model, selectedId }: { model: Model, selectedId: string }) => {
  const isSelected = model.name === selectedId
  return <div className="flex flex-row items-center justify-between
  rounded-[10px] px-[16px] py-[10px] h-[108px] hover:bg-[var(--color-primary-100)] dark:hover:bg-[var(--color-primary-800)]">
    <div className="flex flex-col">
      <div className="flex items-center gap-2 text-lg capitalize dark:text-white/100 font-[600]">
        <img className="opacity-50 mix-blend-difference saturate-0" width={16} height={16} src={model.icon} alt={model.name} />
        <span>{model.name}</span>
      </div>
      <p className="text-[var(--color-primary-500)] dark:text-[var(--color-primary-400)] pr-1 text-xs font-medium">{model.desc}</p>
      <div className="flex gap-2 mt-2 ">
        {model.tags.map((tag) => <div key={tag.name}
          className="rounded-[6px] bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-800)] text-[10px] 
        flex items-center
        text-[#000]
        text-xxs inline-flex w-fit shrink-0 items-center gap-0.5 bg-black/5 px-1.5 py-0.5 font-medium tracking-tight dark:bg-white/5
        ">
          <div className="w-[10px] h-[10px] text-[var(--color-primary-400)]">{tag.icon}
          </div>
          {tag.name}
        </div>)}
      </div>
    </div>
    <p className={`flex h-[18px] w-[18px] shrink-0 rounded-full  items-center justify-center 
      ${isSelected ? 'bg-black dark:bg-blue-600' : ''}`}>
      {isSelected && <Selected className="text-white w-[12px]" />}
    </p>
  </div>
}

interface ModelsPanelProps {
  models: Model[];
  currentModelId: string;
  setCurrentModelId: (modelId: string) => void;
}

export function ModelsPanel({ models, currentModelId, setCurrentModelId }: ModelsPanelProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedModel, setSelectedModel] = useState(currentModelId);
  const isEnterSelectRef = useRef(false);
  const isEnterItemRef = useRef(false);
  return <Popover
    isOpen={isOpen}
    onOpenChange={(open) => (open ? onOpen() : onClose())}
    placement="bottom"
    triggerScaleOnOpen={false}
  >
    <PopoverTrigger>
      <Button
        variant="bordered"
        className="relative group hover:bg-[var(--color-primary-100)] 
  dark:hover:bg-[var(--color-primary-950)] bg-[var(--color-primary-150)]/75 dark:bg-[var(--color-primary-800)]/75 -translate-x-1/2 items-center 
  gap-1 rounded-2xl px-4 py-3 text-left font-semibold text-black 
  backdrop-blur-2xl sm:top-[unset] sm:bottom-2 sm:left-4 sm:translate-x-0 dark:text-white h-[48px]" // 让按钮宽度和 Select 一致
        onMouseEnter={() => {
          isEnterSelectRef.current = true
          onOpen()
        }} // 鼠标进入时打开
        onMouseLeave={() => {
          isEnterSelectRef.current = false
          setTimeout(() => {
            if (!isEnterItemRef.current && !isEnterSelectRef.current) {
              onClose()
            }
          }, 100);
        }}
      >
        <span className="hidden text-black/40 2xl:block dark:text-white/60">Model</span>  {selectedModel}
        <ArrowDown />
      </Button>
    </PopoverTrigger>
    <PopoverContent
      onMouseEnter={() => isEnterItemRef.current = true}
      onMouseLeave={() => {
        isEnterItemRef.current = false
        setTimeout(() => {
          if (!isEnterItemRef.current && !isEnterSelectRef.current) {
            onClose()
          }
        }, 100);
      }} // 鼠标离开 Popover 时才关闭
      className="p-0" // 移除默认 padding
    >
      <Listbox aria-label="选择项" className="max-h-[800px] overflow-y-auto rounded-[10px] bg-white w-[320px]">
        {models.map((model) => <ListboxItem onPress={() => { setSelectedModel(model.name); setCurrentModelId(model.name) }} key={model.name}><ModelItem model={model} selectedId={selectedModel} /></ListboxItem>)}
      </Listbox>
    </PopoverContent>
  </Popover>
}