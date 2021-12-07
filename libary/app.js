const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json())

const connect = () => {
  try {
    return mongoose.connect("mongodb://127.0.0.1:27017/Library")
  }
  catch (e) {
    console.log(e.message);
  }
}

const sectionSchema = new mongoose.Schema(
  {
    section_name: { type: String, required: true },
  }
);

const Section = mongoose.model("section", sectionSchema)
const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: false },
    gender: { type: String, required: false, default: "Male" }
  }
);
const Author = mongoose.model("author", authorSchema)
const bookSchema = new mongoose.Schema(
  {
    book_name: { type: String, required: true },
    author_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true
    },
    ],
    body: { type: String, require: true },
    section_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true
    }
  }
)
const Book = mongoose.model("book", bookSchema)

const checkOutSchema = new mongoose.Schema({

  Book_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
    required: true
  },
  inUse: {
    type: Boolean,
    required: true
  }
})
const checkOut = mongoose.model("check", checkOutSchema);

//books
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
app.get("/books", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//authors
app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);

    return res.status(201).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();

    return res.status(201).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//get all Books Written by an author.
app.get("/authors/:authorId", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();
    let newBooks = [];
    books.forEach(book => {
      book.author_id.forEach(author => {
        if (author == req.params.authorId) {
          newBooks.push(book)
        }
      })
    })
    return res.status(201).send(newBooks);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//checkOut
app.post("/checks", async (req, res) => {
  try {
    const check = await checkOut.create(req.body);

    return res.status(201).send(check);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
app.get("/checks/books", async (req, res) => {
  try {
    const booksInUse = await checkOut.find({ inUse: true }).lean().exec();

    return res.status(201).send(booksInUse);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


//section
app.post("/sections", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(201).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
app.get("/sections", async (req, res) => {
  try {
    const sections = await Section.find().lean().exec();

    return res.status(201).send(sections);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
//Api to find all books in a particular section 
app.get("/sections/:sectionId", async (req, res) => {
  try {
    const booksInSection = await Book.find({ _section_id: req.params.sectionId }).lean().exec();

    return res.status(201).send(booksInSection);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//Api for Books Available in a Particular section
app.get("/sections/uncheked/:sectionId", async (req, res) => {
  try {
    const booksInSection = await Book.find({ _section_id: req.params.sectionId }).lean().exec();
    const booksInUse = await checkOut.find({ inUse: true }).lean().exec();
    let booksNotAv = {};
    let newBooks = [];
    let i = 0;
    booksInUse.forEach(book => {
      booksNotAv[book.Book_id] = 1
    })
    booksInSection.forEach(book => {
      if (booksNotAv[book._id] == undefined) {
        newBooks.push(book)
      }
    })

    return res.status(201).send(newBooks);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

//One Book inside a section of one author
app.get("/:sectionId/:authorId", async (req, res) => {
  try {
    const booksInSection = await Book.find({ _section_id: req.params.sectionId }).lean().exec();
    let newBooks = []
    booksInSection.forEach(book => {
      book.author_id.forEach(author => {
        if (author == req.params.authorId && newBooks.length < 1) {
          newBooks.push(book)
        }
      })
    })
    return res.status(201).send(newBooks);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.listen(2345, async function () {
  await connect();
  console.log("listing on port 2345")
})