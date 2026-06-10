import { Suspense } from 'react';
import { PredictorPage } from '../../screens/PredictorPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PredictorPage />
    </Suspense>
  );
}
