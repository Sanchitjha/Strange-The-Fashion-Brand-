import create from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  login: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  updateUser: (user) => set({ user }),
}));

export const useCartStore = create((set) => ({
  items: [],
  total: 0,
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
    total: state.total + (item.price * item.quantity)
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id),
    total: state.total - state.items.find(item => item.id === id)?.price || 0
  })),
  clearCart: () => set({ items: [], total: 0 }),
  updateCart: (items, total) => set({ items, total }),
}));

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  filter: {
    category: 'all',
    search: '',
    sort: 'newest',
    page: 1
  },
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
}));
