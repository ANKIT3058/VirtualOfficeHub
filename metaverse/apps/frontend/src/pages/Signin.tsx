import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store'; // assuming you exported types from store.ts
import { loginUser } from '../features/auth/authSlice'; // login thunk or action
import { Link } from 'react-router-dom';

export const Signin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.auth); // pull auth error if you store it

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ username: form.username, password: form.password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Virtual Office</h1>
        <p className="text-gray-600">Sign In To Your Account</p>
        <p className="text-sm text-gray-500">
          Don't have an Account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            SIGN UP
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
