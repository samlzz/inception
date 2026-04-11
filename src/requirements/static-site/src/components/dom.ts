// DOM utilities

export const html = {
    div: (className?: string, content?: string | HTMLElement[]) =>
        createEl('div', className, content),

    section: (className?: string, content?: string | HTMLElement[]) =>
        createEl('section', className, content),

    article: (className?: string, content?: string | HTMLElement[]) =>
        createEl('article', className, content),

    h1: (text: string, className?: string) =>
        createEl('h1', className, text),

    h2: (text: string, className?: string) =>
        createEl('h2', className, text),

    h3: (text: string, className?: string) =>
        createEl('h3', className, text),

    h4: (text: string, className?: string) =>
        createEl('h4', className, text),

    p: (text: string, className?: string) =>
        createEl('p', className, text),

    span: (text: string, className?: string) =>
        createEl('span', className, text),

    a: (href: string, text: string, className?: string) => {
        const el = createEl('a', className, text) as HTMLAnchorElement;
        el.href = href;
        return el;
    },

    img: (src: string, alt: string, className?: string) => {
        const el = document.createElement('img') as HTMLImageElement;
        el.src = src;
        el.alt = alt;
        if (className)
            el.className = className;
        return el;
    }
};

function createEl(
    tag: string,
    className?: string,
    content?: string | HTMLElement[]
): HTMLElement {
    const el = document.createElement(tag);

    if (className)
        el.className = className;

    if (content) {
        if (typeof content === 'string')
            el.textContent = content;
        else
            content.forEach((child) => el.appendChild(child));
    }

    return el;
}

export const appendChildren = (parent: HTMLElement, ...children: HTMLElement[]) => {
    children.forEach((child) => parent.appendChild(child));
    return parent;
};
