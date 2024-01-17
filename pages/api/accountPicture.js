import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path'
import getAccount from '../../database/actions/getAccount';
import fs from 'fs'

const exts = ['png', 'jpg', 'jpeg']
//ENDRES FILTYPER MÅ ACCOUNTCARD OGSÅ ENDRES
const folder ='./public/accountPictures'

const upload = multer({
  storage: multer.diskStorage({
    destination: folder,
    filename: async (req, file, cb) => {
      const account = await getAccount(req.cookies.code_jwt)
      cb(null, account._id.toString() + path.extname(file.originalname))
    },
  }),
  fileFilter: async (req, file, cb) => {
    if (exts.some(ext => file.mimetype == 'image/'+ext)) {
      const account = await getAccount(req.cookies.code_jwt)
      exts.forEach(ext => {
        try {
          fs.unlinkSync(`${folder}/${account._id.toString() + '.' + ext}`)
        } catch {

        }
      })
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(406).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Bad request` });
  },
});

apiRoute.use(upload.array('picture'));

apiRoute.patch((req, res) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};