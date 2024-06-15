import { mount} from "@vue/test-utils";
import InputDate from "../components/inputs/input-date.vue";

function factory(attrs?: any) {
    return mount(InputDate, {
        props: {
          modelValue: new Date(),
          name: 'input-date',
          ...attrs
        },
      });
}

describe("InputDate",  () => {
  it("renders", async () => {
    const InputDateElement = factory();

    expect(InputDateElement.html()).toBeTruthy();
  });

  it('displays correct date', () => {
    const InputDateElement = factory({modelValue: new Date('2010-10-02T10:20:11.000Z') });

    expect(InputDateElement.html()).toContain('02/10/2010')

    const InputDateElement2 = factory({modelValue: new Date('2010-10-02T01:20:11.000Z') });

    expect(InputDateElement2.html()).toContain('01/10/2010')

  })

  it('opens date selector if button was clicked', async () => {

    const InputDateElement = factory();

    const ButtonSelectDate = InputDateElement.find('[data-type="button-date"]')

    await ButtonSelectDate.trigger('click')
    
    expect(InputDateElement.vm.dateCalendarShown).toBe(true)

  })
});
