"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import NotificationsPanel from "../components/NotificationsPanel";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([
    {
      id: "p1",
      title: "Welcome to Insyd!",
      message: "This is our new notification system demo. Try liking a post!",
      owner: "sachin",
    },
    {
      id: "p2",
      title: "First Announcement",
      message: "Notifications are now real-time. Powered by WebSockets!",
      owner: "saurabh",
    },
    {
      id: "p3",
      title: "Hello Community",
      message: "Feel free to create a post and try out the like button.",
      owner: "saumya",
    },
    {
      id: "p4",
      title: "Team Update",
      message: "Sachin, Saurabh, and Saumya are collaborating on this project.",
      owner: "sachin",
    },
    {
      id: "p5",
      title: "Feature Request",
      message: "What features would you like to see next? Drop a comment!",
      owner: "saumya",
    },
  ]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const ws = useRef(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user, router]);

  // WebSocket connection
  useEffect(() => {
    if (!user) return;
    if (ws.current) ws.current.close();
    ws.current = new WebSocket(
      `${BACKEND_URL.replace(/^http/, "ws")}?userId=${user.id}`
    );
    ws.current.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [notification, ...prev]);
    };
    ws.current.onerror = () => {
      console.error("WebSocket error");
    };
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [user]);

  function handleLike(post) {
    fetch(`${BACKEND_URL}/api/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likedBy: user.id,
        contentOwner: post.owner,
        contentId: post.id,
      }),
    });
    setLikedPosts((prev) => [...prev, post.id]);
  }

  function handleClearNotifications() {
    setNotifications([]);
    setShowNotifications(false);
  }

  function handleNewPost({ title, message, owner }) {
    setPosts((prev) => [
      { id: Date.now().toString(), title, message, owner },
      ...prev,
    ]);
  }

  return (
    user && (
      <div className="min-h-screen bg-gray-100">
        <Navbar
          onNewPost={handleNewPost}
          notifications={notifications}
          onShowNotifications={() => setShowNotifications((v) => !v)}
        />
        <main className="max-w-xl mx-auto mt-8 px-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              isLiked={likedPosts.includes(post.id)}
            />
          ))}
        </main>
        {showNotifications && (
          <NotificationsPanel
            notifications={notifications}
            onClose={handleClearNotifications}
          />
        )}
      </div>
    )
  );
}
