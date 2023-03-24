import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";
import Banner from './components/Banner';
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import Staff from "./pages/introduce/Staff";
import Facility from "./pages/introduce/Facility";

import Login from "./pages/users/Login";
import MyPage from "./pages/users/MyPage";

import FAQBoard from "./pages/support/FAQBoard";
import QNABoard from "./pages/support/QNABoard";
import QNABoardPost from './pages/support/QNABoardPost';
import QNABoardForm from './pages/support/QNABoardForm';
import QNABoardEdit from './pages/support/QNABoardEdit';
import QNABoardSearch from "./pages/support/QNABoardSearch";

import FreeBoard from './pages/support/FreeBoard';
import FreeBoardPost from './pages/support/FreeBoardPost';
import FreeBoardForm from './pages/support/FreeBoardForm';
import FreeBoardEdit from './pages/support/FreeBoardEdit';
import FreeBoardSearch from './pages/support/FreeBoardSearch';

// import LiveChat from "./pages/support/LiveChat";
import LiveChatList from "./pages/support/LiveChatList";
import LiveChatRoom from "./pages/support/LiveChatRoom";
import LiveChatListAdmin from "./pages/support/LiveChatListAdmin";
import LiveChatRoomAdmin from "./pages/support/LiveChatRoomAdmin";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Navigation />
              <Banner />
              <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/home" element={<Home />}></Route>

                  <Route path="/introduce/facility" element={<Facility />}></Route>
                  <Route path="/introduce/staff" element={<Staff />}></Route>

                  <Route path="/support/faqboard" element={<FAQBoard />}></Route>
                  <Route path="/support/qnaboard" element={<QNABoard />}></Route>
                  <Route path="/support/qnaboard/search" element={<QNABoardSearch />}></Route>
                  <Route path="/support/qnaboard/form" element={<QNABoardForm />}></Route>
                  <Route path="/support/qnaboard/form/:id" element={<QNABoardEdit />}></Route>
                  <Route path="/support/qnaboard/post/:id" element={<QNABoardPost />}></Route>

                  <Route path="/support/freeboard" element={<FreeBoard />}></Route>
                  <Route path="/support/freeboard/search" element={<FreeBoardSearch />}></Route>
                  <Route path="/support/freeboard/form" element={<FreeBoardForm />}></Route>
                  <Route path="/support/freeboard/form/:id" element={<FreeBoardEdit />}></Route>
                  <Route path="/support/freeboard/post/:id" element={<FreeBoardPost />}></Route>

                  <Route path="/support/livechat" element={<LiveChatList />}></Route>
                  <Route path="/support/livechat/list" element={<LiveChatList />}></Route>
                  <Route path="/support/livechat/room" element={<LiveChatRoom />}></Route>
                  <Route path="/support/livechat/list/admin" element={<LiveChatListAdmin />}></Route>
                  <Route path="/support/livechat/room/admin" element={<LiveChatRoomAdmin />}></Route>

                  <Route path="/my-page" element={<MyPage />}></Route>
                  
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
