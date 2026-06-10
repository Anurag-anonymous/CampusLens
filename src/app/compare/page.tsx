import { ComparePage } from '../../screens/ComparePage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ComparePage />
    </Suspense>
  );
}
