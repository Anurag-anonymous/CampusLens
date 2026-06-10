import { Suspense } from 'react';
import { DiscussionsPage } from '../../screens/DiscussionsPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DiscussionsPage />
    </Suspense>
  );
}
