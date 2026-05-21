'use client';

import { useFormikContext } from 'formik';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { productCategories } from '../../config';
import { ALL_CATEGORIES_VALUE } from '../../lib';

import type { MedicineFiltersValues } from '../../model';

const CATEGORY_ERROR_ID = 'medicine-category-error';

const MedicineCategoryField = () => {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext<MedicineFiltersValues>();
  const hasError = Boolean(touched.category && errors.category);

  return (
    <div className="flex w-full flex-col gap-space-4 h-[44px] md:mr-space-14 md:w-[calc((100%_-_14.125rem_-_var(--space-14)_-_var(--space-8))_/_2)] lg:w-[15.625rem]">
      <Label htmlFor="medicine-category" className="sr-only">
        Product category
      </Label>
      <Select
        name="category"
        value={values.category || ALL_CATEGORIES_VALUE}
        onValueChange={(value) => {
          setFieldValue(
            'category',
            value === ALL_CATEGORIES_VALUE ? '' : value,
          );
          setFieldTouched('category', true, false);
        }}
      >
        <SelectTrigger
          id="medicine-category"
          aria-invalid={hasError}
          aria-describedby={hasError ? CATEGORY_ERROR_ID : undefined}
          className="h-[44px] px-space-18 text-12 leading-space-18 md:px-space-18 md:text-14"
        >
          <span
            className={cn(
              'truncate',
              !values.category && 'text-12 leading-space-18 text-text-weak',
            )}
          >
            {values.category || 'Product category'}
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={ALL_CATEGORIES_VALUE}>
              Product category
            </SelectItem>
            {productCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {hasError ? (
        <p
          id={CATEGORY_ERROR_ID}
          role="alert"
          className="px-space-18 text-12 leading-space-18 text-danger"
        >
          {errors.category}
        </p>
      ) : null}
    </div>
  );
};

export default MedicineCategoryField;
