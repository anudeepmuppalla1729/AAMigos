import { create } from "zustand";

const useOnboardingStore = create((set) => ({
  // Profile
  avatar: null,
  avatarPreview: null,
  name: "",
  contact: "",

  // Address
  doorNo: "",
  street: "",
  city: "",
  pincode: "",

  // Verification (agent only)
  aadhaar: "",
  pan: "",

  // Actions
  setAvatar: (file) => {
    const preview = file ? URL.createObjectURL(file) : null;
    set({ avatar: file, avatarPreview: preview });
  },
  setField: (key, value) => set({ [key]: value }),
}));

export default useOnboardingStore;
