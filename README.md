# Intrahub

[![CI](https://github.com/rmirandasv/intrahub/actions/workflows/ci.yml/badge.svg)](https://github.com/rmirandasv/intrahub/actions/workflows/ci.yml)
[![Release](https://github.com/rmirandasv/intrahub/actions/workflows/release.yml/badge.svg)](https://github.com/rmirandasv/intrahub/actions/workflows/release.yml)
[![PHP](https://img.shields.io/badge/PHP-8.2%2B-blue.svg)](https://php.net)
[![Laravel](https://img.shields.io/badge/Laravel-12.0%2B-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7%2B-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com)

A modern internal communication platform for companies that enables staff to share announcements, benefits, and events with employees. Built with Laravel, Inertia.js, React, and TypeScript.

## ✨ Features

### 📢 **Announcements**
- Create and manage company announcements
- Rich text editor with BlockNote
- Image uploads and media management
- Categorization and filtering
- Like and comment system

### 🎁 **Benefits**
- Share commercial agreements and employee benefits
- Partner information and contact details
- Website links and expiration dates
- Visual cards with images
- Easy access to benefit details

### 📅 **Events**
- Event creation and management
- One-click attendance confirmation
- Expiration dates for RSVPs
- Integrated attendance tracking
- Staff control over event participation

### 👥 **User Management**
- Secure invitation system via email
- Self-registration for invited users
- Staff and employee role management
- Password recovery system
- Personal profile completion

### 🎯 **Dashboard**
- Overview of all posts and activities
- Filter by type (announcements, benefits, events)
- Recent activity feed
- Quick access to important information

### 🔐 **Security & Authentication**
- Laravel's built-in authentication
- Email verification system
- Password reset functionality
- Role-based access control
- Secure invitation workflow

## 🛠️ Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **PHP 8.2+** - Server-side language
- **MySQL/PostgreSQL** - Database
- **Spatie Media Library** - File management
- **Resend** - Email delivery

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Inertia.js** - SPA-like experience
- **Tailwind CSS 4** - Styling
- **Shadcn/ui** - Component library
- **Radix UI** - Accessible components

### Development
- **Vite** - Build tool
- **ESLint & Prettier** - Code formatting
- **Husky** - Git hooks
- **Pest** - Testing framework
- **GitHub Actions** - CI/CD

## 🚀 Quick Start

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL/PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rmirandasv/intrahub.git
   cd intrahub
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database**
   ```bash
   # Update .env with your database credentials
   php artisan migrate
   ```

5. **Build assets**
   ```bash
   npm run build
   ```

6. **Create first user (staff)**
   ```bash
   php artisan make:user
   ```

7. **Start the development server**
   ```bash
   composer run dev
   ```

## 📧 Email Configuration

Intrahub uses Resend for email delivery. Configure your email settings in `.env`:

```env
MAIL_MAILER=resend
RESEND_API_KEY=your_resend_api_key
```

## 🧪 Testing

Run the test suite:

```bash
composer test
```

## 🚀 Deployment

The application includes GitHub Actions for continuous integration and deployment:

- **CI Pipeline**: Linting, formatting, and testing
- **Release Pipeline**: Automated releases with semantic versioning

## 📁 Project Structure

```
intrahub/
├── app/
│   ├── Actions/          # Business logic
│   ├── Http/            # Controllers and middleware
│   ├── Models/          # Eloquent models
│   └── Enums/           # Type definitions
├── resources/
│   └── js/
│       ├── components/  # React components
│       ├── pages/       # Inertia pages
│       ├── layouts/     # Page layouts
│       └── types/       # TypeScript types
├── routes/              # Application routes
├── database/            # Migrations and seeders
└── tests/              # Test files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ronald Miranda**
- Website: [ronaldmiranda.dev](https://ronaldmiranda.dev)
- GitHub: [@rmirandasv](https://github.com/rmirandasv)

---

Built with ❤️ using Laravel, React, and TypeScript