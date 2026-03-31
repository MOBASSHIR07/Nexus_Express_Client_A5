import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Server-side variables. 
   * These are private and never exposed to the browser.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    BACKEND_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
  },

  /*
   * Client-side variables.
   * MUST be prefixed with NEXT_PUBLIC_ for the browser to see them.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_IMGBB_API_KEY: z.string().min(1),
  },

  /*
   * You can't destruct process.env in Next.js edge runtimes, 
   * so we need to enumerate them here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_IMGBB_API_KEY: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
  },
});