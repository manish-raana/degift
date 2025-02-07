import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_SUBGRAPH_URL ||
    'https://api.studio.thegraph.com/query/103635/degift/version/latest',
);
