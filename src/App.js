import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Landing from "./pages/LandingPage/Landing";
import Engagement from "./pages/Engagement/Engagement";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Management from "./pages/StoryManagementPage/StoryManagementPage";
import Trending from "./pages/Trending/Trending";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/engagement" element={<Engagement />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/story-management" element={<Management />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
