import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout({ logo }) {
    return (
        <div>
            <Header logo={logo} />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
