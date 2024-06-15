import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import PageTasks from "../../components/page.vue";
import { SortBy } from "../../utils/enums/SortBy";
import type { Task } from "../../utils/interface/Tasks";

const taskExample = {
  name: "My new task",
  description: "The description",
  directoryId: 1,
  important: false,
  finalDate: new Date(),
  addedDate: new Date(),
  completed: false,
};

const tasksExamples = [
  {
    ...taskExample,
    id: 1,
    name: "ABC",
    addedDate: new Date("2010-02-15T10:30:11.000Z"),
    finalDate: new Date("2010-02-10T10:30:11.000Z"),
  },
  {
    ...taskExample,
    id: 2,
    name: "alm",
    addedDate: new Date("2010-02-15T10:30:15.000Z"),
    finalDate: new Date("2010-02-10T10:31:11.000Z"),
  },
  {
    ...taskExample,
    id: 3,
    name: "xyz",
    directoryId: 2,
    addedDate: new Date("2010-02-15T10:20:15.000Z"),
    finalDate: new Date("2010-02-11T10:30:11.000Z"),
  },
];

vi.mock("vue-router", () => ({
  resolve: vi.fn(),
}));

const mockRoute = {};

const mockRouter = {
  push: vi.fn(),
};

function factory(tasks?: Task[]) {
  return mount(PageTasks, {
    props: {
      title: "Teste",
      tasks: tasks || tasksExamples,
    },
    global: {
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    },
  });
}

describe("PageTasks", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders", () => {
    const PageComponent = factory();

    expect(PageComponent.html()).toBeTruthy();
  });

  it("it shows the title and the tasks count", () => {
    const PageComponent = factory();

    expect(PageComponent.html()).toContain(
      `${PageComponent.vm.$props.title} (${PageComponent.vm.$props.tasks.length})`
    );
  });

  it("sort by added first", () => {
    const PageComponent = factory();

    PageComponent.setData({
      sortBy: SortBy.AddedFirst,
    });

    expect(PageComponent.vm.filteredTasks[0].id).toBe(3);
    expect(PageComponent.vm.filteredTasks[1].id).toBe(1);
    expect(PageComponent.vm.filteredTasks[2].id).toBe(2);
  });

  it("sort by last added", () => {
    const PageComponent = factory();

    PageComponent.setData({
      sortBy: SortBy.AddedLast,
    });

    expect(PageComponent.vm.filteredTasks[0].id).toBe(2);
    expect(PageComponent.vm.filteredTasks[1].id).toBe(1);
    expect(PageComponent.vm.filteredTasks[2].id).toBe(3);
  });

  it("sort by alphabetical order", () => {
    const PageComponent = factory();

    PageComponent.setData({
      sortBy: SortBy.AlphaOrder,
    });

    expect(PageComponent.vm.filteredTasks[0].id).toBe(1);
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2);
    expect(PageComponent.vm.filteredTasks[2].id).toBe(3);
  });

  it("sort by reverse alphabetical order", () => {
    const PageComponent = factory();

    PageComponent.setData({
      sortBy: SortBy.ReverseAlphaOrder,
    });

    expect(PageComponent.vm.filteredTasks[0].id).toBe(3);
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2);
    expect(PageComponent.vm.filteredTasks[2].id).toBe(1);
  });

  it("sort by descending final date", () => {
    const PageComponent = factory();

    PageComponent.setData({
      sortBy: SortBy.DescendingFinalDate,
    });

    expect(PageComponent.vm.filteredTasks[0].id).toBe(3);
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2);
    expect(PageComponent.vm.filteredTasks[2].id).toBe(1);
  });

  it("sort by ascending final date", () => {
    const PageComponent = factory();

    PageComponent.setData({
      sortBy: SortBy.AscendingFinalDate,
    });

    expect(PageComponent.vm.filteredTasks[0].id).toBe(1);
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2);
    expect(PageComponent.vm.filteredTasks[2].id).toBe(3);
  });

  it("shows that there are no tasks", () => {
    const PageComponent = factory([]);

    expect(PageComponent.html()).toContain("Nenhuma tarefa adicionada!");
  });

  it("doesn't show message if there are tasks", () => {
    const PageComponent = factory();

    expect(PageComponent.html()).not.toContain("Nenhuma tarefa adicionada!");
  });

  it("opens modal task", async () => {
    const PageComponent = factory([]);

    const btnAddNewTask = PageComponent.find('[data-type="add-task"]');

    await btnAddNewTask.trigger("click");

    expect(PageComponent.getCurrentComponent().data.modalTaskOpen).toBeTruthy();
    expect(PageComponent.getCurrentComponent().data.form).toMatchObject(
      expect.objectContaining({
        name: "",
        description: "",
        directoryId: 0,
        important: false,
        completed: false,
      })
    );
  });
});
