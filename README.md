Deployed url : cloudbuddy-1.vercel.app

---

# 🌤️ CloudBuddy - Your Modern Weather Companion

CloudBuddy is a modern, responsive weather app built using **Next.js** and **Tailwind CSS**, powered by the **OpenWeather API**. It provides real-time weather updates, hourly and daily forecasts with animated visual backgrounds, and a smooth, glassmorphic UI.

## 🚀 Features

- 🌎 **Current Weather Info** by city
- 🕐 **Hourly & 7-Day Forecasts** with clear icons and temperature
- 🌈 **Animated Weather Cards** powered by **Framer Motion** that change based on weather conditions
- 🔍 **Recent Search History** with UI to revisit recent city searches
- 🎨 **Minimalist Glassmorphism & Neumorphism UI** with dynamic themes
- 🌗 **Dark/Light Mode Compatible**
- 📱 **Mobile Responsive**

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API**: [OpenWeather API](https://openweathermap.org/api)
- **Image Optimization**: [Next/Image](https://nextjs.org/docs/api-reference/next/image)

---

## 🔧 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/cloudbuddy.git
   cd cloudbuddy
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Setup Environment Variables**
   Create a `.env.local` file in the root and add:
   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser 🚀

---

## 🧱 Project Structure

```bash
.
├── components
│   ├── Home
│   │   ├── Hero.tsx             # Main city search + weather display
│   │   ├── ForeCast
│   │   │   ├── DayForecast.tsx  # 7-day forecast with styled cards
│   │   │   └── HourForecast.tsx # Hourly forecast grid
│   │   └── RecentSearches.tsx   # Recent cities list
├── app
│   ├── layout.tsx
│   └── page.tsx                 # Root page with Hero and Forecasts
├── lib
│   └── fetchWeather.ts          # API calls to OpenWeather
├── styles
│   └── globals.css
├── public
└── .env.local                   # API key (ignored from version control)
```

---

## 📦 APIs Used

### 🌤️ OpenWeather API

- **Current Weather**:  
  `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric`

- **One Call Forecast API** (daily/hourly):  
  `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric`

---

## 🧠 Design Decisions

- **Glassmorphism & Neumorphism**: Used selectively for modern aesthetics and depth without cluttering the UI.
- **Weather-based Background Animations**: Helps enhance user experience through intuitive visual feedback.
- **Responsive Grid Forecasts**: Day and hour forecasts are displayed in 1 or 2-column responsive layouts.

---

## 📱 Future Enhancements (Optional)

- 🧪 Add Air Quality & UV Index using OpenWeather's pollution API.
- 🌍 Add Geo-location based default weather on load.
- 🗺️ Integrate weather maps for radar or precipitation.
- 📈 Include interactive charts for hourly temperature trends.

---

## 🤝 Contributing

PRs and suggestions are welcome! Please fork the repo, create a new branch, and submit a pull request.

---

## 📄 License

MIT License © 2025 Shivam Saurav  
This is an educational and personal project. Data provided by OpenWeather API.

---

## 🙌 Acknowledgements

- [OpenWeather API](https://openweathermap.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by Shivam Saurav
```
