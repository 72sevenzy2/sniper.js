Hi! this was a pretty cool mini library to make, whilst also being fun and educational.
This javascript is also written in typescript. Which is pretty ironic
Usage:

This username sniper was designed for people with almost no coding experiece to potentially build their own website About it, it can also be used for people who do know how to program and such. Alright for the usage of this.

First run:

npm install -g roblox-sniper

to install the necessary packages/deps for the framework.

then afterwards you can run the sniper as so:

sniper check

^ replace the username with the username you want to check for availability.

You can also run:

npx sniper check

cmd 2:
You can also Observe the usernames which you want to snipe untill they are available.

Just run:

sniper observe -i 2000 -t 10000

(You can replace the i and t with the preferred time you want.)

the -i is the intervalms time in which the sniper will run again if the username remains unavailable.

the -t is the time untill the observe cmd stops observing incase you dont want it to continue forever.

As so you can also run:

npx sniper observe -i -t

aswell as:

npx sniper snipe start
^ This is the cmd that will try to get atleast 1 4l username for you.

And it should work as the same regardless if you include the npx or not.

Really hope you find this framework somewhat useful.