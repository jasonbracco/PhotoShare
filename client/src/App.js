import NavBar from "./NavBar"
import {Route, Routes} from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Profile from "./Pages/Profile"

function App() {

  return (
    <div>
      <div className="header">Header</div>
      <div>Cart</div>
      <div className="side-navbar">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
