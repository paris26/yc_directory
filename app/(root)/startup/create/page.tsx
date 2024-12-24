import React from 'react'
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation"
import { auth } from "@/auth"

const Page = async () => {
    const session = await auth();
    if(!session) redirect("/");

    return (
        <>
            <section className={"pink_container min-h-[230px]"}>
                <h1 className={"heading"}>Submit your startup page</h1>
            </section>

            <StartupForm />
        </>
    )
}
export default Page
