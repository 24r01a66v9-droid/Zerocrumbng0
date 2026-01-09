
import React, { useState, useEffect } from 'react';
import { User, FoodListing, FoodType } from '../types';
import { Icons } from '../constants';
import { getSmartMatchingInsights } from '../geminiService';

interface ReceiverDashboardProps {
  user: User;
  listings: FoodListing[];
  onClaim: (id: string) => void;
}

const ReceiverDashboard: React.FC<ReceiverDashboardProps> = ({ user, listings, onClaim }) => {
  const [filterType, setFilterType] = useState<FoodType | 'ALL'>('ALL');
  const [minQuantity, setMinQuantity] = useState(1);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const fetchAiMatching = async () => {
      if (listings.length > 0) {
        setLoadingAi(true);
        const insights = await getSmartMatchingInsights(listings, { people: 20, type: 'any' });
        setAiRecommendations(insights.recommendations || []);
        setLoadingAi(false);
      }
    };
    fetchAiMatching();
  }, [listings.length]);

  const filtered = listings.filter(l => 
    (filterType === 'ALL' || l.foodType === filterType) && 
    l.quantity >= minQuantity
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Receiver Dashboard</h1>
          <p className="text-gray-500">Helping {user.orgName} find meals</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white p-2 rounded-xl shadow-sm border flex gap-2">
            <button 
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-1 rounded-lg text-sm font-medium ${filterType === 'ALL' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterType(FoodType.VEG)}
              className={`px-4 py-1 rounded-lg text-sm font-medium ${filterType === FoodType.VEG ? 'bg-green-100 text-green-600' : 'text-gray-500'}`}
            >
              Veg
            </button>
            <button 
              onClick={() => setFilterType(FoodType.NON_VEG)}
              className={`px-4 py-1 rounded-lg text-sm font-medium ${filterType === FoodType.NON_VEG ? 'bg-red-100 text-red-600' : 'text-gray-500'}`}
            >
              Non-Veg
            </button>
          </div>
        </div>
      </div>

      {loadingAi ? (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
            <div className="h-4 w-48 bg-blue-200 rounded"></div>
          </div>
          <div className="h-20 bg-white bg-opacity-50 rounded-xl"></div>
        </div>
      ) : aiRecommendations.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-2 text-blue-800 font-bold mb-3">
            <span className="bg-blue-600 text-white p-1 rounded">AI</span> Smart Matching Insights
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {aiRecommendations.slice(0, 2).map((rec, idx) => {
              const matchedListing = listings.find(l => l.id === rec.listingId);
              if (!matchedListing) return null;
              return (
                <div key={idx} className="bg-white bg-opacity-60 p-4 rounded-xl text-sm border border-blue-100">
                  <p className="font-bold text-blue-900 mb-1">Match Score: {rec.matchScore}%</p>
                  <p className="text-gray-700 italic">"{rec.reason}"</p>
                  <p className="mt-2 font-semibold text-xs uppercase text-blue-600">Recommending: {matchedListing.donorName}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 font-medium">No food matches found for your current filters.</p>
          </div>
        ) : filtered.map(listing => (
          <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
            <div className="h-40 bg-gray-100 relative">
              <img 
                src={`https://picsum.photos/seed/${listing.id}/400/200`} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                alt="Food thumbnail"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm ${listing.foodType === FoodType.VEG ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                  {listing.foodType}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{listing.donorName}</h3>
              <p className="text-sm text-gray-500 mb-4">{listing.category}</p>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Icons.People /> Serves {listing.quantity}</div>
                  <div className="flex items-center gap-1 text-orange-500 font-bold">
                    <Icons.Star /> {listing.trustScore}
                  </div>
                </div>
                <div className="flex items-center gap-2"><Icons.Clock /> Fresh for {Math.ceil((new Date(listing.expiryTime).getTime() - Date.now()) / (1000 * 60 * 60))} more hours</div>
                <div className="flex items-center gap-2"><Icons.Location /> {listing.location}</div>
              </div>
              
              <button 
                onClick={() => onClaim(listing.id)}
                className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-sm"
              >
                Claim & Request Pickup
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiverDashboard;
