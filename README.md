# POKEMON BATTLE FRONTIER

## INTRODUCTION
https://pokemonbattlefrontier.netlify.app/

Welcome to Pokemon Battle Frontier!

This is a tool for creating and conceptualizing builds for the popular video game series *Pokemon.* Users can select all 807 Pokemon species available as of Generation VII, and view their type strengths and weaknesses, base stats, available abilities, and available moves. They can then begin to plan out their own competitive or in-game teams by choosing their Pokemon's name, nature, ability, and moveset.

Pokemon Battle Frontier was built entirely by Anna Reed during her education at the Flatiron School.

[Video Demo](https://www.youtube.com/watch?v=NWO0fKcTcqY)

[Frontend](https://github.com/reedanna/pokemonbattlefrontier-frontend) | [Backend](https://github.com/reedanna/pokemonbattlefrontier-backend)

[Click here for more information on Pokemon!](https://en.wikipedia.org/wiki/Pok%C3%A9mon_(video_game_series))

## USE INSTRUCTIONS

- You will begin on the Log-in/Sign-Up page. Enter your existing credentials if you already have an account, otherwise create one to access the app.

    ![/demo_gifs/login-gif.gif](/demo_gifs/login-gif.gif)

- Clicking "New Pokemon" will take you to a list of Pokemon species. By default, the page loads all 809 Generation 7 Pokemon. To narrow down the list, use the search bar on the right of the window to filter by name or type, then click on the Pokemon you want to add to your party.

    ![/demo_gifs/new-pokemon-gif.gif](/demo_gifs/new-pokemon-gif.gif)

- Clicking "My Pokemon" will return a list of your selected Pokemon. You can click on one to begin editing it.

    ![/demo_gifs/edit-pokemon-gif.gif](/demo_gifs/edit-pokemon-gif.gif)

-  Your Pokemon's name can be edited from the textbox above the Pokemon's picture. This has no effect on battle ability, but it's a fun way to distinguish your Pokemon from each other!

    ![/demo_gifs/edit-name-gif.gif](/demo_gifs/edit-name-gif.gif)

- Below your Pokemon's type chart is a bar graph illustrating its base stats--HP, Attack, Defense, Special Attack, Special Defense, and Speed. Stats can be increased or decreased up to 10% based on a Pokemon's nature. Your Pokemon's nature (and by extension, its stats) can be edited using the dropdown to the right of the Pokemon's base stats.

    ![/demo_gifs/edit-nature-gif.gif](/demo_gifs/edit-nature-gif.gif)

- Your Pokemon's ability can be edited using the dropdown under its stats and nature. Each Pokemon species has from 1 to 3 choosable abilities. A description of the effect of your selected nature will display to the right of the dropdown.

    ![/demo_gifs/edit-ability-gif.gif](/demo_gifs/edit-ability-gif.gif)

- Your Pokemon's 4 moves can be edited using the dropdowns below its ability. Available moves are determined by Pokemon species. A description of the effect of your selected move will display to the right of the dropdown. Below it, you can view the type of the move, its damage type (Physical moves operate off of your Pokemon's Attack and your opponent's Defense, whereas Special moves operate off of your Pokemon's Special Attack and your opponent's Special Defense. Status moves do no direct damage), and, if applicable, its BP--a measure of how much damage the move will do. To the right of that, you can view a type chart displaying the move's effectiveness against different types of Pokemon. 

    ![/demo_gifs/edit-moves-gif.gif](/demo_gifs/edit-moves-gif.gif)

- Save changes made to your Pokemon with the "Save Pokemon" button on the bottom of the page.

    ![/demo_gifs/save-pokemon-gif.gif](/demo_gifs/save-pokemon-gif.gif)

- To delete a Pokemon from your list, click the "Delete" button on the top of the edit page and then click the pop-up that appears to confirm.

    ![/demo_gifs/delete-pokemon-gif.gif](/demo_gifs/delete-pokemon-gif.gif)

- To log out of the app, click the "Logout" button on the menu at the top of the page.

    ![/demo_gifs/logout-gif.gif](/demo_gifs/logout-gif.gif)

## TECH STACK
Backend:
- Ruby on Rails
- ActiveRecord
- PostgreSQL
- Bcrypt
- JWT
- PokeAPI

Frontend:
- Javascript
- React.js
- React Router
- Semantic UI React
- React-cookies


## FUTURE DEVELOPMENT GOALS
- Calculate STAB (same-type attack bonus) on moves
- Implement held items
- Add alternate Pokemon forms (e.g. Alolan forms) to species list
- Color-code type names