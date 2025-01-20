export type Invoice = {
    odbiorca?: Client,
    sprzedawca?: Vendor,
    numerFaktury?: string,
    nrKontaRachunkuBankowego: string,
    dataWystawienia?: string,
    dataSprzedaży?: string,
    razemNetto?: number,
    razemStawka?: number,
    razemPodatek?: number,
    razemBrutto?: number,
    waluta?: string,
    formaPlatnosci?: string,
    produkty?: Product[]
}

export interface Client {
    nazwa?: string,
    nip?: string,
    adres?: string
}

export interface Product {
    nazwaProduktu?: string,
    jednostkaMiary?: string,
    ilosc?: number,
    wartoscNetto?: number,
    stawkaVat?: number,
    podatekVat?: number,
    brutto?: number
}
export interface Vendor {
    nazwa?: string,
    nip?: string,
    adres?: string
}