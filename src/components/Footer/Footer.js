import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import logo from "../../images/evangadi-logo-footer.png";
import "./style.css";
function Footer() {
	return (
		<>
			<footer
				style={{
					backgroundColor: "#3b455a",
					padding: "60px 0 40px 0",
					color: "rgba(213, 213, 213, 0.6)",
					lineHeight: "1.4em",
					fontSize: "14px",
				}}
			>
				<Container>
					<Row>
						<Col sm={12} md={4} className="my-3">
							<Row>
								<Col sm={12}>
									<img src={logo} alt="" />
								</Col>
								<Row
									style={{
										width: "70%",
										margin: "30px 0",
										fontSize: "25px",
									}}
								>
									<Col sm={4}>
										<a
											href="https://www.facebook.com/"
											target="_blank"
										>
											<i className="fa-brands fa-telegram text-white"></i>
										</a>
									</Col>

									<Col sm={4}>
										<a
											href="https://www.instagram.com/"
											target="_blank"
										>
											<i className="fa-brands fa-linkedin text-white"></i>
										</a>
									</Col>
									<Col sm={4}>
										<a
											href="https://www.youtube.com/c/"
											target="_blank"
										>
											<i className="fa-brands fa-whatsapp text-white"></i>
										</a>
									</Col>
								</Row>
							</Row>
						</Col>
						<Col sm={12} md={4} className="my-3">
							<h5 className="text-white">Useful Link</h5>
							<ul
								style={{
									listStyle: "none",
									marginLeft: "-25px",
									lineHeight: "30px",
								}}
							>
								<li>
									<a href="">How it works</a>
								</li>
								<li>
									<a href="">Terms of Service</a>
								</li>
								<li>
									<a href="">Privacy policy</a>
								</li>
							</ul>
						</Col>
						<Col sm={12} md={4} className="my-3">
							<h5 className="text-white">Contact Info </h5>

							<ul
								style={{
									listStyle: "none",
									marginLeft: "-25px",
									lineHeight: "30px",
								}}
							>
								<li>
									<a href="">Evangadi Networks</a>
								</li>
								<li>
									<a href="">contact@ibrahimwondimu.com</a>
								</li>
								<li>
									<a href="">+251-93-313-7590</a>
								</li>
							</ul>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
}

export default Footer;
