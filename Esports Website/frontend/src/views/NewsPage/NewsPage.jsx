import { Container, Row, Col } from 'react-bootstrap';
import updates from '../../assets/images/updates.png';
import reports from '../../assets/images/reports.png';
import announce from '../../assets/images/announce.png';

function NewsPage() {
    return (
      <div id='home' className='container mt-5'>
        <Container>
          <Row>
            {/* League Updates */}
            <Col sm={6} xs={12}>
              <h1>League Updates</h1>
              <p>
                The Actual Esports League is always changing.
                We are now introducing 2 new teams for our College division.
                Say hello to the Addicts and the Optimizers!
              </p>
              <p>
                The Addicts are another Utah-based team with an impressive roster.
                They have recruited from many local colleges.
              </p>
              <p>
                The Optimizers are extremely competetive already. They have the gaming spirit!
              </p>
            </Col>
            <Col sm={6} xs={12}>
              <img src={updates} alt='Updates' className='img-fluid' />
            </Col>
          </Row>
          <Row>
            <p></p>
          </Row>
          <Row>
            {/* Match Reports */}
            <Col sm={6} xs={12}>
              <img src={reports} alt='Reports' className='img-fluid' />
            </Col>
            <Col sm={6} xs={12}>
              <h1>Match Reports</h1>
              <p>
                We are still in the Mario Kart 8 matchups.
              </p>
              <p>
                The Fakers suffered a devasting loss against the Scrubs. Fable Farnsworth is just too good!
              </p>
              <p>
                The Tryhards won their recent match as well, though it was close.
                Both teams fought their hardest, but in the end, skill triumphed over determination. 
              </p>
            </Col>
          </Row>
          <Row>
            <p></p>
          </Row>
          <Row>
            {/* Important Announcements */}
            <Col sm={6} xs={12}>
              <h1>Important Announcements</h1>
              <p>
                We have made some changes to our website.
              </p>
              <p>
                We are also continuing to increase our team and player roster.
              </p>
              <p>
                If you want to become a college player, speak with your local college club representative. 
              </p>
            </Col>
            <Col sm={6} xs={12}>
              <img src={announce} alt='Announcements' className='img-fluid' />
            </Col>
          </Row>
   
        </Container>
      </div>
    );
}

export default NewsPage;
