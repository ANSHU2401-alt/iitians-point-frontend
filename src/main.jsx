import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import SignUp from "./Components/SignUp.jsx"
import App from './App.jsx'
import Navbar from './Components/Navbar.jsx';
import Notes from './Components/Notes.jsx';
import Weightage from './Components/Weightage.jsx';
import About from "./Components/About.jsx"
import Contribute from './Components/Contribute.jsx';
import Login from './Components/Login.jsx';
import Titles from './Components/Titles.jsx';
import ContactUs from './Components/ContactUs.jsx'
import Faq from './Components/Faq.jsx';
import Formula from './Components/Formula.jsx';
import Feedback from './Components/Feedback.jsx';
import Payment from "./Components/Payment.jsx";
import ThankYou from "./Components/ThankYou.jsx";
import Todo from "./Components/Todo.jsx"
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <><Navbar /><About/></> },
  { path: "/SignUp", element: <><Navbar/><SignUp/></> },
  { path: "/Weightage", element: <><Navbar/><Weightage/></> },
  { path: "/Contribute", element: <><Navbar/><Contribute/></> },
  { path: "/login", element: <><Navbar/><Login/></> },
  { path: "/titles", element: <><Navbar/><Titles/></> },
  { path: "/Contact", element: <><Navbar/><ContactUs/></> },
  { path: "/FAQ", element: <><Navbar/><Faq/></> },
  { path: "/Formula", element: <><Navbar/><Formula/></> },
  { path: "/Feedback", element: <><Navbar/><Feedback/></> },
  { path: "/Notes", element: <><Navbar/><Notes/></> },
  { path: "/payment", element: <Payment /> },
  { path: "/thankyou", element: <ThankYou /> },
  { path: "/todo", element: <Todo /> },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
