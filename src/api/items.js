import { privateApi } from "./index";

export const itemsApiMixin = {
  methods: {
    async createItem(item) {
      return await privateApi.post("/items/new", item);
    },
    async remove(id) {
      return await privateApi.delete(`/items/${id}`);
    },
    async update(id, status) {
      return await privateApi.patch(`/items/${id}`, status);
    },
  },
};
