import FooterBottom from './components/FooterBottom';
import FooterLogo from './components/FooterLogo';
import FooterNavigation from './components/FooterNavigation';
import FooterSocialLinks from './components/FooterSocialLinks';
import FooterText from './components/FooterText';

const Footer = () => {
  return (
    <footer className="bg-accent py-5 md:py-8">
      <div className="container layout-footer">
        <FooterLogo className="area-logo" />
        <FooterText className="area-text" />
        <FooterNavigation className="area-navLinks" />
        <FooterSocialLinks className="area-socials hidden gap-space-12 md:flex md:justify-end" />
        <FooterBottom className="area-copyright text-10 md:text-14" />
      </div>
    </footer>
  );
};

export default Footer;
