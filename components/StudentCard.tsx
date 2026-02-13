import React from 'react';
import { FileText, Video, Image as ImageIcon, FileSpreadsheet, Presentation, ArrowRight } from 'lucide-react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  onView: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onView }) => {
  const isBoy = student.gender === 'boy';
  
  // Use 3D realistic cartoon avatars based on gender
  const avatarUrl = `https://avatar.iran.liara.run/public/${isBoy ? 'boy' : 'girl'}?username=${student.id}`;

  // Dynamic color themes based on gender
  const bgClass = isBoy ? 'bg-sky-50' : 'bg-pink-50';
  const borderClass = isBoy ? 'border-sky-200' : 'border-pink-200';
  const accentClass = isBoy ? 'bg-sky-400' : 'bg-pink-400';
  const accentDarkClass = isBoy ? 'border-sky-600' : 'border-pink-600';
  const textClass = isBoy ? 'text-sky-700' : 'text-pink-700';

  const getIcon = (type: string) => {
    switch (type) {
      case '影片': return <Video size={20} />;
      case '照片': return <ImageIcon size={20} />;
      case 'Excel': return <FileSpreadsheet size={20} />;
      case 'PPT': return <Presentation size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <div 
      id={`card-${student.id}`}
      className={`relative group ${bgClass} rounded-[2rem] border-4 ${borderClass} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full`}
    >
      {/* Top Decoration */}
      <div className={`h-4 w-full ${accentClass} opacity-50 absolute top-0 left-0`}></div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Header: Avatar & Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img 
              src={avatarUrl} 
              alt={student.name} 
              loading="lazy"
              className={`w-20 h-20 rounded-full border-4 ${isBoy ? 'border-sky-300' : 'border-pink-300'} shadow-md object-cover bg-white`}
            />
            <div className={`absolute -bottom-2 -right-2 ${accentClass} text-white p-1.5 rounded-full border-2 border-white shadow-sm`}>
              {getIcon(student.contentType)}
            </div>
          </div>
          <div>
            <h3 className={`text-2xl font-black ${textClass}`}>{student.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-500 shadow-sm border border-gray-100">
                {student.grade}
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-500 shadow-sm border border-gray-100">
                {student.className}班
              </span>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-white/60 p-4 rounded-2xl border-2 border-white mb-4 flex-grow shadow-inner">
          <p className="text-gray-600 leading-relaxed font-medium line-clamp-3">
            {student.description}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-2">
          <button 
            onClick={() => onView(student)}
            className={`w-full flex items-center justify-center gap-2 ${accentClass} text-white py-3 px-4 rounded-xl font-bold border-b-4 ${accentDarkClass} active:border-b-0 active:translate-y-1 transition-all hover:brightness-110`}
          >
            <span className="text-base">進入學習歷程</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};