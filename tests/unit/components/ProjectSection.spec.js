import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import ProjectSection from '@/components/sections/ProjectSection.vue';

// Mock projects store data
const mockProjects = [
    { id: 1, category: 'Frontend', title: 'P1' },
    { id: 2, category: 'Frontend', title: 'P2' },
    { id: 3, category: 'Frontend', title: 'P3' },
    { id: 4, category: 'Frontend', title: 'P4' },
    { id: 5, category: 'Terminal', title: 'P5' },
];

describe('ProjectSection.vue', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = createStore({
            modules: {
                projects: {
                    namespaced: true,
                    getters: {
                        getProjects: () => mockProjects,
                        getProjectById: () => (id) => mockProjects.find(p => p.id === id),
                    }
                }
            }
        });

        wrapper = shallowMount(ProjectSection, {
            global: {
                plugins: [store],
                mocks: {
                    $icons: {},
                }
            }
        });
    });

    it('renders correctly with initial category', () => {
        expect(wrapper.vm.currentCategory).toBe('Frontend');
        // By default loads 3 cards
        expect(wrapper.vm.visibleCards.length).toBe(3);
    });

    it('filters projects by category', async () => {
        await wrapper.vm.filterCategory('Terminal');
        expect(wrapper.vm.currentCategory).toBe('Terminal');
        expect(wrapper.vm.visibleCards.length).toBe(1);
        expect(wrapper.vm.visibleCards[0].title).toBe('P5');
    });

    it('loads more cards when loadMoreCards is called', () => {
        expect(wrapper.vm.visibleCards.length).toBe(3);
        wrapper.vm.loadMoreCards();
        // Fourth card of Frontend should be loaded
        expect(wrapper.vm.visibleCards.length).toBe(4);
        expect(wrapper.vm.visibleCards[3].title).toBe('P4');
    });
});
