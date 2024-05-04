import { createPinia, setActivePinia } from "pinia"
import { createApp } from 'vue'
import { useDirectoriesStore } from "../../state/directories.store"

const app = createApp({})

describe('useDirectoriesStore', () => {
    beforeEach(() => {
        const pinia = createPinia()
        app.use(pinia)
        setActivePinia(pinia)
    })

    it('saves a new directory', () => {
        const directoriesStore = useDirectoriesStore()
        expect(directoriesStore.directories.length).toBe(0)

        directoriesStore.saveDirectoryHandler({
            id: 0,
            name: 'teste',
            description: 'descrição'
        })

        expect(directoriesStore.directories.length).toBe(1)
    })

    
    it('don\'t save if there is a directory with the same name', () => {
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

    it('deletes the directory if it exists', () => {
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
})