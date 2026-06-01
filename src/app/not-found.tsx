import SharedLayout from '@/shared/layout/SharedLayout';
import NotFoundStatePage from '@/shared/ui/NotFoundStatePage';

const NotFoundPage = () => {
  return (
    <SharedLayout>
      <main className="flex-1">
        <NotFoundStatePage />
      </main>
    </SharedLayout>
  );
};

export default NotFoundPage;
