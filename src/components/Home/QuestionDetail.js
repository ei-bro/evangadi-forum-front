import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// react-redux
import { connect } from "react-redux";

// actions
import { SHOW_ALERT, STORE_USER } from "../../context/actions";

export const QuestionDetail = ({ user, alert1, storeUser }) => {
	const token = localStorage.getItem("token");

	const { post_id } = useParams();
	const navigate = useNavigate();

	const [question, setQuestion] = useState([]);
	const [answers, setAnswers] = useState([]);

	const textDom = useRef();

	useEffect(() => {
		if (user) {
			checkLogedIn();
		} else {
			navigate("/");
		}
	}, []);

	const checkLogedIn = async () => {
		try {
			const { data } = await axios.get(
				"https://evangadi-form.cyclic.app/api/user/current",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			storeUser(data.user);
			await fetchQuestion();
		} catch (error) {
			alert1("Please log in to your account first.");
			navigate("/");
			console.log(error.message);
		}
	};

	const fetchQuestion = async () => {
		try {
			const { data } = await axios.get(
				`https://evangadi-form.cyclic.app/api/question/${post_id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const { answers } = await allAnswer(data.data[0].question_id);
			setQuestion(data.data);
			setAnswers(answers.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	const allAnswer = async (id) => {
		try {
			const { data } = await axios.get(
				`https://evangadi-form.cyclic.app/api/answer/all/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return { answers: data };
		} catch (error) {
			console.log(error.message);
		}
	};

	const postAnswer = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				`https://evangadi-form.cyclic.app/api/answer/post/`,
				{
					answer: textDom.current.value,
					question_id: question[0].question_id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			await fetchQuestion();
			textDom.current.value = "";
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<>
			<Container>
				<h2 className="my-5">Question</h2>
				<div className="">
					<h4 className=" text-dark">{question[0]?.question}</h4>
					<h6>{question[0]?.question_description}</h6>
				</div>
				<hr />
				<h1>Answer From The Community </h1>
				<hr />

				{/* map */}
				{answers?.map((el, index) => {
					return (
						<Row key={index} className="my-5 py-3 shadow">
							<Col
								sm={12}
								md={2}
								className={index % 2 === 0 && "order-1 "}
							>
								<Row>
									<Col sm={12}>
										<i
											className="fa-solid fa-user-tie "
											style={{
												fontSize: "50px",
											}}
										></i>
									</Col>
									<Col sm={12}>
										<h6 className="my-3 text-secondary text-capitalize">
											{el.user_name}
										</h6>
									</Col>
								</Row>
							</Col>
							<Col
								sm={12}
								md={10}
								className={index % 2 === 0 && "text-end px-5"}
							>
								<h6>{el.answer}</h6>
							</Col>
						</Row>
					);
				})}
				<div className="my-5 text-center">
					<h2>Answer The Above Question </h2>
				</div>
				<Form onSubmit={postAnswer}>
					<div className="my-3 ">
						<Form.Control
							ref={textDom}
							as="textarea"
							rows="4"
							placeholder="Your Answer ..."
						></Form.Control>
					</div>
					<Button type="submit" className="mb-5">
						Post Your Anwser
					</Button>
				</Form>
			</Container>
		</>
	);
};
const mapStateToProps = (state) => {
	const { user } = state;
	return { user };
};

const mapDispatchToProps = (dispatch) => {
	return {
		storeUser: (person) => dispatch({ type: STORE_USER, payload: person }),

		alert1: (msg) =>
			dispatch({
				type: SHOW_ALERT,
				payload: msg,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
