export const IMAGES = {
  room1: "https://images.unsplash.com/photo-1667375185982-916aeb9ced63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  room2: "https://images.unsplash.com/photo-1549881567-c622c1080d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  room3: "https://images.unsplash.com/photo-1758523669073-edfbea249144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  building1: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  building2: "https://images.unsplash.com/photo-1762438440213-987c9a99d4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  woman1: "https://images.unsplash.com/photo-1767607740661-05e668190cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  woman2: "https://images.unsplash.com/photo-1770564513018-79915efba870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  woman3: "https://images.unsplash.com/photo-1769636929266-8057f2c5ed52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  man1: "https://images.unsplash.com/photo-1615724320397-9d4db10ec2a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  man2: "https://images.unsplash.com/photo-1762066436642-945a40f35097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  man3: "https://images.unsplash.com/photo-1758876204244-930299843f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
};

export interface Tenant {
  id: string;
  name: string;
  age: number;
  gender: string;
  photo: string;
  occupation: string;
  company?: string;
  fromCity: string;
  languages: string[];
  lifestyle: string[];
  interests: string[];
  workType: string;
  status: string;
  since?: string;
  lookingFrom?: string;
  aboutMe: string;
  sleepTime: string;
  wakeTime: string;
  guestPolicy: string;
  wfh: boolean;
  noiseLevel: string;
  cleanliness: string;
  food: string;
  vibeMatch: number;
}

export interface PGListing {
  id: string;
  name: string;
  area: string;
  city: string;
  distance: string;
  price: number;
  roomTypes: {
    single: { price: number; available: number };
    shared2: { price: number; available: number };
    shared3: { price: number; available: number };
  };
  images: string[];
  amenities: string[];
  allAmenities: Record<string, boolean>;
  rules: string[];
  tenantIds: string[];
  vibeTypes: string[];
  rating: number;
  reviews: { name: string; photo: string; rating: number; text: string; date: string }[];
  owner: { name: string; responseTime: string; rating: number; totalHosted: number; verified: boolean; active: boolean };
  location: { lat: number; lng: number; address: string; landmarks: string[] };
  saved?: boolean;
  bedsAvailable: number;
  gender: string;
}

export const tenants: Tenant[] = [
  {
    id: "t1",
    name: "Rahul",
    age: 24,
    gender: "Male",
    photo: IMAGES.man1,
    occupation: "Software Engineer",
    company: "Infosys",
    fromCity: "Pune",
    languages: ["Hindi", "English", "Marathi"],
    lifestyle: ["Night Owl 🦉", "Homebody 🏠", "Gym Freak 💪"],
    interests: ["Gaming 🎮", "Music 🎵", "Tech 💻"],
    workType: "Working Professional 💼",
    status: "Living here since Jan 2025",
    since: "Jan 2025",
    aboutMe: "Chill guy, love gaming and coding. Clean and respectful 🎮",
    sleepTime: "After 12am",
    wakeTime: "After 8am",
    guestPolicy: "Fine with guests",
    wfh: true,
    noiseLevel: "Moderate",
    cleanliness: "Very Neat",
    food: "Non-Veg",
    vibeMatch: 87,
  },
  {
    id: "t2",
    name: "Priya",
    age: 22,
    gender: "Female",
    photo: IMAGES.woman1,
    occupation: "Student",
    company: "BITS Pilani",
    fromCity: "Chennai",
    languages: ["Tamil", "English", "Hindi"],
    lifestyle: ["Early Bird 🌅", "Social Butterfly 🦋", "Traveller ✈️"],
    interests: ["Music 🎵", "Reading 📚", "Dancing 💃"],
    workType: "Student 🎓",
    status: "Looking to move in March 2025",
    lookingFrom: "March 2025",
    aboutMe: "Friendly and outgoing! Always up for exploring new places 🌍",
    sleepTime: "Before 11pm",
    wakeTime: "Before 7am",
    guestPolicy: "No guests please",
    wfh: false,
    noiseLevel: "Quiet",
    cleanliness: "Very Neat",
    food: "Veg",
    vibeMatch: 72,
  },
  {
    id: "t3",
    name: "Arjun",
    age: 26,
    gender: "Male",
    photo: IMAGES.man2,
    occupation: "Product Manager",
    company: "Swiggy",
    fromCity: "Delhi",
    languages: ["Hindi", "English"],
    lifestyle: ["Night Owl 🦉", "Foodie 🍕", "Minimalist"],
    interests: ["Movies 🎬", "Cooking 🍳", "Sports ⚽"],
    workType: "Working Professional 💼",
    status: "Living here since Aug 2024",
    since: "Aug 2024",
    aboutMe: "Foodie turned cook 🍳. Quiet but love good conversations.",
    sleepTime: "After 12am",
    wakeTime: "After 8am",
    guestPolicy: "Fine with guests",
    wfh: false,
    noiseLevel: "Quiet",
    cleanliness: "Moderate",
    food: "Non-Veg",
    vibeMatch: 65,
  },
  {
    id: "t4",
    name: "Sneha",
    age: 23,
    gender: "Female",
    photo: IMAGES.woman2,
    occupation: "UX Designer",
    company: "Flipkart",
    fromCity: "Hyderabad",
    languages: ["Telugu", "English", "Hindi"],
    lifestyle: ["Early Bird 🌅", "Gym Freak 💪", "Minimalist"],
    interests: ["Art 🎨", "Fitness 🏋️", "Tech 💻"],
    workType: "Working Professional 💼",
    status: "Living here since Mar 2025",
    since: "Mar 2025",
    aboutMe: "Design is life! Early riser and fitness enthusiast 💪",
    sleepTime: "Before 11pm",
    wakeTime: "Before 7am",
    guestPolicy: "Fine with guests",
    wfh: true,
    noiseLevel: "Quiet",
    cleanliness: "Very Neat",
    food: "Veg",
    vibeMatch: 92,
  },
  {
    id: "t5",
    name: "Vikram",
    age: 28,
    gender: "Male",
    photo: IMAGES.man3,
    occupation: "Data Scientist",
    company: "Amazon",
    fromCity: "Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    lifestyle: ["Night Owl 🦉", "Homebody 🏠", "Gym Freak 💪"],
    interests: ["Gaming 🎮", "Tech 💻", "Reading 📚"],
    workType: "Working Professional 💼",
    status: "Living here since Dec 2024",
    since: "Dec 2024",
    aboutMe: "Data nerd by day, gamer by night. Very clean and organized.",
    sleepTime: "After 12am",
    wakeTime: "After 8am",
    guestPolicy: "Prefer No Guests",
    wfh: true,
    noiseLevel: "Quiet",
    cleanliness: "Very Neat",
    food: "Non-Veg",
    vibeMatch: 78,
  },
  {
    id: "t6",
    name: "Ananya",
    age: 21,
    gender: "Female",
    photo: IMAGES.woman3,
    occupation: "Student",
    company: "IIM Bangalore",
    fromCity: "Kolkata",
    languages: ["Bengali", "Hindi", "English"],
    lifestyle: ["Social Butterfly 🦋", "Traveller ✈️", "Foodie 🍕"],
    interests: ["Dancing 💃", "Music 🎵", "Movies 🎬"],
    workType: "Student 🎓",
    status: "Looking to move in April 2025",
    lookingFrom: "April 2025",
    aboutMe: "Life of the party! Love making friends and exploring food 🌮",
    sleepTime: "After 12am",
    wakeTime: "After 8am",
    guestPolicy: "Fine with guests",
    wfh: false,
    noiseLevel: "Lively",
    cleanliness: "Moderate",
    food: "Both",
    vibeMatch: 68,
  },
];

export const pgListings: PGListing[] = [
  {
    id: "pg1",
    name: "Sunrise Premium PG",
    area: "Koramangala",
    city: "Bangalore",
    distance: "1.2 km",
    price: 8500,
    bedsAvailable: 2,
    gender: "Co-ed",
    roomTypes: {
      single: { price: 12000, available: 2 },
      shared2: { price: 8500, available: 3 },
      shared3: { price: 6000, available: 1 },
    },
    images: [IMAGES.room1, IMAGES.building1, IMAGES.room3],
    amenities: ["WiFi", "AC", "Meals", "Laundry", "CCTV"],
    allAmenities: {
      WiFi: true, AC: true, HotWater: true, Meals: true, Laundry: true,
      CCTV: true, Parking: false, PowerBackup: true, ROWater: true,
      CommonTV: true, Gym: false, Housekeeping: true,
    },
    rules: ["🚭 No Smoking", "🚫 No Alcohol", "✅ Guests Allowed (till 9pm)", "🔔 Gate Closes at 11pm", "🍖 Non-Veg Allowed"],
    tenantIds: ["t1", "t4", "t5"],
    vibeTypes: ["Night Owls 🦉", "Working Professionals 💼", "Gamers 🎮"],
    rating: 4.5,
    reviews: [
      { name: "Rahul M", photo: IMAGES.man1, rating: 5, text: "Best PG in Koramangala! Clean, spacious and the owner is very helpful.", date: "2 weeks ago" },
      { name: "Sneha K", photo: IMAGES.woman2, rating: 4, text: "Great location and amenities. Food quality could be better.", date: "1 month ago" },
      { name: "Arjun S", photo: IMAGES.man2, rating: 5, text: "The vibe matching feature helped me find great roommates!", date: "2 months ago" },
    ],
    owner: { name: "Ramesh", responseTime: "2 hours", rating: 4.7, totalHosted: 23, verified: true, active: true },
    location: { lat: 12.9352, lng: 77.6244, address: "123 Koramangala Main Road, 5th Block, Bangalore 560095", landmarks: ["500m from Koramangala Metro", "1km from Forum Mall", "2km from HSR Layout"] },
    saved: true,
  },
  {
    id: "pg2",
    name: "Green Nest PG",
    area: "Indiranagar",
    city: "Bangalore",
    distance: "2.4 km",
    price: 9500,
    bedsAvailable: 1,
    gender: "Male Only",
    roomTypes: {
      single: { price: 14000, available: 1 },
      shared2: { price: 9500, available: 2 },
      shared3: { price: 7000, available: 0 },
    },
    images: [IMAGES.room2, IMAGES.building2, IMAGES.room1],
    amenities: ["WiFi", "AC", "Hot Water", "Gym", "CCTV"],
    allAmenities: {
      WiFi: true, AC: true, HotWater: true, Meals: false, Laundry: true,
      CCTV: true, Parking: true, PowerBackup: true, ROWater: true,
      CommonTV: false, Gym: true, Housekeeping: true,
    },
    rules: ["🚭 No Smoking", "🚫 No Alcohol", "🚫 No Guests", "🔔 Gate Closes at 10pm"],
    tenantIds: ["t1", "t3", "t5"],
    vibeTypes: ["Early Birds 🌅", "Students 🎓", "Fitness Freaks 💪"],
    rating: 4.2,
    reviews: [
      { name: "Vikram", photo: IMAGES.man3, rating: 4, text: "Gym access is the best part! Great for fitness enthusiasts.", date: "3 weeks ago" },
      { name: "Arjun", photo: IMAGES.man2, rating: 4, text: "Good location near 100ft road. Very clean.", date: "5 weeks ago" },
    ],
    owner: { name: "Suresh", responseTime: "1 hour", rating: 4.5, totalHosted: 18, verified: true, active: false },
    location: { lat: 12.9784, lng: 77.6408, address: "45 CMH Road, Indiranagar, Bangalore 560038", landmarks: ["300m from Indiranagar Metro", "1.2km from 100ft Road"] },
    saved: false,
  },
  {
    id: "pg3",
    name: "Comfort Stay PG",
    area: "HSR Layout",
    city: "Bangalore",
    distance: "3.1 km",
    price: 7500,
    bedsAvailable: 3,
    gender: "Female Only",
    roomTypes: {
      single: { price: 11000, available: 1 },
      shared2: { price: 7500, available: 2 },
      shared3: { price: 5500, available: 1 },
    },
    images: [IMAGES.room3, IMAGES.building1, IMAGES.room2],
    amenities: ["WiFi", "Meals", "Hot Water", "Laundry", "CCTV"],
    allAmenities: {
      WiFi: true, AC: false, HotWater: true, Meals: true, Laundry: true,
      CCTV: true, Parking: false, PowerBackup: false, ROWater: true,
      CommonTV: true, Gym: false, Housekeeping: false,
    },
    rules: ["🚭 No Smoking", "🚫 No Alcohol", "✅ Guests Allowed (till 8pm)", "🔔 Gate Closes at 10pm", "🥗 Veg Only"],
    tenantIds: ["t2", "t4", "t6"],
    vibeTypes: ["Students 🎓", "Social Butterflies 🦋", "Music Lovers 🎵"],
    rating: 4.7,
    reviews: [
      { name: "Priya", photo: IMAGES.woman1, rating: 5, text: "Super safe and the owner aunty is so caring! Highly recommend.", date: "1 week ago" },
      { name: "Ananya", photo: IMAGES.woman3, rating: 5, text: "Food is amazing and the girls here are so friendly!", date: "3 weeks ago" },
    ],
    owner: { name: "Meena", responseTime: "30 min", rating: 4.9, totalHosted: 35, verified: true, active: true },
    location: { lat: 12.9116, lng: 77.6389, address: "67 HSR Layout 7th Sector, Bangalore 560102", landmarks: ["800m from HSR BDA Complex", "1.5km from Agara Lake"] },
    saved: true,
  },
  {
    id: "pg4",
    name: "Urban Nest PG",
    area: "Whitefield",
    city: "Bangalore",
    distance: "8.5 km",
    price: 6500,
    bedsAvailable: 4,
    gender: "Co-ed",
    roomTypes: {
      single: { price: 10000, available: 2 },
      shared2: { price: 6500, available: 3 },
      shared3: { price: 4800, available: 2 },
    },
    images: [IMAGES.building2, IMAGES.room1, IMAGES.room3],
    amenities: ["WiFi", "AC", "Parking", "CCTV", "Power Backup"],
    allAmenities: {
      WiFi: true, AC: true, HotWater: true, Meals: false, Laundry: false,
      CCTV: true, Parking: true, PowerBackup: true, ROWater: false,
      CommonTV: true, Gym: false, Housekeeping: false,
    },
    rules: ["🚭 No Smoking", "✅ Guests Allowed (till 10pm)", "🔔 Gate Closes at 11pm", "🍖 Non-Veg Allowed"],
    tenantIds: ["t1", "t3", "t5", "t6"],
    vibeTypes: ["Freelancers 🖥️", "Night Owls 🦉", "Tech Enthusiasts 💻"],
    rating: 4.0,
    reviews: [
      { name: "Vikram", photo: IMAGES.man3, rating: 4, text: "Good for IT professionals. Near ITPL and many tech companies.", date: "2 months ago" },
    ],
    owner: { name: "Kiran", responseTime: "4 hours", rating: 4.1, totalHosted: 12, verified: true, active: true },
    location: { lat: 12.9698, lng: 77.7499, address: "12 Whitefield Main Road, Bangalore 560066", landmarks: ["1km from ITPL", "500m from Forum Shantiniketan Mall"] },
    saved: false,
  },
];

export const currentUser = {
  id: "me",
  name: "Aditi",
  age: 23,
  gender: "Female",
  photo: IMAGES.woman2,
  phone: "+91 98765 43210",
  lifestyle: ["Early Bird 🌅", "Gym Freak 💪", "Social Butterfly 🦋"],
  interests: ["Music 🎵", "Art 🎨", "Fitness 🏋️"],
  workType: "Working Professional 💼",
  occupation: "Marketing Manager",
  company: "Razorpay",
  fromCity: "Hyderabad",
  languages: ["Telugu", "Hindi", "English"],
  aboutMe: "Creative soul, fitness enthusiast, always up for a good time! 🎨",
  lookingIn: "Bangalore",
  budget: [6000, 12000] as [number, number],
  roomType: "Shared 2-person",
  moveInDate: "Flexible",
  sleepTime: "Before 11pm",
  wakeTime: "Before 7am",
  guestPolicy: "Fine with guests",
  wfh: true,
  noiseLevel: "Moderate",
  cleanliness: "Very Neat",
  food: "Veg",
  profileComplete: 85,
  showToSeekers: true,
  showToOwners: true,
  savedPGs: ["pg1", "pg3"],
  vibeType: "Early Bird 🌅 + Fitness Enthusiast 💪 + Social Butterfly 🦋",
};

export const notifications = [
  { id: "n1", type: "roommate", icon: "🤝", title: "Priya liked your roommate profile at Sunshine PG", time: "2m ago", read: false },
  { id: "n2", type: "match", icon: "🎉", title: "You matched with Rahul at Green View PG!", time: "15m ago", read: false },
  { id: "n3", type: "roommate", icon: "👥", title: "2 new people are also looking at Koramangala PGs", time: "1h ago", read: false },
  { id: "n4", type: "pg", icon: "🏠", title: "A new bed opened up at your saved PG — Comfort Stay", time: "3h ago", read: true },
  { id: "n5", type: "pg", icon: "💰", title: "The price at Green Nest PG dropped to ₹7,500/mo", time: "5h ago", read: true },
  { id: "n6", type: "pg", icon: "✅", title: "Your visit to Sunrise PG is confirmed for 15th March, 11 AM", time: "1d ago", read: true },
  { id: "n7", type: "reminder", icon: "⏰", title: "You shortlisted 3 PGs — have you scheduled a visit yet?", time: "2d ago", read: true },
];

export const chatMatches = [
  {
    id: "c1",
    type: "match",
    person: tenants[3], // Sneha
    pgName: "Sunrise Premium PG",
    lastMessage: "You matched! Break the ice 🎉",
    time: "Just now",
    isNew: true,
  },
  {
    id: "c2",
    type: "liked_you",
    person: tenants[1], // Priya
    pgName: "Comfort Stay PG",
    lastMessage: "Priya showed interest!",
    time: "5m ago",
    isNew: true,
  },
  {
    id: "c3",
    type: "you_liked",
    person: tenants[0], // Rahul
    pgName: "Sunrise Premium PG",
    lastMessage: "Awaiting response...",
    time: "2h ago",
    isNew: false,
  },
  {
    id: "c4",
    type: "you_liked",
    person: tenants[5], // Ananya
    pgName: "Comfort Stay PG",
    lastMessage: "Awaiting response...",
    time: "1d ago",
    isNew: false,
  },
];
