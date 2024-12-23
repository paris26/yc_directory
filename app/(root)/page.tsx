import React from 'react'
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await  searchParams).query;

    const posts = [{
        _createdAt : new Date(),
        views : 55,
        author : { id : 1, name: "Paris"},
        _id : 1,
        description : 'This is a description',
        image : 'https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cm9ib3R8ZW58MHx8MHx8fDA%3D',
        category: 'Robots',
        title : 'We Robots'
    }];

    return (
        <>
            <section className={"pink_container"}>
                <h1 className={"heading"}>
                    Pitch Your Startup <br/> Connect With Entrepreneurs
                </h1>
                <p className={"sub-heading !max-w-3xl"}>Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
                <SearchForm query={query} />
            </section>

            <section className={"section_container"}>
                <p className={"text-30-semibold"}>{query ? `Search results for ${query}` :
                    `All Startups`
                }</p>

                <ul className={"mt-7 card_grid"}>
                    { posts.length > 0 ? (
                        posts.map((post: StartupCardType , index: number) => (
                            <StartupCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className={"no-result"}>No startups Found</p>
                    )}
                </ul>
            </section>
        </>
    )
}