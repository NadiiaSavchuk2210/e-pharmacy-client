'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import RouteStatePage from '@/shared/ui/RouteStatePage';

type ErrorPageProps = {
  reset: () => void;
};

const ErrorPage = ({ reset }: ErrorPageProps) => {
  return (
    <RouteStatePage
      eyebrow="Something went wrong"
      title="Error"
      description="We could not load this page right now. Try again, or return home and continue shopping."
      tone="danger"
      actions={
        <>
          <Button variant="primary" size="pill" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outline" size="pill">
            <Link href="/home">Go home</Link>
          </Button>
        </>
      }
    />
  );
};

export default ErrorPage;
