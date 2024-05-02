
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs';
import { months, daysWeek } from "../../utils/dateUtils";
import App from '../../app.vue'

describe('app', () => {
    const app = mount(App)

    test('It renders', () => {
        expect(app.html()).toContain('sidebar-menu')
    })

    test('It shows the correct date', () => {
        const todaysDate = new Date()

        expect(app.html()).toContain(daysWeek[dayjs(todaysDate).day()].fullName)
        expect(app.html()).toContain(dayjs(todaysDate).date())
        expect(app.html()).toContain(months[dayjs(todaysDate).month()])
    })
})