import { useState } from "react";
import { useLocalStorageState } from "ahooks";
import { TagInpainting } from "../components/Icon/TagInpainting";
import { TagOutpainting } from "../components/Icon/TagOutpainting";
import { TagPromptEdition } from "../components/Icon/TagPromptEdition";

interface Generate {
  id: string;
  base64: string;
  sourceBase64: string;
  generateBase64: string[];
  prompt: string;
}

interface Session {
  id: string;
  previewImage: string;
  generates: Generate[]
  createdAt: number;
  desc: string;
}

interface Tag {
  icon: string | React.ReactNode;
  name: string;
}

interface Model {
  icon: string;
  name: string;
  desc: string;
  tags: Tag[];
}

const modelIcon = 'data:image/webp;base64,UklGRtIEAABXRUJQVlA4WAoAAAAQAAAAfwAAfwAAQUxQSGYEAAABoAVJtmnbGte2bdu2bdu2bdu2bdu+99m2ce1+OKfW2nuv9fniRcQE2H+9Fqzvd18rur8Nk475Wg5J6uxnn/xL6f1rtcJ837fqKNyZPhXzeXgq5k8nBL/3pe7CO3wohxy2958vnCip38yW46s+U1UujvWVOM/dUBE/OS5Xv/ORTnJ5tW+klus1/eJt954l8IdZwr99inTBF0qLl43D1M8HIvzGDpsNZsrsfUeF70c3s6vsE8/rJF7NzCzJC6RFHpdafK6FWY+psre9wd63cNeyh9G9bKx4xvDsB6RDHlZcfKDBYkzdPCviz+yi4XFMab1qt/CjmMyusfc9qqF4LXOYjGmiJ8V9wdaZ4w5MhbzohvBn5uJ29mdk75kgnsEN+w5pn+fkFB9krhZjauo1X7Ar5vJ09jyRt2wVfpHQLXsP6Q1PaSzewNz/E2mjh8R/xtYbb9+5I2y9dNUauHZjMu84L/yN8Yni2QzX+sIzBojnY4XFWxuOdl9rPCKH+Fjj37JDxk9IauANn7ErxlcJP4zO+knS87hesFz4VULWVLyi4cwK87wH1BZvZjiJ+FzjH4WlASEXT3yn8WvsHeNLFX62UDvDfojK+otnYhUFvwix3uIFDWcR72k4+n2i5SGVUXyc8a/ZMeNHxKuG0jvsHeMrhB9GZq3l8EGc0FkknoZVFa9sOJ0cnw2ZquLtDcd+zJYYf9+Z+oRI5Edsj/HLwl8anyo304fGXuE/o7De4vlYfrn6Vkh0FC9vOKN4H8ORf3ZH80Igo/hk4x+zM8b3y+2qwfcBe8v4POHXcVhruf4oerBNFE/HKorXNZzolXvaG2RlxLsZjvGILTd+RXhfGaZuQRXjPjtq/JjwF8YniCezsUwZg2mf8P1orJN4HpZXvKOZXWdvB1FL8YqG04uPMf4V221mlpRpStAkec3mG/+QnTe+Rvj3SP+y5kxFguW28GfGZwm/jMuqi5e1sHexX6MGxwTxTKyQeDPD8Z6yuRZutN+Q9gRFYfHuhqP+zHYYPy/8rsHCTC2C4Qd22vhh4V+N9xFPR2wiU7LA7RF+GJt1FM/Lsot3M/4muxWw5uJ1DCcRH2f8K3bBHKZjGhegJK/ZEuM32T3ji4Tvx3dirZkKBeaa8CfGJ4inYJXFK5vzXeyHgAwVz8qKijczHPkBW24uRvwDaWMACoiPMP4d22N8r/C35molpmbufcOuGd8s/Htk1kM8lzs2h71K6NZm4SexWSvx4obTifcxt99CuulSdfEGhhOJLzD+JrturqdnGuBKjMdsq/Fr7C3jk4RfJnbP+jBld+OS8AfGhwk/jcfKiTezQB5k37swVPjPVKy48KtmhhP8wZZZQCN9jrTBUSY5OP3W2/DuSwdn33gb3vlJPHVgrA9TTScfOgjZPAHq6+BhHLZG3lggQIMd6AqqJT/SYBDzgT8pc3jH5FMfh9NVfqVFYWSWf6n6vz7wswfRzJbIQwsFaLgbOm3N5aVFAjTGFY20//0IVlA4IEYAAABwBgCdASqAAIAAPpFIoUylpCMiIIgAsBIJaW7hdJAAT22IvEFRz2xF4gqOe2IvEFRz2xF4gqOe2IvEE2AA/v9F+AAAAAAA'

const generateImage = (sourceImage: string, prompt: string, num: number) => {
  // TODO: 使用 canvas  先绘制 sourceImage ，然后将文字 num + prompt 绘制在 canvas 上，然后导出 base64,png
}

export const useKrea = () => {
  // TODO: ?id=xxx，从 url 的id query 中获取到当前的 session id
  const [sessions, setSessions] = useLocalStorageState<Session[]>("krea-sessions", {
    defaultValue: [],
  });

  const [currentSession, setCurrentSession] = useLocalStorageState<Session | null>("krea-current-session", {
    defaultValue: ,// TODO: 根据 session id 获取当前选中 session,否则去第一个 session
  });

  const [models, setModels] = useLocalStorageState<Model[]>("krea-models", {
    defaultValue: [
      { icon: modelIcon, name: 'Flux', desc: 'More tools, more control. Define exact regions to change, or expand your image', 
        tags: [{ icon: <TagInpainting/> ,name: 'Inpainting',icon:<TagOutpainting/ >, name: 'Outpainting' }]},
    { icon: modelIcon, name: 'Flux Kontext Dev', desc: 'New frontier model designed for image editing', tags: [{ icon: <TagPromptEdition/>,name: 'Prompt Edition' }] }，
      { icon: modelIcon, name: 'Flux Kontext Pro', desc: 'Fast iterative editing with character consistency and local edits across scenes', tags: [{ icon: <TagPromptEdition/>,name: 'Prompt Edition' }] },
      { icon: modelIcon, name: 'Flux Kontext Max', desc: 'Maximum performance with improved prompt adherence and typography generation', tags: [{ icon: <TagPromptEdition/>,name: 'Prompt Edition' }] },

    ]
  });
    

const [currentModelId, setCurrentModelId] = useLocalStorageState<string | null>("krea-current-model-id", {
  defaultValue:'Flux Kontext Dev',
});


const newSession = () => {
  // TODO: 清空当前选中 Session，进入未选中状态,删除 url id参数
}

const addSession = (base64: string) => {
  // TODO: 添加 Session，并且选中此 session
}

const deleteSession = (id: string) => {
  // TODO: 
  // 1.confirm 提示是否删除
  // 2.删除后如果删除的是当前选中项，则回退到空 session 状态
}

const changeSession = (id: string) => {
  // TODO: 根据 id 切换 session，url id参数更新为当前session id
}

const generate = (activeImage: string, prompt: string, num: number) => {
  // TODO: 基于当前 activeImage 的图片,进行generate,调用 generateImage 函数生成图片
}

return { sessions, currentSession, newSession, addSession, models, currentModelId, setCurrentModelId, generate, changeSession, deleteSession };
} 'Flux Ko