import { html, appendChildren } from './dom';
import type { PortfolioData, Education, Experience, Project } from '../types';

export class MainContent {
    render(data: PortfolioData): HTMLElement {
        const main = html.div('main-content');

        main.appendChild(this.renderEducation(data.education));
        main.appendChild(this.renderExperience(data.experience));
        main.appendChild(this.renderProjects(data.projects));

        return main;
    }

    private renderEducation(education: Education[]): HTMLElement {
        const section = html.section('section-education', [
            html.h2('Education', 'section-heading'),
        ]);

        const container = html.div('items-container');
        education.forEach((edu) => {
            container.appendChild(this.createEducationCard(edu));
        });
        section.appendChild(container);

        return section;
    }

    private createEducationCard(edu: Education): HTMLElement {
        const card = html.article('content-card');

        const header = html.div('card-header');
        appendChildren(
            header,
            html.h3(edu.degree, 'card-title'),
            html.p(edu.school, 'card-subtitle')
        );
        card.appendChild(header);

        const meta = html.div('card-meta');
        appendChildren(
            meta,
            html.span(`${edu.field} • ${edu.duration}`, 'card-meta-text')
        );
        card.appendChild(meta);

        if (edu.details) {
            const details = html.div('card-details');
            edu.details.forEach((detail) => {
                details.appendChild(html.p(detail, 'detail-item'));
            });
            card.appendChild(details);
        }

        return card;
    }

    private renderExperience(experience: Experience[]): HTMLElement {
        const section = html.section('section-experience', [
            html.h2('Experience', 'section-heading'),
        ]);

        const container = html.div('items-container');
        experience.forEach((exp) => {
            container.appendChild(this.createExperienceCard(exp));
        });
        section.appendChild(container);

        return section;
    }

    private createExperienceCard(exp: Experience): HTMLElement {
        const card = html.article('content-card');

        const header = html.div('card-header');
        appendChildren(
            header,
            html.h3(exp.title, 'card-title'),
            html.p(`${exp.company} • ${exp.location}`, 'card-subtitle')
        );
        card.appendChild(header);

        const meta = html.div('card-meta');
        meta.appendChild(html.span(exp.duration, 'card-meta-text'));
        card.appendChild(meta);

        card.appendChild(html.p(exp.description, 'card-description'));

        return card;
    }

    private renderProjects(projects: Project[]): HTMLElement {
        const section = html.section('section-projects', [
            html.h2('Projects', 'section-heading'),
        ]);

        const grid = html.div('projects-grid');
        projects.forEach((project) => {
            grid.appendChild(this.createProjectCard(project));
        });
        section.appendChild(grid);

        return section;
    }

    private createProjectCard(project: Project): HTMLElement {
        const card = html.article('project-card');

        const header = html.div('project-card-header');
        header.appendChild(html.h3(project.title, 'project-title'));
        card.appendChild(header);

        card.appendChild(html.p(project.description, 'project-description'));

        const tech = html.div('project-technologies');
        project.technologies.forEach((t) => {
            tech.appendChild(html.span(t, 'tech-badge'));
        });
        card.appendChild(tech);

        if (project.github || project.link) {
            const links = html.div('project-links');

            if (project.github) {
                const link = html.a(project.github, '→ GitHub', 'project-link');
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                links.appendChild(link);
            }

            if (project.link) {
                const link = html.a(project.link, '→ View Project', 'project-link');
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                links.appendChild(link);
            }

            card.appendChild(links);
        }

        return card;
    }
}
