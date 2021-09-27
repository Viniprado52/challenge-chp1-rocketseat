import React, { useState, useRef, useEffect } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { EditingTask } from "../pages/Home";
import { Task } from "./TasksList";

interface DataTaskItem {
    task: Task,
    index: number,
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (task: EditingTask) => void;
};

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: DataTaskItem){
    const [isEditing, setEditing]  = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
        setEditing(true);
    }

    function handleCancelEditing(){
        setTaskTitle(task.title);
        setEditing(false);
    }

    function handleSubmitEditing(){
        const data: EditingTask = {
            taskId: task.id,
            taskNewTitle: taskTitle
        };
        editTask(data);
        setEditing(false);
    }

    useEffect(()=>{
      if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
      }
    },[isEditing])

    return(
        <>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={ ()=> toggleTaskDone(task.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={ task.done ? 
                    styles.taskMarkerDone : 
                    styles.taskMarker
                  }
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                { isEditing ?
                    <TextInput 
                        ref={textInputRef}
                        style={ task.done ? 
                          styles.taskTextDone : 
                          styles.taskText
                        }
                        value={taskTitle}
                        editable={isEditing}
                        onChangeText={setTaskTitle}
                        onSubmitEditing={handleSubmitEditing}
                    />
                    :      
                    <Text 
                        style={ task.done ? 
                        styles.taskTextDone : 
                        styles.taskText}
                    >
                        {task.title}
                    </Text>
                }

              </TouchableOpacity>
            </View>

            <View style={ styles.iconsContainer } >
                { isEditing ? (
                    <TouchableOpacity
                    onPress={handleCancelEditing}
                    >
                    <Icon name="x" size={20} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                    onPress={handleStartEditing}
                    >
                    <Icon name="edit" size={20} color="#b2b2b2" />
                    </TouchableOpacity>
                  ) 
                }

                <View 
                    style={ styles.iconsDivider }
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        width: 100,
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconsDivider: {
        width: 2,
        height: 40,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal:5
    }
  })