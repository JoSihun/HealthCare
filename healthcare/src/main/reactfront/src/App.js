import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";
import Banner from './components/Banner';
import Home from "./components/Home";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import Facilities from "./components/introduce/Facilities";
import Staff from "./components/introduce/Staff";

import Login from "./components/Login";
import MyPage from "./components/MyPage";

import FAQBoard from "./pages/support/FAQBoard";
import FAQPostForm from './pages/support/FAQPostForm';

import QNABoard from "./pages/support/QNABoard";

import FreeBoard from './pages/support/FreeBoard';
import FreeBoardPost from './pages/support/FreeBoardPost';
import FreeBoardForm from './pages/support/FreeBoardForm';

import LiveChat from "./pages/support/LiveChat";
import TestPage from './components/TestPage';
import QNABoardForm from './pages/support/QNABoardForm';
import QNABoardPost from './pages/support/QNABoardPost';

function App() {
  return (
      <div>
          <BrowserRouter>
              <Navigation />
              <Banner />
              <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/home" element={<Home />}></Route>

                  <Route path="/introduce/facilities" element={<Facilities />}></Route>
                  <Route path="/introduce/staff" element={<Staff />}></Route>

                  <Route path="/support/faqboard" element={<FAQBoard />}></Route>
                  <Route path="/support/faqboard/form" element={<FAQPostForm />}></Route>
                  
                  <Route path="/support/qnaboard" element={<QNABoard />}></Route>
                  <Route path="/support/qnaboard/form" element={<QNABoardForm />}></Route>
                  <Route path="/support/qnaboard/form/:id" element={<QNABoardForm />}></Route>
                  <Route path="/support/qnaboard/post/:id" element={<QNABoardPost />}></Route>

                  <Route path="/support/freeboard" element={<FreeBoard />}></Route>
                  <Route path="/support/freeboard/form" element={<FreeBoardForm />}></Route>
                  <Route path="/support/freeboard/form/:id" element={<FreeBoardForm />}></Route>
                  <Route path="/support/freeboard/post/:id" element={<FreeBoardPost />}></Route>
                  <Route path="/support/freeboard/:id/:size" element={<FreeBoard />}></Route>

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
