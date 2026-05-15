import { ImageResponse } from 'next/og';

import { getProductById } from '../product.data';

const imageSize = {
  width: 1200,
  height: 630,
};

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

const styles = {
  page: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '48px',
    background: '#f8fafc',
    color: '#0f172a',
    fontFamily: 'sans-serif',
  },

  content: {
    display: 'flex',
    width: '100%',
    borderRadius: '32px',
    overflow: 'hidden',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
  },

  left: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    width: '58%',
    padding: '56px',
  },

  branding: {
    display: 'flex',
    flexDirection: 'column' as const,
  },

  logo: {
    fontSize: 28,
    color: '#64748b',
    marginBottom: '24px',
  },

  title: {
    fontSize: 72,
    lineHeight: 1,
    fontWeight: 700,
    margin: 0,
  },

  supplier: {
    fontSize: 32,
    color: '#475569',
    marginTop: '24px',
  },

  price: {
    fontSize: 48,
    fontWeight: 700,
    marginTop: '16px',
  },

  badges: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },

  badge: {
    display: 'flex',
    padding: '12px 20px',
    borderRadius: '999px',
    fontSize: 24,
    background: '#eef2ff',
    color: '#3730a3',
  },

  imageWrapper: {
    display: 'flex',
    width: '42%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    background: '#f8fafc',
  },

  image: {
    objectFit: 'contain' as const,
    borderRadius: '24px',
  },
};

export async function GET(_request: Request, { params }: Props) {
  const { productId } = await params;
  const product = await getProductById(productId);

  return new ImageResponse(
    <div style={styles.page}>
      <div style={styles.content}>
        <div style={styles.left}>
          <div style={styles.branding}>
            <span style={styles.logo}>E-Pharmacy</span>

            <h1 style={styles.title}>{product.name}</h1>

            <p style={styles.supplier}>Brand: {product.suppliers}</p>

            <p style={styles.price}>${product.price}</p>
          </div>

          <div style={styles.badges}>
            <div style={styles.badge}>In stock: {product.stock}</div>

            <div style={styles.badge}>{product.category}</div>
          </div>
        </div>

        <div style={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.photo}
            alt={product.name}
            width={420}
            height={420}
            style={styles.image}
          />
        </div>
      </div>
    </div>,
    imageSize,
  );
}
