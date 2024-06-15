// import logo from './logo.svg';
// import './App.css';
// import { LoginSignup } from './Components/LoginSignup/LoginSignup';
// import Navbar from './Components/Navbar/Navbar';

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/about" component={About} />
//           <Route path="/projects" component={Projects} />
//           <Route path="/contact" component={Contact} />
//         </Switch>
//       <LoginSignup/>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import Navbar from './Components/Navbar/Navbar';
// import { Route, Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginSignup/>} />
          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/projects" component={Projects} /> */}
          {/* <Route path="/contact" component={Contact} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
