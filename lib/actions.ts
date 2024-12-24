"use server"

import {parseServerActionResponse} from "@/lib/utils";
import {auth} from "@/auth";
import slugify from "slugify";
import {WriteClient} from "@/sanity/lib/write-client";


export const createPitch = async (
        state:any ,
        form: FormData,
        pitch: string,
    )=> {
    const session = await auth()
    if(!session) return parseServerActionResponse({ error : 'Not signed in ' , status: 'ERROR' })

    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== pitch)
    );

    const slug = slugify(title as string, {lower: true, strict : true});


    try{
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch: pitch,
        }

        const result = await WriteClient.create( { _type : "startup", ...startup })

        return parseServerActionResponse({
            ...result,
            error : '',
            status: 'SUCCESS',
        })
    }catch (e){
        console.error(e);
        return parseServerActionResponse({ error : JSON.stringify(e) , status: 'ERROR' })
    }
};