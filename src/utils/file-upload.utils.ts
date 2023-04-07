import { extname } from "path";




/**
 * Here I create a middleware function which checks if the file type is an image. If so it returns true and the image will be uploaded and if not you throw an error and return false for the callback.
 * 
 * (Ici, je crée une fonction middleware qui vérifie si le type de fichier est une image. Si c'est le cas, il renvoie true et l'image sera téléchargée et sinon vous lancez une erreur et renvoyez false pour le rappel.)
 */
export const imageFileFilter = (req, file, callback) =>
{
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
    {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};



/**
 * The editFileName function has the same structure but creates a custom filename using the original name, the file extension and four random numbers.
 * 
 * (La fonction editFileName a la même structure mais crée un nom de fichier personnalisé en utilisant le nom d'origine, l'extension de fichier et quatre nombres aléatoires.)
 */
export const editFileName = (req, file, callback) =>
{
    const name = file.originalname.split('.')[ 0 ];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
