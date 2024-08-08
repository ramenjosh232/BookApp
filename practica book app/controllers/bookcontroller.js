const { Book, Category, Author, Publisher } = require('../models');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


exports.listBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        { model: Category, as: 'Category' },
        { model: Author, as: 'Author' },
        { model: Publisher, as: 'Publisher' }
      ]
    });
    res.render('maintenance/books', { books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Error fetching books');
  }
};


exports.createBookForm = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const authors = await Author.findAll();
    const publishers = await Publisher.findAll();
    res.render('maintenance/bookNew', { categories, authors, publishers });
  } catch (error) {
    console.error('Error fetching data for book creation:', error);
    res.status(500).send('Error fetching data for book creation');
  }
};


exports.createBook = async (req, res) => {
  try {
    upload.single('cover')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send('Error uploading file');
      }
      
      const { title, year, categoryId, authorId, publisherId } = req.body;
      const cover = req.file ? req.file.filename : 'default-cover.jpg';
      
      const newBook = await Book.create({
        title, year, cover, categoryId, authorId, publisherId
      });
      
      const author = await Author.findByPk(authorId);
      
 
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'joshuafermin6@gmail.com',
          pass: 'aetj suvp gqbl wfyc'
        }
      });
      
      const mailOptions = {
        from: 'joshuafermin6@gmail.com',
        to: author.email,
        subject: 'Nuevo libro publicado',
        text: `Se ha publicado un nuevo libro titulado "${newBook.title}" de tu autoría.`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });
      
      res.redirect('/books');
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).send('Error creating book');
  }
};


exports.editBookForm = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'Category' },
        { model: Author, as: 'Author' },
        { model: Publisher, as: 'Publisher' }
      ]
    });
    const categories = await Category.findAll();
    const authors = await Author.findAll();
    const publishers = await Publisher.findAll();
    
   
    res.render('maintenance/bookEdit', { book, categories, authors, publishers });
  } catch (error) {
    console.error('Error fetching book for edit:', error);
    res.status(500).send('Error fetching book for edit');
  }
};


exports.editBook = async (req, res) => {
  try {
    upload.single('cover')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send('Error uploading file');
      }
      
      const { title, year, categoryId, authorId, publisherId } = req.body;
      const cover = req.file ? req.file.filename : req.body.currentCover;
      
      await Book.update({
        title, year, cover, categoryId, authorId, publisherId
      }, {
        where: { id: req.params.id }
      });
      
      res.redirect('/books');
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('Error updating book');
  }
};


exports.deleteBookConfirm = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.render('maintenance/bookDelete', { book });
  } catch (error) {
    console.error('Error fetching book for delete confirmation:', error);
    res.status(500).send('Error fetching book for delete confirmation');
  }
};


exports.deleteBook = async (req, res) => {
  try {
    await Book.destroy({ where: { id: req.params.id } });
    res.redirect('/books');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('Error deleting book');
  }
};


exports.bookDetail = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'Category' },
        { model: Author, as: 'Author' },
        { model: Publisher, as: 'Publisher' }
      ]
    });
    res.render('bookDetail', { book });
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).send('Error fetching book details');
  }
};
