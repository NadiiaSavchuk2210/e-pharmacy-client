'use client';

import { useFormikContext } from 'formik';
import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { MedicineFiltersValues } from '../../model';

const SEARCH_ERROR_ID = 'medicine-name-error';

const MedicineSearchField = () => {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext<MedicineFiltersValues>();
  const hasError = Boolean(touched.name && errors.name);

  return (
    <div className="flex w-full flex-col gap-space-4 h-[44px]  md:mr-space-8 md:w-[calc((100%_-_14.125rem_-_var(--space-14)_-_var(--space-8))_/_2)] lg:w-[16.25rem]">
      <Label htmlFor="medicine-search" className="sr-only">
        Search medicine
      </Label>
      <div className="relative">
        <Input
          id="medicine-search"
          name="name"
          type="search"
          value={values.name}
          onBlur={() => setFieldTouched('name', true)}
          onChange={(event) => setFieldValue('name', event.target.value)}
          placeholder="Search medicine"
          aria-invalid={hasError}
          aria-describedby={hasError ? SEARCH_ERROR_ID : undefined}
          className="pr-space-48 text-12 leading-space-18"
        />
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-space-18 size-4 -translate-y-1/2 text-text"
        />
      </div>
      {hasError ? (
        <p
          id={SEARCH_ERROR_ID}
          role="alert"
          className="px-space-18 text-12 leading-18 text-danger"
        >
          {errors.name}
        </p>
      ) : null}
    </div>
  );
};

export default MedicineSearchField;
