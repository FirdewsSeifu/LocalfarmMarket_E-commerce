export const mockUsers = [
    {
      id: 1,
      name: "Farmer John",
      email: "farmer@example.com",
      password: "farm123",
      role: "seller",
      bio: "Organic vegetable farmer with 10 years experience",
      location: "Geberew, Ethiopia"
    },
    {
      id: 2,
      name: "Local Buyer",
      email: "buyer@example.com",
      password: "buy123",
      role: "buyer",
      bio: "Local restaurant owner looking for fresh ingredients",
      location: "Addis Ababa, Ethiopia"
    },
    {
      id: 3,
      name: "Market Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      bio: "Geberew Market Administrator",
      location: "Geberew, Ethiopia"
    },
    {
      id: 4,
      name: "Dairy Producer",
      email: "dairy@example.com",
      password: "milk123",
      role: "seller",
      bio: "Specializing in organic dairy products",
      location: "Debre Zeit, Ethiopia"
    }
  ];
  
  export const validateUser = (email, password) => {
    return mockUsers.find(user => 
      user.email === email && user.password === password
    );
  };