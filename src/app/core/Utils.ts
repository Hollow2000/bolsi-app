class Util {
    /**
     * 
     * @param amountFormat Monto con cualquier formato
     * @returns Recibe un string con formato y lo devuelve sin formato
     */
    clearNumberFormat(amountFormat: string): number {
        return Number(amountFormat.replace(/[^0-9.]/g, '').trim());
    }

    /**
     * 
     * @param amount Monto trasnformar a formato moneda MXN
     * @returns Recibe un valor string o number y lo devuelve en string con formato moneda MXN
     */
    transformCurrencyFormat(amount: string | number): string {
        if (typeof amount === 'number') {
            return amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
        } else {
            return Number(amount).toLocaleString("es-MX", { style: "currency", currency: "MXN" })
        }
    }

    /**
     * 
     * @param enumObj Objeto tipo Enum del cual contiene el valor
     * @param value Valor del Enum del cual se necesita el Key
     * @returns Retorna el Key de un Enum en especifico.
     */
    getEnumKeyByValue<T extends Record<string, string>>(enumObj: T, value: string): keyof T | undefined {
        return Object.keys(enumObj).find(
            key => enumObj[key as keyof T] === value
        ) as keyof T | undefined;
    }
}

export const Utils = new Util;