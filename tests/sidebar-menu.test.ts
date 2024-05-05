import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import SidebarMenu from '../components/sidebar-menu.vue'

describe('sidebar-menu', () => {
  const sidebarMenu = mount(SidebarMenu, {
    data() {
      return {
        menuExpanded: true
      }
    },
  })
  const container = sidebarMenu.get('[data-type="container"]')

  test('Should render', () => {
    expect(sidebarMenu.html()).toContain("Adicionar tarefa")
  })

  test('Expand button should change container width', async () => {
    // expect(container.classes()).includes('w-[25vw]')

    // await sidebarMenu.get('[data-type="expand"]').trigger('click')

    // expect(container.classes()).includes('w-20')

    // await sidebarMenu.get('[data-type="expand"]').trigger('click')

    // expect(container.classes()).includes('w-[25vw]')

  })
  test.todo('Clear button clear all tasks')
  test.todo('Add task button adds new task')
})

// yarn vitest -u