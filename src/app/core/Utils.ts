class Util {
    /**
     * 
     * @param amountFormat Monto con formato de moneda
     * @returns Reibe un string con formato y lo devuelve sin formato
     */
    clearNumberFormat(amountFormat: string) {
        return Number(amountFormat.replace(/[^0-9.]/g, '').trim());
    }
}

export const Utils = new Util;