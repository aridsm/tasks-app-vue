import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Directories from "../components/directories.vue";
import { useDirectoriesStore } from "../state/directories.store";

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

    expect(directoryStore.directories.length).toBe(1);
    expect(itemsDirectory.length).toBe(1);
  });

  it("calls saveDirectoryHandler from directoriesStore / mocked", async () => {

    const DirectoriesComponent = mount(Directories, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    const directoryStoreSpy = useDirectoriesStore();

    const btnAddDirectory = DirectoriesComponent.find(
      '[data-type="add-directory"]'
    );

    await btnAddDirectory.trigger("click");

    assert.isTrue(DirectoriesComponent.vm.$data.modalDirectoryOpen, 'form modal was open')

    const btnSaveDirectory = DirectoriesComponent.find(
      '[data-type="save-directory"]'
    );

    await btnSaveDirectory.trigger("click");

    DirectoriesComponent.vm.$data.form.name = 'Nome da pasta'
    DirectoriesComponent.vm.$data.form.description = 'Descrição da pasta'

    assert.isNotTrue(DirectoriesComponent.vm.$data.modalDirectoryOpen, 'form modal was closed')

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledOnce()

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledWith(expect.objectContaining({
      id: 0,
      name: 'Nome da pasta',
      description: 'Descrição da pasta'
    }))
  });

  
  it("edit a directory by saveDirectoryHandler / mocked", async () => {

    const DirectoriesComponent = mount(Directories, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            DirectoriesStore: {
              directories: [{id: 1, name: 'dir 1', description: 'desc 1', count: 0}, {id: 2, name: 'dir 2', description: 'desc 2', count: 0}]
            }
          }
        })]
      }
    });

    const directoryStoreSpy = useDirectoriesStore();

    const firstDirectoryOptions = DirectoriesComponent.find('[data-type="option-directory"]')
    await firstDirectoryOptions.trigger('click.stop')

    expect(DirectoriesComponent.vm.$data.form).toMatchObject(directoryStoreSpy.directories[0])

    assert.isTrue(DirectoriesComponent.vm.$data.modalDirectoryOpen, 'form modal was open')

    const btnSaveDirectory = DirectoriesComponent.find(
      '[data-type="save-directory"]'
    );

    await btnSaveDirectory.trigger("click");

    DirectoriesComponent.vm.$data.form.description = 'Nova descrição'

    assert.isNotTrue(DirectoriesComponent.vm.$data.modalDirectoryOpen, 'form modal was closed')

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledOnce()

    expect(directoryStoreSpy.saveDirectoryHandler).toHaveBeenCalledWith(expect.objectContaining({
      id: 1, name: 'dir 1', description: 'Nova descrição', count: 0
    }))
  });

  it('calls deleteDirectoryHandler from directoriesStore / mocked', async () => {
    const DirectoryComponent = mount(Directories, {
      createSpy: vi.fn,
      global: {
        plugins: [createTestingPinia({
          initialState: {
            DirectoriesStore: {
              directories: [{id: 1, name: 'dir 1', description: 'desc 1', count: 0}, {id: 2, name: 'dir 2', description: 'desc 2', count: 0}]
            }
          }
        })]
      }
    })

    const directoriesStore = useDirectoriesStore()

    const firstDirectoryOptions = DirectoryComponent.find('[data-type="option-directory"]')
    await firstDirectoryOptions.trigger('click.stop')

    expect(DirectoryComponent.vm.$data.form).toMatchObject(directoriesStore.directories[0])
    assert.isTrue(DirectoryComponent.vm.$data.modalDirectoryOpen, 'form modal was open')

    const deleteButton = DirectoryComponent.find('[data-type="delete-directory"]')

    await deleteButton.trigger('click')

    assert.isNotTrue(DirectoryComponent.vm.$data.modalDirectoryOpen, 'form modal was closed')

    expect(directoriesStore.deleteDirectoryHandler).toHaveBeenCalledOnce()
    expect(directoriesStore.deleteDirectoryHandler).toHaveBeenCalledWith(1)
  })
});
