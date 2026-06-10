import { Suspense } from 'react';
import { CollegesListingPage } from '../../screens/CollegesListingPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CollegesListingPage />
    </Suspense>
  );
}
