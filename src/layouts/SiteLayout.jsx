import { Outlet } from "react-router-dom"
import Navigation from "../components/partials/Navigation"
import Footer from "../components/partials/Footer"
import { useEffect, useState } from "react"

export default function () {
    const [scrolled, setScrolled] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    useEffect   (() => {
        const handleScroll = () => {
            if (window.innerWidth < 768) {
                setIsVertical(true);
                setScrolled(window.scrollY > 10);
               
            }else if (window.innerWidth >= 768) {
                setIsVertical(false);
                setScrolled(window.scrollY > 50);
            }
          
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <>
        
        <div className="min-h-screen flex flex-col">
            <header className={`flex items-center justify-between px-16   fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#00010D] shadow-md text-[#D0D3D9]'  : 'transparent text-white'}`}>
                <div>
                    <img src="/assets/logo.png" alt="FindMyStay-logo" className="h-16 object-cover w-24" />
                </div>
                <Navigation isVertical={isVertical} />
                
            </header>
            <main className="flex-1 flex flex-col bg-[#0D0D0D]">
                <Outlet />
            </main>
            <Footer />
            </div>
            
        </>
    )
}