import { useCallback, useEffect, useState } from "react";
import { FiUpload, FiX, FiCheck, FiChevronLeft } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { MenuItem } from "../types/menu.type";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import { useMedia } from "../hooks/useMedia";
import { useMenus } from "../hooks/useMenus";

const EditMenuPage = () => {
  const navigate = useNavigate();
  const { uploadImageMutation, deleteImageMutation } = useMedia();
  const { useGetMenu, updateMenuMutation } = useMenus();

  const { id } = useParams();

  const { data, isLoading } = useGetMenu(id ?? "");

  const [formData, setFormData] = useState<MenuItem>({
    name_vi: "",
    name_en: "",
    price: 0,
    category: "All Items",
    description: "",
    image_url: "",
    available: true,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name_vi: data.name_vi,
        name_en: data.name_en,
        price: data.price,
        category: data.category,
        description: data.description,
        image_url: data.image_url,
        available: data.available,
      });
    }
  }, [data]);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "appetizers", name: "Appetizers" },
    { id: "main-courses", name: "Main Courses" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ];

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadImageMutation.mutate(formData, {
          onSuccess: (data) =>
            setFormData((prev) => ({ ...prev, image_url: data.url })),
        });
      }
    },
    [uploadImageMutation]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
  });

  const handleDeleteImage = async () => {
    if (formData.image_url) {
      const filename = formData.image_url.split("/").pop();
      if (filename) {
        await deleteImageMutation.mutateAsync(filename);
        setFormData((prev) => ({ ...prev, image_url: "" }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMenuMutation.mutate({ id: data.id, ...formData });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-heading font-heading text-accent">
            Create New Menu
          </h1>
          {/* Button back */}
          <button
            onClick={() => navigate("/menus")}
            className="flex items-center space-x-2 text-muted-foreground py-2 px-4 rounded-md hover:bg-muted"
          >
            <FiChevronLeft />
            <span>Back</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-8"
          noValidate
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Dish Name (Vietnamese)
              </label>
              <input
                type="text"
                name="vietnameseName"
                maxLength={100}
                value={formData.name_vi}
                onChange={(e) =>
                  setFormData({ ...formData, name_vi: e.target.value })
                }
                placeholder="Nhập tên món ăn bằng tiếng Việt"
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Dish Name (English)
              </label>
              <input
                type="text"
                name="englishName"
                maxLength={100}
                value={formData.name_en}
                onChange={(e) =>
                  setFormData({ ...formData, name_en: e.target.value })
                }
                placeholder="Enter dish name in English"
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                min={0}
                step={0.1}
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                name="description"
                maxLength={1000}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder={"Detailed description of the dish"}
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring h-32"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formData.description.length}/1000
              </p>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.available}
                  onChange={(e) =>
                    setFormData({ ...formData, available: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-input cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  Available
                </span>
              </label>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-input rounded-lg p-4 text-center ${
                isDragActive ? "border-accent" : ""
              }`}
            >
              <input {...getInputProps()} />
              <label htmlFor="imageUpload" className="cursor-pointer block">
                {formData.image_url ? (
                  <div className="relative">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage();
                      }}
                      className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full"
                    >
                      <FiX />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="w-12 h-12 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop or click to upload image
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground py-2 rounded-md hover:bg-opacity-90 flex items-center justify-center"
              >
                <FiCheck className="mr-2" />
                Save
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 bg-muted text-muted-foreground py-2 rounded-md hover:bg-opacity-90"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuPage;
