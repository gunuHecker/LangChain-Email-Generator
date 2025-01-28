# Email Generator

This is a [Next.js](https://nextjs.org) project that generates professional emails using AI. The project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- User authentication (signup, login, logout)
- Generate professional emails based on user input using AI.
- Save generated emails to the database
- Responsive design with Tailwind CSS

# Email Generator

This is a [Next.js](https://nextjs.org) project that generates professional emails using AI. The project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- User authentication (signup, login, logout)
- Generate professional emails based on user input using AI
- Save generated emails to the database
- Responsive design with Tailwind CSS

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/gunuHecker/LangChain-Email-Generator.git
cd LangChain-Email-Generator
```

Install the dependencies:

```bash
npm install
```

Create a .env file in the root directory and add your environment variables:

```
MONGO_URI=your_mongodb_uri
TOKEN_SECRET=your_jwt_secret
HUGGING_FACE_API_KEY=your_hugging_face_api_key
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app: Contains the main application components and pages.
components: Contains reusable React components.
dbConfig: Contains the database configuration.
models: Contains the Mongoose models.
public: Contains static assets.
.env: Environment variables.
next.config.mjs: Next.js configuration.
tailwind.config.mjs: Tailwind CSS configuration.
postcss.config.mjs: PostCSS configuration.
eslint.config.mjs: ESLint configuration.

API Endpoints
POST /api/users/signup: Create a new user.
POST /api/users/login: Authenticate a user.
POST /api/users/logout: Logout a user.
POST /api/generate-email: Generate a professional email.
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
