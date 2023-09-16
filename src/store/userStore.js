import {devtools, persist} from "zustand/middleware";
import create from "zustand";

const uStore = (set)=>({
    user: {},
    auth: false,
    permissions: [],
    addUser: (usr) =>
        set((state) => ({
            user: usr
        })),
    addAuth: (auth) =>
        set((state) => ({
            auth: auth
        }))
})

export const useUserStore = create(
    devtools(
        persist(uStore, {
            name: "user",
            getStorage: () => localStorage,
        })
    )
);