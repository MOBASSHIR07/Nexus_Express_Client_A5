import { env } from "@/env";

export const imageUpload = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  const apiKey = env.NEXT_PUBLIC_IMGBB_API_KEY;

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.error?.message || "Image upload failed");
  }

  return result.data.display_url;
};