import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { SavedPage } from '../../screens/SavedPage';

export default function Page() {
  return (
    <ProtectedRoute>
      <SavedPage />
    </ProtectedRoute>
  );
}
