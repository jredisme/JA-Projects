import { Carousel, Container, Row, Col } from 'react-bootstrap';
import esports_team from '../../assets/images/esports_team.png';
import genres from '../../assets/images/genres.png';
import team1 from '../../assets/images/team1.png';
import team2 from '../../assets/images/team2.png';

function HomePage() {
    return (
      <div id='home' className='container mt-5'>
        <Container>
          <Row>
            {/* Introduction */}
            <Col sm={6} xs={12}>
              <h1>Welcome to the Actual Esports League!</h1>
              <p>
                This is esports like you've never seen before! Instead of having
                teams compete over a single video game, the Actual Esports League
                requires gaming skills across many genres.
              </p>
              <p>Only the best of the best will survive!</p>
              <h3>How it works:</h3>
              <p>
                Each month, a new game will be selected by the judges. The game must
                be of a genre that has yet to be selected during the current season.
                Team members have one week to prepare for that game, before the
                match-ups are revealed.
              </p>
              <p>
                Each team will be scored according to the current game genre. Some
                genres will have straightforward, head-to-head matches. Other genres
                will be scored according to unique metrics, such as fastest
                completion time, least amount of deaths, etc.
              </p>
              <p>
                It is not enough to be the best at one game. Team members must be
                well-rounded, and comprised of individuals who are true gamers.
              </p>
              <p>
                The team that can outpace its rivals in all categories shall be
                declared the overall winner!
              </p>
            </Col>
            <Col sm={6} xs={12}>
              <img src={esports_team} alt='Esports Team' className='img-fluid' />
            </Col>
          </Row>
          <Row>
            <h2 className='text-center mt-5'>
              <strong>Are you ready?</strong>
            </h2>
          </Row>
          <Row>
            <Col className='mt-5'>
              {/* React-Bootstrap Carousel */}
              <Carousel>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={genres}
                    alt='Esports Genres'
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={team1}
                    alt='Esports Team 1'
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={team2}
                    alt='Esports Team 2'
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default HomePage;
