import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";
import Banner from './components/Banner';
import Home from "./components/Home";
import Introduce from "./components/Introduce";
import FAQ from "./components/support/FAQ";
import MyPage from "./components/MyPage";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import QNA from "./components/support/QNA";
import LiveChat from "./components/support/LiveChat";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Navigation />
              <Banner />
              <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/introduce" element={<Introduce />}></Route>

                  <Route path="/support/faq" element={<FAQ />}></Route>
                  <Route path="/support/qna" element={<QNA />}></Route>
                  <Route path="/support/livechat" element={<LiveChat />}></Route>

                  <Route path="/my-page" element={<MyPage />}></Route>
                  <Route path="*" element={<NotFound />}></Route>
              </Routes>
              <Footer />
          </BrowserRouter>
    </div>
  );
}

export default App;
