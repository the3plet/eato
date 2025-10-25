// ===================
// User Type
// ===================
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  defaultAddress: string;
}

// ===================
// Food Category Type
// ===================
export interface FoodCategory {
  id: string;
  name: string;
  image: string;
}

// ===================
// Restaurant Type
// ===================
export interface Restaurant {
  id: string;
  name: string;
  location: string;
  travelTime: string;
  rating: number;
  image: string;
}

// ===================
// Review Type
// ===================
export interface Review {
  count: number; // number of reviews
  star: number;  // average rating
}

// ===================
// Food Item Type
// ===================
export interface FoodItem {
  id: string;
  name: string;
  restaurantName: string;
  price: number;
  deliveryFree: boolean;
  review: Review;
  deliveryTime: string;
  image: string;
}

// ===================
// Optional Current User Type (could reuse User)
// ===================
export type CurrentUser = User;
