/**
 * Carregas as variáveis de ambiente especificadas no arquivo ".env"
 */
import dotenv from 'dotenv';
import {resolve} from 'path';

dotenv.config();
dotenv.config({path: resolve(__dirname, '../.env')});
