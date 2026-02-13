import React, { useState, useMemo } from 'react';
import { StudentCard } from '../components/StudentCard';
import { getStudents } from '../services/storage';
import { GRADES } from '../constants';
import { Filter } from 'lucide-react';
import { Grade } from '../types';

export const Gallery: React.FC = () => {
  const [filterGrade, setFilterGrade] = useState<Grade | 'ALL'>('ALL');
  const students = getStudents();

  const filteredStudents = useMemo(() => {
    if (filterGrade === 'ALL') return students;
    return students.filter(s => s.grade === filterGrade);
  }, [students, filterGrade]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h2 className="text-2xl font-black text-gray-700 flex items-center gap-2">
          <span className="bg-orange-100 p-2 rounded-xl text-orange-500">✨</span>
          學生精彩作品
        </h2>
        
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border-2 border-gray-100 overflow-x-auto max-w-full">
          <button
            onClick={() => setFilterGrade('ALL')}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filterGrade === 'ALL' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            全部
          </button>
          {GRADES.map(grade => (
            <button
              key={grade}
              onClick={() => setFilterGrade(grade)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filterGrade === grade ? 'bg-yellow-400 text-yellow-900 shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStudents.map(student => (
            <div key={student.id} className="h-full">
              <StudentCard student={student} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border-4 border-dashed border-gray-200">
          <div className="text-6xl mb-4">🎈</div>
          <h3 className="text-xl font-bold text-gray-400">目前還沒有作品喔！</h3>
          <p className="text-gray-300 mt-2">請老師登入後台進行上傳。</p>
        </div>
      )}
    </div>
  );
};