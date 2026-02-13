import React, { useState, useRef } from 'react';
import { Save, Server, Code, CheckCircle, RefreshCcw, Upload } from 'lucide-react';
import { GRADES, CLASSES, CONTENT_TYPES, MOCK_GAS_CODE } from '../constants';
import { StudentFormData } from '../types';
import { addStudent } from '../services/storage';

export const Admin: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    grade: '幼幼班',
    className: '蘋果',
    gender: 'boy',
    contentType: '照片',
    link: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addStudent(formData);
      setLoading(false);
      setSuccess(true);
      
      // Reset form but keep some defaults
      setFormData(prev => ({
        ...prev,
        name: '',
        link: '',
        description: ''
      }));
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Hide success message after 3s
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size check for localStorage limitations in this demo
      if (file.size > 1024 * 1024) { // 1MB limit
        alert("提醒：由於此為展示系統，檔案將儲存於瀏覽器暫存，建議上傳小於 1MB 的檔案。");
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({
            ...prev,
            link: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(MOCK_GAS_CODE);
    alert("程式碼已複製到剪貼簿！");
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
      
      {/* Upload Form Section */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border-b-8 border-gray-200">
        <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-100 pb-4">
          <div className="bg-green-100 p-3 rounded-2xl">
            <Server className="text-green-600 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800">學習歷程上傳</h2>
            <p className="text-gray-400 font-bold">請填寫學生資料並上傳檔案</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold ml-1">學生姓名</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold"
                placeholder="例如：王小明"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold ml-1">性別</label>
              <div className="flex gap-4">
                <label className={`flex-1 cursor-pointer p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${formData.gender === 'boy' ? 'bg-blue-50 border-blue-400 text-blue-600' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                  <input 
                    type="radio" 
                    name="gender" 
                    className="hidden" 
                    checked={formData.gender === 'boy'} 
                    onChange={() => setFormData({...formData, gender: 'boy'})} 
                  />
                  <span>男生 👦</span>
                </label>
                <label className={`flex-1 cursor-pointer p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${formData.gender === 'girl' ? 'bg-pink-50 border-pink-400 text-pink-600' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
                  <input 
                    type="radio" 
                    name="gender" 
                    className="hidden" 
                    checked={formData.gender === 'girl'} 
                    onChange={() => setFormData({...formData, gender: 'girl'})} 
                  />
                  <span>女生 👧</span>
                </label>
              </div>
            </div>

            {/* Grade */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold ml-1">年級</label>
              <select
                value={formData.grade}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={e => setFormData({...formData, grade: e.target.value as any})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold appearance-none cursor-pointer"
              >
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold ml-1">班級</label>
              <select
                value={formData.className}
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={e => setFormData({...formData, className: e.target.value as any})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold appearance-none cursor-pointer"
              >
                {CLASSES.map(c => <option key={c} value={c}>{c}班</option>)}
              </select>
            </div>

             {/* Type */}
             <div className="space-y-2">
              <label className="block text-gray-700 font-bold ml-1">內容類型</label>
              <select
                value={formData.contentType}
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={e => setFormData({...formData, contentType: e.target.value as any})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold appearance-none cursor-pointer"
              >
                {CONTENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Link/File Upload */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-bold ml-1">檔案連結 / 檔案上傳</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.link}
                  onChange={e => setFormData({...formData, link: e.target.value})}
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold text-gray-600 truncate"
                  placeholder="https://... 或點擊右側上傳"
                />
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={handleFileUploadClick}
                  className="bg-gray-700 text-white px-4 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Upload size={18} />
                  檔案上傳
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-bold ml-1">說明文字</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold resize-none"
              placeholder="請簡述學習歷程內容..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 ${
                success 
                  ? 'bg-green-500 border-green-700 text-white' 
                  : 'bg-indigo-500 border-indigo-700 text-white hover:bg-indigo-600'
              }`}
            >
              {loading ? <RefreshCcw className="animate-spin" /> : success ? <CheckCircle /> : <Save />}
              {loading ? '處理中...' : success ? '上傳成功！' : '確認送出資料'}
            </button>
          </div>
        </form>
      </div>

      {/* Code Snippet Section */}
      <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-xl text-gray-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Code className="text-yellow-400" />
            <h3 className="text-xl font-bold text-white">系統維護腳本 (Google Apps Script)</h3>
          </div>
          <button 
            onClick={copyCode}
            className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg font-bold transition-colors"
          >
            複製程式碼
          </button>
        </div>
        <div className="bg-black/50 p-6 rounded-xl overflow-x-auto font-mono text-sm border border-gray-700 shadow-inner">
          <pre>{MOCK_GAS_CODE}</pre>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          說明：請將此程式碼複製到您的 Google Apps Script 專案中的 Code.gs 檔案，並部署為網頁應用程式以連接真實的 Google Sheet。
        </p>
      </div>
    </div>
  );
};