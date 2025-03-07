import { useMutation } from "@tanstack/react-query";
import { uploadImage, deleteImage } from "../apis/media.api";
import { toast } from "react-toastify";

export const useMedia = () => {
  // Upload ảnh
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      toast.success("Image uploaded successfully");
      return data.url; // Trả về URL hình ảnh
    },
    onError: () => {
      toast.error("Failed to upload image");
    },
  });

  // Xóa ảnh
  const deleteImageMutation = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      toast.success("Image deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete image");
    },
  });

  return {
    uploadImageMutation,
    deleteImageMutation,
  };
};
