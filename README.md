#####Bot Commands#####

######IP Calculations######

***binary***

    <user> 1010
    <bot> {"dec":10,"hex":"a"}

***hex***

    <user> 0xFF
    <bot> {"dec":255,"bin":"11111111"}
   

######Quiz######

***View available certs***

    <user> certs
    <bot> icnd1, icnd2, ...
   

***Count database entries***

Syntax: count *cert name*

Example:

    <user> count icnd1
    <bot> 354
   
***Get cert topics***

Syntax: *cert name* topics

Example:

    <user> icnd1 topics
    <bot> ios, security, subnetting

***Start random quiz***

Syntax: quiz *cert name*

Example:

    <user> quiz icnd1
    <bot> How do you enable RIP routing?

***Answer the quiz***

Be sure to include a ***?*** at the end of your answer

Example:

    <user> router rip?
    <bot> good job



