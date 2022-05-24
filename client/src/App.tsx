import "bootstrap/dist/css/bootstrap.min.css";

import { Authentication, SearchBar } from './components';

const App = () => {
  return (
    <div className="App">
      <Authentication></Authentication>
      <SearchBar></SearchBar>
    </div>
  );
};

export default App;
