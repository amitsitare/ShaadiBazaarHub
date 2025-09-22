# ShaadiBazaarHub - Wedding Services Booking Platform

A full-stack web application for booking wedding-related services like chairs, tables, tents, band baja, catering, and more. Features secure payment processing, real-time notifications, and comprehensive service management.

## ✨ Features

### 🔐 User Authentication & Management
- **Role-based Registration**: Register as Service Provider or Customer
- **Secure Login**: JWT-based authentication with role verification
- **Profile Management**: View and update user profiles

### 🏪 Service Management
- **Provider Dashboard**: Add, edit, and delete services with real-time updates
- **Service Catalog**: Browse services with search and location filtering
- **Service Details**: View comprehensive service information with photos
- **Provider-specific Views**: Providers see only their own services

### 💳 Payment Integration
- **Razorpay Integration**: Secure payment processing for service bookings
- **Payment Gateway**: Accept online payments with multiple payment methods
- **Transaction Tracking**: Complete payment history and status tracking
- **Secure Checkout**: PCI-compliant payment processing

### 📱 Real-time Notifications
- **WhatsApp Notifications**: Providers receive instant WhatsApp messages for new bookings with customer details
- **Customer Information**: Providers get customer contact details, address, and booking specifics
- **Booking Details**: Service name, price, event date, quantity, and special notes included
- **Multiple WhatsApp APIs**: Support for both Meta WhatsApp Business API and Twilio WhatsApp
- **Email Notifications**: Automated email alerts with booking details (planned)
- **Booking Confirmations**: Customers receive booking confirmation notifications (planned)

### 📋 Booking System
- **Service Booking**: Customers can book services with date and quantity selection
- **Booking Management**: View and manage all bookings
- **Status Tracking**: Track booking status (pending, confirmed, cancelled)
- **Booking History**: Complete booking history for both customers and providers

### 🔍 Search & Discovery
- **Advanced Search**: Search services by name, description, or location
- **Location-based Filtering**: Find services in specific cities/areas
- **Service Categories**: Browse different types of wedding services
- **Price Comparison**: Compare prices across different providers

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Robust relational database with psycopg
- **JWT Authentication**: Secure token-based authentication
- **Razorpay SDK**: Payment gateway integration
- **Email Service**: SMTP-based email notifications
- **WhatsApp API**: WhatsApp Business API for notifications

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **Bootstrap**: Responsive CSS framework for styling
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing

### Payment & Notifications
- **Razorpay**: Payment gateway for secure transactions
- **WhatsApp Business API**: Real-time messaging notifications
- **SMTP Email**: Automated email notifications
- **Webhooks**: Real-time payment status updates

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL installed and running
- Razorpay account (for payment processing)
- WhatsApp Business API access (for notifications)
- SMTP email service (for email notifications)
- Git

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd ShaadiBazaarHub
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (see Environment Variables section below)
# Then setup database (creates tables and sample data)
python database_setup.py

# Start backend server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## ⚙️ Environment Variables

Create a `.env` file in the `backend` folder:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shaadisphere
DB_USER=postgres
DB_PASSWORD=your_actual_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_here_change_in_production
JWT_ALGORITHM=HS256
JWT_EXPIRES_MINUTES=120

# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000
FRONTEND_URL=http://localhost:5173

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com

# WhatsApp Configuration (Meta WhatsApp Business API)
WHATSAPP_ENABLED=true
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_WEBHOOK_VERIFY_TOKEN=shaadibazaarhub_verify_token

# Alternative: Twilio WhatsApp (if you prefer Twilio over Meta)
TWILIO_ENABLED=false
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

## 📱 WhatsApp Integration

### Meta WhatsApp Business API Setup (Recommended - FREE)

1. **Create Facebook App**:
   - Go to [Facebook Developers](https://developers.facebook.com/apps/)
   - Click "Create App" → Select "Business" → "WhatsApp Business Platform"
   - Follow the setup wizard

2. **Get WhatsApp Business Account**:
   - Add a phone number to your WhatsApp Business Account
   - Verify the phone number via SMS/call

3. **Get Credentials**:
   - **Access Token**: From your app's WhatsApp > API Setup
   - **Phone Number ID**: Found in WhatsApp > API Setup
   - **Webhook Verify Token**: Create a custom token (use the one in .env)

4. **Configure Environment Variables**:
   ```env
   WHATSAPP_ENABLED=true
   WHATSAPP_ACCESS_TOKEN=your_access_token_here
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
   ```

5. **Test Integration**:
   ```bash
   cd backend
   python test_whatsapp.py
   ```

### Twilio WhatsApp Setup (Alternative)

1. **Create Twilio Account**:
   - Sign up at [Twilio Console](https://console.twilio.com/)
   - Get Account SID and Auth Token

2. **Enable WhatsApp Sandbox**:
   - Go to Messaging > Try it out > Send a WhatsApp message
   - Follow instructions to connect your WhatsApp number

3. **Configure Environment Variables**:
   ```env
   TWILIO_ENABLED=true
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

### WhatsApp Message Format

When a customer books a service, providers receive a WhatsApp message with:

```
🎉 New Booking Alert! 🎉

📋 Booking Details:
• Service: Wedding Photography
• Price: ₹25,000.00
• Quantity: 1
• Event Date: 2024-03-15

👤 Customer Information:
• Name: Rajesh Kumar
• Mobile: +919876543211
• Address: 123 Main Street, Mumbai, Maharashtra 400001

📝 Additional Notes:
Please arrive 2 hours before the ceremony.

🔗 Next Steps:
Please contact the customer to confirm the booking and discuss further details.

---
ShaadiBazaarHub - Your Wedding Partner 💒
```

## 💳 Payment Integration

### Razorpay Setup
1. **Create Razorpay Account**: Sign up at [razorpay.com](https://razorpay.com)
2. **Get API Keys**: Obtain Key ID and Key Secret from dashboard
3. **Configure Webhooks**: Set up webhook endpoints for payment status updates
4. **Test Mode**: Use test credentials for development

### Payment Flow
1. **Customer selects service** and clicks "Book Now"
2. **Payment form** opens with Razorpay integration
3. **Customer completes payment** using preferred method
4. **Payment confirmation** triggers notifications
5. **Provider receives** WhatsApp and email notifications

## 📱 Notification System

### WhatsApp Notifications
- **Instant Alerts**: Providers receive WhatsApp messages for new bookings
- **Customer Details**: Includes customer name, contact, and booking details
- **Quick Response**: Direct communication channel for coordination

### Email Notifications
- **Detailed Information**: Comprehensive booking details via email
- **Professional Communication**: Formal booking confirmations
- **Documentation**: Email trail for booking records

## 🎯 User Roles & Permissions

### Service Providers
- **Dashboard Access**: Manage their services
- **Add/Edit Services**: Create and update service listings
- **View Bookings**: See all bookings for their services
- **Receive Notifications**: Get WhatsApp and email alerts
- **Customer Contact**: Access customer information for coordination

### Customers
- **Browse Services**: Search and filter available services
- **Book Services**: Make reservations with payment
- **View Bookings**: Track their booking history
- **Payment Management**: Handle payments and refunds
- **Service Reviews**: Rate and review services (future feature)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for providers and customers
- **Payment Security**: PCI-compliant payment processing
- **Data Encryption**: Sensitive data encryption
- **Input Validation**: Comprehensive input validation and sanitization

## 📊 Database Schema

### Core Tables
- **users**: User accounts with role-based access
- **services**: Service listings with provider information
- **bookings**: Booking records with payment status
- **payments**: Payment transaction records
- **notifications**: Notification history and status

## 🚀 Deployment

### Production Setup
1. **Database**: Set up PostgreSQL on production server
2. **Environment**: Configure production environment variables
3. **SSL Certificate**: Set up HTTPS for secure payments
4. **Domain**: Configure custom domain for the application
5. **Monitoring**: Set up application monitoring and logging

### Payment Production
1. **Razorpay Production**: Switch to production Razorpay account
2. **Webhook Security**: Secure webhook endpoints
3. **Payment Testing**: Thorough payment flow testing
4. **Compliance**: Ensure PCI compliance for payment processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@shaadibazaarhub.com
- **Documentation**: Check the API docs at `/docs`
- **Issues**: Report bugs via GitHub issues

## 🔮 Future Enhancements

- **Service Reviews & Ratings**: Customer feedback system
- **Advanced Analytics**: Provider performance metrics
- **Mobile App**: Native mobile applications
- **Multi-language Support**: Internationalization
- **Advanced Search**: AI-powered service recommendations
- **Video Calls**: In-app video consultation feature
