import { html, appendChildren } from './dom';
import type { PortfolioData, ContactLink } from '../types';

export class Sidebar {
    render(data: PortfolioData): HTMLElement {
        const sidebar = html.div('sidebar');

        const photoContainer = html.div('profile-photo-container');
        if (data.profile.photoUrl)
            photoContainer.appendChild(html.img(data.profile.photoUrl, data.profile.name, 'profile-photo'));
        else {
            const placeholder = this.createPlaceholder();
            photoContainer.appendChild(placeholder as unknown as HTMLElement);
        }
        sidebar.appendChild(photoContainer);

        const profileInfo = html.div('profile-info');
        appendChildren(
            profileInfo,
            html.h1(data.profile.name, 'profile-name'),
            html.p(data.profile.title, 'profile-title'),
            html.p(`📍 ${data.profile.location}`, 'profile-location')
        );
        sidebar.appendChild(profileInfo);
        sidebar.appendChild(html.div('divider'));

        const about = html.div('profile-about');
        appendChildren(about, html.h3('About', 'section-title'), html.p(data.profile.about, 'about-text'));
        sidebar.appendChild(about);

        const contacts = html.div('profile-contacts');
        appendChildren(contacts, html.h3('Contact', 'section-title'));
        const contactsList = html.div('contacts-list');
        data.contacts.forEach((contact) => contactsList.appendChild(this.createContactLink(contact)));
        contacts.appendChild(contactsList);
        sidebar.appendChild(contacts);

        sidebar.appendChild(this.renderSkills(data));

        return sidebar;
    }

    private createContactLink(contact: ContactLink): HTMLElement {
        const link = html.a(contact.url, `${contact.icon} ${contact.label}`, 'contact-link');

        if (contact.url.startsWith('mailto:'))
            link.target = '_self';
        else {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }

        return link;
    }

    private renderSkills(data: PortfolioData): HTMLElement {
        const skills = html.div('profile-skills');
        appendChildren(skills, html.h3('Skills', 'section-title'));

        const skillsGrid = html.div('skills-grid');

        const skillCategories = [
            { label: 'Languages', items: data.skills.languages },
            { label: 'Web', items: data.skills.web },
            { label: 'Databases', items: data.skills.databases },
            { label: 'DevOps', items: data.skills.devops },
            { label: 'Blockchain', items: data.skills.blockchain },
            { label: 'Soft Skills', items: data.skills.softSkills },
        ];

        skillCategories.forEach(({ label, items }) => {
            const category = html.div('skill-category');
            category.appendChild(html.h4(label, 'skill-category-title'));
            const tagsList = html.div('skills-tags');
            items.forEach((item) => {
                tagsList.appendChild(html.span(item, 'skill-tag'));
            });
            category.appendChild(tagsList);
            skillsGrid.appendChild(category);
        });

        skills.appendChild(skillsGrid);
        return skills;
    }

    private createPlaceholder(): SVGElement {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 200 200');
        svg.setAttribute('class', 'profile-photo placeholder');

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'grad');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:var(--ctp-mocha-lavender);stop-opacity:1');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:var(--ctp-mocha-mauve);stop-opacity:1');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '200');
        rect.setAttribute('height', '200');
        rect.setAttribute('fill', 'url(#grad)');
        svg.appendChild(rect);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '70');
        circle.setAttribute('r', '30');
        circle.setAttribute('fill', 'var(--ctp-mocha-base)');
        svg.appendChild(circle);

        const head = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        head.setAttribute('cx', '100');
        head.setAttribute('cy', '130');
        head.setAttribute('rx', '50');
        head.setAttribute('ry', '45');
        head.setAttribute('fill', 'var(--ctp-mocha-base)');
        svg.appendChild(head);

        return svg;
    }
}
