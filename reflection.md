
## Kapitel 2
Kapitel 2 har verkligen hjälpt mig att förbättra hur jag namnger saker i min kod. Före läsningen av detta kapitel brukade jag bara ge mina variabler snabba och enkla namn utan att tänka mycket på det. Nu tar jag mig tid att välja mer beskrivande namn, så att det blir enklare att förstå koden och undvika missförstånd. Jag har även lärt mig att undvika att använda onödiga ord i namnen, vilket gör koden mer läsbar. Tidigare brukade jag ibland bara lägga till ett utfyllnadsord för att skilja liknande saker åt, istället för att använda mer beskrivande namn. Jag må inte ännu ha de bästa namnen men de är iallafall bättre än innan denna kurs.

Bilden visar en metod där jag är extra stolt över min namngivning då de är beskrivande och jag tänkte på de mycket. 
![Bild på kod](images/name.png)

## Kapitel 3
Det som jag främst har lärt mig från detta kapitel är hur viktigt det är att dela upp funktioner så att de bara gör en sak, och att ge de namn som beskriver vad de gör.

Jag gillar switch-satser även om boken är inte gillar dessa. Visst, de kan bli komplicerade och långa, men om man ger sina funktioner i cases tydliga och beskrivande namn blir koden fortfarande lätt att förstå.

När det gäller argument har jag blandade känslor. Ibland är det användbart med flera argument, men jag ser också fördelarna med att använda få av argument. Särskilt när det kommer till att undvika dubble-takes hos personen som läser koden. Jag kan även förstå att det blir jobbigt med argument om koden blir väldigt stor för då är det mycket att läsa.

Allt det som syns i denna bilden var tidigare en del av en enda metod, vilket gjorde den överdrivet lång och med för många uppgifter. Jag valde att bryta ut den för att följa DRY och command query seperation. Nu ser den mycket renare ut, är mer lättläst och metoderna gör bara en sak. 
![Bild på kod](images/dry.png)

## Kapitel 4
Det här kapitlet har minskat mitt behov av att skriva onödiga kommentarer i min kod. Tidigare brukade jag kommentera allt, även om variabelnamnen redan var ganska självförklarande (noise comments). Dessutom märkte jag att jag ibland fokuserade på att kommentera uppenbar information istället för att fokusera på att förklara de viktiga som inte var lika uppenbara. Jag har nog fortfarande lite för mycket noise comments, men det har förbättrats sen hur det var innan. Efter detta kapitel och föreläsningen kan jag istället tycka att det är svårt att skriva kommentarer för jag tycker att de alltid känns onödiga och svårt att veta vad som är viktig information.  

Jag har även använt mig av TODO kommentarer för att framtida jag ska veta vad jag ska implementera mer, då jag tycker denna uppgift är rolig och vill fortsätta på den senare. 

Den här kommentaren saknar information om att metoden kan kasta ett fel om maxvärdet är mindre än minvärdet. Det skulle vara mer användbart att inkludera denna information direkt i kommentaren istället för att tvinga läsaren att titta i metoden för att upptäcka det.
![Bild på kommentar](images/comment.png)

## Kapitel 5
När det kommer till vertical formatting så är det inga av mina filer som är längre än 200 rader och om en fil blev för stor eller hade för många uppgifter delade jag upp de i fler klasser. Det är även intressant att läsa om hur boken vill att funktioner/metoder och variabler ska placeras i en klass för det är något som jag aldrig tänkt på innan. Men när jag väl började ha funktioner som anropas under den som anropar och lokala variabler högst upp i en funktion så blev det mycket lättare att läsa och hitta. Jag valde även att ha indentering som boken föreslår då de är detta jag varit van vid tidigare. Boken föreslog även att rader oftast är cirka 80-120 karaktärer långa så jag valde att sätta min egna gräns på 100 för denna upgift. 

Detta är en bild på min längsta fil med närmare 190 rader. 
![Bild på längsta filen](images/longest.png)

## Kapitel 6
Jag har arbetat med webbkomponenter i labbration 3 och på detta sätt kapslat in klasserna. Den enda som 'pratar' med andra komponenter är min 'math-application.js' och den vet inte ens något om de andra klasserna utan fångar bara in de event som bubblas ut från dem. Vilket visar på att det finns en väldigt bra inkapsling. Jag anropar min slumpgenerator modul i min multiplication-question.js och addition-question.js, men jag har ändå undvikit trainwrecks helt och hållet genom att hålla modulen inkapslad. I labb 3 koden har jag inga behov av getters och setters då utomstående kod inte kommer åt klasserna ändå, jag har även privata metoder och variabler för att få en extra inkapsling i både min labb 3 app och min labb 2 modul. 

Denna bild visar när jag anropar en metod från min slumpgenerator modul. 
![Bild på kommentar](images/classcall.png)

## Kapitel 7
I både labb 2 och labb 3 använder jag exceptions. I labb 2 valde jag dessutom att bryta ut min felhantering till en separat klass, men i labb 3 valde jag att ha felhanteringen i samma fil som komponenten. Jag använder mig även av egna felmeddelanden för att kunna lokalisera vad och vart det gått fel i koden. Något som boken inte vill är att returnera null och det är jag tyvärr skyldig till i andra kurser. Det är så smidigt att ha if satser som kollar om det är null eller inte, men jag förstår att det blir fult ur en kodkvalites synpunkt.

En bild på ett felhanterings exempel från min labb 2.  
![Bild på felhantering](images/error.png)

## Kapitel 8 
Jag hade väldigt svårt att förstå mig på detta kapitel, men jag förstår ändå att man borde använda sig av learning tests för moduler man inte kände till. Förr har jag alltid kollat på dokumentation för att förstå mig på hur en modul funkar eller kolla exempel på hur man använder sig utav en modul. Jag har ju dock skapat min egna modul till denna uppgift så de kändes inte viktigt att ha learning tests då jag redan kan modulen. 

Något jag också kunnat göra men inte gjorde var att ha en wrapper i denna kod för min modul för att minimera de ställen modulen finns på, men eftersom jag bara använder min modul i två komponenter kände jag inte att de va vettigt att lägga tid på. I framtiden när jag använder mig av moduler kommer jag försöka använda mig av wrappers för att det ska vara lätt att kunna ändra i koden och för att moduler inte ska ha alltför stor direkt påverkan på koden. Det är även bra med wrappers för att interaktionen mellan koden och modulen ska bli säkrare. 

Denna kod visar hur jag använder just min modul för att generera fram ett slumpat nummer. 
![Bild på modul](images/module.png)

## Kapitel 9 
Jag har tyvärr inte följt "the three laws of TDD" som står i boken där man ska skriva tester innan det skrivits kod. Jag började denna uppgift med att testa mig fram till att hitta något jag kunde göra och det va inte förens mot slutet jag började skriva tester, det hade dock underlättat om jag skrev tester först för då hade jag vetat vad jag skulle sträva efter. 

Detta är ett exempel på automatiska tester i min labb 2 modul och det går att se att dessa tester är rena och nedbrytna, där varje test testar en liten sak och inte flera saker i ett test. Dessa tester följer principen om F.I.R.S.T då de är snabba, inte förlitar sig på varandra, lätta att upprepa och självaliderande. Det följer dock tyvärr inte det sista t eftersom testerna inte va det första som skrevs i koden. I labb 3 applikationen valde jag istället att testa med manuella tester och de skrev jag för att se så att allt fortfarande funkade som de skulle när jag fixade om det sista i koden mot slutet. 
![Bild på automatiska tester](images/tests.png)

## Kapitel 10 
Jag har följt the stepdown rule i mina klasser genom att placera variablerna först och sen de olika metoderna, med metoder som anropas under de som anropar. Jag har använt mig av # på variabler och metoder som inte behöver vara publika. I labb 3 är det många privata metoder eftersom de inte används av andra klasser men i labb 2 hade jag istället mestadel publika metoder. Jag har försökt hålla klasserna små och bryta ut när de fått får många responsibilities. jag har följt The single Responsibility principle för att veta när jag ska bryta ut mina klasser i mina komponenter, men om man skulle följa denna princip till punkt och pricka skulle det finnas väldigt många små klasser som känns väldigt onödiga. Så jag har ju inte följ denna princip till punkt och pricka, men klasser har ändå inte överdrivet många uppgifter. Det går att förklara klassernas uppgifter utan att använda sig av t.ex och, vilket visar på att de ändå är lagom stora. 

Klasserna är dessutom isolerade från varandra och de skickar enbart ut event, den enda som känner till andras event är math-application som tar hand om själva applikationen. Det jag och boken skulle vilja vara kritiska mot är att jag använt mig av många variabler och dessa variabler används inte i alla metoder. Jag skulle istället kunna gjort dessa variabler till lokala konstander för specifika metoder där de behövs, men då hade jag med största sannolikhet behövt använda fler argument. 

Detta är en bild på min klass där jag bestämmer inställningarna för additions frågorna. 
![Bild på addition choose klass](images/addition.png)

## Kapitel 11
Jag har valt att använda webbkomponenter som en central del i min applikation för att underlätta för framtida ändringar utan att riskera att påverka hela applikationen. Jag har valt att använda math-application till att ta hand om alla events för att underlätta om jag behöver göra ändringar. Då behöver jag bara göra ändringar på två ställen istället för flera om alla klasser skulle ta hand om event. En viktig del som kapitel 11 betonar är att perfektion inte uppnås i första försöket och det är därför viktigt att ha möjligheten att göra ändringar över tid. Även om min applikation just nu är relativt liten och jag inte har kunnat använda alla delar från kapitlet, har jag arbetat med att separera min kod så mycket som möjligt.

Jag har använt ett byggverktyg som heter "Vite" i min kod vilket kan vara temporärt om jag väljer att bygga en egen server senare då vite skulle tas bort, men nu i början av skapandet har det varit enkelt med vite för att jag snabbt ska kunna se framsteg i klientsidan på applikationen. 

Denna bild visar en del av min math-application, vars uppgift är att omdirigera klienten med hjälp av events.
![Bild på en del av min math-applictaion](images/addition.png)
