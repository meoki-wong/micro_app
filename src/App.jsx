import React, {useEffect} from'react';
// import UseRoute from './router'
import AuthRoute from './router/authRoute'


function App() {
  useEffect(() => {
    // AuthRoute()
  }, [])
  
  return (
    <div className="App">
      <AuthRoute />
    </div>
  );
}

export default App;
