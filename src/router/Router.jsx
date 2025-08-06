import { createBrowserRouter, Navigate } from "react-router-dom";
import SiteLayout from "../layouts/SiteLayout";
import Home from "../pages/site/Home";
import Properties from "../pages/site/Properties";
import Propertie from "../pages/site/Propertie";
import About from "../pages/site/About";
import Contact from "../pages/site/Contact";
import Faq from "../pages/site/Faq";
import Register from "../pages/site/Register";
import Login from "../pages/site/Login";
import ForgotPassword from "../pages/site/ForgotPassword";
import Blog from "../pages/site/Blog";
import NotFoundPage from "../pages/NotFoundPage";
import SinglePostPage from "../components/partials/blog/post/SinglePostPage";
import SignUp from "../pages/SignUp";
import { SignUpPage } from "../pages/SignUpPage";
import { SignInPage } from "../pages/SignInPage";
import PrivacyPolicy from "../pages/LegalNotice";
import TermsOfService from "../pages/TermsOfService";
import ContactPage from "../pages/site/Contact";
import AdminDashboard from "../pages/dashboard/Dashboard";
import LayoutDashboard from "../layouts/LayoutDashboard";
import UserPage from "../pages/dashboard/UsersPage";
import PropertiesPage from "../pages/dashboard/PropertiesPage";
import BookingPage from "../pages/dashboard/BookingPage";
import { useSelector } from "react-redux";
import AssistantsPage from "../pages/dashboard/AssistantsPage";

// Links
// generale
export const HOME = "/";
export const PROPERTIES = "/properties";
export const PROPERTIE = id => `/properties/${id}`;
export const ABOUT = "/about";
export const BLOG = "/blog";
export const POST = "/blog/post";
export const CONTACT = "/contact";
export const FAQ = "/faq";
export const REGISTER = "/signup";
export const LOGIN = "/login";
export const FORGET_PASSWORD = "/forgot-password";
export const PRIVACY = "/privacy";
export const TERMES = "/terms";
//exebitor
export const USER_PROFILE = "/profile/me";
export const DASHBOARD_ME = "/profile/me/dashboard";
export const MY_PROPERTIES = "/profile/me/dashboard/properties";
export const NEW_PROPERTIE = "/profile/me/dashboard/properties/new";
export const EDIT_PROPERTIE = id =>
  `/profile/me/dashboard/properties/${id}/edit`;
export const MANAGE_BOOKING = "/profile/me/dashboard/booking";
//user or client
// export const MY_BOOKING = (id) => `client/${id+''+(Math.random()*1000000)}/my-rentals`
export const CONFIRME_BOOKING = "/client/booking/confirm";
export const FAVORITES = "/client/booking/favorites";
export const ADMIN_DASHBOARD = "/admin/dashboard";
export const USER_MANAGEMENT = "/admin/users";
export const ASSISTANT_MANAGEMENT = "/admin/assistants";
// export const VIEW_USER = (id) => `/admin/user/${id+''+(Math.random()*1000000)}`
export const PROPERTY_MANAGEMENT = "/admin/properties";
export const BOOKING_OVERVIEW = "/admin/bookings";
export const SITE_SETTINGS = "/admin/settings";
export const RAPORTS = "/admin/raport";
export const ASSISTANCE_DASHBOARD = "/manager/dashboard";

const ProtectedRoute = ({ children, role }) => {
  const user = useSelector(state => state.auth.user);
  if (!user) {
    return <Navigate to={LOGIN} replace={true} />;
  }

  if (role !== user.role) {
    return <Navigate to={HOME} replace />;
  }

  return children;
};

export const Router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: HOME,
        element: <Home />
      },
      {
        path: PROPERTIES,
        element: <Properties />
      },
      {
        path: "/properties/:id",
        element: <Propertie />
      },
      {
        path: ABOUT,
        element: <About />
      },
      {
        path: BLOG,
        element: <Blog />
      },
      {
        path: POST,
        element: <SinglePostPage />
      },
      {
        path: CONTACT,
        element: <ContactPage />
      },
      {
        path: FAQ,
        element: <Faq />
      },
      {
        path: REGISTER,
        element: <SignUpPage />
      },
      // {
      //     path: REGISTER,
      //     element: <SignUp />
      // },
      {
        path: LOGIN,
        element: <SignInPage />
      },
      {
        path: FORGET_PASSWORD,
        element: <ForgotPassword />
      }
    ]
  },
  {
    element: (
      // <ProtectedRoute role={"client"}>
        <LayoutDashboard />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: ADMIN_DASHBOARD,
        element: <AdminDashboard />
      },
      {
        path: USER_MANAGEMENT,
        element: <UserPage />
      },
      {
        path: ASSISTANT_MANAGEMENT,
        element: <AssistantsPage />
      },
      {
        path: PROPERTY_MANAGEMENT,
        element: <PropertiesPage />
      },
      {
        path: BOOKING_OVERVIEW,
        element: <BookingPage />
      }
    ]
  },
  {
    path: PRIVACY,
    element: <PrivacyPolicy />
  },
  {
    path: TERMES,
    element: <TermsOfService />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
