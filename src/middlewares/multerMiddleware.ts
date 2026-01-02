import multer from "multer";

//memory
const storage = multer.memoryStorage()

export const upload = multer({storage})