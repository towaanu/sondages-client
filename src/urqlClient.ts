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
    "ws://localhost:3030/subscriptions",
    { reconnect: true }
  );

  const subExchange = subscriptionExchange({
    forwardSubscription: (operation) => subscriptionClient.request(operation),
  });

  return createClient({
    url: "http://localhost:3030/graphql",
    exchanges: [dedupExchange, cache, fetchExchange, subExchange],
  });
}

export { initUrqlClient };
