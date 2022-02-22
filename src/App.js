import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import './scss/style.scss';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";

// <div className="App">
//     <h1 className="app-title">牧場物語 雙子村</h1>
//     <div className="link-group">
//         <div className="btn">魚的介紹</div>
//         <div className="btn">村民簡介</div>
//         <div className="btn">戀愛對象簡介</div>
//         <div className="btn">食譜簡介</div>
//     </div>

// </div>
function App() {
  return (
      <Router>
          <div>
              <AppBar position="static">
                  <Toolbar variant="dense">
                      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                          {/*<MenuIcon />*/}123
                      </IconButton>
                      <Typography variant="h6" color="inherit" component="div">
                          牧場小知識！
                      </Typography>
                  </Toolbar>
              </AppBar>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/lover">戀愛對象簡介</Link>
                      </li>
                      <li>
                          <Link to="/recipe">食譜簡介</Link>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path="/lover" element={<Lover />} />
                  <Route path="/recipe" element={<Recipe />} />
                  <Route path="/" element={<Home />} />
              </Routes>
          </div>
      </Router>
  );
}

function Home() {
    return <h2>Home</h2>;
}

function Lover() {
    return <h2>戀愛對象簡介</h2>;
}

function Recipe() {
    return <h2>食譜簡介</h2>;
}


export default App;
