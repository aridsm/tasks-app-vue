import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Confirmation from "../components/confirmation.vue";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmation } from "../state/confirmation.store";

function factory() {
    return mount(Confirmation, {
        global: {
            plugins: [
              createTestingPinia({
                initialState: {
                    confirmationStore: {
                        showConfirmation: true,
                        action: vi.fn(),
                  },
                },
              }),
            ],
          },
      });
}

describe("confirmation", () => {


  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders", () => {
    const ConfirmationComponent = factory()

    expect(ConfirmationComponent.html()).toBeTruthy();
  });

  it('trigger action when confirmation button is clicked', async () => {
    const ConfirmationComponent = factory()
    const confirmationStore = useConfirmation()

    const btnConfirmation = ConfirmationComponent.find(
        '[data-type="btn-confirmation"]'
      );
  
    await btnConfirmation.trigger("click");

    expect(confirmationStore.action).toHaveBeenCalledOnce()

  })
});
