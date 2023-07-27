import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Landing from "./pages/LandingPage/Landing";
import Engagement from "./pages/Engagement/Engagement";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Management from "./pages/StoryManagementPage/StoryManagementPage";
import Trending from "./pages/Trending/Trending";
import { ReactionProvider } from "./contextApi/ReactionContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToggleFormProvider } from "./contextApi/ToggleFormContext";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToggleFormProvider>
        <ReactionProvider>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route
              exact
              path="/Home"
              element={<ProtectedRoute element={Home} />}
            />
            <Route
              exact
              path="/engagement"
              element={<ProtectedRoute element={Engagement} />}
            />
            <Route
              exact
              path="/leaderboard"
              element={<ProtectedRoute element={Leaderboard} />}
            />
            <Route
              exact
              path="/story-management"
              element={<ProtectedRoute element={Management} />}
            />
            <Route
              exact
              path="/trending"
              element={<ProtectedRoute element={Trending} />}
            />
            <Route
              exact
              path="/landing"
              element={<ProtectedRoute element={Landing} />}
            />
            <Route
              exact
              path="*"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <div>
                    <h1>404 NOT FOUND</h1>
                  </div>
                </div>
              }
            />
          </Routes>
        </ReactionProvider>
      </ToggleFormProvider>
    </BrowserRouter>
  );
}

export default App;
