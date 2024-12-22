"use client";

import Link from "next/link";
import {X} from "lucide-react"

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector(".search-form");
        if(form) form.reset();
    }

    return (
        <button type={"reset"} onClick={reset} className="flex gap-2">
            <Link href="/" className={"search-btn"}>
                <X className={"size-5"} />
            </Link>
        </button>
    )
}
export default SearchFormReset
