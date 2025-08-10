import { Link, Outlet } from "react-router-dom"
import Navigation from "../components/partials/Navigation"
import Footer from "../components/partials/Footer"
import { useEffect, useState } from "react"
import {Button} from "@/components/ui/button";
import { LogIn, User, UserPlus } from "lucide-react";
import { LOGIN, REGISTER } from "../router/Router";

export default function () {
    

    return (
        <>
        
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 flex flex-col bg-[#0D0D0D]">
                <Outlet />
            </main>
            <Footer />
            </div>
            
        </>
    )
}