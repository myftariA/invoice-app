# A.M Invoicing

This is a simple invoicing app, with three main pages : Invoice, Customer and Items. The goal is to generate invoices, as it can be
seen by the name of the app. It also has a login page for user authentiaction. 


# Getting Started 

First you will need to clone the repository locally, and run 'npm run dev' to initialte the project. 
You will then be presented with the login page and the user is : Username: 'armando', Password: 'armando'.
After the login you will be redirected to the invoices page. The template is simple and clean, on the top is a header containing a 
'logo', and two buttons, one for toggling the Dark and Light mode, and the other for logging out. On the left it has a sidebar 
that contains all the app menus, in wich you can navigate. The interface is easy to understand as the buttons contain the name
of the action you will take. Also on the top left the logo becomes the page title you are in. 


# App Pages Guide
--- Invoice Page ---

To generate an invoice you have to take this steps: 
1. Put an invoice number
2. Search and select a customer from the combox, or create one directly from the button provided in the combobox, it will then be selected
automatically. Then the other customer data will be autofilled. 
3. Fill the invoice line table with items that can be selected when clicking the 'New Item' button, which presents you with a combobox you
can select from. You can modify the quantity and the percent discount from the row if needed. If you select an item that is already on the 
table, instead of adding a new row, it will update the quantity of the existing row, so no duplicates happen.
4. Fill the Notes text area with invoice notes.
5. Click Generate button to generate the invoice.

--- Customers Page ---
First this page presents you with a list of existing customers. You can:
1. Create a new customer. Click the 'Add Customer' button and you will be presented with a dialog to fill the customer form.
2. Edit a customer when clicking the Pencil Icon on the respective customer row. You will be presented with the same dialog where 
the form fields will be autofilled with the current row data.
3. Delete a customer when clicking the Trash Icon on the respective row. You will be presented with an alert box to confirm you action.

--- Items Page ---
First this page presents you with a list of existing items. You can:
1. Create a new item. Click the 'Add Item' button and you will be presented with a dialog to fill the item form.
2. Edit a item when clicking the Pencil Icon on the respective item row. You will be presented with the same dialog where 
the form fields will be autofilled with the current row data.
3. Delete an item when clicking the Trash Icon on the respective row. You will be presented with an alert box to confirm you action.


# React + TypeScript + Vite (Tailwind + ShadCn)

The app is build on top of Vite + React with a Typescript template for strong type checking and Tailwind css as the styling 
library of choice. This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules, and is know for
being a lot more faster than the normal 'Create React App'. For the styling I choose Tailwind, since it has a lot of utility classes,
and since I wanted the template to have dark mode also, it makes it pretty easy. Also I wanted to mention that most of the components 
used in the projects are from a well known headless UI library called ShadCn, that comes with a ton of preset component that are supported
by Tailwind also, to have proper responsiveness and seamless interaction. 

In the project are used the most common practices for React and Typescript, to maximize the performace of the page and the compile runtime,
wich is already very fast with Vite environement.