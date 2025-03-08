import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMenus,
  createMenu,
  deleteMenu,
  getMenu,
  updateMenu,
} from "../apis/menu.api";
import { toast } from "react-toastify";
import { CreateMenuForm, Menu } from "../types/menu.type";
import { useNavigate } from "react-router-dom";

export const useMenus = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Lấy danh sách món ăn
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenus,
  });

  // Tạo món ăn mới
  const createMenuMutation = useMutation({
    mutationFn: (newMenu: CreateMenuForm) => createMenu(newMenu),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      toast.success("Menu item created successfully", {
        autoClose: 1500,
        onClose: () => {
          navigate("/menus");
        },
      });
    },
    onError: () => {
      toast.error("Failed to create menu item", {
        autoClose: 1500,
      });
    },
  });

  // Xóa món ăn
  const deleteMenuMutation = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      toast.success("Menu item deleted successfully", {
        autoClose: 1500,
      });
    },
    onError: () => {
      toast.error("Failed to delete menu item");
    },
  });

  // Lấy thông tin món ăn theo ID
  const useGetMenu = (id: string) => {
    return useQuery({
      queryKey: ["menuItems", id],
      queryFn: () => getMenu(id),
      enabled: !!id,
    });
  };

  // Cập nhật món ăn
  const updateMenuMutation = useMutation({
    mutationFn: (menu: Menu) => updateMenu(menu.id, menu), // Giả sử menu có thuộc tính `id`
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
      toast.success("Menu item updated successfully", {
        autoClose: 1500,
        onClose: () => {
          navigate("/menus");
        },
      });
    },
    onError: () => {
      toast.error("Failed to update menu item");
    },
  });

  return {
    menuItems,
    isLoading,
    createMenuMutation,
    deleteMenuMutation,
    useGetMenu,
    updateMenuMutation,
  };
};
