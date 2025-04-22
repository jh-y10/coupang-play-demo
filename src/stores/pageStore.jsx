import { create } from "zustand";

const pageStore = create((set) => ({
  page: 1,
  updatePage: (page) => set(() => ({ page: page })),
}));

export default pageStore;
