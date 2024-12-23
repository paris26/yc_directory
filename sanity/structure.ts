import type {StructureResolver} from 'sanity/structure'
import { author} from "@/sanity/schemaTypes/author";
import { startup } from "@/sanity/schemaTypes/startup";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
        S.documentTypeListItem("author").title("Authors"),
        S.documentTypeListItem("startup").title("Startups")

    ])
