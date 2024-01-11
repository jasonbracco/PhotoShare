# Overview
Photo Share is an ecommerce site designed to let users browse, buy, and sell different works of photography.  A user does not need to be selling artwork in order to browse the listings, however you have to be an authorized user to access the website.

# Running Locally

Node Version: 16.x - use nvm to change to this version of node.
Bundler Version 2.2.24
Ruby Version: 2.7.4

Database: PostgreSQL
 *Create a .env file at the root directory with the database username and password.  Customize the port and host in the config/database.yml file.

To run the backend of this application, run the following commands in a terminal: 
bundle install
rails:db create (creates database in postgreSQL)
rails:db migrate (creates database schema)
rails s (starts rails server)

* There has been a known issue MAC OS and some Ruby Gems.  If you receive an error: 

"objc[23741]: +[__NSCFConstantString initialize] may have been in progress in another thread when fork() was called"

You can run OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES rails s *

To run the frontend of this application, run the following commands in a separate terminal: 
npm install --prefix client
npm start --prefix client 

# Features and How to Use

Users can sign up on the landing page, and must enter in the required information and upload a profile picture.  Once inside, you can edit any information about yourself in the Profile tab EXCEPT your picture.  On the Profile page, you can also list work for sale, and see/edit/delete all of your listings.

In the Shop tab, you can see every item that is listed for sale, as well as view some more information about that item.  You can also add any item to your cart.

In the Photographers tab, you can see who is selling photographs, and see more info about each photographer.

Once you have items in your cart, you can checkout and enter in your payment inforamtion (none of it is stored, merely there for show).

When you have completed your order, you can navigate to the Orders tab to see what you have ordered, and review those items.

Logout using the Logout button, and that's it!

# Technologies

React
Ruby on Rails
Amazon S3
Semantic UI
