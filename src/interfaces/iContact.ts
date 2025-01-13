export interface IContact {
    address: IAddress
    cpf: string
    name: string
    phone: string
    userId: string
}

interface IAddress {
    cep: string
    city: string
    location: ILocation
    neighborhood: string
    number: string
    state: string
    street: string
}

interface ILocation {
    type: string
    coordinates: {
        latitude: string
        longitude: string
    }
}