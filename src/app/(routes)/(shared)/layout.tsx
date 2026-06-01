import SharedLayout from '@/shared/layout/SharedLayout';

type SharedRoutesLayoutProps = {
  children: React.ReactNode;
};

const SharedRoutesLayout = ({ children }: SharedRoutesLayoutProps) => {
  return (
    <SharedLayout>
      <main className="flex-1">{children}</main>
    </SharedLayout>
  );
};

export default SharedRoutesLayout;
