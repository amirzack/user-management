import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/ui/spinner";


/**
 * ProtectedRoute
 * ---------------
 * Guards private application routes and ensures access only for authenticated users.
 *
 * توضیحات:
 * - این کامپوننت یک Wrapper برای مسیرهای خصوصی (Private) است.
 * - اگر وضعیت اولیه احراز هویت (isInitialized) از هوک useAuth هنوز لود نشده باشد، فقط Spinner نمایش داده می‌شود تا از رندر شدن محتوای داخلی قبل از مشخص شدن auth جلوگیری شود.
 * - اگر کاربر احراز هویت نشده باشد (`isAuthenticated` فالس)، کاربر به مسیر /login منتقل (Redirect) می‌شود (با replace).
 * - در غیر این صورت، همه فرزندان (children) را نمایش می‌دهد (دسترسی آزاد به محتوای خصوصی).
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();
  if (!isInitialized) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
