Who: Mackenzie Colwell, Matthew Kaplan, Max Lookabaugh, Michael Shannon  
Title: HexMech  
Vision: Crushing metal with every commit.  
Automated Tests:   
To run our automated unit tests, download this repository and run the following commands (from the `app` directory):
>npm install  
>npm start

An example of a run of the tests is:

```
  HTTP Error
    ✓ returns node error with http status and message
    ✓ handles 301
    ✓ handles 404
    ✓ handles 501

  User Model
    .save
      ✓ should allow saving without error
      ✓ should set the created date on creation
      ✓ should not set the created date on update
      ✓ should set the updated date on creation
      ✓ should set the updated date on update
    .setPassword
      ✓ should set the password using bcrypt (884ms)
    .setPasswordSync
      ✓ should set the password using bcrypt (887ms)
    .findOne
      ✓ should find user via username
      ✓ should find user via email
      ✓ should find user via display name
    .checkPassword
      ✓ should call callback with true if password is correct (893ms)
      ✓ should call callback with false if password is incorrect (879ms)
    .checkPasswordSync
      ✓ should return true if password is correct (881ms)
      ✓ should return false if password is incorrect (875ms)


  18 passing (6s)
```

|                |                                         |
| :------------- | :-------------------------------------- |
|   Use Case ID: | 00                                      |
| Use case Name: | Log In                                  |
|   Description: | Player can create an account and log in |

|                    |                                         |
| :----------------- | :-------------------------------------- |
|            Users:  | Player                                  |
|   Preconditions:   | N/A                                     |
|  Postconsitions:   | Player has an account                   |
| Frequency of Use:  | Once                                    |

|   Flow of Events:    | Actor Action          | System Response                 | Comments                |
| :------------------- | :-------------------- | :------------------------------ | :---------------------- |
|                      |  1. Click on register | The system displays the form | ________________      |
|                      |  2. Fill in the form  |                              | ________________      |
|                      |  3. Click Log In      | Account is created           | ________________      |

|                      |                                                                    |
| :------------------- | :----------------------------------------------------------------: |
|         Test Pass?:  | Pass / Fail                                                        |
|   Notes and Issues:  | __________________________________________________________________ |





|                |               |
| -------------- |:-------------:|
| Use case Id:   | 01                                                 |
| Use case name: | Read the Rules                                     |
| Description:   | Player can log in and read the rules of the game.  |

|                  |                            |
|------------------|:--------------------------:|
| Users:            | Players                    |
| Preconditions:    | Player must have an account|
| Postconditions:   | Player finds the Rules page|
| Frequency of use: | Occasional                 |

| Flow of Events:  | Actor Action                 | System Response               | Comments         |
|------------------|------------------------------|-------------------------------|------------------| 
|                  | 1.Log in                     | System displays login         | _______________  |
|                  | 2.Click on Quick Start       | Quick Start Guide is on screen| _______________  |

|                  |                                                        |
|------------------|-------------------------------------------------------------------| 
| Test Pass?       | Pass/Fail                                                          |
|Notes and Issues: |___________________________________________________________________|                          





|                |                                                      |
| :------------- | :--------------------------------------------------- |
|   Use Case ID: | 02                                                   |
| Use case Name: | Start a Game with a Random Opponent                  |
|   Description: | Player initiates a game with an unspeciticified user |

|                    |                                              |
| :----------------- | :------------------------------------------- |
|            Users:  | Player                                       |
|   Preconditions:   | Player must have an account and be logged in |
|  Postconsitions:   | Player is now in a game in progress          |
| Frequency of Use:  | Often                                        |

| Flow of Events: | Actor Action                         | System Response                       | Comments      |
| :-------------- | :----------------------------------- | :------------------------------------ |:------------- |
|                 | 1. Click on new Game button          | Ways to initiate a game are displayed | _______________              |
|                 | 2. Click on the Find Opponent button | The site displays a spinner animation until it finds an opponent, then displays the opponent's user name | _______________ |

|                      |                                                                                            |
| :------------------- | :-----------------------------------------------------------------------------------------:|
|         Test Pass?:  | Pass / Fail                                                                                |
|   Notes and Issues:  | __________________________________________________________________________________________ |





|               |               |
| ------------- |:-------------:|
| use case Id   | 03                                             |
| Use case name |  Mech Movement Methods                         |
| Description   | Player moves by running, jumping, and walking  |

|                   |                                 |
|-------------------|:-------------------------------:|
| Users:            | Players:                        |
| Preconditions:    | Player is in a game in progress |
| Postconditions:   | Players’ mech has moved         |
| Frequency of use: | Often                           |
|

| Flow of Events:  | Actor Action                         | System Response               | Comments         |
|------------------|--------------------------------------|-------------------------------|------------------| 
|                  | 1.Click on your mech                 | Mech is highlighted           | ______________           |
|                  | 2.Click jump and tile to jump to     | Mech is now on selected tile  | ______________                 |
|                  | 3.Click on Walk and tile to walk to  | Mech is now on tile selected  | ______________                 |
|                  | 4.Click on run and tile to run to    | Mech is now on selected tile  | ______________                 |

|                  |                                                        |
|------------------|--------------------------------------------------------| 
| Test Pass?       | Pass/Fail                                              |
|Notes and Issues: |___________________________________________________________________________|                          


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
