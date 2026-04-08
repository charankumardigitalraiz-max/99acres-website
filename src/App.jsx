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
import UserPanel from './pages/UserPanel';

export default function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<Properties />} />
            <Route path="property/:id" element={<PropertyDetails />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile/:tab?" element={<UserPanel />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}
