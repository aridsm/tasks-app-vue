import { mount } from "@vue/test-utils";
import DialogModal from "../components/dialog-modal.vue";

const titleCard = 'Um título teste'
const cardClasses = 'mx-2 pt-6'

describe("dialog-modal", () => {
  const dialogModal = mount(DialogModal, {
    props: {
      title: titleCard,
        modelValue: true,
        cardClasses: cardClasses
    },
    global: {
      stubs: {
        teleport: true,
      },
    },
  });

  test("it renders the title and the classes", () => {
    expect(dialogModal.html()).toContain(titleCard)
    expect(dialogModal.html()).toContain(cardClasses)
  });
});
