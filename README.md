# Snooker Counter

Snooker Counter is a website to aid snooker players help keep the the score during a live game of snooker. each Player can enter there names and the number of frames they would like to play. Snooker counter will keep track the player score based on the input they give it. It will then display satatics from the games player.

<a href="https://deandodds.github.io/MilestoneProject2/">View live webite......

![Mock up of website](/assets/screenshots/mockup.png)
</a>

# Table of contents

1. [User Experience (UX)](#user-experience)
    * [User Stories](#user-stories)
    * [Design](#design)
    * [Wireframes](#wireframes)
2. [Features](#features)   
    * [Future Features](#future-features)  
3. [Technologies Used](#technologies)
    * [Langagues Used](#langagues)
    * [Frameworks, Libraries and Programs used](#frameworks)
4. [Deployment](#deployment)
    * [Github pages](#pages)
    * [Making a local clone](#clone)
    * [Forking the GitHub Repository](#fork)
5. [Testing](#testing) 
    * [Validation ](#validation)
    * [Lighthouse](#lighthouse)
    * [Bugs](#bugs)
    * [Known bugs](#known-bugs)
6. [Credis](#credits)
    * [images](#images)
    * [Code](#code)
    * [Sound](#sounds)
7. [Acknowledgements](#acknowledgements)

-----
# 1. User Experience (UX) <a id="user-experience"></a>

## User Stories <a id="user-stories"></a>

### First Time Visitor Goals
* As a first time visitor, I want to be able to understand the main purpose of the website.
* As a first time visitor, i want easily navigate through the website. 
* As a first time visitor, i want the website to allow me to easily track the score of my snooker game. 
* As a first time visitor, i want to beable to see instuctions on how to use the webpage if i need them.


### Returning Visitor Goalsand 
* As a returning visitor, I want to beable to start a new game and all my previous games statisics to have been reset 
* As a returning visitor, I want to beable to keep in touch with the creator for updates to the website 


### Website Creator goals
* As a website creator, I want to create a website that works on all platforms.
* As a website creator, I want to create a good user experience by having a clear navigation system.
* As a website creator, I want my website load times to be low. I do not want users leaving the site before it has time to load.
* As a website creator, I want my website to be as accesible as possible in order to be inclusive to all potenial users.



## Design <a id="design"></a>

### Typography
- Montserrat is the main font used for my logo with a sans serif fallback.
- Roboto is the main font used for all headers with a sans serif fallback.
- Raleway is the font used for the main text area of the web appliction with a sans serif fallback. This to complimentS the Roboto font nicely.

### Colour theme
- The color pallet for the webpage is influenced by the color of the snooker balls 

![Color palette 1 ](/assets/screenshots/colorpaletteone.png)
![Color palette 2 ](/assets/screenshots/colorpalettetwo.png)

### Imagary 
- 1 x Background image - image of a snooker table cloth.
- 1 x favicon 

## Wireframes <a id="wireframes"></a>

The wireframes forthe website were created on drawio there will only be one html page that will be minipulated by javscript to change the display.

There is a desktop and mobile wireframe for this website

- Start up wireframe - [View](/wireframes/homepage.jpg)
- Settings wireframe - [View](/wireframes/wireframesetuppage.jpg)
- Red ball wireframe - [View](/wireframes/wireframeonred.jpg)
- Red ball mobile wireframe - [View](/wireframes/rredballwireframepng.png)
- Colour ball wireframe - [View](/wireframes/wireframeoncolor.jpg)
- colur ball mobile wireframe [View](/wireframes/colorBallwireframe.drawio.png)
- End game wireframe - [View](/wireframes/wireframescores.jpg)

-----
# 2. Features <a id="features"></a>

### Responsiveness
* Responsiveness on all device sizes.
![mobile screenshot](/assets/screenshots/mobilescreenshot.jpeg)
![desktop version](/assets/screenshots/chromescrenshot.png)

### Header
* All pages have the logo and mute button at the top of each page. 
![header screenshot](/assets/screenshots/headerscreenshot.png)

### Footer 
* footer that displays while the game is not being played. This will contains links to developer social media. 
![footer screenshot](/assets/screenshots/footer.png)

### Start page
* Start page with two buttons one to navigate through the website and another to display a modal containing instructions on how to use the website.
![instructions modal](/assets/screenshots/titlepage.png)

### Settings page
* Settings page for users to input the settings to the game.
![settings page screenshot](/assets/screenshots/settingspagescreenshot.png)

### End Page
* End page to display game status such as:
    - Player names and who the overall winner is
    - plaers best snooker break 
    - the amount of fouls won by each player
    - number of frames each player wins 
![End game display](/assets/screenshots/restartbutton.png)


### Changing displays
- Website to chanage display depending on the stage of the snooker game.
![Screenshot of button](/assets/screenshots/changeone.png)
       ![Screenshot of modal](/assets/screenshots/changetwo.png)
       
### Track frames 
- website to track the number of frames players win and end the game once a player wins the majority of frames.
![frames counter](/assets/screenshots/frames.png)

### Track remaining points and differnce between scores
- Website to track the remaining points between each player and the score difference between each player.
![remaining poits](/assets/screenshots/trackpointsscreenshots.png)

### Freeball modal
- A modal allowing players to input points froma freeball
![freeball modal](/assets/screenshots/freeballmodal.png)

### Foul Modal
- A modal to allow players to add fouls to the score
![foul modal](/assets/screenshots/foulmodal.png)

## Future features<a id="future-features"></a>

### Track frame times 
* Website to time each frame for users and display the results at the end.  

-----
# 3. Technologies Used <a id="technologies"></a>

## Langagues Used <a id="langagues"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics">HTML5</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a>
* <a href="https://www.javascript.com/">JavaScript</a>

## Frameworks, Libraries and Programs used <a id="frameworks"></a>

- <a href="https://getbootstrap.com/">Bootstrap 5:</a>
      Used for responsiveness and styling of the website.
- <a href="https://fontawesome.com/">Font Awesome:</a>
      Used to import icons that used across every page of the website.
- <a href="https://fonts.google.com/">Google Fonts:</a> 
     Used to import Montserrat and Lora fonts.
- <a href="https://www.adobe.com/uk/creativecloud/renew/resubscribe-cci.html?mv=search&mv=search&sdid=NYTLQZ47&ef_id=CjwKCAiAl-6PBhBCEiwAc2GOVBVVZWAM7BSlwfKAnfOwXnRkvfkZi8jooQjOrIjBJtMIUCE3M9zzIBoCbTEQAvD_BwE:G:s&s_kwcid=AL!3085!3!436521415410!e!!g!!photoshop!10105625998!106997352408&gclid=CjwKCAiAl-6PBhBCEiwAc2GOVBVVZWAM7BSlwfKAnfOwXnRkvfkZi8jooQjOrIjBJtMIUCE3M9zzIBoCbTEQAvD_BwE">Photoshop:</a> 
    Used to create logo and resize images. 
- <a href="https://jquery.com/">JQuery:</a>
    Used with both Boostrap 5.
- <a href="https://gitpod.io/">Gitpod: </a>
    Git was used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.
- <a href="https://github.com/">GitHub:</a>
    Used to store the projects code once pushed from Gitpot.
- <a href="https://app.diagrams.net/">Drawio.net:</a>
    Used to create all wireframes.

-----
# 4. Deployment <a id="deployment"></a>

## Github pages <a id=pages></a>

I Deployed my project to Github pages using the following steps:

1. I logged in to Github and located [repositories](https://github.com/DeanDodds/MilestoneProject2)
2. I then clicked on settings, this was located just above the green GitPod button.
3. I scrolled down through the settings menu and clicked on the pages section
4. from there, I  went to the source section and under the dropdown menu labeled none I selcted the new-main 
5. I clicked save 
6. after a few minutes the site was live and the link to the published website was generated [link](https://deandodds.github.io/MilestoneProject2/)

## Making a local clone <A id="clone"></a>

You can clone a Github repository to your local computer by following these steps:

1. On GitHub.com, navigate the repository page
2. above the list of files, click on the Code dropdown menu
3. select the download zip file 
4. once the files have downloaded you can extract them form the zip file and run them on your local environment 

You can see more information on making local clones [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop)

## Forking the GitHub Repository <a id="fork"></a>

Forking a Github repositary allows you to make a copy that you can work on without effecting the original repository. You can fork a repository by:

1. On GitHub.com, navigate the repository page of the repository you would like to fork
2. on the top right hand side of the page locate click fork button 
3. the copy of this resository should now be in your own repositories

------
# 5. Testing <a id="testing"></a>


## Validation <a id="validation"></a>

I used the W3C Markup and CSS Validator Service to ensure there was no syntax errors throughout my webpage.


## W3C Mark up Validator

Index.html - <a href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fdeandodds.github.io%2FMilestoneProject2%2F">View</a>


## W3C CSS Validator

<a href="https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fdeandodds.github.io%2FMilestoneProject2%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en">View</a>


## JShint javaScript Validator

My JavaScript code was validated by <a href="https://jshint.com/">jshint.com</a> and contains no major errors.

## LightHouse Testing <a id="lighthouse"></a>

I have tested through google dev tools lighthouse analysis which are scored on: 
* Performance 
* Accesibility 
* Best Practices 
* Search Engine Optimization (SEO)

![light house test screen shot](/assets/screenshots/lighthousescreenshot.png)

## Testing User Stories from User Experience (UX) Section <a id="user"></a>

   * ### First Time Visitor Goals
      1. As a first time visitor, I want to be able to understand the main purpose of the website.
       - When entering the webpage there is a page title with an explaintion of the main purpose of the website
       ![Screenhot of page title](/assets/screenshots/titlepage.png)

      2. As a first time visitor, i want easily navigate through the website. 
        - The webpage has clear navigation buttons and the will automatically change when buttons are clicked to limit user choice to only the relevant buttons
        ![Screenhot of red ball button](/assets/screenshots/navigationbuttons.png)
        ![Screenhot of coloured ball buttons](/assets/screenshots/colornavigationbuttons.png)

      3.  s a first time visitor, i want the website to allow me to easily track the score of my snooker game.
       -  the webpage clearly displays 
       * player scores
       * player names 
       * number of frames 
       * frames players have won
       ![Screenshot of scoreboard](/assets/screenshots/scoreboardscreenshots.png)

       4.As a first time visitor, i want to beable to see instuctions on how to use the webpage if i need them.
       - There is a claer button to instruction displayed on a modal.
       ![Screenshot of button](/assets/screenshots/instructionbutton.png)
       ![Screenshot of modal](/assets/screenshots/instructionsmodal.png)

 * ### Returning Visitor Goals
      1. As a returning visitor, I want to beable to start a new game and all my previous games statisics to have been reset 
      - At the end of each game there is a reset button the resets the page.
      - The page does not remaber previous information.
      ![Screenshot of reset button](/assets/screenshots/restartbutton.png)

      2. As a returning visitor, I want to beable to keep in touch with the creator for updates to the website
       - There are clear links to social media of the delevoper in the footer of the webpage.
        ![Screenshot of reset button](/assets/screenshots/footer.png)

 * ### Website Creator goals
      1. As a website creator, I want to create a website that works on all platforms.
      - Website runs on all devices tested.

      2. As a website creator, I want to create a good user experience by having a clear navigation system.
      - Navigation system worked well during user testing. 

      3. As a website creator, I want my website load times to be low. I do not want users leaving the site before it has time to load.
      - webpage has a 96% performace rating during lighthouse testing 

      4. As a website creator, I want my website to be as accesible as possible.
      - Webpages all pass lighthouse accesibility testing.

I have tested my project on a variety of browsers such as:
  ### Google Chrome 

  ![Screen shot of Google Chrome](/assets/screenshots/chromescrenshot.png)


  ### Firefox 
  ![Screen shot of Firefox Browser ](/assets/screenshots/firefoxscreenshot.png)


  ### Safari

  ![Screen shot of Safari](/assets/screenshots/safariscreenshot.png)
  
  
I have also tested it on a range of devices such as:
  * Iphone 12
  * samsung s21
  * Apple mac Laptop 
  * Windows Desktop
  * Huawei T10 tablet

I have used the Chrome developer tools to test responsiveness on different device simulations 

I have used my website to score my snooker games and fixed any bugs that occured i also asked my friends to use it during there games and report any problems  

## Bugs<id href="bugs">

### bugs found and fixed
- background image does not load on the live website - fix found on Stackoverflow<a href="https://stackoverflow.com/questions/41607049/background-images-not-showing-on-github-pages-for-website"></a>
- settings form required attribute not working - fixed by stopping the hidden class being applted if the feilds were empty this then allowed the 

### known bugs
- when the end of break button pressed the score difference displays incorrectly

----
# 6. Credits <a id="credits"></a>


## Images <a id="images"></a>
- Favicon image<a href="https://www.flaticon.com/free-icons/snooker" title="snooker icons"> Snooker icons created by Freepik - Flaticon</a>
- Background Image -<a href="https://www.istockphoto.com/photo/green-felt-texture-for-poker-and-casino-background-gm1133423137-300816310?clarity=false"> Leszek Kobusinski - iStock </a> 

## Code <a id="code"></a>
- html sliders <a href ="https://www.w3schools.com/howto/howto_js_rangeslider.asp">by 3W3Schools</a>
- CSS Sphere  - <a href="https://cssdeck.com/blog/making-a-sphere-in-css/"> From Ran Enoch at CSSDECK.COM</a>
- CSS Triangle - <a href="https://css-tricks.com/snippets/css/css-triangle/">Created by Chris Coyler - CSS-TRICKS</a>
- addSUM function <a href ="https://medium.com/@chrisburgin95/rewriting-javascript-sum-an-array-dbf838996ed0">by Chris Burgin</a>
- checkbox validation - <a href="https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/"> by JavaScript Tutorial</a>
- mute function - <a href="https://stackoverflow.com/questions/14044761/how-to-mute-all-sound-in-a-page-with-js/37218500"> by Zach Saucier - Stackoverflow</a>

## Sounds <a id="sounds"></a>
- Pot sound - <a href="https://freesfx.co.uk/sfx/snooker"> by freefx.co.uk</a>
- Snooker Theme tune - <a href="http://www.televisiontunes.com/Snooker_-BBC.html#google_vignette">Dragby Racer by the Doug Wood Band.</a>
----

# 7. Acknowledgements <a id="acknowledgements"></a>

* Chris Quinn - My Mentor for continuous helpful feedback and advice.
* The Code Institute Slack Community