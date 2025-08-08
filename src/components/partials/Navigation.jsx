import { Link, useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ABOUT, BLOG, CONTACT, LOGIN, REGISTER } from "../../router/Router";
import { useNavigation } from "react-router-dom";
import { use } from "react";

export default function Navigation({ isVertical }) {



    return (
        <nav className={`flex items-center text-[#fff] ${isVertical ? 'flex-col' : 'flex-row'} space-x-4`}>
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
    );
}