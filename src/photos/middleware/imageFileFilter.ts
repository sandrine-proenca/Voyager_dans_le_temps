/**
 * fonction middleware imageFileFilter qui vérifie si le type de fichier est une image. Si la réponse est vrai, elle sera téléchargée.
 */
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };