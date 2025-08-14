import { useKrea } from "@/app/hooks/useKrea";
import { Add } from "../Icon/Add";
import { Delete } from "../Icon/Delete";

export function SessionPanel() {
  // TODO: 从 props 中获取这些信息
  const { sessions, currentSession, newSession, deleteSession, changeSession } = useKrea();

  return (
    <div className="h-full flex flex-col">
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={newSession}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Add className="w-5 h-5" />
          {/* TODO: New Session 的显示样式与item中的会话信息一样，但是只有居中的文案 */}
          <span>New Session</span>
        </button>
      </div>

      {/* 会话列表 */}
      <div className="flex-1 overflow-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
              currentSession?.id === session.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => changeSession(session.id)}
          >
            {/* 预览图 */}
            <div className="relative aspect-video mb-2 rounded-lg overflow-hidden bg-gray-100">
              {session.previewImage && (
                <img
                  src={session.previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* TODO: 这一部分抽成组件，并且只有 hover 在预览图时，才显示*/}
            {/* 会话信息 */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm text-gray-500">
                  {new Date(session.createdAt).toLocaleDateString()}
                </div>
                <div className="text-sm truncate">
                  {session.desc || '未命名会话'}
                </div>
              </div>

              {/* 删除按钮 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Delete className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}