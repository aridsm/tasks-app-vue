import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ModalTask from "../components/modal-task.vue";
import type { Task } from "../utils/interface/Tasks";
import { useTasksStore } from "../state/tasks.store";
import { createTestingPinia } from "@pinia/testing";
import { useAlertStore } from "../state/alerts.store";
import { useConfirmation } from "../state/confirmation.store";

const blankTask = {
  id: 0,
  name: "",
  description: "",
  directoryId: 0,
  directoryName: "",
  important: false,
  completed: false,
  finalDate: new Date(),
  addedDate: new Date(),
};

function factory(task: Task = blankTask) {
  return mount(ModalTask, {
    props: {
      form: task || blankTask,
      modelValue: true
    },
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            TasksStore: {
              tasks: [],
            },
            DirectoriesStore: {
              directories: [{ id: 1, name: "dir 1", description: "desc 1" }],
            },
          },
        }),
      ],
    },
  });
}

describe("ModalTask", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders", () => {
    const ModalTask = factory();
    expect(ModalTask.html()).toBeTruthy();
  });

  it("doesn't save task if name and directoryId are not filled", async () => {
    const ModalTask = factory();
    const taskStore = useTasksStore();
    const alertStore = useAlertStore();

    const btnAdd = ModalTask.find('[data-type="save-task"]');

    await btnAdd.trigger("click");

    expect(taskStore.saveTaskHandler).toHaveBeenCalledTimes(0);
    expect(alertStore.show).toHaveBeenCalledTimes(0);
  });

  it("calls saveTaskHandler if name and directoryId are filled", async () => {
    const ModalTask = factory({
      name: "Teste",
      description: "teste descrição",
      directoryId: 1,
      important: false,
      completed: false,
      finalDate: new Date(),
      addedDate: new Date(),
      id: 0
    });
    const taskStore = useTasksStore();
    const alertStore = useAlertStore();

    const btnAdd = ModalTask.find('[data-type="save-task"]');

    await btnAdd.trigger("click");

    expect(taskStore.saveTaskHandler).toHaveBeenCalledTimes(1);
    expect(alertStore.show).toHaveBeenCalledTimes(1);
  });

  it("shows confirmation to delete task", async () => {
    const ModalTask = factory({
      name: "Teste",
      description: "teste descrição",
      directoryId: 1,
      important: false,
      completed: false,
      finalDate: new Date(),
      addedDate: new Date(),
      id: 1,
    });

    const confirmationStore = useConfirmation();

    const btnDelete = ModalTask.find('[data-type="delete-task"]');
    await btnDelete.trigger("click");

    expect(confirmationStore.show).toHaveBeenCalledWith(
      `Tem certeza de que deseja excluir a tarefa "Teste"?`,
      ModalTask.vm.onDeleteTask,
    );
  });
});
