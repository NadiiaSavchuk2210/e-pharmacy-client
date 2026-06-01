import Link from 'next/link';

import { Button } from '@/components/ui/button';
import RouteStatePage from '@/shared/ui/RouteStatePage';

const ProductNotFoundState = () => {
  return (
    <RouteStatePage
      eyebrow="Product not found"
      title="No product here"
      description="This product may have been removed, or the link may be outdated. You can browse the medicine catalog to find available products."
      actions={
        <>
          <Button asChild variant="primary" size="pill">
            <Link href="/medicine">Browse medicine</Link>
          </Button>
          <Button asChild variant="outline" size="pill">
            <Link href="/home">Go home</Link>
          </Button>
        </>
      }
    />
  );
};

export default ProductNotFoundState;
