import { create } from "zustand";

type UserData = {
	name: string | null;
	username: string | null;
	email: string | null;
};

type UserStore = UserData & {
	setName: (name: string) => void;
	setUsername: (username: string) => void;
	setEmail: (email: string) => void;
	setAllUserFields: (userFields: Partial<UserData>) => void;
};

export const useUserStore = create<UserStore>((set) => ({
	name: null,
	username: null,
	email: null,
	setName: (name) => set({ name: name }),
	setUsername: (username) => set({ username: username }),
	setEmail: (email) => set({ email: email }),
	setAllUserFields: (userFields) =>
		set((state) => ({
			...state,
			...userFields,
		})),
}));
