const { Post } = require('../models');

const postData = [
    {
        mushroom_name: 'Portobello mushroom',
        description: 'Portobellos are the final full-grown stage of the button mushroom’s life.',
        latitude: 39.952583,
        longitude: -75.165222,
        weather: {
            "lat": 39.952583,
            "lon": -75.165222,
            "timezone": "America/Philadelphia",
            "timezone_offset": -21600,
            "current": {
                "dt": 1595243443,
                "sunrise": 1608124431,
                "sunset": 1608160224,
                "temp": 274.75,
                "feels_like": 270.4,
                "pressure": 1017,
                "humidity": 96,
                "dew_point": 274.18,
                "uvi": 0,
                "clouds": 90,
                "visibility": 6437,
                "wind_speed": 3.6,
                "wind_deg": 320,
                "weather": [
                    {
                        "id": 701,
                        "main": "Mist",
                        "description": "mist",
                        "icon": "50n"
                    }
                ]
            },
        },
        user_id: 1
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;