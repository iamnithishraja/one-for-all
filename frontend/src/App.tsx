import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import NotesPage from "./pages/NotesPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
