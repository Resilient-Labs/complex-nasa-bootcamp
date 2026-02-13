# 🌌 NASA Astronomy Picture of the Day

A web application that fetches NASA's Astronomy Picture of the Day (APOD) based on a user-selected date. View stunning space images and videos with detailed descriptions!

## ✨ Features

- 📅 Search by date to find NASA's picture/video from any day
- 🖼️ Display high-definition images from space
- 🎥 Support for video content
- 📝 Detailed explanations for each celestial image
- 📱 Responsive design for mobile and desktop
- 🎨 Beautiful space-themed interface

## 🚀 How It Works

1. Enter a date in the format `YYYY-MM-DD`
2. Click "Get Picture" button
3. View the astronomical image or video from that date
4. Read the description to learn more about what you're seeing

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling and responsive design
- **JavaScript (ES6)** - API calls and DOM manipulation
- **NASA APOD API** - Data source

## 📂 File Structure

```
nasa-api/
├── index.html          # Main HTML structure
├── css/
│   ├── normalize.css   # CSS reset
│   └── style.css       # Custom styling
├── js/
│   └── main.js         # API logic and functionality
└── img/
    └── background.jpg  # Background image
```

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nasa-api
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies needed!

3. **Get your own API key** (optional)
   - Visit [NASA API Portal](https://api.nasa.gov/)
   - Sign up for a free API key
   - Replace the API key in `main.js`

## 💡 Usage Example

```
Input: 2024-01-15
Result: View NASA's featured astronomy content from January 15, 2024
```

## 🌟 API Information

This project uses NASA's **Astronomy Picture of the Day (APOD)** API:
- **Endpoint**: `https://api.nasa.gov/planetary/apod`
- **Parameters**: date, api_key
- **Response**: Image/video URL, title, and explanation

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Desktop (default)
- Mobile devices (max-width: 430px)

## 🎯 Future Enhancements

- Date picker for easier date selection
- Random date button
- Favorites/bookmarking system
- Share functionality
- Image download option
- Date range browsing

## 🐛 Known Issues

- Video playback may vary by browser
- API has rate limits on the demo key

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Credits

- **NASA API** - Providing free access to space imagery
- **Background image** - Space-themed design elements

---

*Made with 🌟 by Abdirahman Mohamed*
