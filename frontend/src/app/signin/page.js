'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const USERS = [
  { id: 'sachin', name: 'Sachin' },
  { id: 'saurabh', name: 'Saurabh' },
  { id: 'saumya', name: 'Saumya' },
];

export default function Signin() {
  const { setUser } = useAuth();
  const router = useRouter();

  function handleSignIn(e) {
    e.preventDefault();
    const userId = e.target.user.value;
    setUser(USERS.find(u => u.id === userId));
    router.push('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSignIn} className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-6 text-center">Sign In</h1>
        <label className="block mb-2 font-semibold text-gray-700">Select User:</label>
        <select name="user" className="w-full border border-gray-700 rounded px-3 py-2 mb-6 bg-white text-gray-900">
          {USERS.map(u => (
            <option value={u.id} key={u.id}>{u.name}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign In</button>
      </form>
    </div>
  );
}
