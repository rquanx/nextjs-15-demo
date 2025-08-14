import { Fragment } from 'react';
import { Generate, ImageItem, Session } from '../../hooks/useKrea';
import { Divider } from './SessionPanel';

interface GeneratePanelProps {
  changeSessionImage: (previewItem: ImageItem) => void;
  session?: Session;
}

const GenerateItem = ({ generate, changeSessionImage, session }: { generate: Generate, session?: Session, changeSessionImage: (previewItem: ImageItem) => void }) => {
  const isSelected = session?.preview?.id === generate.id;
  return <div className='flex gap-1 items-start'>
    <img onClick={() => {
      changeSessionImage({ id: generate.id, src: generate.sourceBase64 })
    }} src={generate.sourceBase64} alt={generate.prompt}
      className={`w-[42px] h-[42px] object-contain rounded-[10px] cursor-pointer border-2
      ${isSelected ? 'border-[#007aff]' : 'border-transparent hover:border-[var(--color-gray-300)]'}`} />
    {generate.generateBase64.map(i => {
      const isSelected = session?.preview?.id === i.id;
      return <img key={i.id} onClick={() => {
        changeSessionImage(i)
      }} src={i.src} alt={generate.prompt} className={`w-[60px] h-[60px] object-contain rounded-[10px] cursor-pointer border-2
      ${isSelected ? ' border-[#007aff]' : 'border-transparent hover:border-[var(--color-gray-300)]'}`} />
    })}
  </div>
}

export function GeneratePanel({ changeSessionImage, session }: GeneratePanelProps) {
  if (!session?.generates?.length) return null;
  return <div className="no-scrollbar bg-[var(--color-primary-150)]/90 hover:bg-[var(--color-primary-150)] 
  dark:bg-[var(--color-primary-850)]/75 dark:hover:bg-[var(--color-primary-850)]/90 
  pointer-events-auto flex max-h-[65vh] w-fit origin-center flex-col-reverse 
  gap-1.5 overflow-scroll rounded-[20px] p-2 text-black backdrop-blur-2xl 
  transition-[background,height] duration-150 ease-out disabled:hover:bg-red-600! dark:text-white">{
      session.generates.map((generate, index) => (
        <Fragment key={generate.id}>
          <GenerateItem generate={generate} key={generate.id} changeSessionImage={changeSessionImage} session={session} />
          {index !== session.generates.length - 1 && <Divider />}
        </Fragment>
      ))
    }</div>
}