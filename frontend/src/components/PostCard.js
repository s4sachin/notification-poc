'use client'
export default function PostCard({ post, onLike, isLiked }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="font-bold text-gray-900 text-lg mb-1">{post.title}</div>
      <div className="text-gray-700 mb-2 ">{post.message}</div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">by {post.owner}</span>
        <button
          onClick={() => onLike(post)}
          className={`ml-auto px-3 py-1 rounded ${isLiked ? 'bg-blue-400 text-white' : 'bg-blue-100 text-blue-700'} hover:bg-blue-200`}
        >
          👍 Like
        </button>
      </div>
    </div>
  );
}
  