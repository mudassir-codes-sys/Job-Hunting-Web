import cloudinary from "@/app/config/cloudinary";

const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string,
  filename: string,
  resource_type: "image" | "video" = "image"
) => {
  return new Promise((res, rej) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        public_id: filename,
      },
      (err, result) => (err ? rej(err) : res(result?.secure_url))
    );
    stream.end(buffer);
  });
};

export default uploadToCloudinary;
