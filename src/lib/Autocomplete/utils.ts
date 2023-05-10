import type { Color } from '../../types/text';

export type Item = {
    index?: number;
    label?: string;
    value?: any;
    group?: string;
    type?: Color | string;
    style?: string;
};

function calcSuggestion(
    predefined: Item[],
    selected: Item[],
    value: string
): Item[] {
    return predefined.filter(
        (p) =>
            stringIndex(p.label, value) >= 0 &&
            !selected.some((s) => s.index === p.index)
    );
}

function calcPrompt(suggested: Item[], value: string, active: number): string {
    return stringIndex(suggested[active]?.label, value) === 0
        ? suggested[active].label
        : '';
}

function stringIndex(item: string, value: string): number {
    const regexp = new RegExp(value, 'i');
    return item?.search(regexp);
}

function stringMatch(item: string, value: string): string {
    const regex = new RegExp(value, 'i');
    return item?.match(regex).join('');
}

function markSuggestion(item: string, value: string): string {
    const match = stringMatch(item, value);
    return item.replace(match, `<mark>${match}</mark>`);
}

function createObject(
    item: string,
    items: string[] | Item[],
    index?: number
): Item {
    return {
        index: index >= 0 ? index : items.length,
        value: item,
        label: `${item || ''}`,
    };
}

function createIndexes(items: Item[]): Item[] {
    return items?.some((item) => !item?.hasOwnProperty('index'))
        ? items.map((item: Item, i) => ({ ...item, index: i }))
        : items;
}

function makeGroups(items: Item[]): any[] | Item {
    if (!items || !items.length) {
        console.warn(`Autocomplete haven't items`);
        return [];
    } else {
        return items.reduce((a, c) => {
            a[c.group] = a[c.group] || [];
            a[c.group]?.push(c);
            return a;
        }, {});
    }
}

export {
    calcSuggestion,
    calcPrompt,
    createObject,
    createIndexes,
    markSuggestion,
    makeGroups,
    stringIndex,
    stringMatch,
};
