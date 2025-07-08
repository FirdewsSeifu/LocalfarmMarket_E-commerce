// Simulates API call to submit contact form
export const submitContactForm = async (formData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random success/failure for demo purposes
    // In a real app, this would be a real API call
    const isSuccess = Math.random() > 0.2; // 80% success rate
    
    if (isSuccess) {
      // In a real app, you would return the actual response
      console.log('Form submitted:', formData);
      return { status: 200, message: 'Message sent successfully' };
    } else {
      // Simulate error
      throw new Error('Failed to send message');
    }
  };
  
  // Mock function to get contact info
  export const getContactInfo = async () => {
    return {
      email: "support@localfarmmarket.com",
      phone: "+123 456 7890",
      address: "123 Farm Road, Agricultural City",
      hours: "Mon-Fri: 9am-5pm",
      socialMedia: {
        facebook: "https://facebook.com/localfarmmarket",
        instagram: "https://instagram.com/localfarmmarket",
        twitter: "https://twitter.com/localfarmmarket"
      }
    };
  };