import { createPinia, setActivePinia } from "pinia"
import { createApp } from 'vue'
import { useTasksStore } from "../../state/tasks.store"
import { useDirectoriesStore } from "../../state/directories.store"
import dayjs from "dayjs"

const app = createApp({})

const taskExample = {
    name: 'My new task',
    description: 'The description',
    directoryId: 1,
    important: false,
    finalDate: new Date(),
    completed: false
}

describe('useTasksStore', () => {
    beforeEach(() => {
        const pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
    })

    it('saves a new task', () => {
        const taskStore = useTasksStore()

        expect(taskStore.tasks).toHaveLength(0)

        taskStore.saveTaskHandler(taskExample)

        expect(taskStore.tasks).toHaveLength(1)
    })

    it('edits a existing task', () => {
        const taskStore = useTasksStore()

        expect(taskStore.tasks).toHaveLength(0)

        taskStore.$patch({
            tasks: [{
                ...taskExample,
                id: 1
            }]
        })

        taskStore.saveTaskHandler({
            name: 'My new task - edited',
            description: 'The description - edited',
            directoryId: 2,
            important: false,
            finalDate: new Date(),
            id: 1,
            completed: false
        })

        expect(taskStore.tasks).toHaveLength(1)
        expect(taskStore.tasks[0]).toMatchObject({
            name: 'My new task - edited',
            description: 'The description - edited',
            directoryId: 2,
            important: false,
            finalDate: taskStore.tasks[0].finalDate,
            id: 1,
            completed: false
        })
    })

    it('when saved gets the directory name', () => {
        const directoryStore = useDirectoriesStore()
        const taskStore = useTasksStore()

        directoryStore.$patch({
            directories: [
                {
                    id: 1,
                    name: 'Pasta 1',
                    description: 'descrição'
                },
                {
                    id: 2,
                    name: 'Pasta 2',
                    description: 'descrição 2'
                }
            ]
        })

        taskStore.saveTaskHandler(taskExample)

        expect(taskStore.tasks[0].directoryName).toBe('Pasta 1')

        taskStore.saveTaskHandler({
            name: 'My new task - edited',
            description: 'The description - edited',
            directoryId: 2,
            important: false,
            finalDate: new Date(),
            id: taskStore.tasks[0].id,
            completed: false
        })

        expect(taskStore.tasks[0].directoryName).toBe('Pasta 2')
    })

    it('deletes a task', () => {
        const taskStore = useTasksStore()

        taskStore.$patch({
            tasks: [
                {
                    ...taskExample,
                    id: 1,
                }
            ]
        })

        expect(taskStore.tasks).toHaveLength(1)
        taskStore.deleteTaskHandler(1)
        expect(taskStore.tasks).toHaveLength(0)
    })

    it.todo('deletes all tasks')

    it('just return "important" tasks', () => {
        const taskStore = useTasksStore()

        expect(taskStore.tasks).toHaveLength(0)

        taskStore.$patch({
            tasks: [{
                ...taskExample,
                important: false,
                id: 1
            },
            {
                ...taskExample,
                important: true,
                id: 2
            },
        ]
        }) 

        expect(taskStore.importantTasks).length(1)
        expect(taskStore.importantTasks[0].id).toBe(2)
    })

    it('just return "added today" tasks', () => {
        const taskStore = useTasksStore()

        expect(taskStore.tasks).toHaveLength(0)

        taskStore.$patch({
            tasks: [{
                ...taskExample,
                addedDate: dayjs(new Date()).set('hour', 2).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
                id: 1
            },
            {
                ...taskExample,
                addedDate: dayjs(new Date()).format('2010-05-04[T]HH:mm:ss.SSS[Z]'),
                id: 2
            },
            {
                ...taskExample,
                addedDate: new Date(),
                id: 3
            }]
        })

        expect(taskStore.todaysTasks).length(1)
        expect(taskStore.todaysTasks[0].id).toBe(3)

    })

    it.todo('just return "late tasks" tasks')

    it('just return tasks done', () => {
        const taskStore = useTasksStore()

        expect(taskStore.tasks).toHaveLength(0)

        taskStore.$patch({
            tasks: [{
                ...taskExample,
                id: 1,
                completed: false
            },
            {
                ...taskExample,
                id: 2,
                completed: true
            },
        ]
        })

        expect(taskStore.completedTasks).length(1)
        expect(taskStore.completedTasks[0].id).toBe(2)
    })

    it.todo('arrange tasks by added first')
    it.todo('arrange tasks by added late')

})