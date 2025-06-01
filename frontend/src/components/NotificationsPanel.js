"use client";
export default function NotificationsPanel({ notifications, onClose }) {
  return (
    <div className="absolute right-4 top-14 w-96 bg-white shadow-2xl rounded-xl p-5 z-50 border border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-xl text-blue-700">Notifications</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
          title="Clear all"
        >
          &times;
        </button>
      </div>
      <ul className="max-h-80 overflow-y-auto space-y-3">
        {notifications.length === 0 && (
          <li className="text-gray-400 italic text-center">No notifications</li>
        )}
        {notifications.map((note) => (
          <li
            key={note.id}
            className="bg-blue-50 border border-blue-100 rounded-lg p-3 shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-blue-500 font-semibold">
                {note.type ? note.type.toUpperCase() : "LIKE"}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div className="text-gray-800">{note.message}</div>
            {note.postTitle && (
              <div className="text-xs text-gray-500 mt-1">
                Post: <span className="font-medium">{note.postTitle}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
