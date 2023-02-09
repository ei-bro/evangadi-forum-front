import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

function NotFound() {
	return (
		<>
			<Container className="my-5 py-5 w-25 text-left">
				<h2>Sorry, the page you are looking for couldn't be found.</h2>
				<br />
				<p>
					Please go back to the home page and try again. If it still
					doesn't work for you, please reach out to our team at{" "}
					<span style={{ color: "#f6912b" }}>
						contact@ibrahimwondimu.com.
					</span>
				</p>
			</Container>
		</>
	);
}

export default NotFound;
