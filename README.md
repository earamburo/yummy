# 🌿 FreshPlate

**Smart Recipe & Grocery Management** — From Receipt to Recipe

FreshPlate is a React Native mobile app that uses computer vision to help you decide what to cook and reduce food waste. Scan your grocery receipts, track your pantry inventory, and discover recipes based on ingredients you already have.

![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK_52-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📱 Features

### Phase 1 (Current)
- **📄 Receipt Scanning** — Snap a photo of your grocery receipt, AI extracts all ingredients
- **🥬 Pantry Management** — Track ingredients across fridge, pantry, and freezer
- **🍳 Recipe Matching** — Discover recipes based on what you already have
- **⏰ Expiration Tracking** — Get alerts before food goes bad

### Phase 2 (Planned)
- **📸 Fridge Scanning** — Take a photo of your fridge, AI identifies ingredients
- **🔔 Smart Notifications** — Reminders to use expiring ingredients

### Phase 3 (Planned)
- **✅ Consumption Tracking** — Mark recipes as cooked, auto-update inventory
- **🛒 Smart Grocery Lists** — Auto-generate shopping lists based on favorite recipes
- **📊 Waste Analytics** — Track how much food (and money) you've saved

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/client) app on your phone (iOS or Android)
- API Keys (see [Configuration](#configuration))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/freshplate.git
cd freshplate

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your API keys

# Start the development server
npx expo start
```

### Running the App

**On your phone (recommended):**
1. Install Expo Go from App Store / Play Store
2. Scan the QR code from the terminal with Expo Go

**On emulator:**
```bash
# iOS (Mac only)
npx expo start --ios

# Android
npx expo start --android
```

**In browser (limited features):**
```bash
npx expo start --web
```

---

## ⚙️ Configuration

### Required API Keys

Create a `.env` file in the project root:

```env
# Google Cloud Vision API (for receipt scanning)
EXPO_PUBLIC_VISION_API_KEY=your_google_vision_api_key

# Spoonacular API (for recipe data)
EXPO_PUBLIC_SPOONACULAR_API_KEY=your_spoonacular_api_key
```

### Getting API Keys

#### Google Cloud Vision
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Cloud Vision API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Restrict the key to only Cloud Vision API

**Free tier:** 1,000 requests/month

#### Spoonacular
1. Sign up at [spoonacular.com/food-api](https://spoonacular.com/food-api)
2. Copy your API key from the dashboard

**Free tier:** 150 requests/day

---

## 📁 Project Structure

```
freshplate/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigator
│   │   ├── index.tsx      # Home screen
│   │   ├── pantry.tsx     # Pantry management
│   │   ├── recipes.tsx    # Recipe browser
│   │   └── settings.tsx   # Settings
│   ├── recipe/[id].tsx    # Recipe detail
│   └── scan.tsx           # Camera scanner
├── src/
│   ├── components/
│   │   ├── ui/            # Design system (Button, Card, etc.)
│   │   ├── recipe/        # Recipe components
│   │   ├── pantry/        # Pantry components
│   │   └── scanner/       # Camera components
│   ├── lib/
│   │   ├── api/           # API clients (Vision, Spoonacular)
│   │   ├── database/      # Local database (WatermelonDB)
│   │   └── utils/         # Helper functions
│   ├── stores/            # Zustand state stores
│   ├── hooks/             # Custom React hooks
│   ├── constants/         # Theme, config
│   └── types/             # TypeScript definitions
├── assets/                # Images, fonts
└── app.json              # Expo configuration
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | React Native + Expo | Cross-platform mobile |
| Language | TypeScript | Type safety |
| Navigation | Expo Router | File-based routing |
| State | Zustand | Global state management |
| Data Fetching | React Query | API caching & sync |
| Local DB | WatermelonDB | Offline-first storage |
| OCR | Google Cloud Vision | Receipt text extraction |
| Recipes | Spoonacular API | Recipe database |
| Styling | StyleSheet | Native styling |

---

## 🎨 Design System

FreshPlate uses a **"Fresh, Organic Minimalism"** design language.

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Forest Green | `#22543d` | Primary, CTAs |
| Fresh Mint | `#38a169` | Success, highlights |
| Warm Cream | `#fffaf0` | Background |
| Tomato Red | `#e53e3e` | Errors, expiring items |

### Typography

- **Display:** DM Serif Display
- **Body:** Plus Jakarta Sans
- **Mono:** JetBrains Mono (quantities)

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- receiptParser.test.ts
```

---

## 📦 Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for both platforms
eas build --platform all

# Build for specific platform
eas build --platform ios
eas build --platform android
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new files
- Follow the existing component patterns
- Add types to `src/types/index.ts`
- Use the theme constants from `src/constants/theme.ts`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) — Amazing React Native tooling
- [Spoonacular](https://spoonacular.com/) — Comprehensive recipe API
- [Google Cloud Vision](https://cloud.google.com/vision) — Powerful OCR
- Recipe icon by [Freepik](https://www.freepik.com/)

---

## 📞 Support

- 📧 Email: support@freshplate.app
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/freshplate/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/YOUR_USERNAME/freshplate/discussions)

---

<p align="center">
  Made with 💚 to reduce food waste
</p>