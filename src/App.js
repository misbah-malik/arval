import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./dataContext";
import UserInfo from "./userInfoForm";
import Password from "./passwordForm";
import Review from "./reviewScreen";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/userInfo" element={<UserInfo></UserInfo>}>
              Login
            </Route>
            <Route path="/password" element={<Password></Password>}>
              Password
            </Route>
            <Route path="/review" element={<Review></Review>}>
              Review
            </Route>
          </Routes>
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
