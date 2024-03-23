"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async(seconds: number) => {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000)
    })
}

export const toggleTodo = async (id: string, completed: boolean):Promise<Todo> => {

    await sleep(3);

    const todo = await prisma.todo.findFirst({ where: { id } });

    if(!todo) {
        throw new Error(`Todo with id ${id} not found`);
    }

   const updatedTodo =  prisma.todo.update({where: {id}, data: {completed}});

   revalidatePath("/dashboard/server-todos");

   return updatedTodo;
};

export const createNewTodo = async (description: string):Promise<Todo> => {
    
    try{
        const todo = await prisma.todo.create({data:{description}});
        revalidatePath("/dashboard/server-todos");
        return todo;
    }catch(error){
        throw new Error(`Error creating new todo: ${error}`);
    }  
}

export const deleteCompletedTodos = async ():Promise<void> => {
    try {
        
        const todos = await prisma.todo.deleteMany({where: {completed: true}});
        revalidatePath("/dashboard/server-todos");
    } catch (error) {
        throw new Error(`Error deleting completed todos: ${error}`);
    }
}
