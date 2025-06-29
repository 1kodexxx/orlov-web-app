import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Logo from "./Logo";
import DesktopMenu from "./desktop/DesktopMenu";
import NavActions from "./desktop/DesktopMenuButtons";
import MobileMenuButton from "./mobile/HamburgerButton";
import MobileMenu from "./mobile/MobileMenu";

const NavBar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full sticky top-0 z-50 bg-background shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between relative">
        <Logo onCloseMobile={() => setMobileMenuOpen(false)} />

        <DesktopMenu />

        <NavActions />

        <MobileMenuButton isOpen={mobileMenuOpen} toggle={toggleMenu} />
      </div>

      <MobileMenu isOpen={mobileMenuOpen} toggle={toggleMenu} />
    </header>
  );
};

export default NavBar;
