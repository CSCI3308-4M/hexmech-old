HexMech
=======


Server Side Configuration
-------------------------

Because the server side configuration file contains sensitive and platform
specific information it is not included in the repository.  Instead
a description of the file follows.

The file is a JSON file named `config.json` and should be in the main `app`
directory.  It must contain the following keys:


### bcryptStrength

This is the strength of the bcrypt password hashing used.  The number of
rounds is given by 2^bcryptStrength.  A recommended value is around 14 (as of
2016).  This should be increased through time such that a single hashing takes
around 250ms-500ms.

