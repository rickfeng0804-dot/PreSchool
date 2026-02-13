import React from 'react';
import { ArrowLeft, Share2, Download, Video, Image as ImageIcon, FileText, FileSpreadsheet, Presentation, Calendar } from 'lucide-react';
import { Student } from '../types';

interface StudentDetailProps {
  student: Student;
  onBack: () => void;
}

export const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
  const isBoy = student.gender === 'boy';
  
  // Use 3D realistic cartoon avatars based on gender
  const avatarUrl = `https://avatar.iran.liara.run/public/${isBoy ? 'boy' : 'girl'}?username=${student.id}`;

  // Theme colors
  const bgClass = isBoy ? 'bg-sky-50' : 'bg-pink-50';
  const borderClass = isBoy ? 'border-sky-200' : 'border-pink-200';
  const accentClass = isBoy ? 'bg-sky-400' : 'bg-pink-400';
  const accentDarkClass = isBoy ? 'border-sky-600' : 'border-pink-600';
  const textClass = isBoy ? 'text-sky-700' : 'text-pink-700';

  const getIcon = (type: string) => {
    switch (type) {
      case '影片': return <Video size={32} />;
      case '照片': return <ImageIcon size={32} />;
      case 'Excel': return <FileSpreadsheet size={32} />;
      case 'PPT': return <Presentation size={32} />;
      default: return <FileText size={32} />;
    }
  };

  const getLargeIcon = (type: string) => {
    const size = 100;
    const cls = isBoy ? 'text-sky-400' : 'text-pink-400';
    switch (type) {
      case '影片': return <Video size={size} className={cls} />;
      case '照片': return <ImageIcon size={size} className={cls} />;
      case 'Excel': return <FileSpreadsheet size={size} className={cls} />;
      case 'PPT': return <Presentation size={size} className={cls} />;
      default: return <FileText size={size} className={cls} />;
    }
  };

  const handleDownload = () => {
    const element = document.getElementById(`portfolio-content`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (element && (window as any).html2pdf) {
      const opt = {
        margin: 0.5,
        filename: `${student.name}_學習歷程.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).html2pdf().set(opt).from(element).save();
    } else {
      alert("下載功能模擬：正在產生 PDF...");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${student.name}的學習歷程`,
        text: student.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`已複製分享連結：${student.name} - ${student.grade} ${student.className}`);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-gray-100"
      >
        <ArrowLeft size={20} />
        返回列表
      </button>

      {/* Main Content Card (Target for PDF) */}
      <div 
        id="portfolio-content"
        className={`bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 ${borderClass}`}
      >
        {/* Header Banner */}
        <div className={`${bgClass} p-8 md:p-12 border-b-4 ${borderClass} relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 ${accentClass} rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2`}></div>
          <div className={`absolute bottom-0 left-0 w-64 h-64 ${isBoy ? 'bg-blue-300' : 'bg-pink-300'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2`}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className={`absolute inset-0 ${accentClass} rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity`}></div>
              <img 
                src={avatarUrl} 
                alt={student.name} 
                className={`w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-white shadow-xl object-cover relative z-10 bg-white`}
              />
              <div className={`absolute bottom-2 right-2 ${accentClass} text-white p-3 rounded-full border-4 border-white shadow-lg z-20`}>
                {getIcon(student.contentType)}
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                <span className="px-4 py-1.5 bg-white rounded-full text-sm font-bold text-gray-500 shadow-sm border border-gray-100 uppercase tracking-wide">
                  {student.grade}
                </span>
                <span className="px-4 py-1.5 bg-white rounded-full text-sm font-bold text-gray-500 shadow-sm border border-gray-100 uppercase tracking-wide">
                  {student.className}班
                </span>
                <span className="px-4 py-1.5 bg-white/80 rounded-full text-sm font-bold text-gray-500 shadow-sm border border-gray-100 flex items-center gap-2">
                  <Calendar size={14} />
                  {formatDate(student.timestamp)}
                </span>
              </div>
              
              <h1 className={`text-4xl md:text-5xl font-black ${textClass} mb-4 tracking-tight`}>
                {student.name}
              </h1>
              <p className="text-xl text-gray-500 font-bold flex items-center justify-center md:justify-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-gray-400"></span>
                學習歷程檔案
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-8 md:p-12 space-y-8">

          {/* Large Preview Section */}
          <div className="rounded-3xl overflow-hidden shadow-md border-4 border-gray-100 bg-gray-50 min-h-[300px] flex items-center justify-center">
            {student.contentType === '照片' ? (
              <div className="w-full relative group">
                 <img 
                  src={`https://picsum.photos/seed/${student.id}work/800/500`} 
                  alt="作品預覽" 
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                 <div className={`p-8 rounded-full bg-white border-4 ${borderClass} mb-6 shadow-sm`}>
                    {getLargeIcon(student.contentType)}
                 </div>
                 <h3 className="text-2xl font-bold text-gray-400">
                   {student.contentType} 檔案預覽
                 </h3>
                 <p className="text-gray-400 mt-2 font-medium">
                   此類型檔案請點擊下方連結開啟
                 </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 border-4 border-dashed border-gray-200">
             <h3 className="text-xl font-black text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span> 
              學習紀錄與心得
            </h3>
            <p className="text-gray-700 text-lg leading-loose font-medium whitespace-pre-line">
              {student.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-400 mb-2 uppercase text-xs tracking-wider">檔案類型</h4>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${bgClass}`}>
                    {getIcon(student.contentType)}
                  </div>
                  <span className="text-xl font-bold text-gray-700">{student.contentType}</span>
                </div>
             </div>
             
             <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-400 mb-2 uppercase text-xs tracking-wider">原始檔案連結</h4>
                <a 
                  href={student.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 font-bold underline decoration-2 underline-offset-4 truncate block"
                >
                  {student.link || '無連結'}
                </a>
             </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 p-8 border-t-4 border-gray-100 flex flex-col sm:flex-row gap-4 no-print" data-html2canvas-ignore="true">
          <button 
            onClick={handleDownload}
            className={`flex-1 flex items-center justify-center gap-3 ${accentClass} text-white py-4 px-8 rounded-2xl font-bold border-b-4 ${accentDarkClass} active:border-b-0 active:translate-y-1 transition-all text-lg shadow-lg hover:brightness-110`}
          >
            <Download size={24} />
            下載學習歷程 PDF
          </button>
          
          <button 
            onClick={handleShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-yellow-400 text-yellow-900 py-4 px-8 rounded-2xl font-bold border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all text-lg shadow-lg hover:bg-yellow-300"
          >
            <Share2 size={24} />
            分享
          </button>
        </div>
      </div>
    </div>
  );
};