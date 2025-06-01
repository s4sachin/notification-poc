'use client'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import NewPostModal from './NewPostModal';

export default function Navbar({ onNewPost, notifications, onShowNotifications }) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-3 text-white">
      <div className="text-xl font-bold">Insyd</div>
      <div className="flex items-center gap-4">
        <button
          className="rounded-full bg-white text-blue-600 w-8 h-8 flex items-center justify-center text-2xl font-bold hover:bg-blue-100"
          onClick={() => setShowModal(true)}
          title="Create New Post"
        >+</button>
        <NotificationBell notifications={notifications} onClick={onShowNotifications} />
        <div className="ml-4 font-semibold">{user?.name}</div>
      </div>
      {showModal && <NewPostModal onClose={() => setShowModal(false)} onCreate={onNewPost} />}
    </nav>
  );
}
