import React from "react";
import "./app.scss";

import { Suspense, lazy } from "react";
const Artists = lazy(() => import("./Artists"));
function App() {
  return (
    <div className="App">
    <Suspense fallback={<h1>Loading</h1>}> <Artists /></Suspense>
             
             
    </div>
  );
}

export default App;
