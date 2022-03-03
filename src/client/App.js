import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import '../client/scss/style.scss';
import Header from "./layout/Header";
import {Lover} from "./pages";

function App() {
  return (
      <Router>
          <div>
              <Header />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/lover" element={<Lover />} />
                  <Route path="/recipe" element={<Recipe />} />
                  <Route path="/member" element={<Member />} />
                  <Route path="/fish" element={<Fish />} />
              </Routes>
          </div>
      </Router>
  );
}

function Home() {
    return <h2>Home</h2>;
}

function Recipe() {
    return <h2>食譜簡介</h2>;
}

function Member() {
    return <h2>村民簡介</h2>;
}

function Fish() {
    return <h2>魚的簡介</h2>;
}


export default App;
