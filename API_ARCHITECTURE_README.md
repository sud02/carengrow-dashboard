# Carengrow Dashboard - API Architecture

This document explains the API-ready architecture implemented for the Carengrow Dashboard application.

## 🏗️ Architecture Overview

The application has been refactored to be fully API-ready while maintaining backward compatibility with mock data during development. The architecture follows these key principles:

### 1. **Layered Architecture**
- **Presentation Layer**: React components with TypeScript
- **State Management Layer**: React Context for global state
- **Service Layer**: API service classes with error handling
- **Configuration Layer**: Environment-specific settings

### 2. **API-First Design**
- All data fetching is abstracted through service layers
- Components are data-agnostic and work with any data source
- Graceful fallbacks to mock data when APIs are unavailable

## 📁 Project Structure

```
src/
├── services/
│   └── api.ts                 # Main API service layer
├── contexts/
│   └── AppContext.tsx         # Global state management
├── components/
│   ├── ui/
│   │   └── loading.tsx        # Loading states and error handling
│   └── [components]           # Refactored components
├── config/
│   └── environments.ts        # Environment configuration
└── [other files]
```

## 🚀 Key Features Implemented

### 1. **Comprehensive API Service Layer** (`src/services/api.ts`)
- TypeScript interfaces for all API responses
- Error handling with custom ApiError class
- Timeout and retry configurations
- Mock data fallbacks for development

### 2. **Global State Management** (`src/contexts/AppContext.tsx`)
- React Context for application-wide state
- Loading and error state management
- Data fetching actions with proper error handling
- Custom hooks for specific data needs

### 3. **Loading & Error Handling** (`src/components/ui/loading.tsx`)
- Consistent loading states across the application
- Error boundaries for graceful error handling
- Retry mechanisms for failed requests
- User-friendly error messages

### 4. **Environment Configuration** (`src/config/environments.ts`)
- Environment-specific settings (dev/staging/prod)
- Feature flags for different environments
- API endpoint configuration
- Debug and logging controls

## 🔧 Configuration

### Environment Variables

Copy the appropriate example file and customize:

```bash
# For development
cp env.development.example .env.development

# For staging
cp env.staging.example .env.staging

# For production
cp env.production.example .env.production
```

### Key Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_ENVIRONMENT` | Current environment | `development` |
| `VITE_API_BASE_URL` | API base URL | `http://localhost:3001/api` |
| `VITE_USE_MOCK_DATA` | Use mock data instead of API | `true` (dev), `false` (prod) |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` |
| `VITE_API_RETRIES` | Number of retry attempts | `1` (dev), `3` (prod) |

## 📊 API Endpoints

The application expects these API endpoints:

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details

### Map Data
- `GET /api/projects/:id/children-locations` - Child locations for map
- `GET /api/projects/:id/villages` - Village data

### Analytics
- `GET /api/projects/:id/analytics/monthly-screenings` - Monthly screening data
- `GET /api/projects/:id/analytics/delay-tracking` - Delay tracking data
- `GET /api/projects/:id/analytics/referrals` - Referral analytics
- `GET /api/projects/:id/analytics/top-performers` - Top performers

### Children
- `GET /api/children/:id` - Child profile
- `GET /api/children/:id/screening-history` - Screening history
- `GET /api/children/:id/timeline` - Activity timeline
- `GET /api/children/search` - Search children

## 🔄 Data Flow

1. **User Interaction** → Component triggers action
2. **Context Action** → Dispatches loading state + API call
3. **API Service** → Makes HTTP request with error handling
4. **Response Handling** → Updates context state or shows error
5. **Component Re-render** → Displays new data or error state

## 🛠️ Development Workflow

### Using Mock Data (Development)
```typescript
// Automatically uses mock data when API is unavailable
const apiService = getApiService();
const projectData = await apiService.getProjectData(projectId);
```

### Using Real API (Production)
```typescript
// Uses real API endpoints
const apiService = getApiService();
const projectData = await apiService.getProjectData(projectId);
```

### Adding New API Endpoints

1. **Define Types** in `src/services/api.ts`
2. **Add Method** to `ApiService` class
3. **Add Mock Method** to `mockApiService`
4. **Create Context Action** in `AppContext.tsx`
5. **Use in Components** via context hooks

## 🎯 Component Refactoring Pattern

### Before (Mock Data)
```typescript
const mockData = [/* hardcoded data */];

export function MyComponent() {
  return <div>{mockData.map(item => ...)}</div>;
}
```

### After (API-Ready)
```typescript
export function MyComponent() {
  const { data, loading, error } = useContextData();

  if (loading) return <LoadingCard />;
  if (error) return <ErrorAlert error={error} />;

  return <div>{data.map(item => ...)}</div>;
}
```

## 📈 Benefits

### ✅ **Zero Breaking Changes**
- Existing functionality preserved
- Gradual migration path
- Backward compatibility maintained

### ✅ **Production Ready**
- Proper error handling
- Loading states
- Timeout and retry logic
- Environment-specific configurations

### ✅ **Developer Experience**
- TypeScript for type safety
- Hot reloading preserved
- Debug logging in development
- Mock data for rapid development

### ✅ **Scalable Architecture**
- Clean separation of concerns
- Reusable service layer
- Extensible configuration
- Performance optimizations ready

## 🚀 Next Steps

1. **Set up API Server** - Create the backend API endpoints
2. **Database Integration** - Connect to actual data sources
3. **Authentication** - Add user authentication and authorization
4. **Caching** - Implement data caching strategies
5. **Real-time Updates** - Add WebSocket support for live data
6. **Testing** - Add comprehensive test coverage

## 📝 Migration Guide

To migrate from mock data to real API:

1. **Update Environment**: Set `VITE_USE_MOCK_DATA=false`
2. **Configure API URL**: Update `VITE_API_BASE_URL`
3. **Implement Endpoints**: Build the backend API
4. **Test Integration**: Verify all endpoints work correctly
5. **Deploy**: Roll out to staging/production

The application will automatically switch between mock and real data based on the environment configuration!
