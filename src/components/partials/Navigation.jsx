import { Link, useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import { LogIn, User, UserPlus } from "lucide-react";
import { ABOUT, BLOG, CONTACT, LOGIN, REGISTER } from "../../router/Router";
import { useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navigation() {

    const [scrolled, setScrolled] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 768) {
                setIsVertical(true);
                setScrolled(window.scrollY > 10);

            } else if (window.innerWidth >= 768) {
                setIsVertical(false);
                setScrolled(window.scrollY > 50);
            }

        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <header className={`flex items-center justify-between h-14 fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}>
            <div className={`flex items-center px-4 h-full ${scrolled ? 'bg-[#D0D3D9] rounded-r-full shadow-lg shadow-black' : 'bg-transparent'}`}>
                <img src="/logo.png" alt="FindMyStay-logo" className="h-16 object-cover w-34" />
            </div>
            <div className={`flex items-center h-full px-4 ${scrolled ? 'backdrop-blur-lg rounded-b-md shadow-lg shadow-black' : 'bg-transparent'}`}>
                {/* navigation  */}
                <nav className={`flex items-center text-[#fff] space-x-4`}>
                    <NavigationMenu >
                        <NavigationMenuList>
                            <NavigationMenuItem >
                                <NavigationMenuLink className={useLocation().pathname === '/' ? 'active bg-amber-50 text-black' : ''} asChild>
                                    <Link to="/" >Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={useLocation().pathname === '/properties' ? 'active bg-amber-50 text-black' : ''} asChild>
                                    <Link to="/properties">Properties</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={useLocation().pathname === BLOG ? 'active bg-amber-50 text-black' : ''} asChild>
                                    <Link to={BLOG}>Blog</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={useLocation().pathname === ABOUT ? 'active bg-amber-50 text-black' : ''} asChild>
                                    <Link to={ABOUT}>About US</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={useLocation().pathname === CONTACT ? 'active bg-amber-50 text-black' : ''} asChild>
                                    <Link to={CONTACT}>Contact us</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
            </div>
            <div className="relative">
                <Button className="mr-10" onClick={() => setIsClicked(!isClicked)} variant="outline" >
                    <User className="mr-1" />
                    Account
                </Button>
                {isClicked && (
                    <div className="absolute right-2 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                        <ul className="py-2">
                            <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer"><Link to={LOGIN} className="flex items-center gap-1 text-sm"><LogIn size='16' /> Login</Link></li>
                            <li className="px-2 py-2 hover:bg-gray-100 cursor-pointer"><Link to={REGISTER} className="flex items-center gap-1 text-sm"><UserPlus size="16" /> Sign up</Link></li>
                            <li className=" text-xs text-gray-600 text-center italic mt-4">ALL information are protected & reserved by <span className="text-slate-800 underline">FindMyStay</span></li>
                        </ul>
                    </div>
                )}
            </div>


        </header>
    );
}