import { describe, it, expect, vi } from 'vitest';
import projectsModule from '@/store/modules/projects';

// Mock loadImage since it uses require.context
vi.mock('@/utils/imageLoader', () => ({
    loadImage: vi.fn((path) => `mocked-image-path/${path}`),
}));

describe('projects store module', () => {
    const { state, getters } = projectsModule;

    it('contains the expected initial projects', () => {
        expect(state.projects.length).toBeGreaterThan(0);
        const terminalProjects = state.projects.filter(p => p.category === 'Terminal');
        expect(terminalProjects.length).toBeGreaterThan(0);
    });

    it('getProjectById returns the correct project', () => {
        const firstProject = state.projects[0];
        const getter = getters.getProjectById(state);
        expect(getter(firstProject.id)).toEqual(firstProject);
    });

    it('getProjects returns all projects', () => {
        expect(getters.getProjects(state)).toEqual(state.projects);
    });
});
