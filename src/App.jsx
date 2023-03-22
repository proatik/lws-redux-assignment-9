import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// react components.
import MainLayout from "./layouts/MainLayout";

// pages.
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

// redux store.
import store from "./redux/app/store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-task" element={<Add />} />
            <Route path="/edit-task/:taskId" element={<Edit />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;
