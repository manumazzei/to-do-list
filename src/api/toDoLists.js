import { privateApi } from "./index";

export const toDoListsApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    async create(title) {
      const res = await privateApi.post("/lists/new", title);
      return res;
    },
    async view(listId) {
      return await privateApi.get(`lists/${listId}`);
    },
    async remove(listId) {
      return await privateApi.delete(`/lists/${listId}`);
    },
    async update(id, title) {
      await privateApi.patch(`/lists/${id}`, title);
    },
  },
};
