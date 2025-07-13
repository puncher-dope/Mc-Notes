import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ContextProvider } from "./provider";
import "./index.css";


function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
