import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { AuthProvider } from './context/AuthContext';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ArtistDetailPage } from './pages/ArtistDetailPage';

// NOVAS PÁGINAS
import { ArtistsPage } from './pages/ArtistsPage';
import { AlbumsPage } from './pages/AlbumsPage';
import { ArtistFormPage } from './pages/ArtistFormPage';
import { AlbumFormPage } from './pages/AlbumFormPage';

import './App.css';
import { LogOut } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // IMPORTANTE: user.role é sempre "ADMIN" | "USER"
    if (role && user?.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

const AppContent: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <Router>
            <div className="app">
                <header className="header">
                    <div className="header-content">
                        <Link to="/" className="logo">
                            <h1>🎵 Artistas</h1>
                        </Link>

                        <nav className="nav">
                            <Link to="/" className="nav-link">Home</Link>

                            {isAuthenticated && (
                                <>
                                    <Link to="/artists" className="nav-link">Artistas</Link>
                                    <Link to="/albums" className="nav-link">Álbuns</Link>
                                </>
                            )}

                            {isAuthenticated ? (
                                <>
                  <span className="user-info">
                    {user?.name} ({user?.role})
                  </span>
                                    <button onClick={logout} className="logout-btn">
                                        <LogOut size={18} />
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="nav-link">Login</Link>
                                    <Link to="/register" className="nav-link">Registrar</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="main-content">
                    <Routes>
                        {/* ROTAS PÚBLICAS */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/artist/:id" element={<ArtistDetailPage />} />

                        {/* ROTAS PROTEGIDAS */}
                        <Route
                            path="/artists"
                            element={
                                <ProtectedRoute role={"ADMIN"}>
                                    <ArtistsPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/artists/new"
                            element={
                                <ProtectedRoute role="ADMIN">
                                    <ArtistFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/artists/edit/:id"
                            element={
                                <ProtectedRoute role="ADMIN">
                                    <ArtistFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/albums"
                            element={
                                <ProtectedRoute role={"ADMIN"}>
                                    <AlbumsPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/albums/new"
                            element={
                                <ProtectedRoute role="ADMIN">
                                    <AlbumFormPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/albums/edit/:id"
                            element={
                                <ProtectedRoute role="ADMIN">
                                    <AlbumFormPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>

                <footer className="footer">
                    <div className="footer-content">
                        <p>&copy; 2024 Artistas. Todos os direitos reservados.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
