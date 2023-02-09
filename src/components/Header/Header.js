import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../images/evangadi-logo.png";

// react-redux
import { connect } from "react-redux";

// actions
import { REMOVE_USER } from "../../context/actions";

function Header({ user, removeUser }) {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const logOut = async () => {
		try {
			await axios.delete(
				"https://evangadi-form.cyclic.app/api/user/logout",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			localStorage.removeItem("token");

			removeUser();
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<Navbar
				bg="light"
				expand="lg"
				className="py-3 shadow-lg position-sticky w-100 "
				style={{
					zIndex: "99",
					top: "0",
				}}
			>
				<Container>
					<Navbar.Brand href="/">
						<img src={logo} alt="" />
					</Navbar.Brand>

					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-lg`}
					></Navbar.Toggle>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-lg`}
						aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
						placement="end"
					>
						<Offcanvas.Body>
							<Nav className="justify-content-end flex-grow-1 ">
								<Nav.Link href="#">Home</Nav.Link>
								<Nav.Link href="#">How it works</Nav.Link>
								{token && (
									<h6
										style={{
											cursor: "pointer",
										}}
										className="fw-bold py-2 px-3 c-pointer"
										onClick={logOut}
									>
										Log out
									</h6>
								)}
							</Nav>
							{!token && (
								<Nav>
									<Button className="px-5" variant="primary">
										SIGN IN
									</Button>
								</Nav>
							)}
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		removeUser: () => dispatch({ type: REMOVE_USER }),
	};
};
const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
