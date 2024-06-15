import { mount} from "@vue/test-utils";
import InputSelect from "../components/inputs/input-select.vue";

function factory(attrs?: any) {
    return mount(InputSelect, {
        props: {
          modelValue: 2,
          items: [
              {id: 1, name: 'item 1'},
              {id: 2, name: 'item 2'},
              {id: 3, name: 'item 3'},
          ],
          name: 'input-select',
          ...attrs
        },
      });
}

describe("InputSelect",  () => {
  it("renders", async () => {
    const InputSelectElement = factory();

    expect(InputSelectElement.html()).toBeTruthy();
  });

  it('gets current item selected by item ID', () => {
    const InputSelectElement = factory();

    expect(InputSelectElement.vm.objectItem).toMatchObject({id: 2, name: 'item 2'})
  })

  it('shows placeholder text if there is no item selected', () => {
    const InputSelectElement = factory({
        modelValue: null
    });

    const btnSelectItem = InputSelectElement.find('[data-type="button-select-item"]')

    expect(btnSelectItem.html()).toContain('Selecione...')
  })

  it('opens items list if button was clicked', async () => {
    const InputSelectElement = factory();

    const btnSelectItem = InputSelectElement.find('[data-type="button-select-item"]')

    expect(InputSelectElement.vm.itemsShown).toBeFalsy()

    await btnSelectItem.trigger('click')

    expect(InputSelectElement.vm.itemsShown).toBeTruthy()

    const itemsListElement = InputSelectElement.find('[data-type="items-list"]')
    expect(itemsListElement.isVisible()).toBe(true)

    const itemElement = InputSelectElement.findAll('[data-type="items-list-item"]')
    expect(itemElement).length(3)

  })

  it('selects item if it was clicked', async () => {
    const InputSelectElement = factory();

    const btnSelectItem = InputSelectElement.find('[data-type="button-select-item"]')

    await btnSelectItem.trigger('click')

    const itemElement = InputSelectElement.findAll('[data-type="items-list-item"]')

    expect(InputSelectElement.vm.objectItem.id).toBe(2)

    await itemElement[0].trigger('click')

    expect(InputSelectElement.vm.objectItem).toMatchObject({id: 1, name: 'item 1'})
  })

  test('clearable button works correctly', async () => {
    const InputSelectElement = factory({
        clearable: true
    });

    const btnClearable = InputSelectElement.find('[data-type="button-clearable"]')

    expect(btnClearable.isVisible()).toBeTruthy()

    await btnClearable.trigger('click.stop')

    expect(InputSelectElement.vm.objectItem).toMatchObject({})

    expect(InputSelectElement.emitted()).toHaveProperty('update:modelValue')
    const emittedModelValue = InputSelectElement.emitted('update:modelValue')

    expect(emittedModelValue?.[0]).toEqual([null])

  })
});
