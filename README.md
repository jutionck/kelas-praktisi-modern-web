# Wishlist App - Kelas Praktisi Modern Web

A full-stack wishlist application built with React.js and Express.js as part of the Modern Web Development Practical Class. This project demonstrates modern web development practices with clean architecture, Indonesian currency support, and comprehensive feature set.

## Project Structure

```
kelas-praktisi-modern-web/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── controllers/       # HTTP request handlers
│   │   ├── services/          # Business logic
│   │   ├── models/            # Data models & validation
│   │   ├── routes/            # API route definitions
│   │   ├── middleware/        # Request middleware
│   │   ├── config/            # Configuration & database
│   │   ├── utils/             # Utility functions
│   │   ├── app.js             # Express app configuration
│   │   └── server.js          # Server entry point
│   ├── .gitignore
│   ├── .eslintrc.json
│   └── package.json
├── frontend/                   # React.js client application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── WishlistForm.jsx
│   │   │   ├── WishlistItem.jsx
│   │   │   └── CurrencyInput.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useWishlist.js
│   │   │   └── useDebounce.js
│   │   ├── services/          # API communication
│   │   │   ├── apiClient.js
│   │   │   └── wishlistService.js
│   │   ├── utils/             # Utility functions
│   │   │   └── currency.js
│   │   ├── constants/         # App constants
│   │   │   └── index.js
│   │   ├── App.jsx            # Main application component
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md                   # Project documentation
```

## Features

### Backend API (Clean Architecture)

- **Clean Architecture**: Layered structure with controllers, services, models
- **RESTful API**: Express.js with proper HTTP status codes
- **In-memory Database**: Array-based storage with full CRUD operations
- **Input Validation**: Comprehensive validation with sanitization
- **Error Handling**: Async error handling with user-friendly messages
- **Security**: Rate limiting, CORS, request logging
- **Currency Support**: Indonesian Rupiah parsing and validation
- **Middleware**: Authentication-ready, logging, validation

### Frontend React App (Modern Architecture)

- **Vite**: Lightning-fast development and optimized builds
- **Clean Architecture**: Hooks, services, and component separation
- **Custom Hooks**: `useWishlist` for state management, `useDebounce` for performance
- **Currency Input**: Real-time Indonesian Rupiah formatting
- **Advanced UI**: Search, filtering, sorting, priority system
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Real-time validation with error handling
- **Optimistic Updates**: Immediate UI feedback with error recovery
- **Done System**: Mark items as completed with visual indicators

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:9000`

### Frontend Setup (Vite)

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000` with hot module replacement

## API Endpoints

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| GET    | `/api/wishlist`            | Get all wishlist items   |
| GET    | `/api/wishlist/:id`        | Get single wishlist item |
| POST   | `/api/wishlist`            | Create new wishlist item |
| PUT    | `/api/wishlist/:id`        | Update wishlist item     |
| DELETE | `/api/wishlist/:id`        | Delete wishlist item     |
| PATCH  | `/api/wishlist/:id/toggle` | Toggle done status       |
| GET    | `/health`                  | Health check endpoint    |

## Wishlist Item Schema

```javascript
{
  id: "uuid",
  title: "string (required)",
  description: "string (required)",
  price: "number (default: 0)", // In Indonesian Rupiah
  category: "string (default: 'General')", // General, Electronics, Books, etc.
  priority: "string (default: 'medium')", // low, medium, high
  done: "boolean (default: false)", // Completion status
  createdAt: "ISO string",
  updatedAt: "ISO string"
}
```

## Learning Objectives

This project demonstrates:

- **Clean Architecture**: Separation of concerns with layered structure
- **Modern Web Development**: Latest React and Node.js practices
- **Full-stack Architecture**: Frontend and backend integration
- **RESTful API Design**: Proper HTTP methods and status codes
- **State Management**: Custom hooks and service layer pattern
- **Currency Handling**: Indonesian Rupiah input and formatting
- **UI/UX Design**: Responsive design with advanced filtering
- **Error Handling**: Comprehensive validation and user feedback
- **Security**: Input sanitization and rate limiting
- **Performance**: Debouncing, lazy loading, and optimization

## Development Commands

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm test` - Run tests

### Frontend (Vite)

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Architecture Highlights

### Clean Architecture Benefits

- **Maintainability**: Clear separation of concerns
- **Testability**: Each layer can be tested independently
- **Scalability**: Easy to add new features without breaking existing code
- **Reusability**: Services and utilities can be reused across components

### Currency System

- **Real-time Formatting**: Input shows "Rp 1.000.000" as user types
- **Validation**: Comprehensive validation for Indonesian currency
- **Display**: Consistent Rupiah formatting throughout the app
- **Parsing**: Handles various input formats (with/without Rp, dots, spaces)

### Advanced Features

- **Search & Filter**: Real-time search with debouncing
- **Priority System**: High, medium, low with color coding
- **Done Status**: Mark items as completed with visual indicators
- **Responsive Design**: Works perfectly on mobile and desktop
- **Error Handling**: User-friendly error messages and recovery

## Next Steps

To extend this application, consider adding:

- **User Authentication**: Login/register system
- **Database**: PostgreSQL or MongoDB for data persistence
- **Image Uploads**: Photos for wishlist items
- **Social Features**: Share wishlists with friends
- **Notifications**: Email or push notifications
- **Analytics**: Track user behavior and preferences
- **Mobile App**: React Native version
- **TypeScript**: Full TypeScript support
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline
