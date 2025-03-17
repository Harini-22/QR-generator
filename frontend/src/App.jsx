import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRGenerate from "./components/QRGenerate";
import ViewText from "./components/ViewText";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRGenerate />} />
        <Route path="/view/:id" element={<ViewText />} />
      </Routes>
    </Router>
  );
}

export default App;
