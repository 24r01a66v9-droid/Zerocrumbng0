
import React from 'react';
import { FoodListing, FoodType, ImpactStats, User, UserRole } from './types';

export const INITIAL_IMPACT_STATS: ImpactStats = {
  peopleFed: 12450,
  donationsCompleted: 842,
  activeDonors: 156,
  foodSavedKg: 3120
};

export const MOCK_DONORS: User[] = [
  { id: 'd1', username: 'grand_hotel', role: UserRole.DONOR, orgName: 'The Grand Palace Hotel', contact: '9876543210', location: 'Downtown' },
  { id: 'd2', username: 'spicy_bites', role: UserRole.DONOR, orgName: 'Spicy Bites Restaurant', contact: '9876543211', location: 'East Wing' }
];

export const MOCK_LISTINGS: FoodListing[] = [
  {
    id: 'l1',
    donorId: 'd1',
    donorName: 'The Grand Palace Hotel',
    foodType: FoodType.VEG,
    category: 'Rice & Curry',
    quantity: 50,
    prepTime: '2023-10-24T12:00:00',
    expiryTime: '2023-10-24T20:00:00',
    location: '123 Luxury Ave, Downtown',
    status: 'available',
    trustScore: 4.8
  },
  {
    id: 'l2',
    donorId: 'd2',
    donorName: 'Spicy Bites Restaurant',
    foodType: FoodType.NON_VEG,
    category: 'Biryani',
    quantity: 30,
    prepTime: '2023-10-24T14:30:00',
    expiryTime: '2023-10-24T22:00:00',
    location: '45 Foodie Lane, East Wing',
    status: 'available',
    trustScore: 4.5
  }
];

export const Icons = {
  Food: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a3 3 0 0 0-3-3H5a2 2 0 0 0-2 2v14c0 .6.4 1 1 1h12a2 2 0 0 0 2-2V8Z"/><path d="M10 2v3"/><path d="M14 2v3"/><path d="M6 2v3"/></svg>
  ),
  People: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  )
};
