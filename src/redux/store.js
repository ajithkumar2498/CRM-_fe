import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice.js"
import dashboardReducer from "./slices/dashBoardSlice.js"
import userReducer from "./slices/userSlice.js"
import contactReducer from "./slices/contactSlice.js"
import companyReducer from "./slices/companySlice.js"
import dealsReducer from "./slices/dealSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    user: userReducer,
    contacts: contactReducer,
    companies: companyReducer,
    deals: dealsReducer
  },
  devTools: true,

})

export default store