import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import * as Z from 'zod';
import { v4 as uuidv4 } from 'uuid';

// local import
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useTodoStore from "@/store/store";
import { Textarea } from "../ui/textarea";

// initializationion

export const todoSchema = Z.object({
    title: Z.string().min(5, { message: "todo title contain at least 5 characters " }),
    content: Z.string().min(10, { message: "todo content contain at least 10 characters " })
})

export type todoSchemaType = Z.infer<typeof todoSchema>;

const TodoForm = () => {
    const { addTodo } = useTodoStore((state) => state);

    const form = useForm<todoSchemaType>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            content: ""
        },
    })

    function onSubmit(values: Z.infer<typeof todoSchema>) {
        const random: string = uuidv4();
        const tododata = {
            id: random,
            title: values.title,
            content: values.content,
            isCompleted: false
        }
        addTodo(tododata);
        toast.success("your todo created successfully")

        form.reset();
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>todo title</FormLabel>
                            <FormControl>
                                <Input placeholder="study zustand" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>todo content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="make application using zustand" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-1/2 " variant={'indigo'} type="submit">Create todo</Button>
            </form>
        </Form>
    )

}
export default TodoForm