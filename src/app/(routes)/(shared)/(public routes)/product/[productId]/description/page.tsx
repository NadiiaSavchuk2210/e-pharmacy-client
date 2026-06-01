import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProductById } from '../product.data';

type Props = {
  params: Promise<{ productId: string }>;
};

const ProductDescriptionPage = async ({ params }: Props) => {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const description = product.description?.trim();
  const descriptionSections =
    product.descriptionSections?.filter(
      (section) => section.title.trim() && section.body.trim(),
    ) ?? [];
  const sourceUrl = product.sourceUrl?.trim();

  return (
    <section
      aria-labelledby="product-description-title"
      className="text-14 leading-space-18 md:text-16 md:leading-space-25"
    >
      <h2 id="product-description-title" className="visually-hidden">
        Description
      </h2>

      <p className="mb-space-20 text-neutral-500">
        {description ??
          `${product.name} belongs to the ${product.category} category and is supplied by ${product.suppliers}.`}
      </p>

      {descriptionSections.length > 0 ? (
        <div className="mb-space-24 flex flex-col gap-space-20">
          {descriptionSections.map((section) => (
            <p key={section.title} className="text-text">
              <strong className="mr-1 font-normal text-neutral-500">
                {section.title}:
              </strong>
              {section.body}
            </p>
          ))}
        </div>
      ) : (
        <dl className="mb-space-24 grid gap-space-12 rounded-[20px] border border-border-muted bg-surface-muted p-space-16 text-14 leading-space-20 md:grid-cols-3 md:p-space-20">
          <div>
            <dt className="text-12 font-semibold uppercase leading-space-16 text-text-weak">
              Category
            </dt>
            <dd className="mt-space-4 text-text">{product.category}</dd>
          </div>

          <div>
            <dt className="text-12 font-semibold uppercase leading-space-16 text-text-weak">
              Supplier
            </dt>
            <dd className="mt-space-4 text-text">{product.suppliers}</dd>
          </div>

          <div>
            <dt className="text-12 font-semibold uppercase leading-space-16 text-text-weak">
              Stock
            </dt>
            <dd className="mt-space-4 text-text">{product.stock}</dd>
          </div>
        </dl>
      )}

      {sourceUrl ? (
        <p className="text-12 leading-space-18 text-text-muted">
          Source:{' '}
          <Link
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-brand-700 underline underline-offset-4 transition-colors hover:text-brand-500"
          >
            Product information
          </Link>
        </p>
      ) : null}
    </section>
  );
};

export default ProductDescriptionPage;
