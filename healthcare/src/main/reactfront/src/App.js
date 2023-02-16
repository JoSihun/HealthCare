import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";
import Banner from './components/Banner';
import Home from "./components/Home";
import Introduce from "./components/Introduce";
import FAQBoard from "./components/support/FAQBoard";
import MyPage from "./components/MyPage";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import QNABoard from "./components/support/QNABoard";
import LiveChat from "./components/support/LiveChat";
import TestPage from './components/TestPage';
import FAQPostForm from './components/support/FAQPostForm';
import FreeBoard from './components/support/FreeBoard';
import FreeBoardPost from './components/support/FreeBoardPost';
import FreeBoardForm from './components/support/FreeBoardForm';

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

                  <Route path="/support/faqboard" element={<FAQBoard />}></Route>
                  <Route path="/support/faqboard/form" element={<FAQPostForm />}></Route>
                  
                  <Route path="/support/qnaboard" element={<QNABoard />}></Route>

                  <Route path="/support/freeboard" element={<FreeBoard />}></Route>
                  <Route path="/support/freeboard/form" element={<FreeBoardForm />}></Route>
                  <Route path="/support/freeboard/form/:id" element={<FreeBoardForm />}></Route>
                  <Route path="/support/freeboard/post/:id" element={<FreeBoardPost />}></Route>

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
