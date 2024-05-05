import { createPinia, setActivePinia } from "pinia"
import { createApp } from 'vue'
import { useTasksStore } from "../../state/tasks.store"
import { useDirectoriesStore } from "../../state/directories.store"

const app = createApp({})

describe('useTasksStore', () => {
    beforeEach(() => {
        const pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
    })

    it('saves a new task', () => {
        const taskStore = useTasksStore()

        expect(taskStore.tasks).toHaveLength(0)

        taskStore.saveTaskHandler({
            name: 'My new task',
            description: 'The description',
            directoryId: 1,
            important: false,
            finalDate: new Date(),
        })

        expect(taskStore.tasks).toHaveLength(1)
    })

    it('edits a existing task', () => {
        const taskStore = useTasksStore()

        expect(taskStore.tasks).toHaveLength(0)

        taskStore.$patch({
            tasks: [{
                name: 'My new task',
                description: 'The description',
                directoryId: 1,
                important: false,
                finalDate: new Date(),
                id: 1
            }]
        })

        taskStore.saveTaskHandler({
            name: 'My new task - edited',
            description: 'The description - edited',
            directoryId: 2,
            important: false,
            finalDate: new Date(),
            id: 1
        })

        expect(taskStore.tasks).toHaveLength(1)
        expect(taskStore.tasks[0]).toMatchObject({
            name: 'My new task - edited',
            description: 'The description - edited',
            directoryId: 2,
            important: false,
            finalDate: taskStore.tasks[0].finalDate,
            id: 1
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

        taskStore.saveTaskHandler({
            name: 'My new task',
            description: 'The description',
            directoryId: 1,
            important: false,
            finalDate: new Date(),
            id: 0
        })

        expect(taskStore.tasks[0].directoryName).toBe('Pasta 1')

        taskStore.saveTaskHandler({
            name: 'My new task - edited',
            description: 'The description - edited',
            directoryId: 2,
            important: false,
            finalDate: new Date(),
            id: taskStore.tasks[0].id
        })

        expect(taskStore.tasks[0].directoryName).toBe('Pasta 2')
    })

    it('deletes a task', () => {
        const taskStore = useTasksStore()

        taskStore.$patch({
            tasks: [
                {
                    name: 'My new task',
                    description: 'The description',
                    directoryId: 1,
                    important: false,
                    finalDate: new Date(),
                    id: 1
                }
            ]
        })

        expect(taskStore.tasks).toHaveLength(1)
        taskStore.deleteTaskHandler(1)
        expect(taskStore.tasks).toHaveLength(0)
    })

    it.todo('deletes all tasks')

    it.todo('just return "important" tasks')
    it.todo('just return "added today" tasks')
    it.todo('just return "late tasks" tasks')
    it.todo('just return tasks done')

    it.todo('arrange tasks by added first')
    it.todo('arrange tasks by added late')

})