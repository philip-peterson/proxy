// Define context types for TypeScript
type Env = {
  Variables: {
    cookies: Record<string, string>;
    targetHost: string;
  };
};