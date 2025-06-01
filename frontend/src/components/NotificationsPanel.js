'use client'
export default function NotificationsPanel({ notifications, onClose }) {
  return (
    <div className="absolute right-4 top-14 w-80 bg-white shadow-lg rounded p-4 z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">Notifications</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
      </div>
      <ul className="max-h-64 overflow-y-auto">
        {notifications.length === 0 && (
          <li className="text-gray-500 italic">No notifications</li>
        )}
        {notifications.map(note => (
          <li key={note.id} className="border-b py-2 text-gray-800">
            <span className="text-xs text-gray-500 mr-2">
              [{new Date(note.createdAt).toLocaleTimeString()}]
            </span>
            {note.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
