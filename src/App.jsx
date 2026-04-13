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
