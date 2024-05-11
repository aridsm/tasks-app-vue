import { createPinia, setActivePinia } from "pinia";
import { createApp } from "vue";
import { useDirectoriesStore } from "../../state/directories.store";
import { useTasksStore } from "../../state/tasks.store";

const app = createApp({});

describe("useDirectoriesStore", () => {
  beforeEach(() => {
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
  });

  it("Saves a new directory", async () => {
    const directoriesStore = useDirectoriesStore();
    expect(directoriesStore.directories.length).toBe(0);

    await directoriesStore.saveDirectoryHandler({
      id: 0,
      name: "teste",
      description: "descrição",
    });

    expect(directoriesStore.directories.length).toBe(1);
  });

  it("Don't save if there is a directory with the same name", async () => {
    const directoriesStore = useDirectoriesStore();

    expect(directoriesStore.directories.length).toBe(0);

    await directoriesStore.saveDirectoryHandler({
      id: 0,
      name: "teste",
      description: "descrição",
    })

    await directoriesStore.saveDirectoryHandler({
      id: 0,
      name: "teste",
      description: "alguma coisa",
    }).catch(() => console.log('err'));

    expect(directoriesStore.directories.length).toBe(1);

    await directoriesStore.saveDirectoryHandler({
      ...directoriesStore.directories[0],
      name: "teste",
      description: "descrição 2",
    });

    expect(directoriesStore.directories.length).toBe(1);

    expect(directoriesStore.directories[0].description).toBe("descrição 2");
  });

  it("Deletes the directory if it exists", async () => {
    const directoriesStore = useDirectoriesStore();

    await directoriesStore.saveDirectoryHandler({
      id: 0,
      name: "teste",
      description: "alguma coisa",
    });

    await directoriesStore.saveDirectoryHandler({
      id: 0,
      name: "teste 2",
      description: "alguma coisa",
    });

    expect(directoriesStore.directories.length).toBe(2);

    await directoriesStore.deleteDirectoryHandler(
      directoriesStore.directories[0].id
    );

    expect(directoriesStore.directories.length).toBe(1);

    await directoriesStore.deleteDirectoryHandler(
      directoriesStore.directories[0].id
    );

    expect(directoriesStore.directories.length).toBe(0);
  });

  it("Changes task's directoryName if directory name was changed", () => {
    const tasksStore = useTasksStore();
    const directoriesStore = useDirectoriesStore();

    directoriesStore.$patch({
      directories: [
        {
          id: 1,
          name: "Something",
          description: "",
        },
      ],
    });

    tasksStore.$patch({
      tasks: [
        {
          name: "My new task",
          description: "The description",
          directoryId: 2,
          directoryName: "An example",
          important: false,
          finalDate: new Date(),
          id: 1,
          completed: false,
        },
        {
          name: "My new task",
          description: "The description",
          directoryName: "Something",
          directoryId: 1,
          important: false,
          finalDate: new Date(),
          id: 1,
          completed: false,
        },
      ],
    });

    directoriesStore.saveDirectoryHandler({
      id: 1,
      name: "Something - edited",
      description: "",
    });

    expect(tasksStore.tasks[1].directoryName).toBe("Something - edited");
    expect(tasksStore.tasks[0].directoryName).toBe("An example");
  });

  test("If a directory is selected and it's deleted, the selected directory becomes null", () => {
    const directoriesStore = useDirectoriesStore();

    const directoriesExample = [
      {
        id: 1,
        name: "Something",
        description: "",
      },
      {
        id: 2,
        name: "Something 2",
        description: "",
      },
    ];

    directoriesStore.$patch({
      directories: [...directoriesExample],
      selectedDirectory: {
        ...directoriesExample[1],
      },
    });

    expect(directoriesStore.selectedDirectory).toMatchObject(
      directoriesExample[1]
    );

    directoriesStore.deleteDirectoryHandler(directoriesExample[1].id);

    expect(directoriesStore.selectedDirectory).toBeNull();
  });

  it("Can't delete a directory if there are tasks attached", () => {});
});
