import { Container, Row, Col, Nav } from "react-bootstrap"


const Footer = () => {
  return (
    <footer>
        
      <Container>
        <Col>
          <h2>The Generics</h2>
        </Col>
        <Col>
          <Nav className="justify-content-center py-3" activeKey="/home">Youtube</Nav>
        </Col>
        <Col>
          <Nav className="justify-content-center py-3" activeKey="/home">Spotify</Nav>
        </Col>
        <Col>
          <Nav className="justify-content-center py-3" activeKey="/home">Facebook</Nav>
        </Col>
      </Container>
      
    </footer>
  )
}

export default Footer
