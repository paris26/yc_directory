import "server-only"

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId} from '../env'
import { token } from '../env'

export const WriteClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
})

if(!WriteClient.config().token) {
    throw new Error("Write Token not Found");
}
