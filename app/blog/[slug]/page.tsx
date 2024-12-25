import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import BlogPage from "./blog";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog || blogError) notFound();

  return <BlogPage blog={blog} />;
}
