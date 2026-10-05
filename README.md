# Exp 05 — React Login & Registration System

> A modern React JS authentication interface featuring user registration, login validation, protected routing, password strength feedback, session handling, and a responsive UI.

## 🎯 Aim
To develop a web application for login and registration functionalities using React JS with form validation, state management, routing, and simulated authentication.

## ✨ Features
- Modern Login interface
- User Registration interface
- Email and password validation
- Confirm password validation
- Password show/hide functionality
- Password strength indicator
- Remember Me functionality
- Loading states during submission
- Success and error status messages
- React Router navigation
- Protected Dashboard route
- LocalStorage-based demo registration
- SessionStorage-based login session
- Logout functionality
- Session persistence after page refresh
- Responsive mobile and desktop design
- Accessible form labels and controls

## 🛠️ Tech Stack
| Technology | Purpose |
| --- | --- |
| React JS | UI development |
| Vite | Development and production build tool |
| JavaScript | Application logic |
| React Router DOM | Client-side routing |
| HTML5 | Page structure |
| CSS3 | Responsive UI and styling |
| LocalStorage | Demo user data storage |
| SessionStorage | Demo login session |

## 📂 Project Structure
```text
Exp-05--react-login-registration/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── FormInput.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🔐 Authentication Flow
1. User opens the Login page.
2. New users can navigate to Registration.
3. Registration validates the submitted information.
4. User information is stored in browser LocalStorage for demonstration.
5. User can log in using the registered credentials.
6. Successful login creates a session using SessionStorage.
7. User is redirected to the protected Dashboard.
8. Dashboard displays basic user information.
9. Logout clears the login session and returns the user to Login.
10. Unauthorized users cannot directly access the Dashboard.

## 🧭 Routes
| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Redirects to Login | Public |
| `/login` | User Login | Public |
| `/register` | User Registration | Public |
| `/dashboard` | User Dashboard | Protected |

## 🧠 React Concepts Demonstrated
- Functional Components
- React Hooks
- `useState`
- Controlled Components
- Form Handling
- Event Handling
- Conditional Rendering
- Client-side Validation
- React Router
- Protected Routes
- LocalStorage
- SessionStorage
- Component Reusability

## 🎨 UI / Design
- Modern authentication card layout
- Gradient background
- Rounded components
- Soft shadows
- Interactive buttons
- Input focus states
- Password visibility controls
- Responsive layout
- Mobile-friendly design
- Clear validation and status feedback

## 🚀 Getting Started
### 1. Clone the repository
```bash
git clone https://github.com/mandaldhananjay248-beep/Exp-05--react-login-registration.git
```

### 2. Enter the project
```bash
cd Exp-05--react-login-registration
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start development server
```bash
npm run dev
```

Then open:

http://localhost:5173/

## 🧪 Testing & Verification
- Login validation
- Registration validation
- Valid email format
- Required fields
- Password length
- Confirm password matching
- Terms and Conditions validation
- Password visibility
- Password strength indicator
- Successful registration
- Invalid login
- Successful login
- Protected dashboard
- Page refresh/session persistence
- Logout
- Responsive mobile layout
- No horizontal overflow
- No browser console errors

Build command:
```bash
npm run build
```
Result: **Build successful**

Lint command:
```bash
npm run lint
```
Result: **0 warnings and 0 errors**

## ⚠️ Educational Security Note
> This project is created for educational/classroom demonstration purposes. It does not use a real backend or secure authentication system. User credentials are stored in browser storage without encryption. Do not use real passwords or sensitive credentials with this application.

## 📚 Learning Outcomes
This experiment demonstrates practical understanding of:
- React component architecture
- State management
- Form handling
- Client-side validation
- Routing
- Authentication flow
- Protected routes
- Browser storage
- Responsive frontend development

## 👨‍💻 Author
**Dhananjay Mandal**

Exp 05 — React Login & Registration System
https://github.com/mandaldhananjay248-beep/Exp-05--react-login-registration
## 📄 License
For educational and academic purposes.
