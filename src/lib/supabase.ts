import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase configuration is incomplete");
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export const getImageUrl = (name: string, path: "brands" | "product" = "brands") => {
  const { data } = supabase.storage.from("shop").getPublicUrl(`public/${path}/${name}`);
  return data.publicUrl;
};

export const uploadFile = async (file: File, path: "brands" | "product" = "brands") => {
  const fileType = file.type.split("/")[1];
  const filename = `${path}-${Date.now()}.${fileType}`;

  const result = await supabase.storage.from("shop").upload(`public/${path}/${filename}`, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (result.error) {
    throw new Error(`Upload failed: ${result.error.message}`);
  }

  return filename;
};

export const deleteFile = async (filename: string, path: "brands" | "product" = "brands") => {
  await supabase.storage.from("shop").remove([`public/${path}/${filename}`]);
};
