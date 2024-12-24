import React from 'react'
import { notFound } from "next/navigation"

import { client } from "@/sanity/lib/client"
import {STARTUP_BY_ID_QUERY} from "@/sanity/lib/queries";
import { formatDate } from "@/lib/utils";
import Link  from "next/link";
import Image from "next/image";
import markdownit from "markdown-it"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"

const md = markdownit();

export const experimental_ppr = true;

const Page = async ( {params} : { params : Promise<{id : string}> }) => {
    const id = (await params).id;

    const cdnClient = client.withConfig({
        useCdn: true,
    })

    const post = await cdnClient.fetch(STARTUP_BY_ID_QUERY, {id} );

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || '');

    return <>
        <section className={"pink_container !min-h-[230px]"}>
            <p>{formatDate(post?._createdAt)}</p>
            <h1 className={"heading"}>
                {post.title}
            </h1>
            <p className={"sub-heading"}>
                {post.description}
            </p>
        </section>

        <section className={"section_container"}>
            <img src={post.image} alt={"thumbnail"} className={"w-full rounded-xl h-auto"}/>
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                <div className={"flex-between gap-5"}>
                    <Link className={"flex gap-2 items-center mb-3"} href={`/user/${post.author?._id}`}>
                        <Image
                            src={post.author.image}
                            alt={"avatar"}
                            width={64}
                            height={64}
                            className={"rounded-full drop-shadow-lg"}
                        />

                        <div>
                            <p className={"text-20-medium"}>
                                {post.author.name}
                            </p>
                            <p className={"text-16-medium !text-black-300"}>
                                @{post.author.username}
                            </p>
                        </div>
                    </Link>

                    <p className={"category-tag"}>
                        {post.category}
                    </p>
                </div>

                    <h3 className={"text-30-bold"}>Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className={"prose max-w-4xl font-work-sans break-all"}
                            dangerouslySetInnerHTML= {{ __html: parsedContent }}
                        />
                    ) : (
                        <p className={"no-result"}>No results provided</p>
                    )}
            </div>

            <hr className={"divider"} />

            {/* TODO:   Editor selected startups  */}

            <React.Suspense fallback={<Skeleton className={"view-skeleton"} />}>
                <View id={id}/>
            </React.Suspense>
        </section>
    </>
}
export default Page