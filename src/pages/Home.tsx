import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditingTask { 
  taskId : number,
  taskNewTitle : string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existTaks = tasks.find((task)=>task.title === newTaskTitle);
    
    if(!existTaks){
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      };
      
      setTasks( oldTasks => [...oldTasks, newTask]);
    } else {
      Alert.alert("Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks: Task[] = tasks.map(task => {
      if(task.id === id){
        task.done = !task.done
      }
      return task;
    });
    setTasks([...updatedTasks]);
  }

  function handleEditTask(editTask: EditingTask){
    const updatedTasks: Task[] = tasks.map(task => {
      if(task.id === editTask.taskId){
        task.title = editTask.taskNewTitle
      }
      return task;
    });
    setTasks([...updatedTasks]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldTasks => oldTasks.filter((item)=>item.id !== id))
          },
          style: "default",
        }
      ],
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})