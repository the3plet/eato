
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  defaultAddress: string;
}


export interface FoodCategory {
  id: string;
  name: string;
  image: string;
}


export interface Restaurant {
  id: string;
  name: string;
  location: string;
  travelTime: string;
  rating: number;
  image: string;
}

export interface Review {
  count: number; 
  star: number;  
}


export interface FoodItem {
  id: string;
  name: string;
  restaurantName: string;
  price: number;
  deliveryFree: boolean;
  review: Review;
  deliveryTime: string;
  image: string;
  tags?: string[]; 
}


export type CurrentUser = User;
