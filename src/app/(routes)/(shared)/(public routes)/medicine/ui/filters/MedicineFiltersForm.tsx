'use client';

import { Form, Formik, type FormikHelpers } from 'formik';
import { FunnelIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { Button } from '@/components/ui/button';

import MedicineCategoryField from './MedicineCategoryField';
import MedicineSearchField from './MedicineSearchField';
import {
  getMedicineFiltersHref,
  getMedicineFiltersInitialValues,
} from '../../lib';
import { medicineFiltersSchema } from '../../model';

import type {
  MedicineFiltersFormProps,
  MedicineFiltersValues,
} from '../../model';

const MedicineFiltersForm = ({
  initialCategory = '',
  initialName = '',
  discount,
  limit,
}: MedicineFiltersFormProps) => {
  const router = useRouter();
  const initialValues = useMemo(
    () => getMedicineFiltersInitialValues({ initialCategory, initialName }),
    [initialCategory, initialName],
  );

  const handleSubmit = useCallback(
    (
      values: MedicineFiltersValues,
      { setSubmitting }: FormikHelpers<MedicineFiltersValues>,
    ) => {
      router.push(getMedicineFiltersHref(values, discount, limit));
      setSubmitting(false);
    },
    [discount, limit, router],
  );

  return (
    <Formik<MedicineFiltersValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={medicineFiltersSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form
          className="mb-space-32 flex flex-col gap-space-12 md:flex-row md:items-start md:gap-0 lg:mb-space-40"
          noValidate
        >
          <MedicineCategoryField />
          <MedicineSearchField />

          <Button
            type="submit"
            variant="primary"
            size="pill"
            disabled={isSubmitting}
            className="min-h-[44px] w-[116px] flex gap-space-8 bg-brand-700 px-space-30 py-space-12 font-medium text-14 leading-space-18 hover:bg-brand-600 focus-visible:bg-brand-700 active:bg-brand-700"
          >
            <FunnelIcon aria-hidden="true" className="size-3.5" />
            Filter
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MedicineFiltersForm;
