import { createPinia, setActivePinia } from "pinia"
import { createApp } from 'vue'
import { useDirectoriesStore } from "../../state/directories.store"
import { useTasksStore } from "../../state/tasks.store"

const app = createApp({})

describe('useDirectoriesStore', () => {
    beforeEach(() => {
        const pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
    })

    it('Saves a new directory', () => {
        const directoriesStore = useDirectoriesStore()
        expect(directoriesStore.directories.length).toBe(0)

        directoriesStore.saveDirectoryHandler({
            id: 0,
            name: 'teste',
            description: 'descrição'
        })

        expect(directoriesStore.directories.length).toBe(1)
    })

    
    it('Don\'t save if there is a directory with the same name', () => {
        const directoriesStore = useDirectoriesStore()

        expect(directoriesStore.directories.length).toBe(0)

        directoriesStore.saveDirectoryHandler({
            id: 0,
            name: 'teste',
            description: 'descrição'
        })

        directoriesStore.saveDirectoryHandler({
            id: 0,
            name: 'teste',
            description: 'alguma coisa'
        })

        expect(directoriesStore.directories.length).toBe(1)
        
        directoriesStore.saveDirectoryHandler({
            ...directoriesStore.directories[0],
            name: 'teste',
            description: 'descrição 2'
        })

        expect(directoriesStore.directories.length).toBe(1)

        expect(directoriesStore.directories[0].description).toBe('descrição 2')
    })

    it('Deletes the directory if it exists', () => {
        const directoriesStore = useDirectoriesStore()

        directoriesStore.saveDirectoryHandler({
            id: 0,
            name: 'teste',
            description: 'alguma coisa'
        })

        directoriesStore.saveDirectoryHandler({
            id: 0,
            name: 'teste 2',
            description: 'alguma coisa'
        })

        expect(directoriesStore.directories.length).toBe(2)

        directoriesStore.deleteDirectoryHandler(directoriesStore.directories[0].id)

        expect(directoriesStore.directories.length).toBe(1)

        directoriesStore.deleteDirectoryHandler(directoriesStore.directories[0].id)

        expect(directoriesStore.directories.length).toBe(0)
    })

    it('Changes task\'s directoryName if directory name was changed', () => {
        const tasksStore = useTasksStore()
        const directoriesStore = useDirectoriesStore()

        directoriesStore.$patch({
            directories: [
                {
                    id: 1,
                    name: 'Something',
                    description: ''
                }
            ]
        })

        tasksStore.$patch({
            tasks: [
                {
                    name: 'My new task',
                    description: 'The description',
                    directoryId: 2,
                    directoryName: 'An example',
                    important: false,
                    finalDate: new Date(),
                    id: 1
                },
                {
                    name: 'My new task',
                    description: 'The description',
                    directoryName: 'Something',
                    directoryId: 1,
                    important: false,
                    finalDate: new Date(),
                    id: 1
                }
            ]
        })

        directoriesStore.saveDirectoryHandler(  {
            id: 1,
            name: 'Something - edited',
            description: ''
        })

        expect(tasksStore.tasks[1].directoryName).toBe('Something - edited')
        expect(tasksStore.tasks[0].directoryName).toBe('An example')
    })
})