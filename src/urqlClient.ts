import {
  createClient,
  Client,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { Question } from "./features/questions/types";
import { SubscriptionClient } from "subscriptions-transport-ws";

console.log("PROCESS ENV ", process.env)
function initUrqlClient(): Client {
  const cache = cacheExchange({
    resolvers: {
      Question: {
        createdAt(parent: any, _args, _cache, _info) {
          const question: Question = parent;
          return new Date(question.createdAt);
        },

        updatedAt(parent: any, _args, _cache, _info) {
          const question: Question = parent;
          return new Date(question.updatedAt);
        },
      },
    },
  });

  const subscriptionClient = new SubscriptionClient(
    process.env["REACT_APP_WS_ENDPOINT"],
    { reconnect: true }
  );

  const subExchange = subscriptionExchange({
    forwardSubscription: (operation) => subscriptionClient.request(operation),
  });

  return createClient({
    url: process.env["REACT_APP_GRAPHQL_ENDPOINT"],
    exchanges: [dedupExchange, cache, fetchExchange, subExchange],
  });
}

export { initUrqlClient };
