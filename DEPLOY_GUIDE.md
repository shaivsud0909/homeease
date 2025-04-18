## How to Deploy to Render.com

### Follow these steps ->

1. **Create a New Web Service on Render**:

   - Go to Render Dashboard → New → Web Service.
   - Connect your GitHub repository.
   - Set the build command then :
     ```plaintext
     cd frontend && npm install && npm run build && cd ../backend && npm install
     ```
   - Set the start command:
     ```plaintext
     cd backend && node server.js
     ```

2. **Add Environment Variables**:

   - Add the following variables:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

3. **Deploy**:
   - Click "Create Web Service" and wait for the deployment to complete.
