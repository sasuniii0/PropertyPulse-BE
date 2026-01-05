# PropertyPulse Backend API

A robust RESTful API built with Node.js, Express, and TypeScript for the PropertyPulse real estate platform. Features include authentication, property management, payment processing, AI-powered analytics, and email notifications.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Third-Party Integrations](#third-party-integrations)
- [Security](#security)
- [Contributing](#contributing)

## Features

### Core Functionality
- **Authentication & Authorization:** JWT-based auth with role-based access control
- **Property Management:** Complete CRUD operations for property listings
- **User Management:** Admin, Agent, and Client role management
- **Payment Processing:** Stripe integration for agent premium listings
- **File Upload:** Cloudinary integration for image storage
- **Email Service:** Automated email notifications via SendGrid/Nodemailer
- **AI Integration:** Google Generative AI and OpenAI for property insights
- **Analytics:** Comprehensive market analytics and reporting
- **PDF Generation:** Dynamic PDF report generation with PDFKit

### Advanced Features
- Property comparison engine
- Inquiry management system
- Saved properties functionality
- Stripe webhook handling
- Real-time property analytics
- Email notifications for inquiries and logins
- Market trend analysis
- Agent performance tracking

## Tech Stack

- **Runtime:** Node.js (>= 18.0.0)
- **Framework:** Express 5.1.0
- **Language:** TypeScript 5.9.3
- **Database:** MongoDB with Mongoose 9.0.0
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 3.0.3
- **Payment Gateway:** Stripe 20.1.0
- **Cloud Storage:** Cloudinary 2.8.0
- **Email Service:** 
  - SendGrid Mail 8.1.6
  - Nodemailer 7.0.12
- **AI Services:**
  - Google Generative AI 0.24.1
  - OpenAI 6.15.0
- **PDF Generation:** PDFKit 0.17.2
- **File Upload:** Multer 2.0.2
- **HTTP Client:** Axios 1.13.2

## Prerequisites

- **Node.js:** >= 18.0.0
- **npm:** >= 8.0.0
- **MongoDB:** >= 6.0 (local or MongoDB Atlas)
- **Stripe Account:** For payment processing
- **Cloudinary Account:** For image storage
- **SendGrid Account:** For email services
- **Google/OpenAI API Keys:** For AI features

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd propertypulse-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
SERVER_PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/propertypulse
# Or MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/propertypulse

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@propertypulse.com
SENDGRID_FROM_NAME=PropertyPulse

# Email Configuration (Nodemailer - Alternative)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# AI Services
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
PRODUCTION_URL=https://property-pulse-fe.vercel.app

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Server will run on `http://localhost:5000` with hot-reload enabled.

### Production Build
```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

### Database Setup
Ensure MongoDB is running:
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

## API Documentation

### Base URL
```
Development: http://localhost:5000
Production: https://your-api-domain.com
```

### API Endpoints

#### Authentication Routes (`/api/v1/auth`)
```
POST   /register          - Register new user
POST   /login             - User login
POST   /logout            - User logout
GET    /verify            - Verify JWT token
POST   /forgot-password   - Request password reset
POST   /reset-password    - Reset password
```

#### Admin Routes (`/api/v1/admin`)
```
GET    /dashboard         - Admin dashboard analytics
GET    /users             - Get all users
GET    /users/:id         - Get user by ID
PUT    /users/:id         - Update user
DELETE /users/:id         - Delete user
GET    /listings          - Get all listings (with approval status)
PUT    /listings/:id/approve    - Approve listing
PUT    /listings/:id/reject     - Reject listing
GET    /analytics         - Platform analytics
```

#### User Routes (`/api/v1/user`)
```
GET    /profile           - Get user profile
PUT    /profile           - Update user profile
PUT    /change-password   - Change password
DELETE /account           - Delete account
GET    /agents            - Get all agents
GET    /agents/top        - Get top performing agents
```

#### Listing Routes (`/api/v1/listning`)
```
GET    /                  - Get all listings
GET    /:id               - Get listing by ID
POST   /                  - Create new listing
PUT    /:id               - Update listing
DELETE /:id               - Delete listing
GET    /agent/:agentId    - Get listings by agent
GET    /search            - Search listings with filters
POST   /:id/view          - Track property view
```

#### Saved Listings Routes (`/api/v1/saved-properties`)
```
GET    /                  - Get user's saved properties
POST   /                  - Save a property
DELETE /:propertyId       - Remove saved property
GET    /check/:propertyId - Check if property is saved
```

#### Inquiry Routes (`/api/v1/inquiries`)
```
GET    /                  - Get all inquiries (for agents)
GET    /:id               - Get inquiry by ID
POST   /                  - Submit new inquiry
PUT    /:id/respond       - Agent responds to inquiry
DELETE /:id               - Delete inquiry
GET    /property/:propertyId - Get inquiries for a property
```

#### Payment Routes (`/api/v1/payment`)
```
POST   /create-checkout-session  - Create Stripe checkout session
GET    /status/:agentId          - Get agent payment status
GET    /details/:paymentId       - Get payment details
POST   /webhook/stripe           - Stripe webhook handler (raw body)
```

#### Email Routes (`/email`)
```
POST   /send-login        - Send login notification email
POST   /send-inquiry      - Send inquiry notification to agent
POST   /send-welcome      - Send welcome email to new users
```

#### Comparison Routes (`/api/properties`)
```
POST   /compare           - Compare multiple properties
GET    /comparison-report/:id  - Get comparison report
```

#### Analytics Routes (`/api/v1/analytics`)
```
GET    /market            - Market analytics
GET    /trends            - Market trends
POST   /generate-report   - Generate PDF report
GET    /agent-performance - Agent performance metrics
```

### Request/Response Examples

#### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "client" // or "agent"
}

# Response
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "client"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Create Listing
```bash
POST /api/v1/listning
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Modern Villa in Colombo",
  "description": "Beautiful 3-bedroom villa...",
  "price": 45000000,
  "propertyType": "villa",
  "bedrooms": 3,
  "bathrooms": 2,
  "location": {
    "address": "123 Beach Road, Colombo",
    "latitude": 6.9271,
    "longitude": 79.8612
  },
  "images": [File, File, File]
}

# Response
{
  "success": true,
  "message": "Listing created successfully",
  "data": {
    "listing": {
      "id": "...",
      "title": "Modern Villa in Colombo",
      "status": "pending",
      ...
    }
  }
}
```

## Project Structure

```
propertypulse-backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # MongoDB connection
│   │   ├── cloudinary.ts    # Cloudinary setup
│   │   └── stripe.ts        # Stripe configuration
│   ├── controllers/         # Route controllers
│   │   ├── authController.ts
│   │   ├── adminController.ts
│   │   ├── userController.ts
│   │   ├── listingController.ts
│   │   ├── inquiryController.ts
│   │   ├── paymentController.ts
│   │   ├── analyticsController.ts
│   │   └── stripeWebhook.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   ├── roleCheck.ts     # Authorization middleware
│   │   ├── errorHandler.ts  # Global error handler
│   │   ├── upload.ts        # Multer file upload
│   │   └── validator.ts     # Request validation
│   ├── models/              # Mongoose models
│   │   ├── User.ts
│   │   ├── Listing.ts
│   │   ├── Inquiry.ts
│   │   ├── SavedListing.ts
│   │   ├── Payment.ts
│   │   └── Analytics.ts
│   ├── routes/              # API routes
│   │   ├── authRoute.ts
│   │   ├── adminRoute.ts
│   │   ├── userRoute.ts
│   │   ├── listningRoute.ts
│   │   ├── savedListningRoutes.ts
│   │   ├── inquiryRoute.ts
│   │   ├── paymentRoute.ts
│   │   ├── emailRoute.ts
│   │   ├── inquiryEmail.ts
│   │   ├── comparisonRoute.ts
│   │   └── analyticsRoute.ts
│   ├── services/            # Business logic services
│   │   ├── emailService.ts
│   │   ├── aiService.ts
│   │   ├── pdfService.ts
│   │   ├── stripeService.ts
│   │   └── analyticsService.ts
│   ├── utils/               # Utility functions
│   │   ├── jwt.ts
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── express.d.ts
│   │   └── models.ts
│   └── index.ts             # Application entry point
├── dist/                    # Compiled JavaScript (generated)
├── .env.example             # Example environment variables
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Database Schema

### User Model
```typescript
{
  name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  role: String (enum: ['client', 'agent', 'admin'])
  phone?: String
  profileImage?: String
  isVerified: Boolean (default: false)
  paymentStatus?: {
    isPaid: Boolean
    expiresAt: Date
    lastPayment: Date
  }
  createdAt: Date
  updatedAt: Date
}
```

### Listing Model
```typescript
{
  title: String (required)
  description: String (required)
  price: Number (required)
  propertyType: String (enum: ['house', 'apartment', 'villa', 'land', 'commercial'])
  bedrooms: Number
  bathrooms: Number
  location: {
    address: String (required)
    latitude: Number (required)
    longitude: Number (required)
  }
  images: [String] (Cloudinary URLs)
  agent: ObjectId (ref: 'User')
  status: String (enum: ['pending', 'approved', 'rejected'])
  views: Number (default: 0)
  createdAt: Date
  updatedAt: Date
}
```

### Inquiry Model
```typescript
{
  property: ObjectId (ref: 'Listing')
  client: ObjectId (ref: 'User')
  agent: ObjectId (ref: 'User')
  name: String (required)
  email: String (required)
  phone?: String
  message: String (required)
  status: String (enum: ['pending', 'responded', 'closed'])
  response?: String
  respondedAt?: Date
  createdAt: Date
}
```

### Payment Model
```typescript
{
  agent: ObjectId (ref: 'User')
  amount: Number (required)
  currency: String (default: 'lkr')
  stripeSessionId: String
  stripePaymentIntentId: String
  status: String (enum: ['pending', 'completed', 'failed'])
  expiresAt: Date
  metadata?: Object
  createdAt: Date
}
```

## Third-Party Integrations

### Stripe Payment Gateway
- Handles agent premium listing payments
- Webhook integration for payment status updates
- Secure checkout session creation

### Cloudinary
- Image upload and storage
- Automatic image optimization
- CDN delivery

### SendGrid/Nodemailer
- Transactional emails
- Inquiry notifications
- Login alerts
- Welcome emails

### Google Generative AI
- Property description generation
- Market insights
- Comparison analysis

### OpenAI
- Advanced property analytics
- Market trend predictions
- Natural language processing

## Security

### Implemented Security Measures
- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** bcrypt with salt rounds
- **CORS Configuration:** Whitelist-based origin control
- **Input Validation:** Request payload validation
- **SQL Injection Prevention:** MongoDB parameterized queries
- **Rate Limiting:** (Recommended to implement)
- **Helmet.js:** (Recommended for security headers)
- **Environment Variables:** Sensitive data in .env
- **Stripe Webhook Verification:** Signature verification

### Best Practices
```typescript
// JWT middleware example
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

## Testing

### Manual Testing
Use tools like Postman or Thunder Client:
1. Import the API collection
2. Set environment variables
3. Test each endpoint

### Automated Testing (Future Implementation)
```bash
npm install --save-dev jest @types/jest supertest @types/supertest
npm test
```

## Deployment

### Environment Setup
1. Set all environment variables on hosting platform
2. Configure MongoDB Atlas connection
3. Set up Stripe webhooks with production URL
4. Configure Cloudinary production settings

### Deployment Platforms
- **Railway:** Quick deployment

### Build and Deploy
```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## Monitoring & Logging

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Known Issues

- Stripe webhook requires raw body parser before JSON parser
- Large image uploads may timeout on slow connections
- AI API rate limits may affect bulk operations

## License

This project is proprietary and confidential.

## Developer
Sasuni Wijerathne
Full Stack Developer

---

**Built with using Node.js, Express, and TypeScript