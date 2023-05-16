import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class EncodeAESService {

   /* Encrypt using Aes **/
    encryptData(msg) {
        var keySize = 256;
        var salt = CryptoJS.lib.WordArray.random(16);
        var key = CryptoJS.PBKDF2(environment.encryption.key, salt, {
            keySize: keySize / 32,
            iterations: 100
        });
        var iv = CryptoJS.lib.WordArray.random(128 / 8);
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(msg), key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
        return result;
    }


    /** Decrypt using AES */
    decrypt(ciphertextB64) {  
                           
        var key = CryptoJS.enc.Utf8.parse(environment.encryption.key);                             
        var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);  
     
        var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, {iv: iv}); 
      return decrypted.toString(CryptoJS.enc.Utf8);                       
    }
}