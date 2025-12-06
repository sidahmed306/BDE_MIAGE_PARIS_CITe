import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import Toast from '../components/Toast';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 // ...existing code...
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Login] submit', formData);
    setLoading(true);

    try {
      // Premier essai : envoyer username
      let payload = { username: formData.username, password: formData.password };
      console.log('[Login] trying payload (username):', payload);
      let response;
      try {
        response = await authAPI.login(payload);
      } catch (err) {
        console.warn('[Login] username failed, trying email if applicable', err?.response?.status, err?.response?.data);
        // Essayer avec email (si backend attend "email")
        payload = { email: formData.username, password: formData.password };
        console.log('[Login] trying payload (email):', payload);
        response = await authAPI.login(payload);
      }

      console.log('[Login] response:', response?.data);
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));
        showToast('Login successful!', 'success');
        setTimeout(() => navigate('/'), 500);
      } else {
        showToast('Login failed: invalid response', 'error');
      }
    } catch (error) {
      console.error('[Login] final error:', error);
      showToast(error.response?.data?.error || error.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };
// ...existing code...

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-bordeaux mb-2">Nuit de l'Info</h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-bordeaux to-dark-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Pas de compte ?{' '}
            <Link to="/register" className="text-bordeaux hover:underline font-semibold">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Login;