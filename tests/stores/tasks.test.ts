import { createPinia, setActivePinia } from "pinia"
import { createApp } from 'vue'
import { useTasksStore } from "../../state/tasks.store"

const app = createApp({})

describe('useTasksStore', () => {
    beforeEach(() => {
        const pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
    })

    it.todo('saves a new task')
    it.todo('deletes task')
    it.todo('edits a task')
    it.todo('deletes all tasks')

    it.todo('just return "important" tasks')
    it.todo('just return "added today" tasks')
    it.todo('just return "late tasks" tasks')
    it.todo('just return tasks done')

    it.todo('arrange tasks by added first')
    it.todo('arrange tasks by added late')


})