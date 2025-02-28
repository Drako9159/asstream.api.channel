import axios from "axios";

/**
 * Verifica si una URL de video HLS (m3u8) está disponible y es válida.
 * @param url - URL del stream HLS.
 * @returns `true` si la URL es accesible y devuelve un contenido válido, `false` en caso contrario.
 */
export async function isHLSAvailable(url: string): Promise<boolean> {
    try {
        const response = await axios.get(url, {
            timeout: 5000,
            //timeout: 10000,
            headers: { "User-Agent": "Mozilla/5.0" },
        });
        // validate response and is a valid m3u8 file
        return response.status === 200 && response.data.includes("#EXTM3U");
        // validate response
        // console.log(response.status);
        // return response.status === 200;
    } catch (error) {
        console.warn(`Stream no disponible: ${url}`);
        return false;
    }
}


export async function checkHLSAvailability(url: string): Promise<boolean> {
    try {
        const { data } = await axios.get(url, {
            timeout: 5000,
            headers: { "User-Agent": "Mozilla/5.0" },
        });
        return data.includes("#EXTM3U"); // Verifica que es un playlist válido
    } catch {
        return false; // No disponible
    }
}
