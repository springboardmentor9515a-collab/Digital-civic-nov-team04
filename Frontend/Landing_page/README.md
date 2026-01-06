# Digital Civic Landing Page

A modern, interactive landing page for Digital Civic – a civic engagement platform built with React and Vite. Features a stunning 3D Spline background and smooth panel-based navigation.

## 🚀 Features

- **3D Interactive Background**: Powered by Spline for an immersive visual experience  
- **Modern UI/UX**: Clean, responsive design with smooth animations  
- **Panel-Based Navigation**: Elegant slide-in panels for About Us and Contact sections  
- **React 19**: Built with the latest React version for optimal performance  
- **Fast Development**: Vite-powered for lightning-fast hot module replacement  

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)  
- **npm** (comes with Node.js)  

> ⚠️ **Important**: If you're on Windows, avoid running this project directly from a OneDrive-synced folder. Vite may encounter issues with temporary files. Use a local directory instead (e.g., `C:\Projects\Landing_page`).

## 🛠️ Installation

1. **Clone or download this repository**

2. **Navigate to the project directory**
  
   cd Landing_page
   3. **Install dependencies**
  
   npm install
   ## 🎯 Usage

### Development Server

Start the development server with hot module replacement:

npm run devThe application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

Create an optimized production build:

npm run buildThe built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

npm run preview### Linting

Run ESLint to check code quality:

npm run lint## 📁 Project Structure

Landing_page/
├── public/              # Static assets
│   └── vite.svg
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Component styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
└── package.json        # Project dependencies## 🎨 Key Components

- **App.jsx**: Main component with Spline background and panel navigation  
- **AboutSection**: Displays platform information, features, and vision  
- **ContactSection**: Contact form and information display  

## 🔧 Technologies Used

- **React 19.2.0** – UI library  
- **Vite 5.4.10** – Build tool and dev server  
- **@vitejs/plugin-react** – React plugin for Vite  
- **@splinetool/react-spline** – 3D Spline integration  
- **ESLint** – Code linting  

## 🐛 Troubleshooting

### Vite ENOENT Error on OneDrive

If you encounter this error:
Error: ENOENT: no such file or directory, open '...node_modules\.vite-temp\vite.config.js.timestamp...'**Solution**: Move the project to a local directory outside of OneDrive (e.g., `C:\Projects\Landing_page`) and run `npm install` again.

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual URL.

## 📝 Customization

### Changing the Spline Scene

Edit `src/App.jsx` and update the Spline scene URL:

<Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />### Modifying Content

- **About Section**: Edit the `AboutSection` component in `src/App.jsx`  
- **Contact Section**: Edit the `ContactSection` component in `src/App.jsx`  
- **Styling**: Modify `src/App.css` for component styles and `src/index.css` for global styles  

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For questions or support, contact the development team.

## 📧 Contact

- **Email**: support@civixplatform.com  
- **Support Hours**: Mon–Fri, 9 AM – 6 PM IST  

---

Built with ❤️ for Digital Civic Engagementcomponent.
