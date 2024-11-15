export function saveToLocalStorage(name: string, value: any) {
        localStorage.setItem(`${name}`, JSON.stringify(value));
}

export function getFromLocalStorage(name: string) {
        const storedValue = localStorage.getItem(`${name}`);
        return storedValue ? JSON.parse(storedValue) : [];
}