ComfortTrips
A full-stack web application for booking reliable airport transfers.

🚀 Technologies
Frontend: React, Tailwind CSS
Backend: Express.js, MongoDB
Deployment: VPS Server (Ubuntu), Nginx for reverse proxy
Payment Gateway: Stripe

🌐 Deployment Details
VPS Server Connection
To access the VPS server:
ssh root@92.113.31.23
Password: pa1tkgFoqb14@
The server is connected to this GitHub repository: FreelanceProjects. link   https://github.com/Azan-imtiaz/FreelanceProjects
    
🌍 Domain Details
Nginx is configured with the following domains (do not delete or change these from Hostinger):

comforttrips.co.uk
www.comforttrips.co.uk
api.comforttrips.co.uk
www.api.comforttrips.co.uk

📦 How to Redeploy the Application
Connect to the VPS:

ssh root@92.113.31.23
Navigate to Project Directory:

cd FreelanceProjects
Pull Latest Changes from GitHub:

git pull origin main
Frontend Deployment:

Navigate to the frontend project folder:
cd client/vite-project
Remove the existing dist folder and build a new one:
rm -rf dist
npm run build
Remove the previously deployed frontend files:
sudo rm -rf /var/www/html/vite-project/*
Deploy the new build:

sudo mv dist/* /var/www/html/vite-project/
✉️ Email Server Details
Email Provider: Hostinger
User: info@comforttrips.co.uk
Password: ComfortTrips@info24
Note: Do not change this password. If it is changed, you need to update the email credentials in the code and redeploy the application.

💳 Database
 MongoDB Atlas Access:
Email: comforttrips.db@gmail.com
Password: ComfortTrips@2050
This email account is used to access  MongoDB Atlas (for database management) .

💳 Payment Integration
Provider: Stripe
 You have to add the publisher key to  PaymentComponent.jsx file and private key to  the  STRIPE_SECRET_KEY in the .env file in server folder
 Than redploy it on vps and than payment component will work fine 
 
🔧 Additional Notes
Nginx is used as the reverse proxy to serve the frontend and backend securely.
The app handles user authentication and stores data on MongoDB Atlas.
