import { mount } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'
import Directories from "../components/directories.vue";
import { useDirectoriesStore } from "../state/directories.store";

describe("directories", () => {
  const DirectoriesComponent = mount(Directories, {
    global: {
      plugins: [createTestingPinia({
        createSpy: vitest.fn
      })],
    },
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  const directoryStore = useDirectoriesStore()

  test("it renders", () => {
    expect(DirectoriesComponent.html()).toContain("Adicionar diretório");
  });


  test('calls saveDirectoryHandler from directoriesStore', async () => {

    const btnAddDirectory = DirectoriesComponent.get('[data-type="add-directory"]')

    await btnAddDirectory.trigger('click')

    const btnSaveDirectory = DirectoriesComponent.get('[data-type="save-directory"]')

    await btnSaveDirectory.trigger('click')

    expect(directoryStore.saveDirectoryHandler).toHaveBeenCalledOnce()
  })

  test.todo('send a new form data to saveDirectoryHandler', async () => {

  })
});
