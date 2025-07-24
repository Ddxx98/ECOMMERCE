import React from 'react'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary justify-content-center" >
            <Container>
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Brand href="#home">Store</Navbar.Brand>
                <Navbar.Brand href="#home">About</Navbar.Brand>
                
            </Container>
            <Button className='float right' variant="outline-info">Cart</Button>
        </Navbar>
    )
}

export default Header
