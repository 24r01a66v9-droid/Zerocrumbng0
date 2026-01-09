
import React from 'react';
import { ImpactStats } from '../types';
import { Icons } from '../constants';

const ImpactStatsSection: React.FC<{ stats: ImpactStats }> = ({ stats }) => {
  return (
    <div className="bg-green-600 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="flex justify-center"><Icons.People /></div>
            <p className="text-3xl font-bold">{stats.peopleFed.toLocaleString()}</p>
            <p className="text-sm uppercase tracking-wider opacity-80">People Fed</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center"><Icons.Food /></div>
            <p className="text-3xl font-bold">{stats.donationsCompleted.toLocaleString()}</p>
            <p className="text-sm uppercase tracking-wider opacity-80">Donations Done</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center"><Icons.Star /></div>
            <p className="text-3xl font-bold">{stats.activeDonors.toLocaleString()}</p>
            <p className="text-sm uppercase tracking-wider opacity-80">Active Donors</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center"><Icons.Location /></div>
            <p className="text-3xl font-bold">{stats.foodSavedKg.toLocaleString()}kg</p>
            <p className="text-sm uppercase tracking-wider opacity-80">Food Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStatsSection;
