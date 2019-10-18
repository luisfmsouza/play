import React from "react";
import { Provider } from "react-redux";

import store from "./state";

const App = () => <Provider store={store}></Provider>;

export default App;
