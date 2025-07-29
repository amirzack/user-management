/**
 * App.tsx
 * -------------
 * Root container for app-wide providers (Redux, React Query, Theme, Routing).
 *
 * نکته:
 * این فایل به عنوان نقطه اصلی اجرای برنامه، در فایل main.tsx ایمپورت و استفاده می‌شود.
 * (main.tsx = entrypoint واقعی اپلیکیشن React)
 */

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { ThemeProvider } from "./theme/ThemeProvider";
import { AppContent } from "./routes/AppContent";
const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
