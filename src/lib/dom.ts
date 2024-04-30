export const $ = <T extends HTMLElement>(
    selector: string,
    context: Document | HTMLElement = document
) => context.querySelector<T>(selector);

export const $$ = <T extends HTMLElement>(
    selector: string,
    context: Document | HTMLElement = document
) => context.querySelectorAll<T>(selector)