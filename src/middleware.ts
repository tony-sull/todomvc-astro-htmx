import { defineMiddleware } from "astro:middleware";
import { z } from "astro/zod";

const filterSchema = z.enum(["all", "active", "completed"]).default("all");

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  if (context.request.method === "GET") {
    context.locals.filter = filterSchema.parse(
      context.url.searchParams.get("filter")?.toString(),
    );
  } else {
    const formData = await context.request.clone().formData();
    context.locals.filter = filterSchema.parse(formData.get("filter"));
  }

  return next();
});
