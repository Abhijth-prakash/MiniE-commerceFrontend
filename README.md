# UrbanNest Frontend

UrbanNest is a modern e-commerce frontend built with React, focusing on performance, scalability, and user experience. The application provides product browsing, authentication interfaces, cart management, pagination, product ratings, and responsive UI components while following modern frontend development practices.

## Features

### User Features

- User Registration & Login
- Product Listing
- Product Search
- search with debouncing
- Product Filtering & Sorting
- Product Ratings Display
- Shopping Cart Management
- Checkout Interface
- Pagination for Product Browsing
- Responsive Design
- Protected Routes

### Performance & Optimization

- Lazy Loading using React Lazy and Suspense
- Code Splitting
- Optimized Component Rendering
- Error Boundaries for Graceful Error Handling

### Form Handling & Validation

- React Hook Form
- Zod Schema Validation
- Real-time Form Validation
- User-friendly Error Messages

### State Management

- Redux Toolkit
- Async Operations using createAsyncThunk
- Centralized State Management
- Loading and Error States

## Tech Stack

- React.js
- React Router DOM
- Redux Toolkit
- Redux Async Thunks (createAsyncThunk)
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- Vite

```

## Key Concepts Implemented

### Redux Async Thunks

The application uses Redux Toolkit's `createAsyncThunk` to handle asynchronous operations efficiently with built-in loading, success, and error states.

### Form Validation with Zod

Form validation is implemented using Zod schemas integrated with React Hook Form to provide scalable and type-safe validation.

### Lazy Loading

Pages are loaded only when required using React Lazy and Suspense, reducing the initial bundle size and improving performance.

### Error Boundaries

Custom Error Boundaries are used to catch runtime errors and prevent the entire application from crashing.

### Pagination

Pagination is implemented to efficiently manage large product collections and improve user experience by loading products page by page.

### Product Ratings

Products display ratings to help users evaluate items and make informed purchasing decisions.

### Protected Routes

Protected Routes ensure that authenticated users can access authorized sections of the application.

## Responsive Design

The application is optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

## Future Improvements

- Wishlist Functionality
- Product Reviews
- Dark Mode
- Advanced Filtering
- Enhanced Accessibility
- Product Recommendations

