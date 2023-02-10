import NavBar from "./NavBar"
import {Route, Routes} from "react-router-dom"
import Homepage from "./Pages/Homepage"

function App() {






  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
