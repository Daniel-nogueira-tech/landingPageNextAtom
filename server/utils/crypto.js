import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();


const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY;

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

const decrypt = (encryptedText) => {
    // Verifica se a chave secreta é válida (64 caracteres hexadecimais para AES-256)
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!secretKey || secretKey.length !== 64 || !hexRegex.test(secretKey)) {
        throw new Error('Chave secreta inválida');
    }

    // Divide o texto cifrado e valida o formato
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
        throw new Error('Formato inválido do texto cifrado. Esperado: iv:encrypted');
    }

    const ivHex = parts[0];
    const encryptedHex = parts[1];

    // Verifica se IV e texto cifrado são hexadecimais válidos
    if (!hexRegex.test(ivHex) || !hexRegex.test(encryptedHex)) {
        throw new Error('IV ou texto cifrado contém caracteres inválidos');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = encryptedHex;
    const key = Buffer.from(secretKey, 'hex');
    const algorithm = 'aes-256-cbc'; // Define explicitamente o algoritmo

    // Descriptografia com tratamento de erros
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        throw new Error('Erro ao descriptografar: ' + error.message);
    }
};
export { encrypt, decrypt };