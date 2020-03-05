var midi = require("easymidi");
var config = require("./config");

var MSB_0 = -1;
var LSB_0 = -1;
var WAIT_LSB_0 = 0;
var MSB_1 = -1;
var LSB_1 = -1;
var line = -1;
var WAIT_LSB_1 = 0;

var available_a = 0;
var available_b = 0;

var pos = new Array(-1, -1, -1, -1);
var last_pos = new Array(0, 0, 0, 0);
var new11 = new Array(0, 0, 0, 0);
var line_complete = new Array(0, 0, 0, 0);
var reset_once = new Array(false, false, false, false);

var line_char_array = new Array(
  new Array("", "", "", "", "", "", "", "", "", "", "", ""),
  new Array("", "", "", "", "", "", "", "", "", "", "", ""),
  new Array("", "", "", "", "", "", "", "", "", "", "", ""),
  new Array("", "", "", "", "", "", "", "", "", "", "", "")
);

var line_static_str_VISUAL = new Array("", "", "", "");
var line_static_str = new Array("", "", "", "");
var line_static_str_SHADOW = new Array("", "", "", "");

var bDeckAIsPlaying = false;
var bDeckBIsPlaying = false;
var bDeckAIsPlaying_tmp = false;
var bDeckBIsPlaying_tmp = false;
var countA = 0;
var countB = 0;

setInterval(function() {
  if (!bDeckAIsPlaying_tmp) {
    countA--;
  }

  if (!bDeckBIsPlaying_tmp) {
    countB--;
  }

  if (bDeckAIsPlaying_tmp != bDeckAIsPlaying) {
    if (bDeckAIsPlaying_tmp && countA > 1) {
      console.log(".......Deck A PLAYING ");
      bDeckAIsPlaying = true;
    } else {
      console.log(".......Deck A STOPPED ");
      bDeckAIsPlaying = false;
    }
  }

  /*
  if (bDeckBIsPlaying_tmp != bDeckBIsPlaying) {
    if (bDeckBIsPlaying_tmp) {
      console.log("Deck B PLAYING");
      bDeckBIsPlaying = true;
    } else {
      console.log("Deck B STOPPED");
      bDeckBIsPlaying = false;
    }
  }
  */

  if (bDeckBIsPlaying_tmp != bDeckBIsPlaying) {
    if (bDeckBIsPlaying_tmp && countB > 1) {
      console.log(".......Deck B PLAYING ");
      bDeckBIsPlaying = true;
    } else {
      console.log(".......Deck B STOPPED ");
      bDeckBIsPlaying = false;
    }
  }

  bDeckAIsPlaying_tmp = false;
  bDeckBIsPlaying_tmp = false;
  countA = 0;
  countB = 0;
}, 500);

// Set up a new input
//var input = new midi.Input("Midi-Track-Info");
var input = new midi.Input("Virtual UKU", true);
//input.openVirtualPort(config.virtualPort);
/*
input.on("message", function(deltaTime, message) {
  //console.log("Midi in. Len:");
  if (message != undefined) {
    console.log("Midi in. Len:" + message.length.toString());
  }
  //processMidi(deltaTime, message[0], message[1], message[2]);
});
*/
input.on("message", function(msg) {
  var vals = Object.keys(msg).map(function(key) {
    return /*'key + ": " + */ msg[key];
  });
  //console.log("Midi In:" + vals.join(", "));
  if (vals[0] != undefined && vals[1] != undefined && vals[2] != undefined) {
    //console.log("Raw:" + vals[0].toString() + " " + vals[1].toString() + " " + vals[2].toString() + " ");
    processMidi(0, vals[0], vals[1], vals[2]);
  }
});

/*
var a = command
var b = number
var c = value
var t = deltatime (currently not used)
*/
function processMidi(t, a, b, c) {
  var str = "";
  var a = toHex(a);
  var b = toHex(b);

  var deck = a & 0x01;
  var ch = 0;
  line = -1;
  tmp_pos = -1;

  switch (b) {
    case "0x1":
      line = 0;
      tmp_pos = 0;
      MSB_0 = c;
      break;
    case "0x2":
      line = 0;
      tmp_pos = 1;
      MSB_0 = c;
      break;
    case "0x3":
      line = 0;
      tmp_pos = 2;
      MSB_0 = c;
      break;
    case "0x4":
      line = 0;
      tmp_pos = 3;
      MSB_0 = c;
      break;
    case "0x5":
      line = 0;
      tmp_pos = 4;
      MSB_0 = c;
      break;
    case "0x7":
      line = 0;
      tmp_pos = 5;
      MSB_0 = c;
      break;
    case "0x8":
      line = 0;
      tmp_pos = 6;
      MSB_0 = c;
      break;
    case "0x9":
      line = 0;
      tmp_pos = 7;
      MSB_0 = c;
      break;
    case "0xA":
      line = 0;
      tmp_pos = 8;
      MSB_0 = c;
      break;
    case "0xB":
      line = 0;
      tmp_pos = 9;
      MSB_0 = c;
      break;
    case "0xC":
      line = 0;
      tmp_pos = 10;
      MSB_0 = c;
      break;
    case "0xD":
      line = 0;
      tmp_pos = 11;
      MSB_0 = c;
      break;

    //---------
    case "0x21":
      line = 0;
      tmp_pos = 0;
      LSB_0 = c;
      break;
    case "0x22":
      line = 0;
      tmp_pos = 1;
      LSB_0 = c;
      break;
    case "0x23":
      line = 0;
      tmp_pos = 2;
      LSB_0 = c;
      break;
    case "0x24":
      line = 0;
      tmp_pos = 3;
      LSB_0 = c;
      break;
    case "0x25":
      line = 0;
      tmp_pos = 4;
      LSB_0 = c;
      break;
    case "0x27":
      line = 0;
      tmp_pos = 5;
      LSB_0 = c;
      break;
    case "0x28":
      line = 0;
      tmp_pos = 6;
      LSB_0 = c;
      break;
    case "0x29":
      line = 0;
      tmp_pos = 7;
      LSB_0 = c;
      break;
    case "0x2A":
      line = 0;
      tmp_pos = 8;
      LSB_0 = c;
      break;
    case "0x2B":
      line = 0;
      tmp_pos = 9;
      LSB_0 = c;
      break;
    case "0x2C":
      line = 0;
      tmp_pos = 10;
      LSB_0 = c;
      break;
    case "0x2D":
      line = 0;
      tmp_pos = 11;
      LSB_0 = c;
      break;

    //-----------

    case "0xE":
      line = 1;
      tmp_pos = 0;
      MSB_1 = c;
      break;
    case "0xF":
      line = 1;
      tmp_pos = 1;
      MSB_1 = c;
      break;
    case "0x10":
      line = 1;
      tmp_pos = 2;
      MSB_1 = c;
      break;
    case "0x11":
      line = 1;
      tmp_pos = 3;
      MSB_1 = c;
      break;
    case "0x12":
      line = 1;
      tmp_pos = 4;
      MSB_1 = c;
      break;
    case "0x13":
      line = 1;
      tmp_pos = 5;
      MSB_1 = c;
      break;
    case "0x14":
      line = 1;
      tmp_pos = 6;
      MSB_1 = c;
      break;
    case "0x15":
      line = 1;
      tmp_pos = 7;
      MSB_1 = c;
      break;
    case "0x16":
      line = 1;
      tmp_pos = 8;
      MSB_1 = c;
      break;
    case "0x17":
      line = 1;
      tmp_pos = 9;
      MSB_1 = c;
      break;
    case "0x18":
      line = 1;
      tmp_pos = 10;
      MSB_1 = c;
      break;
    case "0x19":
      line = 1;
      tmp_pos = 11;
      MSB_1 = c;
      break;

    case "0x2E":
      line = 1;
      tmp_pos = 0;
      LSB_1 = c;
      break;
    case "0x2F":
      line = 1;
      tmp_pos = 1;
      LSB_1 = c;
      break;
    case "0x30":
      line = 1;
      tmp_pos = 2;
      LSB_1 = c;
      break;
    case "0x31":
      line = 1;
      tmp_pos = 3;
      LSB_1 = c;
      break;
    case "0x32":
      line = 1;
      tmp_pos = 4;
      LSB_1 = c;
      break;
    case "0x33":
      line = 1;
      tmp_pos = 5;
      LSB_1 = c;
      break;
    case "0x34":
      line = 1;
      tmp_pos = 6;
      LSB_1 = c;
      break;
    case "0x35":
      line = 1;
      tmp_pos = 7;
      LSB_1 = c;
      break;
    case "0x36":
      line = 1;
      tmp_pos = 8;
      LSB_1 = c;
      break;
    case "0x37":
      line = 1;
      tmp_pos = 9;
      LSB_1 = c;
      break;
    case "0x38":
      line = 1;
      tmp_pos = 10;
      LSB_1 = c;
      break;
    case "0x39":
      line = 1;
      tmp_pos = 11;
      LSB_1 = c;
      break;

    default:
  }

  // Could be used to log Track Position
  if (b == "0x48") {
    if (deck == 0) {
      bDeckAIsPlaying_tmp = true;
      countA++;
    } else {
      bDeckBIsPlaying_tmp = true;
      countB++;
    }
  }

  char_complete = 0;

  // Check if LSB_0 received
  if (MSB_0 != -1 && LSB_0 == -1) {
    if (WAIT_LSB_0 == 1) {
      console.log("ERROR: LSB_0 missing!");
      MSB_0 = -1;
      WAIT_LSB_0 = 0;
    } else WAIT_LSB_0 = 1;
  }

  // Check if MSB_0 received
  if (MSB_0 == -1 && LSB_0 != -1) {
    console.log("ERROR: MSB_0 missing!");
    LSB_0 = -1;
  }

  if (MSB_0 != -1 && LSB_0 != -1) {
    ch = (MSB_0 << 4) | LSB_0;
    str = String.fromCharCode(ch);
    MSB_0 = -1;
    LSB_0 = -1;
    WAIT_LSB_0 = 0;
    char_complete = 1;
  }

  // Check if LSB_1 received
  if (MSB_1 != -1 && LSB_1 == -1) {
    if (WAIT_LSB_1 == 1) {
      console.log("ERROR: LSB_1 missing!");
      MSB_1 = -1;
      WAIT_LSB_1 = 0;
    } else WAIT_LSB_1 = 1;
  }

  // Check if MSB_1 received
  if (MSB_1 == -1 && LSB_1 != -1) {
    console.log("ERROR: MSB_1 missing!");
    LSB_1 = -1;
  }

  if (MSB_1 != -1 && LSB_1 != -1) {
    ch = (MSB_1 << 4) | LSB_1;
    str = String.fromCharCode(ch);
    MSB_1 = -1;
    LSB_1 = -1;
    WAIT_LSB_1 = 0;
    char_complete = 1;
  }

  if (char_complete == 0) return;

  if (deck == 0) {
    // Deck A
    //console.log("Deck A");
    if (line == 0) {
      // Line 1
      pos[0] = tmp_pos;
      FillUnwrittenChars(str, 0);
      FindStart(0);
    } else {
      // Line 2
      pos[1] = tmp_pos;
      FillUnwrittenChars(str, 1);
      FindStart(1);
    }
  } else {
    // Deck B
    //console.log("Deck B");
    if (line == 0) {
      // Line 1
      pos[2] = tmp_pos;
      FillUnwrittenChars(str, 2);
      FindStart(2);
    } else {
      // Line 2
      pos[3] = tmp_pos;
      FillUnwrittenChars(str, 3);
      FindStart(3);
    }
  }
}

function FillUnwrittenChars(str, line_idx) {
  line_char_array[line_idx][pos[line_idx]] = str;

  if (pos[line_idx] - last_pos[line_idx] > 1 && line_char_array[line_idx][last_pos[line_idx]] != "_") {
    while (last_pos[line_idx] < pos[line_idx] - 1) {
      line_char_array[line_idx][last_pos[line_idx] + 1] = line_char_array[line_idx][last_pos[line_idx]];
      last_pos[line_idx]++;
    }
  } else if (pos[line_idx] < last_pos[line_idx] && last_pos[line_idx] < 11 && line_char_array[line_idx][last_pos[line_idx]] != "_") {
    while (last_pos[line_idx] < 11) {
      line_char_array[line_idx][last_pos[line_idx] + 1] = line_char_array[line_idx][last_pos[line_idx]];
      last_pos[line_idx]++;

      if (last_pos[line_idx] == 11) new11[line_idx] = 1;
    }

    if (pos[line_idx] > 0) {
      last_pos[line_idx] = 0;

      while (last_pos[line_idx] < pos[line_idx] - 1) {
        line_char_array[line_idx][last_pos[line_idx] + 1] = line_char_array[line_idx][last_pos[line_idx]];
        last_pos[line_idx]++;
      }
    }
  }

  if (pos[line_idx] == 11) new11[line_idx] = 1;

  last_pos[line_idx] = pos[line_idx];
}

// Find start marker (3 blanks).
function FindStart(line_idx) {
  if (line_static_str_SHADOW[line_idx].lastIndexOf("   ") != -1) {
    // Remove trailing blanks
    while (line_static_str_SHADOW[line_idx].substr(line_static_str_SHADOW[line_idx].length - 1, 1) == " ")
      line_static_str_SHADOW[line_idx] = line_static_str_SHADOW[line_idx].substr(0, line_static_str_SHADOW[line_idx].length - 1);

    // If there are multiple underscores due to german "Umlaute" reduce every multiple to one underscore
    line_static_str_SHADOW[line_idx] = RemoveMultipleUnderscores(line_static_str_SHADOW[line_idx]);

    // String not final yet, due to marker confusion?
    if (line_static_str[line_idx] != line_static_str_SHADOW[line_idx]) {
      line_static_str[line_idx] = line_static_str_SHADOW[line_idx];
      line_complete[line_idx] = 0;
    } else {
      line_complete[line_idx] = 1;

      // If line 0 has been completed reset line 1 once to ensure that track and artist match. Otherwise a track could get the wrong artist!
      if (line_idx == 0) {
        if (reset_once[1] == false) {
          line_complete[1] = 0;
          reset_once[1] = true;
        } else reset_once[1] = false;
      }

      // If line 1 has been completed reset line 0 once to ensure that track and artist match. Otherwise a track could get the wrong artist!
      if (line_idx == 1) {
        if (reset_once[0] == false) {
          line_complete[0] = 0;
          reset_once[0] = true;
        } else reset_once[0] = false;
      }

      // If line 2 has been completed reset line 3 once to ensure that track and artist match. Otherwise a track could get the wrong artist!
      if (line_idx == 2) {
        if (reset_once[3] == false) {
          line_complete[3] = 0;
          reset_once[3] = true;
        } else reset_once[3] = false;
      }

      // If line 3 has been completed reset line 2 once to ensure that track and artist match. Otherwise a track could get the wrong artist!
      if (line_idx == 3) {
        if (reset_once[2] == false) {
          line_complete[2] = 0;
          reset_once[2] = true;
        } else reset_once[2] = false;
      }

      if (line_complete[0] == 1 && line_complete[1] == 1 && (line_static_str_VISUAL[0] != line_static_str[0] || line_static_str_VISUAL[1] != line_static_str[1])) {
        line_static_str_VISUAL[0] = line_static_str[0];
        line_static_str_VISUAL[1] = line_static_str[1];

        console.log("Deck: A");
        console.log("Track: " + line_static_str[0]);
        console.log("Artist: " + line_static_str[1]);
        available_a = 1;
        line_complete[0] = 0;
        line_complete[1] = 0;
      } else if (line_complete[2] == 1 && line_complete[3] == 1 && (line_static_str_VISUAL[2] != line_static_str[2] || line_static_str_VISUAL[3] != line_static_str[3])) {
        line_static_str_VISUAL[2] = line_static_str[2];
        line_static_str_VISUAL[3] = line_static_str[3];

        console.log("Deck: B");
        console.log("Track: " + line_static_str[2]);
        console.log("Artist: " + line_static_str[3]);
        available_b = 1;
        line_complete[2] = 0;
        line_complete[3] = 0;
      }
    }

    line_static_str_SHADOW[line_idx] = "";
  } else {
    if (new11[line_idx] == 1) {
      line_static_str_SHADOW[line_idx] += line_char_array[line_idx][11];
      new11[line_idx] = 0;
    }
  }
}

function RemoveMultipleUnderscores(str) {
  var k;

  for (k = 0; k < str.length - 1; k++) {
    while (k < str.length - 1 && str.substr(k, 1) == "_" && str.substr(k + 1, 1) == "_") {
      str1 = str.substring(0, k + 1);

      if (k < str.length - 2) str2 = str.substr(k + 2);
      else str2 = "";

      str = str1 + str2;
    }
  }

  return str;
}

function toHex(d) {
  return "0x" + Number(d).toString(16);
}
