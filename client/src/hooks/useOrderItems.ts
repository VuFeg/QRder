import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrderItem,
  deleteOrderItem,
  updateOrderItem,
} from "../apis/order_items.api";
import { toast } from "react-toastify";

export const useOrderItems = () => {
  const queryClient = useQueryClient();

  const createOrderItemMutation = useMutation({
    mutationFn: createOrderItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
    onError: () => {
      toast.error("Failed to add order item", {
        autoClose: 1500,
      });
    },
  });

  const updateOrderItemMutation = useMutation({
    mutationFn: updateOrderItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
    onError: () => {
      toast.error("Failed to update order item", {
        autoClose: 1500,
      });
    },
  });

  const deleteOrderItemMutation = useMutation({
    mutationFn: deleteOrderItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
    onError: () => {
      toast.error("Failed to delete order item", {
        autoClose: 1500,
      });
    },
  });

  return {
    createOrderItemMutation,
    updateOrderItemMutation,
    deleteOrderItemMutation,
  };
};
