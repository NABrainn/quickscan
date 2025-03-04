export type Document = Invoice | Receipt;
export type Invoice = {
    type?: 'invoice',
    numerFaktury?: string,
    nrRachunkuBankowego?: string,
    dataWystawienia?: string,
    dataSprzedaży?: string,
    razemNetto?: number,
    razemRata?: number,
    razemPodatek?: string,
    razemBrutto?: number,
    waluta?: string,
    formaPłatności?: string,
    odbiorca?: Client,
    sprzedawca?: Vendor,
    produkty?: InvoiceProduct[],
    [key: string]: any;
}

export type Receipt = {
    type?: 'receipt',
    dataZakupu?: string,
    nazwaSklepu?: string,
    kwotaCałkowita?: number,
    produkty?: ReceiptProduct[],
    [key: string]: any;
}

export type InvoiceProduct = {
    nazwaProduktu?: string,
    ilość?: number,
    cenaSuma?: number,
    jednostkaMiary?: string,
    wartośćNetto?: number,
    stawkaVAT?: number,
    podatekVAT?: string,
    wartośćBrutto?: number,

}

export type ReceiptProduct = {
    nazwaProduktu?: string,
    ilość?: number,
    cenaSuma?: number
}

export type Client = {
    nazwa?: string,
    nip?: string,
    adres?: string
}

export type Vendor = {
    nazwa?: string,
    nip?: string,
    adres?: string
}

