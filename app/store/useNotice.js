import {create} from 'zustand';

export const useNoticeStore = create((set) => {
  return {
    notice: null,
    setNotice: (notice) =>
      set((state) => ({
        notice: notice,
      })),
  };
});
