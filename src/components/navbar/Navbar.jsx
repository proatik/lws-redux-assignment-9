import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// RTK actions.
import { changeSearch } from "../../redux/features/filters/filtersSlice";

// images.
import logo from "../../assets/images/logo.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const debounce = (fn, delay) => {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (event) => {
    const text = event.target.value;
    dispatch(changeSearch(text));
  };

  const searchHandler = debounce(doSearch, 500);

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500" />
          <input
            type="text"
            id="lws-searchTask"
            className="search-input"
            placeholder="Search Task"
            onChange={searchHandler}
            disabled={pathname !== "/"}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
