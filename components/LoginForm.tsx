
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_DONORS } from '../constants';

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.DONOR);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified login for demo
    if (role === UserRole.DONOR) {
      onLogin(MOCK_DONORS[0]);
    } else {
      onLogin({
        id: 'r1',
        username: 'help_hands',
        role: UserRole.RECEIVER,
        orgName: 'Helping Hands NGO',
        contact: '1122334455',
        location: 'West District'
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome Back</h2>
      
      <div className="flex mb-8 bg-gray-100 p-1 rounded-xl">
        <button 
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === UserRole.DONOR ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setRole(UserRole.DONOR)}
        >
          Donor
        </button>
        <button 
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${role === UserRole.RECEIVER ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setRole(UserRole.RECEIVER)}
        >
          Receiver
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button 
          type="submit"
          className={`w-full py-4 rounded-lg font-bold text-white transition-all shadow-md active:scale-95 ${role === UserRole.DONOR ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}
        >
          Sign In as {role === UserRole.DONOR ? 'Donor' : 'Receiver'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        New to ZeroCrumb? <a href="#" className="text-green-600 font-bold">Create an account</a>
      </p>
    </div>
  );
};

export default LoginForm;
