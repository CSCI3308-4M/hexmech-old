Who: Mackenzie Colwell, Matthew Kaplan, Max Lookabaugh, Michael Shannon  
Title: HexMech  
Vision: Crushing metal with every commit.  
Automated Tests:   
To run our automated unit tests, download this repository and run the following commands:
>npm install  
>npm start  

|                |                                         |
| :------------- | :-------------------------------------- |
|   Use Case ID: | 00                                      |
| Use case Name: | Log In                                  |
|   Description: | Player can create an account and log in |

|                    |                                         |
| :----------------- | :-------------------------------------- |
|            Users:  | Player                                  |
|   Pre-conditions:  | N/A                                     |
|  Post consitions:  | Player has an account                   |
| Frequency of Use:  | Once                                    |

|                      |         Flow of Events          |                         |
| :------------------- | :------------------------------ | :---------------------- |
| Actor Action         | System Response                 | Comments                |
| 1) Click on register | 1) The system displays the form | 1)________________      |
| 2) Fill in the form  | 2)                              | 2)________________      |
| 3) Click Log In      | 3) Account is created           | 3)________________      |

|                      |                                                    |
| :------------------- | :-------------------------------------------------:|
|         Test Pass?:  | Pass / Fail                                        |
|   Notes and Issues:  | __________________________________________________ |

|                |                                                      |
| :------------- | :--------------------------------------------------- |
|   Use Case ID: | 02                                                   |
| Use case Name: | Start a Game with a Random Opponent                  |
|   Description: | Player initiates a game with an unspeciticified user |

|                    |                                              |
| :----------------- | :------------------------------------------- |
|            Users:  | Player                                       |
|   Pre-conditions:  | Player must have an account and be logged in |
|  Post consitions:  | Player is now in a game in progress          |
| Frequency of Use:  | Often                                        |

|                                      |         Flow of Events                   |                         |
| :----------------------------------- | :--------------------------------------- | :---------------------- |
| Actor Action                         | System Response                          | Comments                |
| 1) Click on the New game button      | 1) Ways to initiate a game are displayed | 1)________________      |
| 2) Click on the Find Opponent button | 2) The site displays a spinner animation until it finds an opponent, then displays the opponent's username                                       | 2)________________      |
| 3)                                   | 3)                    | 3)________________      |

|                      |                                                    |
| :------------------- | :-------------------------------------------------:|
|         Test Pass?:  | Pass / Fail                                        |
|   Notes and Issues:  | __________________________________________________ |

User Acceptance Tests:  

|Test One:|
------------------------------------
**Task**                                     |Results|
Create a HexMech account|         |
Log in to your account| |
|View the Quick Start Guide| |
|Start a new game: select mech, select map| |
|Move by walking, running, and jumping| |
|Fire all weapon types| |
|Continue firing weapons until mech overheats| |
|Lose the game| |

|Test Two:|
|:--------------|:---------------------:|
**Task**|**Results**|
Play a game on every map|why won't this show up|
Take damage from an enemy|  |
During a match where your mech falls, make it stand up again|  |
Damage some enemy mechs to the point of destruction|  |
Push an enemy mech|  |
Find yourself on the leaderboard|  |

|Test Three:|
|---|---|
**Task**|**Results**
Attempt to log in with incorrect information| 
Attempt account creation without filling out the required fields|
Create an account and log in|
Open HexMech in a new window or tab and log out|
Try to access your profile from the original tab|
Log in on a new tab and then refresh the original tab|
