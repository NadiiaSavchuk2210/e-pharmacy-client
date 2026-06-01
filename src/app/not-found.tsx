import Link from 'next/link';

import { Button } from '@/components/ui/button';
import RouteStatePage from '@/shared/ui/RouteStatePage';

const NotFoundPage = () => {
  return (
    <RouteStatePage
      eyebrow="Page not found"
      title="404"
      description="The page you are looking for may have moved, been removed, or never existed."
      actions={
        <>
          <Button asChild variant="primary" size="pill">
            <Link href="/home">Go home</Link>
          </Button>
          <Button asChild variant="outline" size="pill">
            <Link href="/medicine">Browse medicine</Link>
          </Button>
        </>
      }
    />
  );
};

export default NotFoundPage;
