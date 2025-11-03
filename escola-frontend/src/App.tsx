import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "sonner";
import SplashArt from "@/components/global/SplashArt";
import { useEffect, useState } from "react";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      window.history.replaceState(null, "", "/");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashArt onComplete={() => setShowSplash(false)} />;
  }

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
