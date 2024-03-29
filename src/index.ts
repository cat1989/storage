export const useStorage = (namespace: string) => {
    const storage = localStorage
    const getValues = () => {
        const values = storage.getItem(namespace)
        return values ? JSON.parse(values) as Record<string, any> : {}
    }
    const setValues = (values: any) => {
        storage.setItem(namespace, JSON.stringify(values))
    }
    const get = (key: string) => {
        const values = getValues()
        if (Object.hasOwnProperty(key)) {
            const {
                value,
                expires,
            } = values[key]
            if (expires === 0 || expires > new Date().getTime()) {
                return value
            }
        }
        return null
    }
    const set = (key: string, value: any, expires = 0) => {
        const values = getValues()
        values[key] = {
            value,
            expires,
        }
        setValues(values)
    }
    const remove = (key: string) => {
        const values = getValues()
        if (values[key]) {
            delete values[key]
        }
        setValues(values)
    }
    const clear = () => {
        setValues({})
    }
    clear()
    return Object.freeze({
        get,
        set,
        remove,
        clear,
    })
}
