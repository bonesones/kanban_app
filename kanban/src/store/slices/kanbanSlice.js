import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { useStopwatch } from 'react-timer-hook';
import outerKanbanData from "../../data.json"

const { hours, start, pause, isRunning } = useStopwatch()

const createNewProject = function() {
    return {
        id: uuidv4(),
        name: "",
        columns: []
    }
}

const createNewColumn = function() {
    return {
        id: uuidv4(),
        name: "",
        tasks: []
    }
}

const createNewTask = function() {
    return {
        id: uuidv4(),
        name: "",
        perfomer: {},
        planned: null,
        spent: hours,
        deadline: null,
        project: "",
        description: "",
        subtasks: [],
        comments: [],
        isBeeingPerfomed: false,
        isCompleted: false
    }
}

const createNewSubtask = function () {
    return {
        id: uuidv4(),
        description: "",
        isCompleted: false
    }
}

const createNewTaskComment = function () {
    return {
        id: uuidv4(),
        date: Date.now(),
        author: {
            id: "",
            name: "",
            image: "" 
        },
        description: ""
    }
}

const findProjectIndex = function(projectId, state) {
    return state.outerData.findIndex((project) => project.id === projectId)
}

const findColumnIndex = function(projectIndex, columnId, state) {
    return state.outerData[projectIndex].columns.findIndex((column) => column.id === columnId)
}

const findTaskIndex = function(projectIndex, columnIndex, taskId, state) {
    return state.outerData[projectIndex].columns[columnIndex].tasks.findIndex((task) => task.id === taskId)
}

const findSubtaskIndex = function(projectIndex, columnIndex, taskIndex, subtaskId, state) {
    return state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex].subtasks.findIndex((subtask) => subtask.id === subtaskId)
}

const initialState = {
    outerData: outerKanbanData.projects,
    activeBoardId: 0,
    activeBoardData: outerKanbanData.projects[0]
}


export const kanbanSlice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        createProject: (state) => {
            const newProject = createNewProject();
            state.outerData.push(newProject)
        },
        createColumn: (state) => {
            const newColumn = createNewColumn();
            const projectIndex = findProjectIndex(state.activeBoardId, state);

            state.outerData[projectIndex].columns.push(newColumn)
        },
        createTask: (state, { columnId }) => {
            const projectIndex = findProjectIndex(state.activeBoardId, state)
            const columnIndex = findColumnIndex(projectIndex, columnId, state)
            const newTask = createNewTask()

            state.outerData[projectIndex]
                 .columns[columnIndex]
                 .tasks.unshift(newTask)
        },
        createSubtask: (state, { columnId, taskId }) => {
            const projectIndex = findProjectIndex(state.activeBoardId, state)
            const columnIndex = findColumnIndex(projectIndex, columnId, state)
            const taskIndex = findTaskIndex(projectIndex, columnIndex, taskId, state)
            const newSubTask = createNewSubtask()

            state.outerData[projectIndex]
                 .columns[columnIndex]
                 .tasks[taskIndex]
                 .subtasks.push(newSubTask)
        },
        createTaskComment: (state, { columnId, taskId }) => {
            const projectIndex = findProjectIndex(state.activeBoardId, state)
            const columnIndex = findColumnIndex(projectIndex, columnId, state)
            const taskIndex = findTaskIndex(projectIndex, columnIndex, taskId, state)
            const newTaskComment = createNewTaskComment()

            state.outerData[projectIndex]
                 .columns[columnIndex]
                 .tasks[taskIndex]
                 .comments.push(newTaskComment)
        },

        
        toggleActiveProject: (state, { projectId }) => {
            state.activeBoardId = projectId
            state.activeBoardData = state.outerData[projectId]
        },

        toggleTaskComplete: (state, { columnId, taskId }) => {
            const projectIndex = findProjectIndex(state.activeBoardId, state)
            const columnIndex = findColumnIndex(projectIndex, columnId, state)
            const taskIndex = findTaskIndex(projectIndex, columnIndex, taskId, state)

            state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex].isCompleted = !state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex].isCompleted
        },
        toggleSubtaskComplete: (state, { columnId, taskId, subtaskId }) => {
            const projectIndex = findProjectIndex(state.activeBoardId, state)
            const columnIndex = findColumnIndex(projectIndex, columnId, state)
            const taskIndex = findTaskIndex(projectIndex, columnIndex, taskId, state)
            const subtaskIndex = findSubtaskIndex(projectIndex, columnIndex, taskIndex, subtaskId, state);

            state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex].isCompleted = !state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex].subtasks[subtaskIndex].isCompleted
        },
        toggleTaskIsBeeingPerfomed: (state) => {
            const projectIndex = findProjectIndex(state.activeBoardId, state)
            const columnIndex = findColumnIndex(projectIndex, columnId, state)
            const taskIndex = findTaskIndex(projectIndex, columnIndex, taskId, state)
            const currentTask = state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex];
            if(currentTask.isBeeingPerfomed) {
                pause()
                state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex].isBeeingPerfomed = false
            } else {
                start()
                state.outerData[projectIndex].columns[columnIndex].tasks[taskIndex].isBeeingPerfomed = false
            }
        }
    }
})

export const { createProject, createColumn, createTask, createSubtask, createTaskComment } = kanbanSlice.actions
export default kanbanSlice.reducer