import { BrowserRouter, Routes, Route } from "react-router-dom";

import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Ask from "./components/Home/Ask";
import Home from "./components/Home/Home";
import NotFound from "./components/Home/NotFound";
import QuestionDetail from "./components/Home/QuestionDetail";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Banner />}></Route>
				<Route path="/ask" element={<Ask />}></Route>

				<Route path="/dashboard" element={<Home />}></Route>
				<Route
					path="/question/:post_id"
					element={<QuestionDetail />}
				></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
