export const required = (requiredField: string) => {
    return `${requiredField} é um campo obrigatório`
}

export const maxLength = (field: string, size: number) => {
    return `${field} pode ter apenas 60 caracteres`
}