// !!!!!!!!!!!!!!!!!!! COMMENTS ZIJN NIET TOEGESTAAN IN JSON-BESTANDEN !!!!!!!!!!!!!
var songinfo = {
"songtitle": "Il&#234 P&#233rola Negra (Daniela Mercury)", // titel van het liedje
"key": "A", // C D E F G A B
"min/maj": "m", // NULL m min maj mineur majeur minor major
"time(signature)": "4/4", // 4/4 3/4 5/4 6/8
"sharp/flat": "sharp", // kruis mol sharp flat
"structure": // array met alle akkoorden (incl extensies) en refrein/couplet-indicaties

// regel = TableRow!
// maat = <td>!
// akkoord = <span>!

[

// !!!!! ELKE CEL BESTAAT UIT (TRANSPONEERBAAR) AKKOORD + EXTENSIE
// een maat bestaat uit 4 cellen/tellen, soms leeg

["TXT","INTRO"],
[[["0","m9"],] , [["10",""],] , [["8",""],] , [["7","sus4"],],],
[[["0","m9"],] , [["10",""],] , [["8",""],] , [["7","sus4"],],],
[[["0","m9"],] , [["3",""],] , [["8",""],] , [["7","sus4"],],],
[[["5","m"],] , [["0","m"],] , [["5","m"],["10",""],] , [["0","m"],["10",""],],],
["BR"],
["TXT","COUPLET"],
[[["3",""],] , [["10",""],] , [["0","m"],] , [["10",""],],],
[[["3",""],] , [["10",""],] , [["0","m"],] , [["10",""],],],
[[["3",""],] , [["10",""],] , [["0","m"],] , [["10",""],],],
[[["3",""],] , [["10",""],] , [["0","m"],] , [["10",""],],],
["BR"],
["TXT","REFREIN"],
[[["3",""],] , [["10",""],] , [["8",""],] , [["10",""],],],
[[["3",""],] , [["10",""],] , [["8",""],] , [["10",""],],],
["BR"],
["TXT","[COUPLET]"],
["BR"],
["TXT","BRUG"],
[[["0","m"],] , [["10",""],] , [["8",""],] , [["10",""],] , [["8",""],["10",""],],],
["BR"],
["TXT","[REFREIN]"],
["BR"],
["TXT",'MIDDLE ("<i>...Hey! ...Ho!"</I>)"'],
[[["3",""],] , [["10",""],] , [["8",""],] , [["10",""],],],
[[["3",""],] , [["10",""],] , [["8",""],] , [["10",""],],],
["BR"],
["TXT","[couplet]"],
["TXT","[brug]"],
["TXT","[refrein]"],
["TXT","[middle]"],
["TXT","a cappela outro (=refrein)"],




] // EINDE VD ARRAY/STRUCTUUR

}
