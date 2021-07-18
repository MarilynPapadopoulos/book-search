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
    mutation saveBook($bookId: String!, $author: String,$title: String, $description: String, $image: String, $link: String) {
        saveBook ( bookId: $bookId, author: $author, title: $title, description: $description, image: $image, link: $link) {
            _id
            username
            email
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
    mutation removeBook($bookId: String!) {
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
