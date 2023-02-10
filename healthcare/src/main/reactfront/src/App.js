import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";
import Banner from './components/Banner';
import Home from "./components/Home";
import Introduce from "./components/Introduce";
import FAQ from "./components/support/FAQ";
import MyPage from "./components/MyPage";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import QNA from "./components/support/QNA";
import LiveChat from "./components/support/LiveChat";
import TestPage from './components/TestPage';
import FAQPostForm from './components/support/FAQPostForm';

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
                  <Route path="/support/faq/form" element={<FAQPostForm />}></Route>
                  <Route path="/support/qna" element={<QNA />}></Route>
                  <Route path="/support/livechat" element={<LiveChat />}></Route>

                  <Route path="/my-page" element={<MyPage />}></Route>
                  <Route path="/testpage" element={<TestPage />}></Route>
                  
                  {/* 수정중입니다 */}
                  <Route path="/login" element={<Login />}></Route>

                  <Route path="*" element={<NotFound />}></Route>
              </Routes>
              <Footer />
          </BrowserRouter>
    </div>
  );
}

export default App;
