import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navigation from "./components/Navigation";
import Banner from './components/Banner';
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import Staff from "./pages/introduce/Staff";
import Facility from "./pages/introduce/Facility";
import Direction from "./pages/introduce/Direction";

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

import LiveChatList from "./pages/support/LiveChatList";
import LiveChatRoom from "./pages/support/LiveChatRoom";
import LiveChatListAdmin from "./pages/support/LiveChatListAdmin";
import LiveChatRoomAdmin from "./pages/support/LiveChatRoomAdmin";

import BMI from './pages/users/BMI';
import Diet from './pages/users/Diet';
import MyPage from "./pages/users/MyPage";

import SignIn from './pages/users/SignIn';
import SignUp from './pages/users/SignUp';

export default function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Banner />
            <Routes>
                <Route path='/' element={<Home />} />

                {/* INTRODUCE */}
                <Route path="/introduce/staff" element={<Staff />}></Route>
                <Route path="/introduce/facility" element={<Facility />}></Route>
                <Route path="/introduce/direction" element={<Direction />}></Route>

                {/* SUPPORT */}
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

                {/* MY-PAGE */}
                <Route path="/my-page" element={<MyPage />}></Route>
                <Route path="/my-page/bmi" element={<BMI />}></Route>
                <Route path="/my-page/diet" element={<Diet />}></Route>
                <Route path="/my-page/routine" element={<MyPage />}></Route>
                
                {/* USER */}
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/signin" element={<SignIn />}></Route>

                {/* 404 NOT FOUND */}
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
