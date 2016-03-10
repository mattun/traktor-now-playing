# traktor-now-playing
A Node.JS script that reads the Tracks on Deck A and B from Traktor via midi.
Currently the Metadata gets output to console, I plan on adding a local page that gets updated via jQuery,
so it can be used as a Stream overlay with OBS and their Browser Plugin.

##How-To
Requirements: Have Node and NPM installed.

```shell
  npm install
  node index.js
```
Now fire up Traktor, add the Denon HC4500 in the Controller Manager, select None as MIDI-In and soundcloud.com/tyno-5 as MIDI-Out.
Once you load a Track onto your Deck it will display in your console after 10-20secs (this is due to Denon sending the Chars one by one)

<img src="readme-img/traktor_setup.jpg?raw=true"/>

##Explanation
As it turns out, the Denon DN-HC4500 sends the track title, artist it displays via Midi. 
Every Midi Command is structured the following way: [command, number, value]

Below is the Midi Command Sheet, so if the command is 0xBn (where n is the channel number (Deck A = 0, Deck B = 1)), one can check the number and if it is 0x01<=number<=0x39 it is a Character sent to the LCD display. 0x01 through 0x2D is Deck A and 0x0E through 0x39 is Deck B.

For a single Char we need two values, one from MSB and one from LSB, together they form the Char using 
```javascript
MSB<<4 | LSB
```
So if MSB is 0100 and LSB is 1101 this would result in:
```javascript
01000000
00001101
________
01001101 -> 77
````

Which is the CharCode for 'M'.

Further down is the sheet from the Denon manual displaying the Char Table.

<img src="readme-img/denon_midi_commands.jpg?raw=true"/>
<img src="readme-img/denon_chars.jpg?raw=true"/>


Credit where credit is due:
If it wasn't for this Thread I would have never figured this out by myself. 
https://www.native-instruments.com/forum/threads/extract-track-and-artist-from-loaded-decks.191147/
