import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function Header({ logo }) {
  return (
    <header>
      <Navbar expand='sm' variant='dark' fixed='top'>
        <Container>
          <Navbar.Brand href='/'>
            <img
              src={logo}
              alt='Actual Esports Logo'
              className='img-fluid w-25'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse 
            id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/teams'>
                <Nav.Link>Teams</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/events'>
                <Nav.Link>Events</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/news'>
                <Nav.Link>News</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
