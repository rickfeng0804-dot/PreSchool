import React, { useState } from 'react';
import { Header } from './components/Header';
import { Login } from './views/Login';
import { Admin } from './views/Admin';
import { Gallery } from './views/Gallery';
import { StudentDetail } from './views/StudentDetail';
import { ViewState, Student } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.GALLERY);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setView(ViewState.ADMIN);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setView(ViewState.GALLERY);
  };

  const navigateHome = () => {
    setView(ViewState.GALLERY);
    setSelectedStudent(null);
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setView(ViewState.STUDENT_DETAIL);
  };

  return (
    <div className="min-h-screen font-sans pb-20">
      <Header 
        onLoginClick={() => setView(ViewState.LOGIN)}
        onHomeClick={navigateHome}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto mt-6 px-2 sm:px-0">
        {view === ViewState.LOGIN && (
          <Login onSuccess={handleLoginSuccess} />
        )}

        {view === ViewState.ADMIN && isAdmin && (
          <Admin />
        )}

        {/* Protect Admin route */}
        {view === ViewState.ADMIN && !isAdmin && (
           <Login onSuccess={handleLoginSuccess} />
        )}

        {view === ViewState.GALLERY && (
          <Gallery onStudentClick={handleStudentClick} />
        )}

        {view === ViewState.STUDENT_DETAIL && selectedStudent && (
          <StudentDetail 
            student={selectedStudent} 
            onBack={navigateHome}
          />
        )}
      </main>
      
      <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 py-4 text-center z-40">
        <p className="text-gray-400 text-xs font-bold tracking-wider">
          © {new Date().getFullYear()} 愛愛幼兒園 Learning Portfolio System
        </p>
      </footer>
    </div>
  );
};

export default App;