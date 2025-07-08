// src/data/events.js
import farmersMarket from '../assets/images/events/farmers_market.jpg';
import flowerArrangement from '../assets/images/events/flower_arrangement.jpg';
import foodFestival from '../assets/images/events/food_festival.jpg';
import herbGardenTour from '../assets/images/events/herb_garden_tour.jpg';
import herbWorkshop from '../assets/images/events/herb_workshop.jpg';
import summerHarvest from '../assets/images/events/summer_harvest.jpg';

export const eventsData = [
    {
        id: 1,
        title: "Farmers Market Grand Opening",
        date: "March 15, 2025",
        time: "9:00 AM - 2:00 PM",
        description: "Join us for the grand opening of our weekly farmers market featuring fresh produce, artisanal goods, and live music.",
        image: farmersMarket, // Direct image import reference
        link: "/events/farmers-market"
    },
    {
        id: 2,
        title: "Spring Flower Arrangement Workshop",
        date: "April 5, 2025",
        time: "10:00 AM - 12:00 PM",
        description: "Learn professional floral arrangement techniques using seasonal blooms from our gardens.",
        image: flowerArrangement,
        link: "/events/flower-arrangement"
    },
    {
        id: 3,
        title: "Herb Gardening Workshop",
        date: "April 12, 2025",
        time: "1:00 PM - 3:00 PM",
        description: "Hands-on workshop teaching cultivation and uses of various herbs from our garden.",
        image: herbWorkshop,
        link: "/events/herb-workshop"
    },
    {
        id: 4,
        title: "Herb Garden Tour",
        date: "April 19, 2025",
        time: "2:00 PM - 4:00 PM",
        description: "Guided tour through our extensive herb gardens with tea tasting included.",
        image: herbGardenTour,
        link: "/events/herb-garden-tour"
    },
    {
        id: 5,
        title: "Ethiopian Food Festival",
        date: "May 3, 2025",
        time: "11:00 AM - 7:00 PM",
        description: "Experience authentic Ethiopian cuisine made with ingredients from our farm.",
        image: foodFestival,
        link: "/events/food-festival"
    },
    {
        id: 6,
        title: "Summer Harvest Celebration",
        date: "June 21, 2025",
        time: "4:00 PM - 8:00 PM",
        description: "Celebrate the summer solstice with farm-fresh food, music, and activities.",
        image: summerHarvest,
        link: "/events/summer-harvest"
    }
];