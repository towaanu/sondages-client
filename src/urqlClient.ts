import {createClient, Client, dedupExchange, fetchExchange} from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import {Question} from './features/questions/types';

function initUrqlClient(): Client {

    const cache = cacheExchange({
	resolvers: {
	    Question: {
		createdAt(parent: any, _args, _cache, _info) {
		    const question:Question = parent;
		    return new Date(question.createdAt)
		},

		updatedAt(parent: any, _args, _cache, _info) {
		    const question: Question = parent;
		    return new Date(question.updatedAt)
		}
	    }
	}
    });

    return createClient({
	url: "http://localhost:3030/graphql",
	exchanges: [dedupExchange, cache, fetchExchange]
    })
}

export {initUrqlClient}
