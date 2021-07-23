const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLString,    
    GraphQLID,
    GraphQLInt    
} = graphql;
const _ = require("lodash");
const Book = require("../models/book.js");
const Author = require("../models/author.js");

//dummy data
// var books = [
//     {name: "Name of the wind", genre: "fantasy", id:"1", authorId:"3"},
//     {name: "The final Empire", genre: "thriller", id:"2", authorId:"1"},
//     {name: "The Long Earth", genre: "sci-fi", id:"3", authorId:"2"},
//     {name: "Tomorrow Day", genre: "fiction", id:"4", authorId:"3"},
//     {name: "Rich Dad Poor Dad", genre: "business", id:"5", authorId:"3"},
//     {name: "Think like a monk", genre: "spritual", id:"6", authorId:"2"}
// ]
// var authors = [
//     {name: "Author A", age: 44, id:"1"},
//     {name: "Author B", age: 45, id:"2"},
//     {name: "Author C", age: 46, id:"3"}
// ]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent, args){
               // return _.find(authors,{id:parent.authorId})
               return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
               // return _.filter(books,{authorId:parent.id});
               return Book.find({authorId:parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({

    name: "RootQueryType",
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db || other sources
                // return _.find(books, {id: args.id});
                return Book.findById(args.id)
            }            
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
                return Book.find({})
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db || other sources
                // return _.find(authors, {id: args.id});
                return Author.findById(args.id)
            }            
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;
                return Author.find({})
            }
        },        
    },
});


//save author to mongoDB
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){

                let author = new Author({
                    name: args.name,
                    age: args.age
                });

                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type:GraphQLString},
                genre: {type:GraphQLString},
                authorId: {type:GraphQLID},
            },
            resolve(parent, args){

                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save()
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})