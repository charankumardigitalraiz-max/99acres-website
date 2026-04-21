import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import Subscription from './pages/Subscription';
import PropertyDetails from './pages/PropertyDetails';
import CategoryViewDetails from './pages/CategoryViewDetails';
import UserPanel from './pages/UserPanel';
import CollectionPage from './pages/CollectionPage';
import UpcomingProjectsPage from './pages/UpcomingProjectsPage';

// Info Pages
import AboutUs from './pages/info/AboutUs';
import ContactUs from './pages/info/ContactUs';
import Careers from './pages/info/Careers';
import TermsConditions from './pages/info/TermsConditions';
import RequestInfo from './pages/info/RequestInfo';
import Feedback from './pages/info/Feedback';
import ReportProblem from './pages/info/ReportProblem';
import PrivacyPolicy from './pages/info/PrivacyPolicy';
import SummonsNotices from './pages/info/SummonsNotices';
import Grievances from './pages/info/Grievances';
import SafetyGuide from './pages/info/SafetyGuide';

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="category/:categoryName" element={<CategoryViewDetails />} />
            <Route path="properties" element={<Properties />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile/:tab?" element={<UserPanel />} />
            
            {/* Info Routes */}
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="careers" element={<Careers />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="request-info" element={<RequestInfo />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="report-problem" element={<ReportProblem />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="summons-notices" element={<SummonsNotices />} />
            <Route path="grievances" element={<Grievances />} />
            <Route path="safety-guide" element={<SafetyGuide />} />

            <Route
              path="high-rated-properties"
              element={<CollectionPage type="high-rated" title="Highest Rated Properties" subtitle="Properties loved by customers and highly reviewed for their quality and location." />}
            />
            <Route
              path="high-rated-locality-properties"
              element={<CollectionPage type="high-rated-locality" title="Highest Rated Properties in Hyderabad" subtitle="Properties loved by customers and highly reviewed for their quality and location." />}
            />
            <Route
              path="plots-land-properties"
              element={<CollectionPage type="land" title="Plots & Land" subtitle="Explore premium residential plots, farmlands and industrial sites across top locations." />}
            />
            <Route
              path="featured-properties"
              element={<CollectionPage type="featured" title="Handpicked Featured Listings" subtitle="Exclusively sourced and verified properties curated by our real estate experts." />}
            />
            <Route
              path="upcoming-projects"
              element={<UpcomingProjectsPage />}
            />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}
