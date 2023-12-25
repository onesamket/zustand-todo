import { create } from "zustand";

type ModalType = {
  todo: Todo | null;
  isOpen: boolean;
  onOpen: (todo?: Todo) => void;
  onClose: () => void;
  resetTodo: () => void;
};

type Todo = {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
};

export type TodoStateType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
  markAsComplete: (id: string) => void;
};

// modal functionality
export const useModal = create<ModalType>((set) => ({
  isOpen: false,
  todo: null,
  onOpen: (todo) => set(() => ({ isOpen: true, todo: todo })),
  onClose: () => set(() => ({ isOpen: false })),
  resetTodo: () => set(() => ({ todo: null })),
}));

// todo functionality
export const useTodoStore = create<TodoStateType>((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  markAsComplete: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      ),
    })),
}));

export default useTodoStore;
