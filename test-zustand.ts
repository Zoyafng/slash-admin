import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TestStore {
  count: number;
  increment: () => void;
}

const useTestStore = create<TestStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    {
      name: "test-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

console.log("Zustand test passed!");
