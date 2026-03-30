import { z } from "zod";

export const GithubUserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  location: z.string().nullable(),
  company: z.string().nullable(),
  email: z.string().nullable(),
  twitter_username: z.string().nullable(),
  blog: z.string().nullable(),
});

export const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
});

export type GithubUser = z.infer<typeof GithubUserSchema>;
export type GithubRepo = z.infer<typeof GithubRepoSchema>;
