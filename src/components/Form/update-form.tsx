import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useTodoStore, { useModal } from "@/store/store"
import { Textarea } from "../ui/textarea"
import { todoSchema, todoSchemaType } from "./create-todo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import toast from "react-hot-toast"

export function UpdateDialog() {
    const { isOpen, onClose, todo, resetTodo } = useModal((state) => state);
    const { updateTodo } = useTodoStore((state) => state);
    const form = useForm<todoSchemaType>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: todo?.title,
            content: todo?.content
        }
    })




    const onSubmit = (values: todoSchemaType) => {
        updateTodo({
            id: todo?.id as string,
            title: values.title,
            content: values.content,
            isCompleted: todo?.isCompleted
        })
        form.reset(); // reset form 
        resetTodo(); //clean todo 
        onClose();
        toast.success("todo updated successfully")
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
            <Form {...form}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit todo</DialogTitle>
                        <DialogDescription>
                            Change what ever you want and Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>todo title</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={todo?.title}  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>todo content</FormLabel>
                                        <FormControl>
                                            <Textarea defaultValue={todo?.content} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </Dialog >
    )
}
