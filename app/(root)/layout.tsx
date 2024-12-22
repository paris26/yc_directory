import Navbar from "@/components/Navbar";
import {ReactNode} from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="font-work-sans">
            <Navbar />
            {children}
        </main>
    )
}
