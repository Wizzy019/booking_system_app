import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { useAuthStore } from "./features/auth/hooks/authStore";
import { useEffect } from "react";
// import { useLoader } from "./components/contexts/LoaderComtext";

function App() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
