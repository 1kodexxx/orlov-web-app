import { useNavigate } from "react-router-dom";

interface LogoProps {
  onCloseMobile?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <div
      onClick={handleLogoClick}
      className="font-didot cursor-pointer 
    text-xl      /* мобильная база */
    sm:text-2xl  /* от 640px */
    md:text-3xl  /* от 768px */
    lg:text-[32px]  /* от 1024px */
   
    tracking-wide">
      ORLOV brand
    </div>
  );
};

export default Logo;
