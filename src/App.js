import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

//import components
import Navbar from './components/Navbar';

//import css
import "./css/index.css";

//import pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';

const App = () => {
  return (
    <Router>
      <Container>
        <Row>
          <Col>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/country/:name' element={<SingleCountry />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
