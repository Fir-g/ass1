# CreditSea Loan Manager  

CreditSea Loan Manager is a powerful loan management system designed to streamline loan handling processes. Built with **TypeScript** and **Node.js**, this application combines a modern UI with robust backend support to deliver an intuitive and efficient solution.  

## Overview  

This project uses a [Figma design](https://www.figma.com/design/vSeMzFkJ6RKdtflUaQvi9T/LOAN-MANAGER-(Community)) as the basis for its user interface, ensuring a clean and user-friendly experience. The backend is integrated with **MongoDB** to handle data effectively and securely.  

## Technologies Used  

- **Frontend**: React, TypeScript  
- **Backend**: Node.js, TypeScript  
- **Database**: MongoDB  
- **Authentication**: NextAuth  

## Features  

- **Loan Tracking**: Add, update, and monitor loans effortlessly.  
- **Responsive UI**: Seamlessly works on desktop and mobile devices.  
- **Secure Authentication**: User authentication implemented with NextAuth.  
- **Scalable Backend**: Powered by Node.js and MongoDB.  

## Getting Started  

Follow these steps to set up and run the project locally.  

### Prerequisites  

Ensure you have the following installed:  
- **Node.js** (v14 or later)  
- **npm** (v7 or later)  

### Installation  

1. **Clone the repository**  
   ```bash  
   git clone https://github.com/Fir-g/creditsea_loan_manager.git  
   cd creditsea_loan_manager  
2. ** Install dependencies**
   ```bash
   npm install  
3.  **Set up environment variables**
   -Create a .env file in the root directory and configure the following variables:
   DATABASE_URL=<your-mongodb-url>  # Replace with your MongoDB connection string  
   NEXTAUTH_URL=http://localhost:3000  
   NEXTAUTH_SECRET=secret
4.**Start the development server**
    ```bash
    npm run dev

5.**Access the application**
   Open your browser and navigate to http://localhost:3000



## Deployed on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

This application is deployed on Vercel and can be accessed here: https://ass1-nine.vercel.app/

For local setup, ensure your .env file includes the following variables:

DATABASE_URL=<your-mongodb-url>  # Replace with your MongoDB connection string  
NEXTAUTH_URL=http://localhost:3000  
NEXTAUTH_SECRET=secret  
