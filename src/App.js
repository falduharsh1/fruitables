import { Route, Routes } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducer";
import { createStore } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import Alert from "./component/Alert/Alert";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  const { store, persistor } = createStore();

  return (
    <>
      <SnackbarProvider>
        <ThemeProvider>
          <Provider store={store} >
            <PersistGate loading={null} persistor={persistor}>
              <Alert />
              <Routes>
                <Route path="/*" element={<UserRoute />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/Admin/*" element={<AdminRoute />} />
                </Route>
              </Routes>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </SnackbarProvider>
      {/* <Main/> */}
      {/* <Shop /> */}
      {/* <ShopDetail/> */}
      {/* <Testimonial/> */}
      {/* <Cart/> */}
      {/* <Chackout/> */}
      {/* <Contact/> */}
      {/* <Error404/> */}

    </>
  );
}

export default App;
