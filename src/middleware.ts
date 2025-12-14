import { MiddlewareHandler } from 'hono';

// Middleware: Parse cookies from header
export const parseCookies: MiddlewareHandler<Env> = async (c, next) => {
  const cookies: Record<string, string> = {};
  const cookieHeader = c.req.header('cookie');
  
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) {
        cookies[key] = value;
      }
    });
  }
  
  c.set('cookies', cookies);
  await next();
};

// Middleware: Select target host based on user cookie
export const selectTargetHost: MiddlewareHandler<Env> = async (c, next) => {
  const cookies = c.get('cookies');

  // TODO check cookies.user
  const targetHost = 'news.ycombinator.com';
  
  c.set('targetHost', targetHost);
  await next();
};

// Middleware: Log the proxied request
export const logRequest: MiddlewareHandler<Env> = async (c, next) => {
  const targetHost = c.get('targetHost');
  console.log(`Proxying: ${c.req.path} -> https://${targetHost}${c.req.path}`);
  await next();
};