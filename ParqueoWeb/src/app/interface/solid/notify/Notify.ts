export interface Notify {
    active?: boolean;
    type?: string;  // 'error', 'success', 'warning'
    title?: string;
    message?: string;
}

export function getNotify(active: boolean, type: string, title: string, message: string): Notify {
    var notify: Notify = {
        active: active,
        type: type,
        title: title,
        message: message
    }
    return notify;
}
