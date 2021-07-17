import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user { 
                _id
                username
            }
        }
    }
`;
export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser( username: $username, email: $email, password: $password) {
            token 
            user {
                _id
                username
            }
        }
    }
`;
export const SAVE_BOOK = gql `
    mutation saveBook($bookId: Int!, $author: String,$title: String, $description: String, $image: String, $link: Stirng) {
        saveBook ( bookId: $bookId, author: $author, title: $title, description: $description, image: $image, link: $link) {
            bookCount
            savedBooks {
                bookId
                author
                description
                title
                image
                link
            }
        }
    }
`;
export const REMOVE_BOOK = gql `
    mutation removeBook($bookId: Int!) {
        removeBook (bookId: $bookId) {
            bookCount
            savedBooks {
                bookId
                author
                description
                title
                image
                link
            }
        }
    }
`;