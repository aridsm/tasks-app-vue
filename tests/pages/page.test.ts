import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import PageTasks from "../../components/page.vue";
import { createTestingPinia } from "@pinia/testing";
import { SortBy } from "../../utils/enums/SortBy";

const taskExample = {
  name: "My new task",
  description: "The description",
  directoryId: 1,
  important: false,
  finalDate: new Date(),
  addedDate: new Date(),
  completed: false,
};

vi.mock("vue-router", () => ({
    resolve: vi.fn(),
  }));
  
  const mockRoute = {}
  
  const mockRouter = {
    push: vi.fn()
  }

function factory() {
  return mount(PageTasks, {
    props: {
      title: "Teste",
      tasks: [
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
          addedDate: new Date("2010-02-15T10:20:15.000Z"),
          finalDate: new Date("2010-02-11T10:30:11.000Z"),
        },
      ],
    },
    global: {
        
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      }
    }
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

    expect(PageComponent.html()).toContain(`${PageComponent.vm.$props.title} (${PageComponent.vm.$props.tasks.length})`)
  });

  it('sort by added first', () => {
    const PageComponent = factory();

    PageComponent.setData({
        sortBy: SortBy.AddedFirst
    })

    expect(PageComponent.vm.filteredTasks[0].id).toBe(3)
    expect(PageComponent.vm.filteredTasks[1].id).toBe(1)
    expect(PageComponent.vm.filteredTasks[2].id).toBe(2)
  })

  it('sort by last added', () => {
    const PageComponent = factory();

    PageComponent.setData({
        sortBy: SortBy.AddedLast
    })

    expect(PageComponent.vm.filteredTasks[0].id).toBe(2)
    expect(PageComponent.vm.filteredTasks[1].id).toBe(1)
    expect(PageComponent.vm.filteredTasks[2].id).toBe(3)
  })

  it('sort by alphabetical order', () => {
    const PageComponent = factory();

    PageComponent.setData({
        sortBy: SortBy.AlphaOrder
    })

    expect(PageComponent.vm.filteredTasks[0].id).toBe(1)
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2)
    expect(PageComponent.vm.filteredTasks[2].id).toBe(3)
  })

  it('sort by reverse alphabetical order', () => {
    const PageComponent = factory();

    PageComponent.setData({
        sortBy: SortBy.ReverseAlphaOrder
    })

    expect(PageComponent.vm.filteredTasks[0].id).toBe(3)
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2)
    expect(PageComponent.vm.filteredTasks[2].id).toBe(1)
  })

  it('sort by descending final date', () => {
    const PageComponent = factory();

    PageComponent.setData({
        sortBy: SortBy.DescendingFinalDate
    })

    expect(PageComponent.vm.filteredTasks[0].id).toBe(3)
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2)
    expect(PageComponent.vm.filteredTasks[2].id).toBe(1)
  })

  it('sort by ascending final date', () => {
    const PageComponent = factory();

    PageComponent.setData({
        sortBy: SortBy.AscendingFinalDate
    })

    expect(PageComponent.vm.filteredTasks[0].id).toBe(1)
    expect(PageComponent.vm.filteredTasks[1].id).toBe(2)
    expect(PageComponent.vm.filteredTasks[2].id).toBe(3)
  })
});
