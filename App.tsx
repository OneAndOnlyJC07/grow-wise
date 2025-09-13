import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { EnrollmentForm } from './components/EnrollmentForm';
import { HomePage } from './pages/HomePage';
import { MyBooksPage } from './pages/MyBooksPage';
import { ProfilePage } from './pages/ProfilePage';
import type { Student, Book } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  const handleEnroll = (student: Student) => {
    setCurrentUser(student);
  };

  const handleAddBook = (newBook: Omit<Book, 'id'>) => {
    const book: Book = {
      ...newBook,
      id: Math.random().toString(36).substr(2, 9),
    };
    setBooks([...books, book]);
  };

  if (!currentUser) {
    return <EnrollmentForm onEnroll={handleEnroll} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  books={books} 
                  currentUser={currentUser} 
                  onAddBook={handleAddBook} 
                />
              } 
            />
            <Route 
              path="/my-books" 
              element={
                <MyBooksPage 
                  books={books} 
                  currentUser={currentUser} 
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProfilePage 
                  currentUser={currentUser} 
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App