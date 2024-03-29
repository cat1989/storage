const isObject = (obj: any) => Object.prototype.toString.call(obj) == "[object Object]"
const parseJSON = (value: any) => {
    try {
        const obj = JSON.parse(value)
        if (isObject(obj)) {
            return obj
        }
    }
    catch { }
    return {}
}

export const useStorage = (namespace: string) => {
    const storage = localStorage
    const getValues = () => {
        const values = storage.getItem(namespace)
        return values ? parseJSON(values) : {}
    }
    const setValues = (values: any) => {
        storage.setItem(namespace, JSON.stringify(values))
    }
    const remove = (key: string) => {
        const values = getValues()
        if (values.hasOwnProperty(key)) {
            delete values[key]
        }
        setValues(values)
    }
    const clear = () => {
        setValues({})
    }
    const get = (key: string) => {
        const values = getValues()
        if (values.hasOwnProperty(key)) {
            const {
                value,
                expire,
            } = values[key]
            if (expire === 0 || expire > new Date().getTime()) {
                return value
            }
            else {
                remove(key)
            }
        }
        return null
    }
    const set = (key: string, value: any, expire = 0) => {
        const values = getValues()
        values[key] = {
            value,
            expire,
        }
        setValues(values)
    }
    setValues(getValues())
    return Object.freeze({
        get,
        set,
        remove,
        clear,
    })
}
