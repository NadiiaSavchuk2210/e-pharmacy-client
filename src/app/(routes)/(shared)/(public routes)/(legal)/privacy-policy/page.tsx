import LegalPage from '../components/LegalPage';

const privacySections = [
  {
    title: 'Information We Collect',
    paragraphs: [
      'We collect the information needed to create your account, process orders, arrange delivery, and respond to support requests.',
    ],
    items: [
      'Contact details such as name, email, phone number, and delivery address.',
      'Order details such as selected products, quantities, pharmacy, payment method, and delivery preferences.',
      'Technical data such as browser type, device information, and basic usage events that help keep the service reliable.',
    ],
  },
  {
    title: 'How We Use Information',
    items: [
      'To provide the E-Pharmacy service and keep your cart, orders, and account available.',
      'To communicate about orders, delivery updates, account activity, and support requests.',
      'To improve performance, security, product availability, and the overall customer experience.',
    ],
  },
  {
    title: 'Sharing Information',
    paragraphs: [
      'We share information only when it is needed to operate the service, complete an order, comply with legal obligations, or protect customers and the platform.',
    ],
    items: [
      'Pharmacies and delivery partners receive the details needed to prepare and deliver an order.',
      'Service providers may process data for hosting, analytics, payments, security, and customer support.',
      'We do not sell personal information.',
    ],
  },
  {
    title: 'Security',
    paragraphs: [
      'We use reasonable technical and organizational safeguards to protect personal information. No online service can guarantee absolute security, so customers should keep account credentials private and contact support if suspicious activity appears.',
    ],
  },
  {
    title: 'Your Choices',
    items: [
      'You can review and update account information through your profile where available.',
      'You can request help with account access, order history, or data questions through E-Pharmacy support.',
      'You can sign out of the service at any time and should avoid sharing account access with others.',
    ],
  },
] as const;

const PrivacyPolicyPage = () => {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This policy explains what information E-Pharmacy collects, how it is used, and the choices customers have when using the service."
      sections={privacySections}
    />
  );
};

export { metadata } from './metadata';

export default PrivacyPolicyPage;
