import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '', type: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      console.log('in')
      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
        return;
      }
      console.log('out')

      navigate('/signin');
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Virtual Office</h1>
        <p className="text-gray-600">Create Your Account</p>
        <p className="text-sm text-gray-500">
          Already have an Account?{' '}
          <Link
            to="/signin"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            SIGN IN
          </Link>
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-3 py-2 border rounded"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          className="w-full px-3 py-2 border rounded"
          value={form.type}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};