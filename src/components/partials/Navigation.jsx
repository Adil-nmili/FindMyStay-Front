import { Link } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ABOUT, BLOG, CONTACT, LOGIN, REGISTER } from "../../router/Router";

export default function Navigation({ isVertical }) {



    return (
        <nav className={`flex items-center ${isVertical ? 'flex-col' : 'flex-row'} space-x-4`}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/properties">Properties</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to={BLOG}>Blog</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to={ABOUT}>About US</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to={CONTACT}>Contact us</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='relative left-8'>
                        <NavigationMenuTrigger className="hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent relative">
                            Account
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="absolute left-10 mt-2 w-48 rounded-md shadow-lg">
                            <div className="p-2 space-y-2">
                                <NavigationMenuLink asChild>
                                    <Link 
                                        to={REGISTER} 
                                        className="block px-4 py-2 text-sm text-[#333333] hover:bg-gray-100 rounded"
                                    >
                                        Sign up
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link 
                                        to={LOGIN} 
                                        className="block px-4 py-2 text-sm text-[#333333] hover:bg-gray-100 rounded"
                                    >
                                        Sign in
                                    </Link>
                                </NavigationMenuLink>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    );
}