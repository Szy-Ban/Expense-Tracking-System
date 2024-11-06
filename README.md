This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Expense Tracking System

A simple expense tracking application built with Next.js that allows users to manage their daily expenses. This project features filtering, viewing, and deleting expenses with real-time updates using the `useState` hook. It’s designed to help users categorize their expenses and maintain a clear overview of their spending.

## Features

- **Expense List**: Displays all expenses with details such as title, amount, category, and date.
- **Filter by Category**: Filter expenses by categories (e.g., Food, Entertainment, Health) for easier tracking.
- **Delete Expense**: Remove an expense from the list instantly with real-time updates.
- **Detailed Expense View**: Open a modal with detailed information on each expense.
- **State Management**: Managed with `useState` to keep track of expense data and filter selections.

## Technologies Used

- **Next.js**: Framework for server-side rendering and optimized React applications.
- **React**: Library for building interactive user interfaces.
- **JavaScript (ES6+)**: Core programming language for building the application.
- **JSON**: Used to store expense data without the need for a database.
- **CSS**: Basic styling for a clean and user-friendly layout.

## Future Enhancements

- Integrate a backend to store and retrieve expense data permanently.
- Add monthly and yearly expense summaries.
- Implement user authentication to save data across sessions.

## License

This project is licensed under the MIT License.


## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
