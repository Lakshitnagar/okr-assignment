import React from "react";
import OkrDashboard from "./pages/okrDashboard/OkrDashboard";
import "./App.scss";

function App() {
  return (
    <div className="app_container">
      <div>
        <header>OKR Dashboard</header>

        <main>
          <OkrDashboard />
        </main>
      </div>

      <div>
        <footer>@Company</footer>
      </div>
    </div>
  );
}

export default App;
