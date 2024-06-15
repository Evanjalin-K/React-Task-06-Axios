import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Users, { loader as UsersLoader} from "./components/Users"


const router = createBrowserRouter([
  {
    path: "/",
   element: <Users/>,
   loader: UsersLoader
  }
])

const App = () => {

  return <RouterProvider router = {router}/>
}

export default App;