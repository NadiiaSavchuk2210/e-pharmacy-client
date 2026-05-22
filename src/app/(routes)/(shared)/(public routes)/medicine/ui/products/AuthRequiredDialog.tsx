'use client';

import { XIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LoginForm from '@/features/auth/login/ui/LoginForm';
import RegisterForm from '@/features/auth/register/ui/RegisterForm';

type AuthRequiredDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectPath: string;
};

type AuthDialogMode = 'login' | 'register';

const AUTH_DIALOG_FORM_CLASS =
  'mx-auto flex w-full max-w-[419px] flex-col gap-space-10 md:gap-space-14';

const AUTH_DIALOG_FIELD_CLASS = 'w-full md:w-full lg:w-full';

const AUTH_DIALOG_INPUT_CLASS =
  'h-[44px] py-space-13 px-space-18 text-12 leading-space-18 placeholder:text-neutral-500';

const AUTH_DIALOG_FOOTER_CLASS_NAMES = {
  submitWrapper:
    'mt-space-15 flex w-full text-14 leading-space-18 md:mt-[11px]',
  submitButton:
    'block mb-space-4 h-[44px] w-full rounded-[60px] py-space-13 px-space-32 text-14 font-medium leading-space-18 hover:bg-button-primary-hover-bg focus-visible:border-button-primary-hover-bg focus-visible:bg-button-primary-hover-bg focus-visible:ring-button-primary-hover-bg/35 active:bg-button-primary-hover-bg md:mb-0',
  navigationLink:
    'w-full cursor-pointer border-0 bg-transparent p-0 text-center text-12 font-normal leading-space-18 text-neutral-500 transition-colors duration-fast ease-fast hover:text-text focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-700/35',
} as const;

const DIALOG_COPY = {
  login: {
    title: 'Log in to your account',
    description: 'Please login to your account before continuing.',
  },
  register: {
    title: 'Sign Up',
    description: 'Before proceeding, please register on our site.',
  },
} as const satisfies Record<
  AuthDialogMode,
  {
    title: string;
    description: string;
  }
>;

const AuthRequiredDialog = ({
  open,
  onOpenChange,
  redirectPath,
}: AuthRequiredDialogProps) => {
  const [mode, setMode] = useState<AuthDialogMode>('login');
  const copy = DIALOG_COPY[mode];

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setMode('login');
    }

    onOpenChange(nextOpen);
  };

  const handleAuthSuccess = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col gap-space-25 max-h-[calc(100dvh-2rem)] w-[343px] overflow-y-auto rounded-[20px] border-0 px-space-32 py-space-40 shadow-none md:w-[463px] md:max-w-[463px] md:py-[50px] md:px-[70px]"
      >
        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-space-16 right-space-16 size-5 text-text-muted hover:bg-accent-soft hover:text-text focus-visible:border-brand-700 focus-visible:bg-accent-soft focus-visible:ring-brand-700/35 md:top-space-20 md:right-space-20 md:size-6"
          >
            <XIcon className="size-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>

        <DialogHeader className="items-center text-center gap-space-14">
          <DialogTitle className="max-w-[280px] text-28 font-semibold leading-space-32 text-text md:max-w-[301px]">
            {copy.title}
          </DialogTitle>
          <DialogDescription className="max-w-[261px] text-14 leading-space-20 text-neutral-500 md:text-16">
            {copy.description}
          </DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <LoginForm
            redirectPath={redirectPath}
            onAuthSuccess={handleAuthSuccess}
            onNavigateToRegister={() => setMode('register')}
            navigationLabel="Don't have an account?"
            formClassName={AUTH_DIALOG_FORM_CLASS}
            fieldClassName={AUTH_DIALOG_FIELD_CLASS}
            inputClassName={AUTH_DIALOG_INPUT_CLASS}
            footerClassNames={AUTH_DIALOG_FOOTER_CLASS_NAMES}
          />
        ) : (
          <RegisterForm
            redirectPath={redirectPath}
            onAuthSuccess={handleAuthSuccess}
            onNavigateToLogin={() => setMode('login')}
            submitLabel="Sign Up"
            submittingLabel="Signing up..."
            navigationLabel="Already have an account?"
            formClassName={AUTH_DIALOG_FORM_CLASS}
            fieldClassName={AUTH_DIALOG_FIELD_CLASS}
            inputClassName={AUTH_DIALOG_INPUT_CLASS}
            footerClassNames={AUTH_DIALOG_FOOTER_CLASS_NAMES}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
