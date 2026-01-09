
import React, { useState } from 'react';
import { User, FoodListing, FoodType } from '../types';
import { Icons } from '../constants';

interface DonorDashboardProps {
  user: User;
  listings: FoodListing[];
  onAdd: (listing: any) => void;
  onDelete: (id: string) => void;
}

const DonorDashboard: React.FC<DonorDashboardProps> = ({ user, listings, onAdd, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    foodType: FoodType.VEG,
    category: '',
    quantity: 10,
    prepTime: '',
    expiryTime: '',
    location: user.location
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setShowModal(false);
    setFormData({
      foodType: FoodType.VEG,
      category: '',
      quantity: 10,
      prepTime: '',
      expiryTime: '',
      location: user.location
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.orgName}</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md"
        >
          <Icons.Plus /> List New Food
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="flex justify-center mb-4 text-gray-300"><Icons.Food /></div>
            <p className="text-gray-500 font-medium">No active listings. Start by adding one!</p>
          </div>
        ) : listings.map(listing => (
          <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${listing.foodType === FoodType.VEG ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {listing.foodType}
                </span>
                <button 
                  onClick={() => onDelete(listing.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Icons.Trash />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2">{listing.category}</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Icons.People /> Serves {listing.quantity} people
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Clock /> Expires {new Date(listing.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Location /> {listing.location}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <span className={`text-sm font-semibold ${listing.status === 'available' ? 'text-green-600' : 'text-blue-600'}`}>
                  ● {listing.status.toUpperCase()}
                </span>
                <div className="flex items-center gap-1 text-orange-500 font-bold">
                  <Icons.Star /> {listing.trustScore}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add Food Listing</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Food Type</label>
                  <select 
                    value={formData.foodType}
                    onChange={(e) => setFormData({...formData, foodType: e.target.value as FoodType})}
                    className="w-full p-2 rounded-lg border"
                  >
                    <option value={FoodType.VEG}>Vegetarian</option>
                    <option value={FoodType.NON_VEG}>Non-Vegetarian</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input 
                    type="text" required placeholder="e.g. Biryani, Meal"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 rounded-lg border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity (Serves x people)</label>
                <input 
                  type="number" required
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                  className="w-full p-2 rounded-lg border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prep Time</label>
                  <input 
                    type="datetime-local" required
                    onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                    className="w-full p-2 rounded-lg border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Time</label>
                  <input 
                    type="datetime-local" required
                    onChange={(e) => setFormData({...formData, expiryTime: e.target.value})}
                    className="w-full p-2 rounded-lg border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pickup Location</label>
                <input 
                  type="text" required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full p-2 rounded-lg border"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-green-600 text-white font-bold rounded-xl mt-4 hover:bg-green-700"
              >
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
