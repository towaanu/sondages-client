declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GRAPHQL_ENDPOINT: string;
      REACT_APP_WS_ENDPOINT: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {}
