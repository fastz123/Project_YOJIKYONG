import React, { lazy, Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline, createMuiTheme, ThemeProvider, responsiveFontSizes } from "@material-ui/core";
import Loading from "./Components/Common/Loading/Loading"
import { Provider } from 'react-redux'
import store from 'Store/store';

const Home = lazy(() => import("./Components/Home/Home"));
const Main = lazy(() => import("./Components/Main/Main"));
const Header = lazy(() => import("./Components/Common/Header/Header"));
const Report = lazy(()=> import("Components/Report/Report"));
const CategoryList = lazy(()=> import("Components/Category/CategoryList/CategoryList"));
const StoreList = lazy(()=>import("Components/Category/StoreList/StoreList"));

let theme = createMuiTheme({
  palette: {
    primary: {
      // 오렌지
      main: '#ff7f00',
    },
  },
});
theme = responsiveFontSizes(theme);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <CssBaseline />
            <Suspense fallback={Loading}>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/main" component={Main} />
                <Route path="/report" component={Report} />
                <Route path="/category/list" component={CategoryList} />
                <Route path="/storelist/:category" component={StoreList} />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
