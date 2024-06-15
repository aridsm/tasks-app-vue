import { mount} from "@vue/test-utils";
import InputCheckbox from "../components/inputs/input-checkbox.vue";

describe("InputCheckbox",  () => {
  it("renders", async () => {
    const InputCheckboxElement = mount(InputCheckbox, {
      props: {
        modelValue: true,
        name: 'input',
        label: 'Teste'
      },
    });

    expect(InputCheckboxElement.html()).toBeTruthy();
  });

  it("Updates modelValue correctly", async () => {
    const InputCheckboxElement = mount(InputCheckbox, {
      props: {
        modelValue: true,
        name: 'input',
        label: 'Teste'
      },
    });
    
    const InputElement = InputCheckboxElement.find(
      '[data-type="input"]'
    );

    expect(InputCheckboxElement.vm.modelValue).toBe(true)
    expect(InputCheckboxElement.vm.value).toBe(true)

    InputCheckboxElement.element.value = false
    await InputElement.trigger('input')

    expect(InputCheckboxElement.emitted()).toHaveProperty('update:modelValue')
    const emittedModelValue = InputCheckboxElement.emitted('update:modelValue')
    
    expect(emittedModelValue?.[0]).toEqual([false])

  });
});
