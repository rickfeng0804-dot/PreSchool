import React, { useState, useEffect } from 'react';
import { Settings, Save, Globe, KeyRound, CheckCircle, AlertCircle } from 'lucide-react';
import { getSettings, saveSettings } from '../services/storage';

export const SystemSettings: React.FC = () => {
  const [webAppUrl, setWebAppUrl] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const settings = getSettings();
    if (settings.webAppUrl) setWebAppUrl(settings.webAppUrl);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const settingsToSave: { webAppUrl?: string; password?: string } = {};
    
    // Always save URL, even if empty (to clear it)
    settingsToSave.webAppUrl = webAppUrl;
    
    // Only save password if provided
    if (password) {
      if (password.length < 4) {
        setLoading(false);
        setMessage('密碼長度請至少輸入 4 個字元');
        return;
      }
      settingsToSave.password = password;
    }

    // Simulate save delay for better UX
    setTimeout(() => {
      saveSettings(settingsToSave);
      setLoading(false);
      setSuccess(true);
      
      // Clear password field for security
      setPassword('');
      
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border-b-8 border-gray-200">
        
        <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-100 pb-4">
          <div className="bg-gray-100 p-3 rounded-2xl">
            <Settings className="text-gray-600 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">系統維護設定</h2>
            <p className="text-gray-400 font-bold">設定串接網址與登入密碼</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Web App URL Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700 font-bold ml-1">
              <Globe size={18} />
              <label>Google Apps Script 部署網址 (Web URL)</label>
            </div>
            <input
              type="url"
              value={webAppUrl}
              onChange={e => setWebAppUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-400 focus:outline-none font-bold text-gray-600 transition-colors"
              placeholder="https://script.google.com/macros/s/..."
            />
            <p className="text-xs text-gray-400 ml-1 leading-relaxed">
              請輸入 Google Apps Script 部署為 Web App 後的完整 URL。<br/>
              <span className="text-orange-400">注意：部署時「Execute as」請選擇「Me」，「Who has access」請選擇「Anyone」。</span>
            </p>
          </div>

          {/* Password Section */}
          <div className="space-y-3 pt-4 border-t-2 border-dashed border-gray-100">
            <div className="flex items-center gap-2 text-gray-700 font-bold ml-1">
              <KeyRound size={18} />
              <label>修改後台登入密碼</label>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-blue-400 focus:outline-none font-bold text-gray-600 tracking-widest transition-colors"
              placeholder="若不修改請留空"
            />
             <p className="text-xs text-gray-400 ml-1">
              若要保留原密碼，請保持此欄位空白。新密碼將在下次登入時生效。
            </p>
          </div>

          {message && (
             <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-sm font-bold">
               <AlertCircle size={16} />
               {message}
             </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 ${
                success 
                  ? 'bg-green-500 border-green-700 text-white' 
                  : 'bg-gray-700 border-gray-900 text-white hover:bg-gray-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>儲存中...</>
              ) : success ? (
                <><CheckCircle /> 設定已更新</>
              ) : (
                <><Save /> 儲存設定</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};