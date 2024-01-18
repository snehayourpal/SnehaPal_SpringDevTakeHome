// import './App.css';
// import VolunteerTable from './components/VolunteerTable';

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <VolunteerTable />
//       </div>
//     </div>
//   );
// }

// export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage.js';
import ViewerPage from './pages/ViewerPage.js';
import styles from './App.module.css';

const App = () => {
  return (
    <div>
      {/* <header className={styles.headerStyle}>
        <h1 className={styles.headerTitleStyle}>HaHa Heroes</h1>
      </header> */}
      <Router>
        <Routes>
          <Route path="/admin/" element={<AdminPage />} />
          <Route path="/viewer/" element={<ViewerPage />} />
          <Route path="/" element={<Navigate to="/viewer/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
