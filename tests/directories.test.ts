import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Directories from "../components/directories.vue";
import { useDirectoriesStore } from "../state/directories.store";

function factory({data} = { data: {}}) {
  return mount(Directories, {
    global: {
      plugins: [createTestingPinia({
        initialState: {
          DirectoriesStore: {
            directories: [{id: 1, name: 'dir 1', description: 'desc 1', count: 0}, {id: 2, name: 'dir 2', description: 'desc 2', count: 0}]
          }
        }
      })]
    },
    data() {
      return data
    }
  })
}

describe("directories", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("it renders", () => {
    const DirectoriesComponent = mount(Directories);
    expect(DirectoriesComponent.html()).toContain("Adicionar diretório");
  });

  it("saves a new directory", async () => {
    const DirectoriesComponent = mount(Directories);

    expect(DirectoriesComponent.html()).toContain('Nenhum diretório adicionado')

    const directoryStore = useDirectoriesStore();
    const btnAddDirectory = DirectoriesComponent.find(
      '[data-type="add-directory"]'
    );

    await btnAddDirectory.trigger("click");

    const btnSaveDirectory = DirectoriesComponent.find(
      '[data-type="save-directory"]'
    );

    await btnSaveDirectory.trigger("click");

    const itemsDirectory = DirectoriesComponent.findAll(
      '[data-type="item-directory"]'
    );

    expect(directoryStore.directories).toHaveLength(1)
    expect(itemsDirectory.length).toBe(1);

    expect(DirectoriesComponent.html()).not.toContain('Nenhum diretório adicionado')

  });

  it('Select the right directory when it is clicked', async () => {
    const wrapper = factory()
    const directoryStoreSpy = useDirectoriesStore();

    const firstDirectoryOptions = wrapper.find('[data-type="option-directory"]')
    await firstDirectoryOptions.trigger('click.stop')

    expect(wrapper.getCurrentComponent().data.form).toMatchObject(directoryStoreSpy.directories[0])

    assert.isTrue(wrapper.getCurrentComponent().data.modalDirectoryOpen, 'form modal was open')

    const btnSaveDirectory = wrapper.find(
      '[data-type="save-directory"]'
    );
    
    await btnSaveDirectory.trigger("click");

    assert.isNotTrue(wrapper.getCurrentComponent().data.modalDirectoryOpen, 'form modal was closed')
  })

  it("calls saveDirectoryHandler from directoriesStore / mocked", async () => {

    const wrapper = factory({
      data: {
        form: {
          id: 0,
          name: 'Nome da pasta',
          description: 'Descrição da pasta'
        }
      }
    })

    const directoryStoreSpy = useDirectoriesStore();

    const btnSaveDirectory = wrapper.find(
      '[data-type="save-directory"]'
    );

    await btnSaveDirectory.trigger("click");

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledOnce()

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledWith(expect.objectContaining({
      id: 0,
      name: 'Nome da pasta',
      description: 'Descrição da pasta'
    }))
  });

  
  it("edit a directory by saveDirectoryHandler / mocked", async () => {

    const DirectoriesComponent = factory()
    const directoryStoreSpy = useDirectoriesStore();

    const firstDirectoryOptions = DirectoriesComponent.find('[data-type="option-directory"]')
    await firstDirectoryOptions.trigger('click.stop')

    DirectoriesComponent.setData({
      form: {
        name: 'Novo nome'
      }
    })

    const btnSaveDirectory = DirectoriesComponent.find(
      '[data-type="save-directory"]'
    );
    

    await btnSaveDirectory.trigger("click");

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledOnce()

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledWith(expect.objectContaining({
      id: 1, name: 'Novo nome', description: 'desc 1', count: 0
    }))

  });

  it('calls deleteDirectoryHandler from directoriesStore / mocked', async () => {
    const DirectoryComponent = factory()
    const directoriesStore = useDirectoriesStore()

    const firstDirectoryOptions = DirectoryComponent.find('[data-type="option-directory"]')
    await firstDirectoryOptions.trigger('click.stop')

    const deleteButton = DirectoryComponent.find('[data-type="delete-directory"]')

    await deleteButton.trigger('click')

    expect(directoriesStore.deleteDirectoryHandler).toHaveBeenCalledOnce()
    expect(directoriesStore.deleteDirectoryHandler).toHaveBeenCalledWith(1)
  })
});
