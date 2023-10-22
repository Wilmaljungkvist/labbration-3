
## Kapitel 2 - Meaningful Names
Kapitel 2 har verkligen hjälpt mig att förbättra hur jag namnger saker i min kod. Före läsningen av detta kapitel brukade jag bara ge mina variabler snabba och enkla namn utan att tänka mycket på det. Nu tar jag mig tid att välja mer beskrivande namn, så att det blir enklare att förstå koden och undvika missförstånd. Jag har även lärt mig att undvika att använda onödiga ord i namnen, vilket gör koden mer läsbar. Tidigare brukade jag ibland bara lägga till ett utfyllnadsord för att skilja liknande saker åt, istället för att använda mer beskrivande namn. Jag må inte ännu ha de bästa namnen men de är iallafall bättre än innan denna kurs.

## Kapitel 3 - Functions
Det som jag främst har lärt mig från detta kapitel är hur viktigt det är att dela upp funktioner så att de bara gör en sak, och att ge dem namn som beskriver vad de gör.

Jag gillar switch-satser, även om boken är kritisk till dem. Visst, de kan bli komplicerade och långa, men om man ger sina val tydliga och beskrivande namn blir koden fortfarande lätt att förstå.

När det gäller argument har jag blandade känslor. Ibland är det användbart med flera argument, men jag ser också fördelarna med att använda fält i klassen för att undvika upprepning av information och undvika dubble-takes hos personen som läser koden. Jag kan även förstå att det blir jobbigt med argument om koden blir väldigt stor för då är det mycket att läsa.

Allt det som syns i denna bilden var tidigare en del av en enda metod, vilket gjorde den överdrivet lång och med för många uppgifter. Jag valde att bryta ut den för att följa DRY och command query seperation.
![Bild på kod](images/dry.png)

## Kapitel 4
Det här kapitlet har minskat mitt behov av att skriva onödiga kommentarer i min kod. Tidigare brukade jag kommentera allt, även om variabelnamnen redan var ganska självförklarande (noise comments). Det ledde till överflödiga och röriga kommentarer som faktiskt gjorde koden mindre snygg istället för att förbättra förståelsen av koden. Dessutom märkte jag att jag ibland fokuserade på att upprepa uppenbar information istället för att fokusera på att förklara de viktiga detaljerna som inte var lika uppenbara.

Jag har även använt mig av TODO kommentarer för att framtida jag ska veta vad jag ska implementera mer, då jag tycker denna uppgift är rolig och vill fortsätta på den senare. 

Den här kommentaren saknar information om att metoden kan kasta ett fel om maxvärdet är mindre än minvärdet. Det skulle vara mer användbart att inkludera denna information direkt i kommentaren istället för att tvinga läsaren att titta i metoden för att upptäcka det.
![Bild på kommentar](images/comment.png)

## Kapitel 5
När det kommer till vertical formatting så är det inga av mina filer som är längre än 200 rader och om en fil blev för stor eller hade för många uppgifter delade jag upp de i fler klasser. Det är även intressant att läsa om hur boken vill att funktioner/metoder och variabler ska placeras i en klass för det är något som jag aldrig tänkt på innan. Men när jag väl började ha funktioner som anropas under den som anropar och lokala variabler högst upp i en funktion så blev det mycket lättare att läsa och hitta. Jag valde även att ha indentering som boken föreslår då de är detta jag varit van vid tidigare. Boken föreslog även att rader oftast är cirka 80-120 karaktärer långa så jag valde att sätta min egna gräns på 100 för denna upgift. 

## Kapitel 6
Jag har arbetat med webbkomponenter i labbration 3 och på detta sätt kapslat in klasserna. Den enda som 'pratar' med andra komponenter är min 'math-application.js' och den vet inte ens något om de andra klasserna utan fångar bara in de event som bubblas ut från dem. Vilket visar på att det finns en väldigt bra inkapsling. Jag kallar på min slumpgenerator klass from npm i min multiplication-question.js och addition-question.js, men jag har undvikit trainwrecks helt och hållet. I labb 3 koden har jag inga behov av getters och setters då utomstående kod inte kommer åt klasserna ändå, jag har även privata metoder och variabler för att få en extra inkapsling i både labb 3 och min labb 2 modul. 

## Kapitel 7
I både labb 2 och labb 3 använder  jag bara exceptions. Jag har även brytit ut min felhantering till en separat klass för att lätt kunna komma åt felhanteringen. Jag använder mig även av egna felmeddelanden för att kunna lokalisera vad och vart det gått fel i koden. förut så returnerade jag null i min funktion när det inte gått fel men det gör jag inte längre och jag passar inte null. 

![Bild på felhantering](images/error.png)
## Kapitel 8 
Något som jag inte gjorde för att testa min modul i denna applikation eftersom jag redan kunde den men kunnat göra var att skriva learning tests för att lära mig om modulen och för att se så att den funkar som den ska innan jag började använda modulen. Något jag också kunnat göra men inte gjorde var att ha en wrapper i denna kod för min modul för att minimera de ställen koden återfinns på, men eftersom jag bara använder min modul i två komponenter kändes de inte som vettigt att lägga ner tid på. I framtiden när jag lägger till subtraktion och divionson kommer jag göra de. 

## Kapitel 9 
Jag har tyvärr inte följt "the three laws of TDD" som står i boken där man ska skriva tester innan det skrivits kod. Jag började denna uppgift med att testa mig fram till att hitta något jag kunde göra och det va inte förens mor slutet jag började skriva tester, det hade dock underlättat om jag skrev tester först för då hade jag vetat vad jag skulle sträva efter. 

Detta är ett exempel på automatiska tester i min labb 2 modul och det går att se att dessa tester är rena och nedbrytna, där varje test testar en liten sak och inte flera saker i ett test. Dessa tester följer principen om F.I.R.S.T då de är snabba, inte förlitar sig på varandra, lätta att upprepa och självaliderande. Det följer doch tyvärr inte det sista t eftersom testerna inte va det första som skrevs i koden. 
![Bild på automatiska tester](images/tests.png)

## Kapitel 10 
Jag har följt the stepdown rule i mina klasser genom att placera variablerna först och sen de olika metoderna, med metoder som anropas under de som anropar. Jag har använt mig av # på variabler och metoder som inte behöver vara public och kommas åt av en annan klass. Jag har försökt hålla klasserna små och bryta ut när de fått får många responsibilities. jag har följt The single Responsibility principle för att veta när jag ska bryta ut mina klasser i mina komponenter, men om man skulle följa denna princip till punkt och pricka skulle det finnas väldigt många små klasser som känns väldigt onödiga. SÅ jag har ju inte följ denna princip till punkt och pricka. 
Klasserna är isolerade från varandra. 
Min addition choose klass/komponent vars uppgift är att ställa in additions inställningarna till rundan. Det går att förklara klassens uppgift utan att använda och, detta gör att den är lagom stor. 
![Bild på addition choose klass](images/addition.png)

## Kapitel 11
Jag har valt att använda webbkomponenter som en central del i min applikation för att underlätta för framtida ändringar utan att riskera att påverka hela applikationen. En viktig del som kapitel 11 betonar är att perfektion inte uppnås i första försöket och det är därför viktigt att ha möjligheten att göra ändringar över tid. Även om min applikation just nu är relativt liten och jag inte har kunnat använda alla delar från kapitlet, har jag arbetat med att separera min kod i så mycket som möjligt.

Jag har använt ett byggverktyg som heter "Vite" i min kod vilket kan vara temporärt om jag väljer att bygga en egen server senare då vite skulle tas bort, men nu i början av skapandet har det varit enkelt för att jag snabbt skulle komma igång med det hela. 