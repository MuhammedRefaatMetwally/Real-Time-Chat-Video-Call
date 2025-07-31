# Stream Chat Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Stream Chat Configuration
VITE_STREAM_API_KEY=your_stream_api_key_here

# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

## Getting Your Stream API Key

1. Go to [Stream Dashboard](https://dashboard.getstream.io/)
2. Create a new app or select an existing one
3. Copy your API Key from the dashboard
4. Replace `your_stream_api_key_here` with your actual API key

## Backend Requirements

Make sure your backend has the following endpoint:

```
GET /api/chat/token
```

This endpoint should:
- Authenticate the user
- Generate a Stream token for the authenticated user
- Return the token in the format: `{ token: "stream_token_here" }`

## Troubleshooting

### Common Issues:

1. **"Stream API key is missing"**
   - Check that your `.env` file exists and has `VITE_STREAM_API_KEY` set
   - Make sure the environment variable name is correct (not `VITE_STREAM_KEY`)

2. **"Failed to connect to chat"**
   - Verify your Stream API key is valid
   - Check that your backend `/chat/token` endpoint is working
   - Ensure the user is properly authenticated

3. **"Authentication required"**
   - Make sure the user is logged in
   - Check that your backend is sending the correct authentication headers

## Testing the Setup

1. Start your development server: `npm run dev`
2. Log in to your application
3. Navigate to a chat page
4. Check the browser console for any error messages
5. Verify that messages can be sent and received

## Stream Chat Features

The implementation includes:
- Real-time messaging
- Online/offline status
- Message threads
- Voice and video call links
- Custom UI styling
- Error handling and retry logic
- Proper cleanup on component unmount 