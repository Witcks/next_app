import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_APT_ENDPOINT: z.string().nonempty(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_APT_ENDPOINT: process.env.NEXT_PUBLIC_APT_ENDPOINT,
});

if (!configProject.success) {
  console.error("Invalid environment variables:", configProject.error.issues);
  throw new Error("Invalid environment variables");
}

const envConfig = configProject.data;
export default envConfig;
