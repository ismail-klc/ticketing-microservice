import React from 'react'
import Link from 'next/link';
import buildClient from '../api/build-client';
import router from 'next/router';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default function Header({ currentUser }) {

    const handleLogout = async () => {
        const client = buildClient();
        const res = await client.post('/api/users/signout');

        if (res.status === 200) {
            router.push('/auth/signin')
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-2">
            <Container>
                <Link href="/">
                    <a className="navbar-brand">GitTix</a>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/">
                            <a className="nav-item nav-link active">Home </a>
                        </Link>
                    </Nav>
                    <Nav>
                        {
                            !currentUser &&
                            <>
                                <Link href="/auth/signup">
                                    <a className="nav-item nav-link" >Sign Up</a>
                                </Link>
                                <Link href="/auth/signin">
                                    <a className="nav-item nav-link" >Sign In</a>
                                </Link>
                            </>
                        }
                        {
                            currentUser &&
                            <Link href="/auth/signout">
                                <a className="nav-item nav-link" >Sign Out</a>
                            </Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
