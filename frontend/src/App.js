import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import VerificationForm from "./components/VerificationForm";
import SuccessPage from "./components/SuccessPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <VerificationForm />,
    },
    {
      path: "/success",
      element: <SuccessPage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
