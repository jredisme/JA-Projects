import './App.scss'
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import HomePage from '../HomePage/HomePage';
import TeamsPage from '../TeamsPage/TeamsPage';
import EventsPage from '../EventsPage/EventsPage';
import NewsPage from '../NewsPage/NewsPage';
import Router from '../../components/Router/Router';
import Logo from '../../assets/images/logo_blue.png'

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Layout logo={Logo} />}>
                    <Route index element={<HomePage />} />
                    <Route path='teams' element={<TeamsPage />} />
                    <Route path='events' element={<EventsPage />} />
                    <Route path='news' element={<NewsPage />} />
                    <Route path='*' element={<Router />} /> {/* catch-all for URLs we dont' have explicit routes for */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
