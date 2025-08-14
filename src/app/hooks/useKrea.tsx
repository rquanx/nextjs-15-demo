import { useLocalStorageState } from "ahooks";
import { useSearchParams } from "next/navigation";
import { nanoid } from "nanoid";
import { TagInpainting } from "../components/Icon/TagInpainting";
import { TagOutpainting } from "../components/Icon/TagOutpainting";
import { TagPromptEdition } from "../components/Icon/TagPromptEdition";

export interface Generate {
  id: string;
  sourceBase64: string;
  generateBase64: string[];
  prompt: string;
}

export interface Session {
  id: string;
  previewImage: string;
  generates: Generate[]
  createdAt: number;
  desc: string;
}

export interface Tag {
  icon: string | React.ReactNode;
  name: string;
}

export interface Model {
  icon: string;
  name: string;
  desc: string;
  tags: Tag[];
}

const modelIcon = 'data:image/webp;base64,UklGRtIEAABXRUJQVlA4WAoAAAAQAAAAfwAAfwAAQUxQSGYEAAABoAVJtmnbGte2bdu2bdu2bdu2bdu+99m2ce1+OKfW2nuv9fniRcQE2H+9Fqzvd18rur8Nk475Wg5J6uxnn/xL6f1rtcJ837fqKNyZPhXzeXgq5k8nBL/3pe7CO3wohxy2958vnCip38yW46s+U1UujvWVOM/dUBE/OS5Xv/ORTnJ5tW+klus1/eJt954l8IdZwr99inTBF0qLl43D1M8HIvzGDpsNZsrsfUeF70c3s6vsE8/rJF7NzCzJC6RFHpdafK6FWY+psre9wd63cNeyh9G9bKx4xvDsB6RDHlZcfKDBYkzdPCviz+yi4XFMab1qt/CjmMyusfc9qqF4LXOYjGmiJ8V9wdaZ4w5MhbzohvBn5uJ29mdk75kgnsEN+w5pn+fkFB9krhZjauo1X7Ar5vJ09jyRt2wVfpHQLXsP6Q1PaSzewNz/E2mjh8R/xtYbb9+5I2y9dNUauHZjMu84L/yN8Yni2QzX+sIzBojnY4XFWxuOdl9rPCKH+Fjj37JDxk9IauANn7ErxlcJP4zO+knS87hesFz4VULWVLyi4cwK87wH1BZvZjiJ+FzjH4WlASEXT3yn8WvsHeNLFX62UDvDfojK+otnYhUFvwix3uIFDWcR72k4+n2i5SGVUXyc8a/ZMeNHxKuG0jvsHeMrhB9GZq3l8EGc0FkknoZVFa9sOJ0cnw2ZquLtDcd+zJYYf9+Z+oRI5Edsj/HLwl8anyo304fGXuE/o7De4vlYfrn6Vkh0FC9vOKN4H8ORf3ZH80Igo/hk4x+zM8b3y+2qwfcBe8v4POHXcVhruf4oerBNFE/HKorXNZzolXvaG2RlxLsZjvGILTd+RXhfGaZuQRXjPjtq/JjwF8YniCezsUwZg2mf8P1orJN4HpZXvKOZXWdvB1FL8YqG04uPMf4V221mlpRpStAkec3mG/+QnTe+Rvj3SP+y5kxFguW28GfGZwm/jMuqi5e1sHexX6MGxwTxTKyQeDPD8Z6yuRZutN+Q9gRFYfHuhqP+zHYYPy/8rsHCTC2C4Qd22vhh4V+N9xFPR2wiU7LA7RF+GJt1FM/Lsot3M/4muxWw5uJ1DCcRH2f8K3bBHKZjGhegJK/ZEuM32T3ji4Tvx3dirZkKBeaa8CfGJ4inYJXFK5vzXeyHgAwVz8qKijczHPkBW24uRvwDaWMACoiPMP4d22N8r/C35molpmbufcOuGd8s/Htk1kM8lzs2h71K6NZm4SexWSvx4obTifcxt99CuulSdfEGhhOJLzD+JrturqdnGuBKjMdsq/Fr7C3jk4RfJnbP+jBld+OS8AfGhwk/jcfKiTezQB5k37swVPjPVKy48KtmhhP8wZZZQCN9jrTBUSY5OP3W2/DuSwdn33gb3vlJPHVgrA9TTScfOgjZPAHq6+BhHLZG3lggQIMd6AqqJT/SYBDzgT8pc3jH5FMfh9NVfqVFYWSWf6n6vz7wswfRzJbIQwsFaLgbOm3N5aVFAjTGFY20//0IVlA4IEYAAABwBgCdASqAAIAAPpFIoUylpCMiIIgAsBIJaW7hdJAAT22IvEFRz2xF4gqOe2IvEFRz2xF4gqOe2IvEE2AA/v9F+AAAAAAA'

const generateImage = (sourceImage: string, prompt: string, num: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // 设置画布大小与图片相同
      canvas.width = img.width;
      canvas.height = img.height;

      // 绘制图片
      ctx.drawImage(img, 0, 0);

      // 设置文字样式
      ctx.font = "24px Arial";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;

      // TODO：文字绘制到图片中间，字体大小比较明显
      // 绘制文字
      const text = `${num}. ${prompt}`;
      const padding = 20;
      ctx.strokeText(text, padding, canvas.height - padding);
      ctx.fillText(text, padding, canvas.height - padding);

      // 导出为base64
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = sourceImage;
  });
}

export const useKrea = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('id');

  const [sessions, setSessions] = useLocalStorageState<Session[]>("krea-sessions", {
    defaultValue: [],
  });

  const [currentSession, setCurrentSession] = useLocalStorageState<Session | undefined>("krea-current-session", {
    defaultValue: sessionId ? sessions.find(s => s.id === sessionId) || undefined : sessions[0] || undefined,
  });

  const [models, _] = useLocalStorageState<Model[]>("krea-models", {
    defaultValue: [
      {
        icon: modelIcon,
        name: 'Flux',
        desc: 'More tools, more control. Define exact regions to change, or expand your image',
        tags: [
          { icon: <TagInpainting />, name: 'Inpainting' },
          { icon: <TagOutpainting />, name: 'Outpainting' }
        ]
      },
      {
        icon: modelIcon,
        name: 'Flux Kontext Dev',
        desc: 'New frontier model designed for image editing',
        tags: [{ icon: <TagPromptEdition />, name: 'Prompt Edition' }]
      },
      {
        icon: modelIcon,
        name: 'Flux Kontext Pro',
        desc: 'Fast iterative editing with character consistency and local edits across scenes',
        tags: [{ icon: <TagPromptEdition />, name: 'Prompt Edition' }]
      },
      {
        icon: modelIcon,
        name: 'Flux Kontext Max',
        desc: 'Maximum performance with improved prompt adherence and typography generation',
        tags: [{ icon: <TagPromptEdition />, name: 'Prompt Edition' }]
      }
    ]
  });

  const [currentModelId, setCurrentModelId] = useLocalStorageState<string>("krea-current-model-id", {
    defaultValue: 'Flux Kontext Dev',
  });


  const newSession = () => {
    setCurrentSession(undefined);
    // 使用 Next.js 的路由来更新 URL
    window.history.pushState({}, '', window.location.pathname);
  };

  const addSession = (base64: string, prompt: string) => {
    const newSession: Session = {
      id: nanoid(),
      previewImage: base64,
      generates: [],
      createdAt: Date.now(),
      desc: prompt
    };
    setSessions([...sessions, newSession]);
    setCurrentSession(newSession);
    window.history.pushState({}, '', `${window.location.pathname}?id=${newSession.id}`);
  };

  const deleteSession = (id: string) => {
    // TODO: 使用 @heroui 里的 Confirm 组件
    if (window.confirm('确定要删除这个会话吗？')) {
      const newSessions = sessions.filter(s => s.id !== id);
      setSessions(newSessions);

      if (currentSession?.id === id) {
        setCurrentSession(undefined);
        window.history.pushState({}, '', window.location.pathname);
      }
    }
  };

  const changeSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setCurrentSession(session);
      window.history.pushState({}, '', `${window.location.pathname}?id=${id}`);
    }
  };

  const generate = async (activeImage: string, prompt: string, num: number) => {
    if (!currentSession) return;

    try {
      const generatedImages = await Promise.all(
        Array(num).fill(null).map(() => generateImage(activeImage, prompt, 1))
      );

      const newGenerate: Generate = {
        id: nanoid(),
        sourceBase64: activeImage,
        generateBase64: generatedImages,
        prompt
      };

      const updatedSession = {
        ...currentSession,
        generates: [...currentSession.generates, newGenerate]
      };

      setCurrentSession(updatedSession);
      setSessions(sessions.map(s => s.id === currentSession.id ? updatedSession : s));

      return generatedImages[0]; // 返回第一张图片
    } catch (error) {
      console.error('Failed to generate images:', error);
      throw error;
    }
  };

  return {
    sessions,
    currentSession,
    newSession,
    addSession,
    models,
    currentModelId,
    setCurrentModelId,
    generate,
    changeSession,
    deleteSession, _
  };
}