
export enum UserRole {
  DONOR = 'DONOR',
  RECEIVER = 'RECEIVER'
}

export enum FoodType {
  VEG = 'Veg',
  NON_VEG = 'Non-Veg'
}

export interface FoodListing {
  id: string;
  donorId: string;
  donorName: string;
  foodType: FoodType;
  category: string;
  quantity: number; // serves X people
  prepTime: string;
  expiryTime: string;
  location: string;
  status: 'available' | 'claimed' | 'completed';
  trustScore: number;
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  orgName: string;
  contact: string;
  location: string;
}

export interface ImpactStats {
  peopleFed: number;
  donationsCompleted: number;
  activeDonors: number;
  foodSavedKg: number;
}
