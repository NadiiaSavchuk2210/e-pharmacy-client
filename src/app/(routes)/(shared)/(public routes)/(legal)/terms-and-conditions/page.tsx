import LegalPage from '../components/LegalPage';

const termsSections = [
  {
    title: 'Using E-Pharmacy',
    paragraphs: [
      'E-Pharmacy provides an online experience for browsing medicines, viewing pharmacy information, placing orders, and managing delivery details.',
    ],
    items: [
      'Use the service only for lawful personal purposes.',
      'Provide accurate account, contact, delivery, and payment information.',
      'Do not attempt to disrupt, scrape, misuse, or gain unauthorized access to the platform.',
    ],
  },
  {
    title: 'Accounts',
    paragraphs: [
      'Customers are responsible for keeping account credentials secure and for activity that happens through their account. If you suspect unauthorized access, contact support and update your credentials promptly.',
    ],
  },
  {
    title: 'Orders and Availability',
    items: [
      'Products, prices, delivery options, and pharmacy availability may change before checkout is complete.',
      'An order may be delayed, adjusted, or canceled if an item becomes unavailable or order details cannot be verified.',
      'Medicine information shown in the service is provided for shopping convenience and does not replace medical advice from a qualified professional.',
    ],
  },
  {
    title: 'Payments and Delivery',
    paragraphs: [
      'Payment and delivery options are shown during checkout. Customers should review order totals, delivery information, and selected payment methods before submitting an order.',
    ],
  },
  {
    title: 'Service Changes',
    paragraphs: [
      'We may update features, content, policies, and availability from time to time to keep the service useful, secure, and compliant with operational requirements.',
    ],
  },
  {
    title: 'Limits of Responsibility',
    paragraphs: [
      'E-Pharmacy aims to provide reliable service, but access may occasionally be interrupted by maintenance, network issues, supplier changes, or events outside our control.',
    ],
  },
] as const;

const TermsAndConditionsPage = () => {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms and Conditions"
      description="These terms outline the basic rules for using E-Pharmacy, placing orders, managing an account, and relying on service information."
      sections={termsSections}
    />
  );
};

export { metadata } from './metadata';

export default TermsAndConditionsPage;
