import "bootstrap/dist/css/bootstrap.min.css";

import Auth from "./components/auth/Auth";
import Search from "./components/games/Search";

const App = () => {
  return (
    <div className="App">
      <Auth />
      <Search />
    </div>
  );
};

export default App;
