import "bootstrap/dist/css/bootstrap.min.css";

import { Auth, SearchBar } from "./components";

const App = () => {
  return (
    <div className="App">
      <Auth/>
      <SearchBar/>
    </div>
  );
};

export default App;
