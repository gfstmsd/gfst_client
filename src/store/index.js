import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create()(
    devtools(
        (set) => ({
            isAuthenticated : false,
            token : '',
            setToken : (value) => set(() => ({token : value})),
            setIsAuthenticated : (value) => set(() => ({isAuthenticated : value})),
        })
    )
)