
import React, { useState, useEffect } from 'react';
import { User, UserRole, FoodListing, ImpactStats } from './types';
import { MOCK_LISTINGS, MOCK_DONORS, INITIAL_IMPACT_STATS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ImpactStatsSection from './components/ImpactStats';
import LoginForm from './components/LoginForm';
import DonorDashboard from './components/DonorDashboard';
import ReceiverDashboard from './components/ReceiverDashboard';
import TeamSection from './components/TeamSection';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'login' | 'dashboard' | 'team'>('home');
  const [listings, setListings] = useState<FoodListing[]>(MOCK_LISTINGS);
  const [stats, setStats] = useState<ImpactStats>(INITIAL_IMPACT_STATS);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  const addListing = (newListing: Omit<FoodListing, 'id' | 'donorId' | 'donorName' | 'status' | 'trustScore'>) => {
    if (!currentUser) return;
    const listing: FoodListing = {
      ...newListing,
      id: Math.random().toString(36).substr(2, 9),
      donorId: currentUser.id,
      donorName: currentUser.orgName,
      status: 'available',
      trustScore: 4.5 + Math.random() * 0.5
    };
    setListings([listing, ...listings]);
    setStats(prev => ({ ...prev, activeDonors: prev.activeDonors + 1 }));
  };

  const deleteListing = (id: string) => {
    setListings(listings.filter(l => l.id !== id));
  };

  const claimListing = (id: string) => {
    setListings(listings.map(l => {
      if (l.id === id) {
        return { ...l, status: 'completed' as const };
      }
      return l;
    }));
    const listing = listings.find(l => l.id === id);
    if (listing) {
      setStats(prev => ({
        ...prev,
        peopleFed: prev.peopleFed + listing.quantity,
        donationsCompleted: prev.donationsCompleted + 1,
        foodSavedKg: prev.foodSavedKg + (listing.quantity * 0.4) // Assume 400g per person
      }));
    }
    alert("Food claimed successfully! Pickup details shared with donor.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={currentUser} 
        onLogout={handleLogout} 
        setView={setView} 
      />

      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onGetStarted={() => setView('login')} />
            <ImpactStatsSection stats={stats} />
            <div className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How it Works</h2>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">1</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2">Post Excess Food</h3>
                    <p className="text-gray-600">Hotels & restaurants list surplus food with real-time freshness data.</p>
                  </div>
                  <div className="p-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-600">2</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2">Smart Matching</h3>
                    <p className="text-gray-600">Our AI matches food with nearby NGOs based on requirement and travel radius.</p>
                  </div>
                  <div className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">3</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2">Zero Waste</h3>
                    <p className="text-gray-600">Verified receivers pick up the food, feeding people and saving the planet.</p>
                  </div>
                </div>
              </div>
            </div>
            <TeamSection />
          </>
        )}

        {view === 'login' && (
          <div className="flex items-center justify-center py-20 px-4">
            <LoginForm onLogin={handleLogin} />
          </div>
        )}

        {view === 'dashboard' && currentUser && (
          <div className="max-w-7xl mx-auto py-8 px-4">
            {currentUser.role === UserRole.DONOR ? (
              <DonorDashboard 
                user={currentUser} 
                listings={listings.filter(l => l.donorId === currentUser.id)} 
                onAdd={addListing} 
                onDelete={deleteListing}
              />
            ) : (
              <ReceiverDashboard 
                user={currentUser} 
                listings={listings.filter(l => l.status === 'available')} 
                onClaim={claimListing}
              />
            )}
          </div>
        )}

        {view === 'team' && <TeamSection />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
