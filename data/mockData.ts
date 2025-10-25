import { User, FoodCategory, Restaurant, FoodItem, CurrentUser } from "@/types/mockType";

// ===================
// Users
// ===================
export const users: User[] = [
  {
    id: "u1",
    username: "JohnDoe",
    email: "john@example.com",
    password: "password123",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    defaultAddress: "123 Main Street, Cityville",
  },
  {
    id: "u2",
    username: "JaneSmith",
    email: "jane@example.com",
    password: "password456",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    defaultAddress: "456 Oak Avenue, Townsville",
  },
];

// ===================
// Food Categories
// ===================
export const foodCategories: FoodCategory[] = [
  { id: "c1", name: "Pizza", image: "https://source.unsplash.com/80x80/?pizza" },
  { id: "c2", name: "Burger", image: "https://source.unsplash.com/80x80/?burger" },
  { id: "c3", name: "Sushi", image: "https://source.unsplash.com/80x80/?sushi" },
  { id: "c4", name: "Desserts", image: "https://source.unsplash.com/80x80/?dessert" },
  { id: "c5", name: "Drinks", image: "https://source.unsplash.com/80x80/?drink" },
];

// ===================
// Top Restaurants
// ===================
export const topRestaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Pizza Palace",
    location: "Downtown",
    travelTime: "15 mins",
    rating: 4.5,
    image: "https://source.unsplash.com/200x150/?restaurant,pizza",
  },
  {
    id: "r2",
    name: "Burger Hub",
    location: "City Center",
    travelTime: "10 mins",
    rating: 4.2,
    image: "https://source.unsplash.com/200x150/?restaurant,burger",
  },
  {
    id: "r3",
    name: "Sushi World",
    location: "Riverside",
    travelTime: "20 mins",
    rating: 4.8,
    image: "https://source.unsplash.com/200x150/?restaurant,sushi",
  },
];

// ===================
// Trending Food Items
// ===================
export const trendingFoodItems: FoodItem[] = [
  {
    id: "f1",
    name: "Margherita Pizza",
    restaurantName: "Pizza Palace",
    price: 8.99,
    deliveryFree: true,
    review: { count: 124, star: 4.5 },
    deliveryTime: "30-40 mins",
    image: "https://source.unsplash.com/200x150/?pizza",
  },
  {
    id: "f2",
    name: "Cheeseburger",
    restaurantName: "Burger Hub",
    price: 6.99,
    deliveryFree: false,
    review: { count: 98, star: 4.2 },
    deliveryTime: "20-30 mins",
    image: "https://source.unsplash.com/200x150/?burger",
  },
  {
    id: "f3",
    name: "Salmon Sushi",
    restaurantName: "Sushi World",
    price: 12.99,
    deliveryFree: true,
    review: { count: 76, star: 4.8 },
    deliveryTime: "25-35 mins",
    image: "https://source.unsplash.com/200x150/?sushi",
  },
  {
    id: "f4",
    name: "Chocolate Cake",
    restaurantName: "Dessert Delight",
    price: 5.99,
    deliveryFree: true,
    review: { count: 142, star: 4.7 },
    deliveryTime: "15-25 mins",
    image: "https://source.unsplash.com/200x150/?dessert",
  },
];

// ===================
// Current Logged-in User
// ===================
export const currentUser: CurrentUser = {
  id: "u1",
  username: "JohnDoe",
  email: "john@example.com",
  password: "password123",
  profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  defaultAddress: "123 Main Street, Cityville",
};
