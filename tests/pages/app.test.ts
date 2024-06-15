
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs';
import { months, daysWeek } from "../../utils/dateUtils";
import App from '../../app.vue'

vi.mock("dayjs", () => ({
    resolve: vi.fn(),
  }));
  

describe('app', () => {
    const app = mount(App)

    it('Renders', () => {
        expect(app).toBeTruthy()
    })

    it('Shows the correct date', () => {
        const todaysDate = new Date()

        expect(app.html()).toContain(daysWeek[dayjs(todaysDate).day()].fullName)
        expect(app.html()).toContain(dayjs(todaysDate).date())
        expect(app.html()).toContain(months[dayjs(todaysDate).month()])
    })
})