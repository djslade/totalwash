# Totalwash 

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

<!-- TODO: Add a screenshot of the live project.
    1. Link to a 'live demo.'
    2. Describe your overall experience in a couple of sentences.
    3. List a few specific technical things that you learned or improved on.
    4. Share any other tips or guidance for others attempting this or something similar.
 -->
![Totalwash catalog screenshot](./screenshots/totalwash-catalog.png?raw=true)
[Live demo.](https://totalwash.vercel.app/)

Totalwash is a full stack ecommerce app that utilises Nextjs 13's new app router. I set out to build a full stack website for a reasonable but uninteresting business venture, and after some research settled on bathroom furnishings. This app is a showcase of my ever-growing abilities as a full stack developer, and demonstrates server-side pagination, REST API structuring, third-party API integration, text index creation in MongoDB, and many other skills. 

Working with Nextjs 13 was an invaluable experience. As of writing this, the app router has only recently been marked as a stable feature of Nextjs and there are a number of features present in the pages router that are either absent from the app router or not working as intended. As a result, I feel that I have gotten better at troubleshooting problems and adapting to the unexpected.

For any new developer looking to create an app like this, keep in mind that an ecommerce app revolves around creating, updating and deleting shopping carts. Because of that, it would be a good idea to plan your API around your shopping cart's lifecycle before thinking about what role products, categories and user accounts have. Furthermore, while NextJS 13 is a great framework already, it might be a good idea to build your app using tools that are already well established, tested and documented. Overall, spending a little more time planning things out will help a lot in the long run. 

### Built With

<!-- TODO: List any MAJOR libraries/frameworks (e.g. React, Tailwind) with links to their homepages. -->
- [NextJS](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- [Stripe](https://stripe.com)

## Features

<!-- TODO: List what specific 'user problems' that this application solves. -->
- Modern site design
- Intuitive navigation 
- Effective and simple pagination 
- Responsive layouts with beautifully animated sidebars and modals
- Custom 404 error page
- Stripe integration for secure payments

## Contact

- [Linkedin](https://www.linkedin.com/in/david-slade-b0a90618a/)
- [My Portfolio](https://davidslade.dev/)

## Acknowledgements

<!-- TODO: List any blog posts, tutorials or plugins that you may have used to complete the project. Only list those that had a significant impact. Obviously, we all 'Google' stuff while working on our things, but maybe something in particular stood out as a 'major contributor' to your skill set for this project. -->
- The layout, design choices and product catalogue were sourced in part from [Big Bathroom Shop](https://www.bigbathroomshop.co.uk/)