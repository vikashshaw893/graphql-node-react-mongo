# graphql-node-react-mongo
simple graphql node js react js mongo db practice project

Youtube link https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f


------------- graphiql--------
add new author>>>>>>
  
  mutation{
    addAuthor(name:"AuthorName", age:50){
      name
      age
    }
  }



add new book>>>>>>

mutation{
    addBook(name:"BookName", genre:"String Value", authorId:"AuthorMongodb ID"){
      name
      genre
      id
    }
  }
  
  
  
get single book detail>>>>>>>>>>>>>
  
{
  book(id:"mongodbBookId")
  {
    name
    id
    genre
    author{
      name
      id
      age
    }
  }
}



get all books detail>>>>>>>>>>>>>
  
{
  books
  {
    name
    id
    genre
    author{
      name
      id
      age
    }
  }
}




get single author detail>>>>>>>>>>>

{
  author(id:"mongodbAuthorId")
  {
    name
    id
    books{
      name
      id
      genre
    }
  }
}



get all authors detail>>>>>>>>>>>>>>

{
  authors
  {
    name
    id
    books{
      name
      id
      genre
    }
  }
}



