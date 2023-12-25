import TodoForm from "@/components/Form/create-todo";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useTodoStore, { useModal } from "./store/store";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";

const App = () => {
  const { todos, deleteTodo, markAsComplete } = useTodoStore((state) => state);
  const { isOpen, onOpen } = useModal((state) => state);

  console.log(isOpen)
  const handleDelete = (id: string, title: string) => {
    deleteTodo(id);
    toast.error(`${title} deleted`);
  };

  return (
    <div className="flex flex-col py-12 w-1/2 mx-auto min-h-screen justify-center items-center ">
      <h3 className="py-10 font-semibold">Simple todo application using Zustand ⭐</h3>
      <div className="w-full p-6 shadow-lg rounded">
        <TodoForm />
      </div>
      <div className="w-full mt-5">
        {todos.length === 0 ? (
          <p className="flex items-center justify-center my-4 py-12">No todos found!</p>
        ) : (
          todos.map((todo) => (
            <div
              onClick={() => { markAsComplete(todo.id) }}
              className={`flex space-y-2 gap-1 cursor-pointer hover:border hover:border-green-400 justify-between space-x-5 shadow-md p-7 ${todo.isCompleted ? 'border border-green-400' : ''}`} key={todo.title}>
              <div>
                <h1 className={`font-bold ${todo.isCompleted ? 'line-through' : ''}`}>{todo.title}</h1>
                <p>{todo.content}</p>
              </div>

              {/* action buttons */}
              <div className="flex space-x-3">
                <Button
                  variant={"default"}
                  onClick={() => onOpen(todo)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                </Button>

                <Button
                  onClick={() => handleDelete(todo.id, todo.title)}
                  variant={"destructive"}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>


      <footer className="flex py-5 flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">By </h1>
        <div className="flex  space-x-2 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/onesamket.png" alt="@onesamket" />
            <AvatarFallback>Tewodros Birhanu</AvatarFallback>
          </Avatar>
          <div>
            <h2>Tewodros Birhanu</h2>
            <a className="text-indigo-500 hover:text-indigo-900" href="https://x.com/onesamket" target="_blank">@onesamket</a>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default App;
