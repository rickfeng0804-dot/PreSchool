import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { checkPassword } from '../services/storage';

interface LoginProps {
  onSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(password)) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl border-b-8 border-gray-200">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-blue-200 shadow-inner">
            <Lock className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-700">老師專區登入</h2>
          <p className="text-gray-400 mt-2 font-medium">請輸入系統密碼以進入後台</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="請輸入密碼"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-lg text-center tracking-widest"
            />
            {error && (
              <p className="text-red-400 text-center mt-2 font-bold text-sm animate-bounce">
                密碼錯誤，請重新輸入
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all text-lg shadow-lg"
          >
            確認登入
          </button>
        </form>
      </div>
    </div>
  );
};