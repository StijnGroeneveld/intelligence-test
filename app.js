class GameManager {
    constructor() {
        this.appContainer = document.getElementById('app');

        // Full sequence: Tests 1-9
        this.testSequence = [
            'storyMemoryReading',
            'audioReaction',
            'visualReaction',
            'inhibitoryControl',
            'flankerArrow',
            'visualSpatialMemory',
            'simultaneousSpatialMemory',
            'sequentialNumberMemory',
            'reverseSequentialNumberMemory',
            'nBackTask',
            'chimpTest',
            'mentalMath',
            'storyMath',
            'storyMemoryQuestions'
        ];
        this.currentTestIndex = 0;

        this.state = {
            scores: {},
            breakdowns: {}
        };

        // Load Settings and History from localStorage
        const savedSettings = JSON.parse(localStorage.getItem('cognitiveTestSettings'));
        this.settings = savedSettings || { soundEnabled: true, darkMode: true };
        this.applyTheme(this.settings.darkMode);

        this.testInfo = {
            storyMemoryReading: {
                title: "Story Memory (Reading)",
                desc: "Read the following short story carefully. You will be tested on the details later. You have 30 seconds."
            },
            audioReaction: {
                title: "Audio Reaction Time",
                desc: "The screen will instruct you to wait. When you hear a <strong>beep</strong>, press the <strong>Spacebar</strong> as fast as you can. Make sure your volume is turned on."
            },
            visualReaction: {
                title: "Visual Reaction Time",
                desc: "The screen will turn red. When it turns green, press the <strong>Spacebar</strong> as fast as you can. Do not press it before."
            },
            inhibitoryControl: {
                title: "Inhibitory Control",
                desc: "The screen will be red. Press the <strong>Spacebar</strong> ONLY when it turns green. A distractor beep may play randomly. If you press the Spacebar on the beep before the color changes, you fail the round."
            },
            flankerArrow: {
                title: "Flanker Arrow Task",
                desc: "A row of 5 arrows will flash on screen. Look ONLY at the <strong>middle arrow</strong>.<br><br>Press the <strong>Left Arrow Key</strong> if it points left (←).<br>Press the <strong>Right Arrow Key</strong> if it points right (→).<br><br>Ignore the outer arrows. This will repeat 10 times. Be as fast and accurate as possible."
            },
            visualSpatialMemory: {
                title: "Sequential Spatial Memory",
                desc: "A sequence of blocks will light up on the grid. Remember the pattern.<br><br>When they disappear, click the blocks in the <strong>exact same order</strong> they appeared. Press 'Confirm Pattern' when finished."
            },
            simultaneousSpatialMemory: {
                title: "Simultaneous Spatial Memory",
                desc: "Several blocks will light up on the grid <strong>all at once</strong> for 2 seconds.<br><br>When they disappear, click all the blocks that were lit. The order does not matter. Press 'Confirm Pattern' when finished."
            },
            sequentialNumberMemory: {
                title: "Sequential Number Memory",
                desc: "A sequence of 9 numbers will flash on the screen one by one. Remember the sequence.<br><br>Afterward, type the entire sequence into the box and submit."
            },
            reverseSequentialNumberMemory: {
                title: "Reverse Sequential Numbers",
                desc: "A sequence of 9 numbers will flash on the screen.<br><br>Afterward, type the entire sequence in <strong>REVERSE order</strong> (e.g., if you saw 1-2-3, type 3-2-1). Be careful!"
            },
            nBackTask: {
                title: "N-Back Task (2-Back)",
                desc: "A sequence of 25 letters will appear one by one.<br><br>Press the <strong>Spacebar</strong> ONLY if the current letter matches the letter you saw <strong>2 steps ago</strong> (e.g., A -> B -> A).<br><br>Do not press anything if it does not match."
            },
            storyMemoryQuestions: {
                title: "Story Memory Recall",
                desc: "Answer the questions about the story you read at the beginning of the test."
            },
            addressMemoryReading: {
                title: "Address Memory (Reading)",
                desc: "Read the following address carefully. You will be tested on the exact details later. You have 15 seconds."
            },
            addressMemoryQuestions: {
                title: "Address Memory Recall",
                desc: "Select the EXACT address you read earlier. Watch out for minor trick differences."
            },
            chimpTest: {
                title: "Chimp Test",
                desc: "Numbers 1-8 will appear on a 4×4 grid. Click them in ascending order (1, 2, 3...).<br><br>After your <strong>first click</strong>, all remaining numbers will be hidden. Remember their positions!<br><br>Wrong clicks count as mistakes. Try to make <strong>zero mistakes</strong>."
            },
            mentalMath: {
                title: "Mental Math",
                desc: "Solve 12 math problems as fast as possible. You have <strong>20 seconds</strong> per question. Press Enter to submit."
            },
            storyMath: {
                title: "Story Math",
                desc: "Solve 5 math word problems. You have <strong>60 seconds</strong> per question. Press Enter to submit."
            }
        };

        this.stories = [
            {
                text: "On a rainy Tuesday afternoon, Jordan drove all the way to Missouri to visit a local farmer's market. He was determined to find the best ingredients for his famous pie and ended up buying exactly 4 bright red apples from a vendor named Sarah.",
                questions: [
                    { prompt: "What state did Jordan visit?", options: ["Mississippi", "Missouri", "Montana"], answer: "1" },
                    { prompt: "How many apples were purchased?", options: ["3", "4", "5"], answer: "1" },
                    { prompt: "What was the vendor's name?", options: ["Sarah", "Megan", "Emily"], answer: "0" },
                    { prompt: "What day of the week was it?", options: ["Monday", "Tuesday", "Wednesday"], answer: "1" },
                    { prompt: "What was the weather like?", options: ["Sunny", "Rainy", "Cloudy"], answer: "1" }
                ]
            },
            {
                text: "Early Saturday morning, Emily took a train down to sunny Florida for a weekend getaway. While walking along the boardwalk, she stopped at a small souvenir shop and purchased 7 colorful postcards to send to her friends back home.",
                questions: [
                    { prompt: "What state did Emily visit?", options: ["Florida", "Georgia", "California"], answer: "0" },
                    { prompt: "How many postcards did she purchase?", options: ["5", "7", "9"], answer: "1" },
                    { prompt: "How did Emily travel to her destination?", options: ["Bus", "Train", "Plane"], answer: "1" },
                    { prompt: "Where did she stop to buy souvenirs?", options: ["Boardwalk", "Main Street", "Train Station"], answer: "0" },
                    { prompt: "What time of day did she leave?", options: ["Early morning", "Late afternoon", "Midnight"], answer: "0" }
                ]
            },
            {
                text: "During his winter vacation in Colorado, Michael decided to try snowboarding for the very first time. After a long day on the slopes, he went into the lodge and ordered 3 large cups of hot cocoa to share with his family.",
                questions: [
                    { prompt: "What state was Michael visiting?", options: ["Utah", "Colorado", "Wyoming"], answer: "1" },
                    { prompt: "How many cups of hot cocoa did he order?", options: ["2", "3", "4"], answer: "1" },
                    { prompt: "What sport did Michael try for the first time?", options: ["Skiing", "Snowboarding", "Ice Skating"], answer: "1" },
                    { prompt: "Who did he share his drinks with?", options: ["Friends", "Colleagues", "Family"], answer: "2" },
                    { prompt: "What season was it?", options: ["Autumn", "Winter", "Spring"], answer: "1" }
                ]
            },
            {
                text: "In the middle of July, Samantha flew out to California to attend a prestigious tech conference. Before the event started, she visited a local café and bought 2 iced coffees, one for herself and one for her colleague.",
                questions: [
                    { prompt: "What state did Samantha fly to?", options: ["Washington", "California", "Texas"], answer: "1" },
                    { prompt: "How many iced coffees did she buy?", options: ["1", "2", "3"], answer: "1" },
                    { prompt: "What kind of event was Samantha attending?", options: ["Music festival", "Tech conference", "Art exhibition"], answer: "1" },
                    { prompt: "What month was it?", options: ["June", "July", "August"], answer: "1" },
                    { prompt: "Who was the second coffee for?", options: ["Her sister", "Her boss", "Her colleague"], answer: "2" }
                ]
            },
            {
                text: "David went on a road trip across Texas to document historic landmarks for his photography portfolio. In the small town of Marfa, he purchased 5 vintage road signs from an antique dealer.",
                questions: [
                    { prompt: "What state was David traveling across?", options: ["Texas", "New Mexico", "Arizona"], answer: "0" },
                    { prompt: "How many vintage road signs did he purchase?", options: ["4", "5", "6"], answer: "1" },
                    { prompt: "What was David documenting?", options: ["Local wildlife", "Historic landmarks", "Modern architecture"], answer: "1" },
                    { prompt: "In what town did he buy the signs?", options: ["Austin", "Marfa", "El Paso"], answer: "1" },
                    { prompt: "Who did he buy the signs from?", options: ["Garage sale", "Street artist", "Antique dealer"], answer: "2" }
                ]
            },
            {
                text: "Last autumn, Olivia traveled to Vermont to see the changing leaves. While exploring a quaint village, she stopped at a maple syrup farm and bought 6 glass bottles of pure organic syrup as gifts.",
                questions: [
                    { prompt: "What state did Olivia travel to?", options: ["Maine", "New Hampshire", "Vermont"], answer: "2" },
                    { prompt: "How many bottles of syrup did she buy?", options: ["4", "6", "8"], answer: "1" },
                    { prompt: "What was Olivia looking at?", options: ["Snowy peaks", "Changing leaves", "Wildflowers"], answer: "1" },
                    { prompt: "Where did she stop to buy the syrup?", options: ["General store", "Maple syrup farm", "Airport gift shop"], answer: "1" },
                    { prompt: "What kind of syrup was it?", options: ["Artificial", "Pure organic", "Flavored"], answer: "1" }
                ]
            },
            {
                text: "James moved to noisy New York early last year to pursue his dream of becoming an actor. After his first successful audition, he celebrated by buying 9 hot dogs from a famous street vendor in Times Square.",
                questions: [
                    { prompt: "What state does James live in?", options: ["New York", "New Jersey", "Pennsylvania"], answer: "0" },
                    { prompt: "How many hot dogs did he buy?", options: ["7", "8", "9"], answer: "2" },
                    { prompt: "What is James's dream career?", options: ["Musician", "Actor", "Director"], answer: "1" },
                    { prompt: "Where was the hot dog vendor located?", options: ["Central Park", "Brooklyn Bridge", "Times Square"], answer: "2" },
                    { prompt: "What was he celebrating?", options: ["His birthday", "A new apartment", "A successful audition"], answer: "2" }
                ]
            },
            {
                text: "While visiting her grandparents in Arizona, Chloe decided to hike the Grand Canyon at sunrise. On her way out of the national park, she stopped at the visitor center and collected 8 different scenic stamps.",
                questions: [
                    { prompt: "What state was Chloe visiting?", options: ["Nevada", "Arizona", "Utah"], answer: "1" },
                    { prompt: "How many scenic stamps did she collect?", options: ["6", "8", "10"], answer: "1" },
                    { prompt: "Who was Chloe visiting?", options: ["Her parents", "Her grandparents", "Her cousins"], answer: "1" },
                    { prompt: "What time of day did she hike?", options: ["Sunrise", "Noon", "Sunset"], answer: "0" },
                    { prompt: "Where did she collect the stamps?", options: ["Trailhead", "Hotel lobby", "Visitor center"], answer: "2" }
                ]
            },
            {
                text: "Last spring, Benjamin drove his camper van up to Washington state to explore the dense forests. At a roadside diner near Seattle, he was famously known to have eaten 11 blueberry pancakes in one sitting.",
                questions: [
                    { prompt: "What state did Benjamin drive to?", options: ["Oregon", "Washington", "Idaho"], answer: "1" },
                    { prompt: "How many blueberry pancakes did he eat?", options: ["9", "11", "13"], answer: "1" },
                    { prompt: "What kind of vehicle was he driving?", options: ["Camper van", "Pickup truck", "Convertible"], answer: "0" },
                    { prompt: "What city was the diner near?", options: ["Portland", "Seattle", "Tacoma"], answer: "1" },
                    { prompt: "What was he exploring?", options: ["Coastal beaches", "Mountain ranges", "Dense forests"], answer: "2" }
                ]
            },
            {
                text: "Isabella took a month off to travel through beautiful Hawaii. At a traditional luau in Honolulu, she bought 14 lei necklaces to hand out to everyone in her tour group.",
                questions: [
                    { prompt: "What state was Isabella traveling through?", options: ["Hawaii", "Florida", "California"], answer: "0" },
                    { prompt: "How many lei necklaces did she buy?", options: ["10", "12", "14"], answer: "2" },
                    { prompt: "What city was the luau in?", options: ["Hilo", "Honolulu", "Kailua"], answer: "1" },
                    { prompt: "Who were the necklaces for?", options: ["Her family", "Her tour group", "Random strangers"], answer: "1" },
                    { prompt: "How long was her trip?", options: ["A week", "A month", "Two months"], answer: "1" }
                ]
            },
            {
                text: "Lucas attended a massive music festival down in Tennessee during a historic heat wave. Trying to stay cool, he purchased exactly 12 bottles of water over the course of the three-day event.",
                questions: [
                    { prompt: "What state was the music festival in?", options: ["Kentucky", "Tennessee", "Mississippi"], answer: "1" },
                    { prompt: "How many bottles of water did Lucas purchase?", options: ["10", "12", "14"], answer: "1" },
                    { prompt: "What was the weather like during the festival?", options: ["Heavy rain", "Strong winds", "Heat wave"], answer: "2" },
                    { prompt: "How long was the event?", options: ["Two days", "Three days", "Four days"], answer: "1" },
                    { prompt: "What was Lucas trying to do by buying water?", options: ["Keep hydrated", "Stay cool", "Save money"], answer: "1" }
                ]
            },
            {
                text: "Every year, Sophia drives up to Maine for the annual seafood festival. This year, she outdid herself by ordering and individually eating 15 steamed lobsters over the course of the week.",
                questions: [
                    { prompt: "What state does Sophia drive to?", options: ["Massachusetts", "Maine", "Rhode Island"], answer: "1" },
                    { prompt: "How many lobsters did she eat?", options: ["12", "15", "18"], answer: "1" },
                    { prompt: "What kind of festival was it?", options: ["Agriculture festival", "Music festival", "Seafood festival"], answer: "2" },
                    { prompt: "How often does Sophia go there?", options: ["Every year", "Every two years", "Only once"], answer: "0" },
                    { prompt: "How were the lobsters prepared?", options: ["Grilled", "Steamed", "Fried"], answer: "1" }
                ]
            },
            {
                text: "William was sent on a quick business trip to bustling Illinois for a major corporate merger. During a long delay at O'Hare Airport, he grabbed exactly 10 chocolate chip cookies from a bakery to keep his team happy.",
                questions: [
                    { prompt: "What state was William sent to?", options: ["Illinois", "Indiana", "Ohio"], answer: "0" },
                    { prompt: "How many cookies did he grab?", options: ["8", "10", "12"], answer: "1" },
                    { prompt: "What was the reason for his trip?", options: ["Vacation", "Acting audition", "Corporate merger"], answer: "2" },
                    { prompt: "Where did he buy the cookies?", options: ["Train station", "O'Hare Airport", "Downtown bakery"], answer: "1" },
                    { prompt: "What flavor were the cookies?", options: ["Oatmeal raisin", "Sugar", "Chocolate chip"], answer: "2" }
                ]
            },
            {
                text: "To celebrate his graduation, Ethan took a solo backpacking trip across rugged Montana. At a local outfitter shop in Bozeman, he realized he was underprepared and bought 13 pairs of thick woolen socks.",
                questions: [
                    { prompt: "What state did Ethan backpack across?", options: ["Wyoming", "Montana", "Colorado"], answer: "1" },
                    { prompt: "How many pairs of socks did he buy?", options: ["11", "13", "15"], answer: "1" },
                    { prompt: "What was Ethan celebrating?", options: ["New job", "Graduation", "Birthday"], answer: "1" },
                    { prompt: "In what city was the outfitter shop?", options: ["Bozeman", "Missoula", "Helena"], answer: "0" },
                    { prompt: "What kind of socks were they?", options: ["Cotton", "Synthetic", "Woolen"], answer: "2" }
                ]
            },
            {
                text: "For her honeymoon, Mia arranged a romantic getaway to an isolated cabin in peaceful Oregon. While foraging in the woods nearby, she surprisingly managed to find exactly 16 rare wild mushrooms.",
                questions: [
                    { prompt: "What state was Mia visiting?", options: ["Washington", "Oregon", "California"], answer: "1" },
                    { prompt: "How many wild mushrooms did she find?", options: ["14", "16", "18"], answer: "1" },
                    { prompt: "What was the occasion for Mia's trip?", options: ["Birthday", "Honeymoon", "Promotion"], answer: "1" },
                    { prompt: "Where was Mia staying?", options: ["Luxury hotel", "Isolated cabin", "Campsite"], answer: "1" },
                    { prompt: "What was Mia doing when she found the mushrooms?", options: ["Hiking", "Fishing", "Foraging"], answer: "2" }
                ]
            },
            {
                text: "On a sunny Thursday morning, Noah drove through New Mexico to explore ancient cliff dwellings. He was fascinated by the local craftsmanship and ended up buying 3 pieces of handcrafted pottery from an artist named Diego.",
                questions: [
                    { prompt: "What state did Noah drive through?", options: ["Arizona", "New Mexico", "Texas"], answer: "1" },
                    { prompt: "How many pieces of pottery did he buy?", options: ["2", "3", "5"], answer: "1" },
                    { prompt: "What was the artist's name?", options: ["Diego", "Carlos", "Mateo"], answer: "0" },
                    { prompt: "What was Noah exploring?", options: ["Canyons", "Forests", "Ancient cliff dwellings"], answer: "2" },
                    { prompt: "What day of the week was it?", options: ["Tuesday", "Thursday", "Saturday"], answer: "1" }
                ]
            },
            {
                text: "On a hot July afternoon, Ava visited a fruit orchard in Georgia to experience the local harvest. She spent hours wandering the trees and eventually picked 18 ripe peaches to make some fresh jam.",
                questions: [
                    { prompt: "What state did Ava visit?", options: ["Alabama", "Georgia", "South Carolina"], answer: "1" },
                    { prompt: "How many peaches did she pick?", options: ["15", "18", "20"], answer: "1" },
                    { prompt: "What month was it?", options: ["June", "July", "August"], answer: "1" },
                    { prompt: "What did she want to make with the fruit?", options: ["Pie", "Smoothies", "Fresh jam"], answer: "2" },
                    { prompt: "What was the weather like?", options: ["Cold", "Cool", "Hot"], answer: "2" }
                ]
            },
            {
                text: "During his weekend in Nevada, Liam spent some time at a vintage shop in Las Vegas. While browsing through historical items, he found exactly 20 heavy poker chips from an old closed casino.",
                questions: [
                    { prompt: "What state was Liam in?", options: ["Nevada", "California", "Arizona"], answer: "0" },
                    { prompt: "How many poker chips did he find?", options: ["10", "15", "20"], answer: "2" },
                    { prompt: "What city was he in?", options: ["Reno", "Las Vegas", "Carson City"], answer: "1" },
                    { prompt: "Where did he find the items?", options: ["Casino floor", "Vintage shop", "Pawn shop"], answer: "1" },
                    { prompt: "What kind of casino were the chips from?", options: ["New resort", "Old closed casino", "Underground club"], answer: "1" }
                ]
            },
            {
                text: "While on an expedition in Alaska, Charlotte stopped at a small supply store to pick up some last-minute gear. She was preparing for a day of wildlife spotting and purchased 2 pairs of professional binoculars for whale watching.",
                questions: [
                    { prompt: "What state was Charlotte in?", options: ["Alaska", "Washington", "Oregon"], answer: "0" },
                    { prompt: "How many pairs of binoculars did she buy?", options: ["1", "2", "3"], answer: "1" },
                    { prompt: "What was Charlotte doing in the state?", options: ["Fishing trip", "Expedition", "Skiing vacation"], answer: "1" },
                    { prompt: "What was she planning to go watch?", options: ["Bears", "Eagles", "Whales"], answer: "2" },
                    { prompt: "Where did she buy her gear?", options: ["Department store", "Small supply store", "Online"], answer: "1" }
                ]
            },
            {
                text: "Early one Sunday, Henry walked through the French Quarter in Louisiana to enjoy the local atmosphere. He followed the smell of sugar and ordered 6 warm beignets from a famous cafe to share with his friends.",
                questions: [
                    { prompt: "What state was Henry in?", options: ["Mississippi", "Louisiana", "Alabama"], answer: "1" },
                    { prompt: "How many beignets did he order?", options: ["3", "6", "9"], answer: "1" },
                    { prompt: "What area was Henry walking through?", options: ["Garden District", "French Quarter", "Riverwalk"], answer: "1" },
                    { prompt: "What day of the week was it?", options: ["Friday", "Saturday", "Sunday"], answer: "2" },
                    { prompt: "Who were the treats for?", options: ["Himself only", "His family", "His friends"], answer: "2" }
                ]
            }
        ];

        this.addresses = [
            { text: "4820 Redwood St, Seattle, WA, USA", options: ["4820 Redwood St, Seattle, WA, USA", "4820 Rosewood St, Seattle, WA, USA", "4280 Redwood St, Seattle, WA, USA", "4820 Redwood St, Seattle, OR, USA"], answer: "0" },
            { text: "1594 Oakhaven Dr, Austin, TX, USA", options: ["1594 Oaklawn Dr, Austin, TX, USA", "1594 Oakhaven Dr, Austin, TX, USA", "1549 Oakhaven Dr, Austin, TX, USA", "1594 Oakhaven Dr, Houston, TX, USA"], answer: "1" },
            { text: "7311 Maplewood Ave, Denver, CO, USA", options: ["7131 Maplewood Ave, Denver, CO, USA", "7311 Maplerose Ave, Denver, CO, USA", "7311 Maplewood Ave, Boulder, CO, USA", "7311 Maplewood Ave, Denver, CO, USA"], answer: "3" },
            { text: "2956 Pinecrest Ln, Miami, FL, USA", options: ["2956 Pinecrest Ln, Miami, FL, USA", "2596 Pinecrest Ln, Miami, FL, USA", "2956 Pinehurst Ln, Miami, FL, USA", "2956 Pinecrest Ln, Tampa, FL, USA"], answer: "0" },
            { text: "8043 Willow Grove, Boston, MA, USA", options: ["8043 Willow Brook, Boston, MA, USA", "8403 Willow Grove, Boston, MA, USA", "8043 Willow Grove, Boston, MA, USA", "8043 Willow Grove, Boston, ME, USA"], answer: "2" },
            { text: "6127 Cedar Point, Phoenix, AZ, USA", options: ["6217 Cedar Point, Phoenix, AZ, USA", "6127 Cedar Point, Tucson, AZ, USA", "6127 Center Point, Phoenix, AZ, USA", "6127 Cedar Point, Phoenix, AZ, USA"], answer: "3" },
            { text: "3489 Birchwood Way, Portland, OR, USA", options: ["3489 Birchwood Way, Portland, WA, USA", "3489 Birchwood Way, Portland, OR, USA", "3498 Birchwood Way, Portland, OR, USA", "3489 Beechwood Way, Portland, OR, USA"], answer: "1" },
            { text: "5712 Aspen Ridge, Raleigh, NC, USA", options: ["5712 Aspen Ridge, Raleigh, SC, USA", "5172 Aspen Ridge, Raleigh, NC, USA", "5712 Aspen Ridge, Raleigh, NC, USA", "5712 Ash Ridge, Raleigh, NC, USA"], answer: "2" },
            { text: "9205 Sycamore Ct, Atlanta, GA, USA", options: ["9205 Sycamore Ct, Atlanta, GA, USA", "9025 Sycamore Ct, Atlanta, GA, USA", "9205 Sycamore Dr, Atlanta, GA, USA", "9205 Sycamore Ct, Athens, GA, USA"], answer: "0" },
            { text: "4368 Elmhurst Blvd, Chicago, IL, USA", options: ["4386 Elmhurst Blvd, Chicago, IL, USA", "4368 Elmhurst Blvd, Chicago, IN, USA", "4368 Elmwood Blvd, Chicago, IL, USA", "4368 Elmhurst Blvd, Chicago, IL, USA"], answer: "3" },
            { text: "1854 Hickory Ln, Nashville, TN, USA", options: ["1854 Hickory Ln, Nashville, TN, USA", "1845 Hickory Ln, Nashville, TN, USA", "1854 Hickory Dr, Nashville, TN, USA", "1854 Hickory Ln, Knoxville, TN, USA"], answer: "0" },
            { text: "7932 Chestnut St, Madison, WI, USA", options: ["7932 Chestnut St, Milwaukee, WI, USA", "7932 Chestnut St, Madison, WI, USA", "7392 Chestnut St, Madison, WI, USA", "7932 Walnut St, Madison, WI, USA"], answer: "1" },
            { text: "2648 Magnolia Pkwy, Orlando, FL, USA", options: ["2648 Magnolia Pkwy, Orlando, CA, USA", "2468 Magnolia Pkwy, Orlando, FL, USA", "2648 Magnolia Pkwy, Orlando, FL, USA", "2648 Marigold Pkwy, Orlando, FL, USA"], answer: "2" },
            { text: "5071 Juniper Cir, Bellevue, WA, USA", options: ["5071 Juniper Cir, Bellevue, WA, USA", "5701 Juniper Cir, Bellevue, WA, USA", "5071 Juniper Ct, Bellevue, WA, USA", "5071 Jupiter Cir, Bellevue, WA, USA"], answer: "0" },
            { text: "6839 Cypress Dr, Omaha, NE, USA", options: ["6893 Cypress Dr, Omaha, NE, USA", "6839 Cypress Way, Omaha, NE, USA", "6839 Cypress Dr, Lincoln, NE, USA", "6839 Cypress Dr, Omaha, NE, USA"], answer: "3" },
            { text: "3194 Spruce Trl, Boise, ID, USA", options: ["3194 Spruce Trl, Boise, IA, USA", "3194 Spruce Trl, Boise, ID, USA", "3914 Spruce Trl, Boise, ID, USA", "3194 Spring Trl, Boise, ID, USA"], answer: "1" },
            { text: "8526 Dogwood Ave, Fargo, ND, USA", options: ["8526 Dogwood Ave, Fargo, SD, USA", "8256 Dogwood Ave, Fargo, ND, USA", "8526 Dogwood Ave, Fargo, ND, USA", "8526 Dogwood Ln, Fargo, ND, USA"], answer: "2" },
            { text: "1407 Poplar Pl, Reno, NV, USA", options: ["1407 Poplar Pl, Reno, NV, USA", "1470 Poplar Pl, Reno, NV, USA", "1407 Popular Pl, Reno, NV, USA", "1407 Poplar Pl, Vegas, NV, USA"], answer: "0" },
            { text: "4753 Alder Xing, Tulsa, OK, USA", options: ["4753 Alder Xing, Tulsa, TX, USA", "4573 Alder Xing, Tulsa, OK, USA", "4753 Aster Xing, Tulsa, OK, USA", "4753 Alder Xing, Tulsa, OK, USA"], answer: "3" },
            { text: "9618 Hazel Rd, Mesa, AZ, USA", options: ["9618 Hazel Rd, Mesa, NM, USA", "9618 Hazel Rd, Mesa, AZ, USA", "9168 Hazel Rd, Mesa, AZ, USA", "9618 Hazel Ln, Mesa, AZ, USA"], answer: "1" }
        ];

        // Game-specific variables
        this.gameData = {
            timeoutId: null,
            intervalId: null,
            distractorIntervalId: null,
            startTime: null,
            isWaiting: false,
            audioCtx: null,
            // Multi-trial tracking
            currentTrialCount: 0,
            trialTimes: [],
            trialScores: [],

            // Flanker specific
            flankerTrialsTotal: 10,
            flankerCurrentTrial: 0,
            flankerErrors: 0,
            flankerTimes: [],
            flankerCurrentDirection: null,
            flankerCanPress: false,
            flankerFeedbackTimeout: null,
            // Spatial Grid specific
            gridSequence: [],
            userGridSequence: [],
            gridCells: [],
            // Number Memory specific
            numberSequence: [],
            // N-Back specific
            nBackSequence: [],
            nBackCurrentIndex: 0,
            nBackHits: 0,
            nBackMisses: 0,
            nBackFalseAlarms: 0,
            nBackCanPress: false,
            nBackCurrentTarget: false
        };

        this.storyMathTemplates = [
            // 1. Shopping Change
            () => {
                const names = ["Michael", "Sarah", "David", "Emily", "John", "Anna"];
                const name = names[Math.floor(Math.random() * names.length)];
                const items = ["apples", "notebooks", "coffee mugs", "T-shirts", "plants"];
                const item = items[Math.floor(Math.random() * items.length)];
                const budget = Math.floor(Math.random() * 5 + 5) * 10; // 50 to 90
                const qty = Math.floor(Math.random() * 4) + 3; // 3 to 6
                const price = Math.floor(Math.random() * 6) + 4; // 4 to 9
                const extra = Math.floor(Math.random() * 8) + 5; // 5 to 12
                const text = `${name} goes to the store with $${budget} in cash. They buy ${qty} ${item} for $${price} each. At the register, they also grab a snack for $${extra}. How much change should they receive?`;
                const answer = budget - (qty * price) - extra;
                return { text, answer };
            },
            // 2. Travel Time with Break
            () => {
                const names = ["Jessica", "Mark", "Olivia", "Ethan"];
                const name = names[Math.floor(Math.random() * names.length)];
                const speed1 = (Math.floor(Math.random() * 3) + 6) * 10; // 60, 70, 80
                const hours1 = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
                const speed2 = (Math.floor(Math.random() * 3) + 7) * 10; // 70, 80, 90
                const hours2 = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
                const breakHours = 1;
                const totalDist = (speed1 * hours1) + (speed2 * hours2);
                const text = `${name} is driving a total distance of ${totalDist} km. For the first ${hours1} hours, they drive at ${speed1} km/h. They then take a 1-hour break. If they drive the remaining distance at ${speed2} km/h, how many total hours will the whole trip take from start to finish?`;
                const answer = hours1 + breakHours + hours2;
                return { text, answer };
            },
            // 3. Ratios and Splitting
            () => {
                const multi = Math.floor(Math.random() * 4) + 3; // 3 to 6
                const total = multi * 12; // 36, 48, 60, 72
                const groupA = total / 4;
                const extra = Math.floor(Math.random() * 5) + 4; // 4 to 8
                const groupB = groupA + extra;
                const text = `A bakery makes a batch of ${total} cookies for 3 classrooms. Classroom A receives exactly one-quarter of the cookies. Classroom B receives ${extra} more cookies than Classroom A. Classroom C gets the rest. How many cookies does Classroom C receive?`;
                const answer = total - groupA - groupB;
                return { text, answer };
            },
            // 4. Area / Tiling
            () => {
                const width = Math.floor(Math.random() * 5) + 10; // 10 to 14
                const length = Math.floor(Math.random() * 5) + 12; // 12 to 16
                const area = width * length;
                const tile = (Math.random() > 0.5) ? 2 : 4; // 2 or 4 sq ft
                const text = `A room is ${width} feet wide and ${length} feet long. You want to cover the floor with tiles that are each ${tile} square feet. How many tiles do you need?`;
                const answer = area / tile;
                return { text, answer };
            },
            // 5. Hourly Wage
            () => {
                const wage = Math.floor(Math.random() * 6) + 15; // 15 to 20
                const hours = Math.floor(Math.random() * 3) + 6; // 6 to 8
                const days = Math.floor(Math.random() * 3) + 4; // 4 to 6
                const spend = Math.floor(Math.random() * 5) * 50 + 100; // 100 to 300
                const text = `A contractor earns $${wage} per hour. They work ${hours} hours a day for ${days} days. If they spend $${spend} on supplies, how much money do they have left?`;
                const answer = (wage * hours * days) - spend;
                return { text, answer };
            },
            // 6. Discount
            () => {
                const base = (Math.floor(Math.random() * 6) + 4) * 20; // 80, 100 ... 180
                const discount = 25; // 25%
                const coupon = Math.floor(Math.random() * 3) * 5 + 10; // 10, 15, 20
                const text = `A jacket originally costs $${base}. It is on sale for ${discount}% off. You also have a coupon for an additional $${coupon} off the sale price. What is the final price?`;
                const answer = (base * (1 - discount / 100)) - coupon;
                return { text, answer };
            },
            // 7. Age logic
            () => {
                const names = ["Tom", "Lucy", "Sam", "Mia"];
                const name = names[Math.floor(Math.random() * names.length)];
                const ageA = Math.floor(Math.random() * 5) + 10; // 10 to 14
                const years = Math.floor(Math.random() * 6) + 5; // 5 to 10
                const text = `${name} is ${ageA} years old. Their older sibling is exactly twice as old. In ${years} years, how old will the older sibling be?`;
                const answer = (ageA * 2) + years;
                return { text, answer };
            },
            // 8. Fundraising
            () => {
                const total = Math.floor(Math.random() * 5 + 2) * 100; // 200 to 600
                const a = Math.floor(total * 0.4 / 10) * 10;
                const b = a / 2;
                const text = `A school club needs to raise $${total}. Student A raised $${a}. Student B raised exactly half as much as Student A. Student C raised the rest to hit the goal. How much did Student C raise?`;
                const answer = total - a - b;
                return { text, answer };
            },
            // 9. Inventory
            () => {
                const start = (Math.floor(Math.random() * 6) + 6) * 3; // 18, 21 ... 33
                const shipment = Math.floor(Math.random() * 10) + 15; // 15 to 24
                const text = `A bookstore starts the week with ${start} copies of a bestseller. They sell entirely one-third of their stock. Then, they receive a new shipment of ${shipment} copies. How many copies do they have now?`;
                const answer = (start - (start / 3)) + shipment;
                return { text, answer };
            },
            // 10. Reading Speed
            () => {
                const days = Math.floor(Math.random() * 4) + 5; // 5 to 8
                const speed = Math.floor(Math.random() * 10) + 20; // 20 to 29
                const pages = days * speed;
                const text = `A book has exactly ${pages} pages. If you read at a steady pace of ${speed} pages per day, how many days will it take to finish the book?`;
                const answer = days;
                return { text, answer };
            },
            // 11. Splitting Bill
            () => {
                const people = Math.floor(Math.random() * 3) + 3; // 3 to 5
                const perPerson = Math.floor(Math.random() * 10) + 15; // 15 to 24
                const total = people * perPerson;
                const tip = Math.floor(Math.random() * 5) + 10; // 10 to 14
                const text = `A group of ${people} friends go to dinner. The total bill including tip is $${total + tip}. They want to split the food bill evenly, but one person decides to pay the entire $${tip} tip themselves. How much do the OTHER friends pay each?`;
                const answer = total / people;
                return { text, answer };
            },
            // 12. Paint
            () => {
                const cans = Math.floor(Math.random() * 4) + 4; // 4 to 7
                const coverage = Math.floor(Math.random() * 10) + 30; // 30 to 39
                const total = cans * coverage;
                const text = `You need to paint a fence that is ${total} feet long. One can of paint perfectly covers ${coverage} feet. You already have 2 cans in your garage. How many NEW cans do you need to buy?`;
                const answer = cans - 2;
                return { text, answer };
            },
            // 13. Subscriptions
            () => {
                const plan1 = Math.floor(Math.random() * 5) + 10; // 10 to 14
                const plan2 = plan1 + 5;
                const text = `A streaming service costs $${plan1} per month. You subscribe for a full year (12 months). Then, you upgrade to the premium plan at $${plan2} per month for the next 6 months. What is your total cost over those 18 months?`;
                const answer = (plan1 * 12) + (plan2 * 6);
                return { text, answer };
            },
            // 14. Animals (Legs)
            () => {
                const cows = Math.floor(Math.random() * 6) + 5; // 5 to 10
                const hens = Math.floor(Math.random() * 10) + 10; // 10 to 19
                const text = `A farmer has ${cows} cows and ${hens} hens. Assuming all animals are healthy, how many animal legs are there in total?`;
                const answer = (cows * 4) + (hens * 2);
                return { text, answer };
            },
            // 15. Savings Goal
            () => {
                const goal = Math.floor(Math.random() * 5 + 5) * 100; // 500 to 900
                const save = Math.floor(Math.random() * 20) + 40; // 40 to 59
                const weeks = Math.floor(Math.random() * 4) + 6; // 6 to 9
                const text = `You want to buy a laptop that costs $${goal}. You save $${save} every week. After ${weeks} weeks of saving, how much MORE money do you need to reach your goal?`;
                const answer = goal - (save * weeks);
                return { text, answer };
            }
        ];

        this.initScreens();
        this.showScreen('menu-screen');
        this.bindEvents();
    }

    initScreens() {
        // Elements are statically in index.html
    }

    showScreen(screenId) {
        if (!['minigame-screen', 'flanker-screen', 'grid-memory-screen', 'number-memory-screen', 'nback-screen'].includes(screenId)) {
            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
        }

        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');

            // Auto-focus inputs if they are visible on the new screen
            const inputs = targetScreen.querySelectorAll('input[type="number"], input[type="text"]');
            if (inputs.length > 0) {
                // Focus the first visible input
                const firstInput = Array.from(inputs).find(input =>
                    input.parentElement.style.display !== 'none' &&
                    input.style.display !== 'none' &&
                    input.style.visibility !== 'hidden'
                );
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 50);
                }
            }
        } else {
            console.error(`Screen ID not found: ${screenId}`);
        }
    }

    bindEvents() {
        // --- Settings & History Menus ---
        document.getElementById('settings-btn').addEventListener('click', () => {
            const modal = document.getElementById('settings-modal');
            modal.style.display = 'flex';
            document.getElementById('toggle-sound').checked = this.settings.soundEnabled;
            document.getElementById('toggle-theme').checked = this.settings.darkMode;
        });

        document.getElementById('close-settings-btn').addEventListener('click', () => {
            document.getElementById('settings-modal').style.display = 'none';
        });

        document.getElementById('toggle-sound').addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('toggle-theme').addEventListener('change', (e) => {
            this.settings.darkMode = e.target.checked;
            this.applyTheme(this.settings.darkMode);
            this.saveSettings();
        });

        document.getElementById('view-history-btn').addEventListener('click', () => {
            this.renderHistory();
            this.showScreen('history-screen');
        });

        document.getElementById('close-history-btn').addEventListener('click', () => {
            this.showScreen('menu-screen');
        });

        // --- Menu Buttons ---
        document.getElementById('start-full-btn').addEventListener('click', () => {
            this.gameData.isIndividualTest = false;

            // Build randomized test sequence
            const selectEl = document.getElementById('duration-select');
            const numRounds = selectEl ? parseInt(selectEl.value) : 1;
            this.gameData.assessmentLengthStr = selectEl ? selectEl.options[selectEl.selectedIndex].text : "Short (1 Round)";
            this.gameData.assessmentStartTime = Date.now();
            this.gameData.numRounds = numRounds; // Store to dynamically calculate round size later
            this.testSequence = [];

            for (let r = 0; r < numRounds; r++) {
                const testsRound = ['audioReaction', 'visualReaction', 'inhibitoryControl', 'flankerArrow', 'visualSpatialMemory', 'simultaneousSpatialMemory', 'sequentialNumberMemory', 'reverseSequentialNumberMemory', 'nBackTask', 'chimpTest', 'mentalMath', 'storyMath'];

                // Shuffle standard tests
                for (let i = testsRound.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [testsRound[i], testsRound[j]] = [testsRound[j], testsRound[i]];
                }

                // Partitioning framework to enforce zero overlap between memory tests
                const gap1 = Math.floor(Math.random() * 2) + 2; // 2 or 3 standard tests between reading/questions 1
                const gap2 = Math.floor(Math.random() * 2) + 2; // 2 or 3 standard tests between reading/questions 2

                const leftovers = testsRound.length - gap1 - gap2;

                // Distribute remainder into outer bounds and between the two tests
                let b1 = Math.floor(Math.random() * (leftovers + 1));
                let b2 = Math.floor(Math.random() * (leftovers - b1 + 1));
                let b3 = leftovers - b1 - b2;

                let roundSeq = [];
                roundSeq = roundSeq.concat(testsRound.splice(0, b1));
                roundSeq.push('MEM1_READ');
                roundSeq = roundSeq.concat(testsRound.splice(0, gap1));
                roundSeq.push('MEM1_QUEST');
                roundSeq = roundSeq.concat(testsRound.splice(0, b2));
                roundSeq.push('MEM2_READ');
                roundSeq = roundSeq.concat(testsRound.splice(0, gap2));
                roundSeq.push('MEM2_QUEST');
                roundSeq = roundSeq.concat(testsRound.splice(0, b3));

                // Randomize which memory type goes first
                if (Math.random() > 0.5) {
                    roundSeq = roundSeq.map(t => {
                        if (t === 'MEM1_READ') return 'storyMemoryReading';
                        if (t === 'MEM1_QUEST') return 'storyMemoryQuestions';
                        if (t === 'MEM2_READ') return 'addressMemoryReading';
                        if (t === 'MEM2_QUEST') return 'addressMemoryQuestions';
                        return t;
                    });
                } else {
                    roundSeq = roundSeq.map(t => {
                        if (t === 'MEM1_READ') return 'addressMemoryReading';
                        if (t === 'MEM1_QUEST') return 'addressMemoryQuestions';
                        if (t === 'MEM2_READ') return 'storyMemoryReading';
                        if (t === 'MEM2_QUEST') return 'storyMemoryQuestions';
                        return t;
                    });
                }

                this.testSequence = this.testSequence.concat(roundSeq);
            }

            // Prepare unique stories equal to numRounds
            let availableStories = [...this.stories];
            for (let i = availableStories.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableStories[i], availableStories[j]] = [availableStories[j], availableStories[i]];
            }
            this.gameData.selectedStoriesQueue = availableStories.slice(0, numRounds);

            // Prepare unique addresses equal to numRounds
            let availableAddresses = [...this.addresses];
            for (let i = availableAddresses.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableAddresses[i], availableAddresses[j]] = [availableAddresses[j], availableAddresses[i]];
            }
            this.gameData.selectedAddressesQueue = availableAddresses.slice(0, numRounds);

            this.currentTestIndex = 0;
            this.state.scores = {};
            this.startGameplay();
        });

        document.getElementById('show-individual-btn').addEventListener('click', () => {
            this.showScreen('practice-screen');
        });

        document.querySelectorAll('.test-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const testId = e.target.getAttribute('data-test');
                this.gameData.isIndividualTest = true;
                this.testSequence = [testId];
                this.currentTestIndex = 0;
                this.state.scores = {};
                this.startGameplay();
            });
        });

        const mathInput = document.getElementById('math-input');
        if (mathInput) {
            mathInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleMathSubmit();
            });
        }
        const submitMathBtn = document.getElementById('submit-math-btn');
        if (submitMathBtn) {
            submitMathBtn.addEventListener('click', () => this.handleMathSubmit());
        }

        document.getElementById('begin-test-btn').addEventListener('click', () => {
            this.startCurrentTest();
        });

        document.getElementById('next-test-btn').addEventListener('click', () => {
            if (this.gameData.isIndividualTest) {
                this.showFinalResults(); // Quick exit for individual test mode
            } else {
                this.currentTestIndex++;
                if (this.currentTestIndex < this.testSequence.length) {
                    this.showInstructions();
                } else {
                    this.showFinalResults();
                }
            }
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.currentTestIndex = 0;
            this.state.scores = {};
            this.showScreen('menu-screen');
        });

        document.getElementById('round-complete-btn').addEventListener('click', () => {
            this.currentTestIndex++;
            this.showInstructions();
        });

        document.getElementById('submit-story-btn').addEventListener('click', () => {
            this.handleStorySubmit();
        });

        document.getElementById('submit-address-btn').addEventListener('click', () => {
            this.handleAddressSubmit();
        });

        document.getElementById('submit-grid-btn').addEventListener('click', () => {
            const testId = this.testSequence[this.currentTestIndex];
            if (testId === 'visualSpatialMemory') {
                this.handleGridSubmitSequential();
            } else if (testId === 'simultaneousSpatialMemory') {
                this.handleGridSubmitSimultaneous();
            }
            // chimpTest has no submit button — it auto-completes
        });

        document.getElementById('submit-number-btn').addEventListener('click', () => {
            const testId = this.testSequence[this.currentTestIndex];
            if (testId === 'reverseSequentialNumberMemory') {
                this.handleReverseNumberSubmit();
            } else {
                this.handleNumberSubmit();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                if (e.target.tagName !== 'INPUT') {
                    e.preventDefault();
                }
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen && activeScreen.id === 'minigame-screen') {
                    this.handleSpacebarReaction();
                } else if (activeScreen && activeScreen.id === 'nback-screen') {
                    this.handleNBackSpacebar();
                }
            } else if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                e.preventDefault();
                this.handleFlankerInput(e.code);
            } else if (e.code === 'Enter') {
                const activeScreen = document.querySelector('.screen.active');
                if (!activeScreen) return;

                if (activeScreen.id === 'math-test-screen') {
                    // Do NOT preventDefault here to allow input submission via listeners if needed,
                    // or explicitly call handleMathSubmit if that's the preferred pattern.
                    // The current listeners on mathInput and submitMathBtn are already set up.
                    // However, we need to make sure we don't block it.
                    this.handleMathSubmit();
                } else if (activeScreen.id === 'number-memory-screen') {
                    const inputContainer = document.getElementById('number-input-container');
                    if (inputContainer && inputContainer.style.display !== 'none') {
                        e.preventDefault();
                        document.getElementById('submit-number-btn').click();
                    }
                } else if (activeScreen.id === 'story-question-screen') {
                    e.preventDefault();
                    document.getElementById('submit-story-btn').click();
                } else if (activeScreen.id === 'address-questions-screen') {
                    e.preventDefault();
                    document.getElementById('submit-address-btn').click();
                } else if (activeScreen.id === 'grid-memory-screen') {
                    const submitBtn = document.getElementById('submit-grid-btn');
                    if (submitBtn && submitBtn.style.visibility !== 'hidden') {
                        e.preventDefault();
                        submitBtn.click();
                    }
                } else if (activeScreen.id === 'instructions-screen') {
                    e.preventDefault();
                    document.getElementById('begin-test-btn').click();
                } else if (activeScreen.id === 'results-screen') {
                    e.preventDefault();
                    document.getElementById('next-test-btn').click();
                } else if (activeScreen.id === 'round-complete-screen') {
                    e.preventDefault();
                    document.getElementById('round-complete-btn').click();
                }
            }
        });
    }

    startGameplay() {
        this.requestFullscreen().then(() => {
            this.initAudioContext();
            this.showInstructions();
        }).catch(err => {
            console.log('Fullscreen failed or blocked. Proceeding anyway.', err);
            this.initAudioContext();
            this.showInstructions();
        });
    }

    requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            return elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            return elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            return elem.msRequestFullscreen();
        }
        return Promise.resolve();
    }

    initAudioContext() {
        if (!this.gameData.audioCtx) {
            this.gameData.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.gameData.audioCtx.state === 'suspended') {
            this.gameData.audioCtx.resume();
        }
    }

    playBeep(frequency = 440, duration = 0.2) {
        if (!this.gameData.audioCtx || !this.settings.soundEnabled) return;
        const oscillator = this.gameData.audioCtx.createOscillator();
        const gainNode = this.gameData.audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.gameData.audioCtx.currentTime);

        gainNode.gain.setValueAtTime(1, this.gameData.audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.gameData.audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.gameData.audioCtx.destination);

        oscillator.start();
        oscillator.stop(this.gameData.audioCtx.currentTime + duration);
    }

    showInstructions() {
        const testId = this.testSequence[this.currentTestIndex];
        const info = this.testInfo[testId];

        let titleHtml = info.title;
        if (!this.gameData.isIndividualTest) {
            const roundSize = this.testSequence.length / this.gameData.numRounds;
            const currentRound = Math.floor(this.currentTestIndex / roundSize) + 1;
            const totalRounds = Math.ceil(this.testSequence.length / roundSize);
            titleHtml = `<span style="font-size: 0.8em; opacity: 0.6; display: block; margin-bottom: 0.5rem; letter-spacing: 1px;">ROUND ${currentRound} OF ${totalRounds}</span>${info.title}`;
        }

        document.getElementById('inst-title').innerHTML = titleHtml;
        document.getElementById('inst-desc').innerHTML = info.desc;

        this.showScreen('instructions-screen');

        // Show and update progress bar during full assessment
        const progressContainer = document.getElementById('progress-container');
        if (!this.gameData.isIndividualTest) {
            progressContainer.style.display = 'block';
            this.updateProgressBar();
        } else {
            progressContainer.style.display = 'none';
        }
    }

    startCurrentTest() {
        const testId = this.testSequence[this.currentTestIndex];

        // Reset timers
        clearTimeout(this.gameData.timeoutId);
        clearInterval(this.gameData.intervalId);
        clearInterval(this.gameData.distractorIntervalId);
        clearTimeout(this.gameData.flankerFeedbackTimeout);
        this.gameData.isWaiting = true;
        this.gameData.startTime = null;

        if (testId === 'storyMemoryReading') {
            this.showScreen('story-reading-screen');

            // Show Progress Bar if Full Assessment
            const progressContainer = document.getElementById('progress-container');
            if (!this.gameData.isIndividualTest) {
                progressContainer.style.display = 'block';
                this.updateProgressBar();
            } else {
                progressContainer.style.display = 'none';
            }

            // Pop unique random story from queue, or fallback to random
            if (this.gameData.selectedStoriesQueue && this.gameData.selectedStoriesQueue.length > 0) {
                this.gameData.currentStory = this.gameData.selectedStoriesQueue.shift();
            } else {
                this.gameData.currentStory = this.stories[Math.floor(Math.random() * this.stories.length)];
            }
            document.getElementById('story-text').textContent = this.gameData.currentStory.text;

            let timeLeft = 30;
            const timerDisplay = document.getElementById('story-timer');
            timerDisplay.textContent = timeLeft;

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.state.scores[testId] = "Completed";
                    this.currentTestIndex++;
                    this.showInstructions();
                }
            }, 1000);
            return;
        }

        if (testId === 'storyMemoryQuestions') {
            this.showScreen('story-question-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();

            const container = document.getElementById('dynamic-questions-container');
            const story = this.gameData.currentStory;

            // Randomly select 2 unique indices from the 5 questions
            const indices = [0, 1, 2, 3, 4];
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            const selectedIndices = indices.slice(0, 2);
            this.gameData.currentQuestions = selectedIndices.map(i => story.questions[i]);

            // Shuffle options for each question while tracking correct answer
            this.gameData.shuffledStoryAnswers = [];
            for (let q = 0; q < 2; q++) {
                const question = this.gameData.currentQuestions[q];
                const correctIdx = parseInt(question.answer);
                const indexed = question.options.map((opt, i) => ({ opt, isCorrect: i === correctIdx }));
                for (let i = indexed.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
                }
                const newCorrectIdx = indexed.findIndex(item => item.isCorrect);
                this.gameData.shuffledStoryAnswers.push(String(newCorrectIdx));

                this.gameData.currentQuestions[q] = {
                    ...question,
                    shuffledOptions: indexed.map(item => item.opt)
                };
            }

            container.innerHTML = `
                <h2 id="story-q1">${this.gameData.currentQuestions[0].prompt}</h2>
                <div class="options">
                    ${this.gameData.currentQuestions[0].shuffledOptions.map((opt, i) => `<label><input type="radio" name="q1" value="${i}"> ${opt}</label>`).join('')}
                </div>
                <h2 id="story-q2">${this.gameData.currentQuestions[1].prompt}</h2>
                <div class="options">
                    ${this.gameData.currentQuestions[1].shuffledOptions.map((opt, i) => `<label><input type="radio" name="q2" value="${i}"> ${opt}</label>`).join('')}
                </div>
            `;

            // Add timer to questions screen
            let timeLeft = 30;
            const existingTimer = document.getElementById('story-questions-timer');
            if (existingTimer) existingTimer.remove();

            const timerEl = document.createElement('div');
            timerEl.id = 'story-questions-timer';
            timerEl.className = 'timer';
            timerEl.textContent = timeLeft;
            document.getElementById('story-question-screen').insertBefore(timerEl, document.getElementById('submit-story-btn'));

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                timerEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.handleStorySubmit();
                }
            }, 1000);

            return;
        }

        if (testId === 'addressMemoryReading') {
            this.showScreen('address-reading-screen');
            const progressContainer = document.getElementById('progress-container');
            if (!this.gameData.isIndividualTest) {
                progressContainer.style.display = 'block';
                this.updateProgressBar();
            } else {
                progressContainer.style.display = 'none';
            }

            // Pop unique random address from queue, or fallback to random
            if (this.gameData.selectedAddressesQueue && this.gameData.selectedAddressesQueue.length > 0) {
                this.gameData.currentAddress = this.gameData.selectedAddressesQueue.shift();
            } else {
                this.gameData.currentAddress = this.addresses[Math.floor(Math.random() * this.addresses.length)];
            }
            document.getElementById('address-text-container').textContent = this.gameData.currentAddress.text;

            let timeLeft = 15;
            const timerDisplay = document.getElementById('address-timer');
            timerDisplay.textContent = `${timeLeft}s`;

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.state.scores[testId] = "Completed";
                    this.currentTestIndex++;
                    this.showInstructions();
                }
            }, 1000);
            return;
        }

        if (testId === 'addressMemoryQuestions') {
            this.showScreen('address-questions-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();

            const container = document.getElementById('address-options-container');
            const addressObj = this.gameData.currentAddress;

            // Shuffle options while tracking the correct answer
            const correctIndex = parseInt(addressObj.answer);
            const indexed = addressObj.options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
            for (let i = indexed.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
            }
            const newCorrectIndex = indexed.findIndex(item => item.isCorrect);
            this.gameData.shuffledAddressAnswer = String(newCorrectIndex);

            container.innerHTML = `
                ${indexed.map((item, i) => `<label><input type="radio" name="addressOption" value="${i}"> ${item.opt}</label>`).join('')}
            `;

            let timeLeft = 30;
            const existingTimer = document.getElementById('address-questions-timer');
            if (existingTimer) existingTimer.remove();

            const timerEl = document.createElement('div');
            timerEl.id = 'address-questions-timer';
            timerEl.className = 'timer-display';
            timerEl.textContent = `${timeLeft}s`;
            // Insert before the submit button
            document.getElementById('address-questions-screen').insertBefore(timerEl, document.getElementById('submit-address-btn'));

            this.gameData.intervalId = setInterval(() => {
                timeLeft--;
                timerEl.textContent = `${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(this.gameData.intervalId);
                    this.handleAddressSubmit();
                }
            }, 1000);

            return;
        }

        if (testId === 'mentalMath' || testId === 'storyMath') {
            this.gameData.mathType = testId === 'mentalMath' ? 'mental' : 'story';
            this.gameData.mathRounds = testId === 'mentalMath' ? 12 : 5;
            this.gameData.mathCurrentRound = 0;
            this.gameData.mathScore = 0;

            if (testId === 'storyMath') {
                const tempIndices = Array.from({ length: this.storyMathTemplates.length }, (_, i) => i);
                for (let i = tempIndices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [tempIndices[i], tempIndices[j]] = [tempIndices[j], tempIndices[i]];
                }
                this.gameData.selectedMathTemplates = tempIndices.slice(0, 5);
            }

            this.showScreen('math-test-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();

            this.nextMathQuestion();
            return;
        }

        if (testId === 'visualSpatialMemory') {
            this.showScreen('grid-memory-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.startSpatialMemoryGridSequential();
            return;
        }

        if (testId === 'simultaneousSpatialMemory') {
            this.showScreen('grid-memory-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.startSpatialMemoryGridSimultaneous();
            return;
        }

        if (testId === 'chimpTest') {
            this.showScreen('grid-memory-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.startChimpTest();
            return;
        }

        if (testId === 'flankerArrow') {
            this.showScreen('flanker-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.gameData.flankerCurrentTrial = 0;
            this.gameData.flankerErrors = 0;
            this.gameData.flankerTimes = [];
            this.startFlankerTrial();
            return;
        }

        if (testId === 'sequentialNumberMemory') {
            this.showScreen('number-memory-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.gameData.trialDetails = [];
            this.state.breakdowns = this.state.breakdowns || {}; // Initialize state object
            this.startSequentialNumberMemory();
            return;
        }

        if (testId === 'reverseSequentialNumberMemory') {
            this.showScreen('number-memory-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.gameData.currentTrialCount = 0;
            this.gameData.trialScores = [];
            this.gameData.trialDetails = [];
            this.state.breakdowns = this.state.breakdowns || {}; // Initialize state object
            this.startReverseSequentialNumberMemory();
            return;
        }

        if (testId === 'nBackTask') {
            this.showScreen('nback-screen');
            if (!this.gameData.isIndividualTest) this.updateProgressBar();
            this.startNBackTask();
            return;
        }

        if (testId === 'audioReaction' || testId === 'visualReaction' || testId === 'inhibitoryControl') {
            this.appContainer.style.backgroundColor = '';
            this.showScreen('minigame-screen');
            this.gameData.currentTrialCount = 0;
            this.gameData.trialTimes = [];
            this.gameData.trialScores = [];

            // We need a helper to kick off the specific reaction test loop
            this.startReactionTrial();
            return;
        }
    }

    startReactionTrial() {
        const testId = this.testSequence[this.currentTestIndex];
        const prompt = document.getElementById('minigame-prompt');

        if (this.gameData.currentTrialCount >= 5) {
            this.endReactionTask();
            return;
        }

        this.gameData.isWaiting = true;
        this.gameData.startTime = null;

        const currentTrialDisplay = this.gameData.currentTrialCount + 1;

        if (testId === 'audioReaction') {
            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            prompt.innerHTML = `Wait for the sound...<br><span style="font-size: 1rem; opacity: 0.5;">Trial ${currentTrialDisplay}/5</span>`;
            prompt.style.color = "rgba(255,255,255,0.7)";

            const delay = Math.random() * 4000 + 2000;
            this.gameData.timeoutId = setTimeout(() => {
                if (!this.gameData.isWaiting) return;

                this.playBeep(880, 0.3); // High pitch beep
                this.gameData.startTime = performance.now();
                this.gameData.isWaiting = false;
            }, delay);
        }
        else if (testId === 'visualReaction') {
            this.appContainer.style.backgroundColor = '#cc3333';
            document.body.style.backgroundColor = '#cc3333';
            prompt.innerHTML = `Wait for green...<br><span style="font-size: 1rem; opacity: 0.5;">Trial ${currentTrialDisplay}/5</span>`;
            prompt.style.color = "rgba(255,255,255,0.7)";

            const delay = Math.random() * 4000 + 2000;
            this.gameData.timeoutId = setTimeout(() => {
                if (!this.gameData.isWaiting) return;

                this.appContainer.style.backgroundColor = '#33cc33';
                document.body.style.backgroundColor = '#33cc33';
                prompt.textContent = "PRESS SPACEBAR!";
                prompt.style.color = "#ffffff";

                this.gameData.startTime = performance.now();
                this.gameData.isWaiting = false;
            }, delay);
        }
        else if (testId === 'inhibitoryControl') {
            this.appContainer.style.backgroundColor = '#cc3333';
            document.body.style.backgroundColor = '#cc3333';
            prompt.innerHTML = `Wait for green. Ignore the beep.<br><span style="font-size: 1rem; opacity: 0.5;">Trial ${currentTrialDisplay}/5</span>`;
            prompt.style.color = "rgba(255,255,255,0.7)";

            const delay = Math.random() * 4000 + 2000;

            const distractorTime = Math.random() * (delay - 500) + 200;
            this.gameData.distractorIntervalId = setTimeout(() => {
                if (this.gameData.isWaiting) {
                    this.playBeep(440, 0.2);
                }
            }, distractorTime);

            this.gameData.timeoutId = setTimeout(() => {
                if (!this.gameData.isWaiting) return;

                this.appContainer.style.backgroundColor = '#33cc33';
                document.body.style.backgroundColor = '#33cc33';
                prompt.textContent = "PRESS SPACEBAR!";
                prompt.style.color = "#ffffff";

                this.gameData.startTime = performance.now();
                this.gameData.isWaiting = false;
            }, delay);
        }
    }

    // --- Math Methods ---
    nextMathQuestion() {
        this.gameData.mathCurrentRound++;
        const isMental = this.gameData.mathType === 'mental';

        const inputEl = document.getElementById('math-input');
        inputEl.value = '';
        setTimeout(() => inputEl.focus(), 50);
        document.getElementById('math-progress').textContent = `Question ${this.gameData.mathCurrentRound} of ${this.gameData.mathRounds}`;

        if (isMental) {
            // Generate Mental Math (+, -, *, /)
            const ops = ['+', '-', '*', '/'];
            const op = ops[Math.floor(Math.random() * ops.length)];
            let qText = '';
            let ans = 0;

            if (op === '+') {
                const a = Math.floor(Math.random() * 900) + 100;
                const b = Math.floor(Math.random() * 900) + 100;
                qText = `${a} + ${b} = ?`;
                ans = a + b;
            } else if (op === '-') {
                const a = Math.floor(Math.random() * 900) + 100;
                const b = Math.floor(Math.random() * a) + 10;
                qText = `${a} - ${b} = ?`;
                ans = a - b;
            } else if (op === '*') {
                const a = Math.floor(Math.random() * 21) + 5; // 5 to 25
                const b = Math.floor(Math.random() * 13) + 3; // 3 to 15
                qText = `${a} × ${b} = ?`;
                ans = a * b;
            } else if (op === '/') {
                const b = Math.floor(Math.random() * 11) + 2; // 2 to 12
                const ansTemp = Math.floor(Math.random() * 15) + 3; // 3 to 17
                const a = b * ansTemp;
                qText = `${a} ÷ ${b} = ?`;
                ans = ansTemp;
            }

            document.getElementById('math-question').textContent = qText;
            this.gameData.currentMathAnswer = ans;
        } else {
            // Story Math
            const templateIndex = this.gameData.selectedMathTemplates[this.gameData.mathCurrentRound - 1];
            const problem = this.storyMathTemplates[templateIndex]();
            document.getElementById('math-question').textContent = problem.text;
            this.gameData.currentMathAnswer = problem.answer;
        }

        let timeLeft = isMental ? 20 : 60;
        const timerDisplay = document.getElementById('math-timer');
        timerDisplay.textContent = timeLeft;

        clearInterval(this.gameData.intervalId);
        this.gameData.intervalId = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(this.gameData.intervalId);
                this.handleMathSubmit(true);
            }
        }, 1000);
    }

    handleMathSubmit(isTimeout = false) {
        clearInterval(this.gameData.intervalId);

        const inputVal = document.getElementById('math-input').value;
        const parsed = parseInt(inputVal, 10);

        if (!isTimeout && !isNaN(parsed) && parsed === this.gameData.currentMathAnswer) {
            this.gameData.mathScore++;
        }

        if (this.gameData.mathCurrentRound < this.gameData.mathRounds) {
            this.nextMathQuestion();
        } else {
            const testId = this.gameData.mathType === 'mental' ? 'mentalMath' : 'storyMath';
            const finalScore = Math.round((this.gameData.mathScore / this.gameData.mathRounds) * 100);

            if (!this.state.scores[testId]) this.state.scores[testId] = [];
            this.state.scores[testId].push(`${finalScore} Points`);

            if (!this.state.breakdowns[testId]) this.state.breakdowns[testId] = [];
            this.state.breakdowns[testId].push(`${this.gameData.mathScore}/${this.gameData.mathRounds} Correct`);

            const scoreDisplay = document.getElementById('round-score');
            scoreDisplay.innerHTML = `Score: <br><span style="color: var(--accent-color); font-size: 3rem;">${this.gameData.mathScore}/${this.gameData.mathRounds}</span><br><span style="font-size: 1.2rem;">Correct Answers</span>`;
            scoreDisplay.style.color = "var(--text-color)";

            this.proceedAfterTest();
        }
    }

    // --- Story Memory Methods ---
    handleStorySubmit() {
        clearInterval(this.gameData.intervalId);
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const questions = this.gameData.currentQuestions;
        const answers = this.gameData.shuffledStoryAnswers;

        let score = 0;
        const q1Correct = q1 && q1.value === answers[0];
        const q2Correct = q2 && q2.value === answers[1];
        if (q1Correct) score++;
        if (q2Correct) score++;

        if (!this.state.scores['storyMemoryQuestions']) this.state.scores['storyMemoryQuestions'] = [];
        this.state.scores['storyMemoryQuestions'].push(`${score}/2`);

        const correctAns1 = questions[0].shuffledOptions[parseInt(answers[0])];
        const correctAns2 = questions[1].shuffledOptions[parseInt(answers[1])];

        const scoreDisplay = document.getElementById('round-score');
        let html = `<div style="font-size: 1.5rem; margin-bottom: 1rem;">You got ${score} out of 2 correct.</div>`;
        html += `<div style="text-align: left; max-width: 500px; margin: 0 auto; font-size: 0.95rem; line-height: 1.8;">`;
        html += `<div style="margin-bottom: 0.5rem;">${q1Correct ? '✅' : '❌'} <strong>${questions[0].prompt}</strong><br>Correct: <span style="color: var(--accent-color);">${correctAns1}</span></div>`;
        html += `<div>${q2Correct ? '✅' : '❌'} <strong>${questions[1].prompt}</strong><br>Correct: <span style="color: var(--accent-color);">${correctAns2}</span></div>`;
        html += `</div>`;
        scoreDisplay.innerHTML = html;
        scoreDisplay.style.color = "var(--text-color)";

        this.proceedAfterTest();
    }

    handleAddressSubmit() {
        clearInterval(this.gameData.intervalId);
        const selected = document.querySelector('input[name="addressOption"]:checked');

        let score = 0;
        if (selected && selected.value === this.gameData.shuffledAddressAnswer) score = 1;

        if (!this.state.scores['addressMemoryQuestions']) this.state.scores['addressMemoryQuestions'] = [];
        this.state.scores['addressMemoryQuestions'].push(`${score}/1`);

        const correctAddress = this.gameData.currentAddress.text;
        const scoreDisplay = document.getElementById('round-score');
        let html = `<div style="font-size: 1.5rem; margin-bottom: 1rem;">${score === 1 ? '✅ Correct!' : '❌ Incorrect'}</div>`;
        html += `<div style="font-size: 0.95rem;">Correct address: <span style="color: var(--accent-color);">${correctAddress}</span></div>`;
        scoreDisplay.innerHTML = html;
        scoreDisplay.style.color = "var(--text-color)";

        this.proceedAfterTest();
    }

    // --- Spatial Memory Grid Methods ---
    setupGridUI() {
        const grid = document.getElementById('memory-grid');
        const submitBtn = document.getElementById('submit-grid-btn');
        grid.innerHTML = '';
        submitBtn.style.visibility = 'hidden';

        this.gameData.gridCells = [];
        this.gameData.gridSequence = [];
        this.gameData.userGridSequence = [];

        const isSimultaneous = this.testSequence && this.testSequence[this.currentTestIndex] === 'simultaneousSpatialMemory';
        const numCells = isSimultaneous ? 25 : 16;

        if (isSimultaneous) {
            grid.classList.add('grid-5x5');
        } else {
            grid.classList.remove('grid-5x5');
        }

        // Create blocks
        for (let i = 0; i < numCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            // Depending on test, click handlers differ slightly in visual feedback
            cell.addEventListener('click', () => this.handleGridClick(i, cell));
            grid.appendChild(cell);
            this.gameData.gridCells.push(cell);
        }
    }

    startSpatialMemoryGridSequential() {
        this.setupGridUI();
        document.querySelector('#grid-memory-screen h2').textContent = `Sequential Spatial Memory — Trial ${this.gameData.currentTrialCount + 1} of 5`;

        // Generate a sequence of 6 random blocks
        while (this.gameData.gridSequence.length < 6) {
            const r = Math.floor(Math.random() * 16);
            if (!this.gameData.gridSequence.includes(r)) {
                this.gameData.gridSequence.push(r);
            }
        }

        // Illuminate the sequence one by one
        let step = 0;
        this.gameData.isWaiting = true;

        this.gameData.intervalId = setInterval(() => {
            this.gameData.gridCells.forEach(c => c.classList.remove('active'));

            if (step < this.gameData.gridSequence.length) {
                const index = this.gameData.gridSequence[step];
                setTimeout(() => {
                    this.playBeep(400 + (step * 50), 0.1);
                    this.gameData.gridCells[index].classList.add('active');
                }, 100);
                step++;
            } else {
                clearInterval(this.gameData.intervalId);
                setTimeout(() => {
                    this.gameData.gridCells.forEach(c => c.classList.remove('active'));
                    this.gameData.isWaiting = false; // Allow clicks
                    document.getElementById('submit-grid-btn').style.visibility = 'visible';
                    this.updateGridSubmitButton();

                    // Add 20s timeout
                    this.gameData.timeoutId = setTimeout(() => {
                        this.handleGridSubmitSequential(true);
                    }, 20000);
                }, 1000);
            }
        }, 800);
    }

    startSpatialMemoryGridSimultaneous() {
        this.setupGridUI();
        document.querySelector('#grid-memory-screen h2').textContent = `Simultaneous Spatial — Trial ${this.gameData.currentTrialCount + 1} of 5`;

        // Pick 9 random blocks out of 25 to flash at once
        while (this.gameData.gridSequence.length < 9) {
            const r = Math.floor(Math.random() * 25);
            if (!this.gameData.gridSequence.includes(r)) {
                this.gameData.gridSequence.push(r);
            }
        }

        this.gameData.isWaiting = true;

        // Flash all simultaneously
        this.gameData.gridSequence.forEach(index => {
            this.gameData.gridCells[index].classList.add('active');
        });
        this.playBeep(600, 0.4);

        // Turn them off after 2 seconds
        this.gameData.timeoutId = setTimeout(() => {
            this.gameData.gridCells.forEach(c => c.classList.remove('active'));
            this.gameData.isWaiting = false; // Allow clicks
            document.getElementById('submit-grid-btn').style.visibility = 'visible';
            this.updateGridSubmitButton();

            // Add 20s timeout
            this.gameData.timeoutId = setTimeout(() => {
                this.handleGridSubmitSimultaneous(true);
            }, 20000);
        }, 2000);
    }

    handleGridClick(index, cell) {
        if (this.gameData.isWaiting) return;

        const testId = this.testSequence[this.currentTestIndex];

        // --- Chimp Test has its own click logic ---
        if (testId === 'chimpTest') {
            this.handleChimpGridClick(index, cell);
            return;
        }

        if (cell.classList.contains('selected')) {
            cell.classList.remove('selected');
            cell.textContent = '';
            cell.style.display = '';
            const idx = this.gameData.userGridSequence.indexOf(index);
            if (idx > -1) {
                this.gameData.userGridSequence.splice(idx, 1);
            }
            // Re-number for sequential
            if (testId === 'visualSpatialMemory') {
                this.gameData.gridCells.forEach(c => {
                    const seqIdx = this.gameData.userGridSequence.indexOf(parseInt(c.dataset.index));
                    if (seqIdx > -1) { c.textContent = seqIdx + 1; }
                });
            }
        } else {
            // Prevent clicking more squares than the sequence length
            if (this.gameData.userGridSequence.length >= this.gameData.gridSequence.length) {
                return;
            }

            cell.classList.add('selected');
            this.gameData.userGridSequence.push(index);

            if (testId === 'visualSpatialMemory') {
                // Sequential visually numbers choices
                cell.textContent = this.gameData.userGridSequence.length;
                cell.style.display = 'flex';
                cell.style.alignItems = 'center';
                cell.style.justifyContent = 'center';
                cell.style.fontSize = '2rem';
                cell.style.fontWeight = 'bold';
            }
            // Simultaneous just highlights them without numbering
        }
        this.updateGridSubmitButton();
    }

    updateGridSubmitButton() {
        const btn = document.getElementById('submit-grid-btn');
        if (!btn || btn.style.visibility === 'hidden') return;
        const selected = this.gameData.userGridSequence.length;
        const required = this.gameData.gridSequence.length;
        btn.textContent = `Confirm Pattern (${selected}/${required})`;
        btn.disabled = selected !== required;
        btn.style.opacity = selected === required ? '1' : '0.4';
    }

    handleGridSubmitSequential(isTimeout = false) {
        if (!isTimeout && this.gameData.userGridSequence.length < this.gameData.gridSequence.length) return;
        clearTimeout(this.gameData.timeoutId);

        let correct = 0;
        for (let i = 0; i < this.gameData.gridSequence.length; i++) {
            if (this.gameData.gridSequence[i] === this.gameData.userGridSequence[i]) {
                correct++;
            }
        }

        const pct = Math.round((correct / this.gameData.gridSequence.length) * 100);
        this.gameData.trialScores.push(pct);
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const sumPct = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgPct = Math.round(sumPct / 5);

            if (!this.state.scores['visualSpatialMemory']) this.state.scores['visualSpatialMemory'] = [];
            this.state.scores['visualSpatialMemory'].push(`Average: ${avgPct}%`);

            const scoreDisplay = document.getElementById('round-score');
            scoreDisplay.innerHTML = `Average Score:<br><span style="color: var(--accent-color); font-size: 3rem;">${avgPct}%</span> selected in correct order.`;
            scoreDisplay.style.color = "var(--text-color)";
            this.proceedAfterTest();
        } else {
            setTimeout(() => this.startSpatialMemoryGridSequential(), 500);
        }
    }

    handleGridSubmitSimultaneous(isTimeout = false) {
        if (!isTimeout && this.gameData.userGridSequence.length < this.gameData.gridSequence.length) return;
        clearTimeout(this.gameData.timeoutId);

        let correct = 0;
        // Order doesn't matter for simultaneous
        for (let i = 0; i < this.gameData.userGridSequence.length; i++) {
            if (this.gameData.gridSequence.includes(this.gameData.userGridSequence[i])) {
                correct++;
            }
        }

        // Calculate false positives
        const overclicks = Math.max(0, this.gameData.userGridSequence.length - this.gameData.gridSequence.length);
        const finalScore = Math.max(0, correct - overclicks); // Penalize clicking every block

        const pct = Math.round((finalScore / this.gameData.gridSequence.length) * 100);
        this.gameData.trialScores.push(pct);
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const sumPct = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgPct = Math.round(sumPct / 5);
            if (!this.state.scores['simultaneousSpatialMemory']) this.state.scores['simultaneousSpatialMemory'] = [];
            this.state.scores['simultaneousSpatialMemory'].push(`Average: ${avgPct}%`);

            const scoreDisplay = document.getElementById('round-score');
            scoreDisplay.innerHTML = `Average Score:<br><span style="color: var(--accent-color); font-size: 3rem;">${avgPct}%</span> correctly identified.`;
            scoreDisplay.style.color = "var(--text-color)";

            this.proceedAfterTest();
        }
        else {
            setTimeout(() => this.startSpatialMemoryGridSimultaneous(), 500);
        }
    }

    // --- Chimp Test ---
    startChimpTest() {
        this.setupGridUI();
        // Force 4x4 grid
        document.getElementById('memory-grid').classList.remove('grid-5x5');

        this.gameData.chimpMistakes = 0;
        this.gameData.chimpNextExpected = 1;
        this.gameData.chimpNumberMap = {}; // cellIndex -> number
        this.gameData.chimpCellMap = {};   // number -> cellIndex

        // Pick 8 random cells out of 16
        const positions = [];
        while (positions.length < 8) {
            const r = Math.floor(Math.random() * 16);
            if (!positions.includes(r)) positions.push(r);
        }

        // Assign numbers 1-8 to random positions
        for (let i = 0; i < 8; i++) {
            this.gameData.chimpNumberMap[positions[i]] = i + 1;
            this.gameData.chimpCellMap[i + 1] = positions[i];
        }

        // Display numbers on the grid
        positions.forEach(pos => {
            const cell = this.gameData.gridCells[pos];
            cell.textContent = this.gameData.chimpNumberMap[pos];
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = '2rem';
            cell.style.fontWeight = 'bold';
            cell.style.color = 'var(--accent-color)';
        });

        // Update prompt
        document.querySelector('#grid-memory-screen h2').textContent = `Chimp Test — Trial ${this.gameData.currentTrialCount + 1} of 5`;
        document.getElementById('submit-grid-btn').style.visibility = 'hidden';

        this.gameData.isWaiting = false; // Allow clicks immediately
        this.gameData.chimpFirstClick = false;
    }

    handleChimpGridClick(index, cell) {
        if (this.gameData.isWaiting) return;
        const expectedNumber = this.gameData.chimpNextExpected;
        const clickedNumber = this.gameData.chimpNumberMap[index];

        // Ignore clicks on already-completed cells or empty non-target cells after hiding
        if (cell.classList.contains('selected')) return;

        if (clickedNumber === expectedNumber) {
            // Correct!
            cell.classList.add('selected');
            cell.textContent = clickedNumber;
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontSize = '2rem';
            cell.style.fontWeight = 'bold';
            cell.style.color = '#4ade80';
            this.playBeep(500 + (clickedNumber * 60), 0.08);

            // On first correct click, hide all remaining numbers
            if (!this.gameData.chimpFirstClick) {
                this.gameData.chimpFirstClick = true;
                this.gameData.gridCells.forEach((c, i) => {
                    if (i !== index && !c.classList.contains('selected')) {
                        c.textContent = '';
                        c.style.color = '';
                    }
                });
            }

            this.gameData.chimpNextExpected++;

            // Check if all 8 found
            if (this.gameData.chimpNextExpected > 8) {
                this.endChimpTrial();
            }
        } else {
            // Wrong click — count mistake and flash red
            this.gameData.chimpMistakes++;

            const originalBg = cell.style.backgroundColor;
            const originalBorder = cell.style.borderColor;

            cell.style.backgroundColor = 'rgba(255, 77, 77, 0.6)';
            cell.style.borderColor = '#ff4d4d';
            this.playBeep(200, 0.15);

            // Update prompt to show mistakes
            document.querySelector('#grid-memory-screen h2').textContent = `Chimp Test — Trial ${this.gameData.currentTrialCount + 1} of 5 (${this.gameData.chimpMistakes} mistake${this.gameData.chimpMistakes !== 1 ? 's' : ''})`;

            // Briefly show red, then reset to allow retry
            this.gameData.isWaiting = true;
            setTimeout(() => {
                cell.style.backgroundColor = originalBg;
                cell.style.borderColor = originalBorder;
                this.gameData.isWaiting = false;
            }, 400);
        }
    }

    endChimpTrial() {
        this.gameData.isWaiting = true; // Prevent further clicks
        this.gameData.trialScores.push(this.gameData.chimpMistakes);
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const totalMistakes = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgMistakes = (totalMistakes / 5).toFixed(1);

            if (!this.state.scores['chimpTest']) this.state.scores['chimpTest'] = [];
            this.state.scores['chimpTest'].push(`Average Mistakes: ${avgMistakes}`);

            const scoreDisplay = document.getElementById('round-score');
            scoreDisplay.innerHTML = `Average Mistakes:<br><span style="color: var(--accent-color); font-size: 4rem;">${avgMistakes}</span><br>across 5 trials.`;
            scoreDisplay.style.color = "var(--text-color)";

            this.proceedAfterTest();
        } else {
            setTimeout(() => this.startChimpTest(), 600);
        }
    }

    // --- Sequential Number Memory ---
    startSequentialNumberMemory() {
        const display = document.getElementById('number-display');
        const inputContainer = document.getElementById('number-input-container');
        const input = document.getElementById('number-input');
        const prompt = document.getElementById('number-prompt');

        display.textContent = "";
        display.style.display = "flex";
        inputContainer.style.display = "none";
        input.value = "";
        prompt.textContent = "Remember the sequence...";

        // Generate 9 random digits
        this.gameData.numberSequence = [];
        for (let i = 0; i < 9; i++) {
            this.gameData.numberSequence.push(Math.floor(Math.random() * 10));
        }

        let step = 0;

        const flashNextNumber = () => {
            if (step < this.gameData.numberSequence.length) {
                display.textContent = this.gameData.numberSequence[step];

                setTimeout(() => {
                    display.textContent = "";
                    step++;
                    setTimeout(flashNextNumber, 500); // 0.5s off
                }, 1000); // 1s on
            } else {
                // Done flashing
                display.style.display = "none";
                inputContainer.style.display = "flex";
                prompt.textContent = "Type the sequence (30s):";
                input.focus();

                // Add 30s timeout
                this.gameData.timeoutId = setTimeout(() => {
                    this.handleNumberSubmit();
                }, 30000);
            }
        };

        // Delay start by 1s
        this.gameData.timeoutId = setTimeout(flashNextNumber, 1000);
    }

    handleNumberSubmit() {
        clearTimeout(this.gameData.timeoutId);
        const input = document.getElementById('number-input');
        const userSeqStr = input.value.trim();
        const actualSeqStr = this.gameData.numberSequence.join("");

        // Count how many matched in order
        let correctCount = 0;
        const minLen = Math.min(userSeqStr.length, actualSeqStr.length);
        for (let i = 0; i < minLen; i++) {
            if (userSeqStr[i] === actualSeqStr[i]) correctCount++;
        }

        this.gameData.trialScores.push(correctCount);
        this.gameData.trialDetails.push({ expected: actualSeqStr, answered: userSeqStr });
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const sumCount = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgCount = (sumCount / 5).toFixed(1);

            if (!this.state.scores['sequentialNumberMemory']) this.state.scores['sequentialNumberMemory'] = [];
            this.state.scores['sequentialNumberMemory'].push(`Average: ${avgCount}/9 Digits`);

            const breakdownHTML = this.generateNumberBreakdownHTML(avgCount, "Sequential Numbers");
            this.state.breakdowns['sequentialNumberMemory'] = breakdownHTML;

            const scoreDisplay = document.getElementById('round-score');
            scoreDisplay.innerHTML = breakdownHTML;
            scoreDisplay.style.color = "var(--text-color)";
            this.proceedAfterTest();
        } else {
            // Next trial
            setTimeout(() => this.startSequentialNumberMemory(), 500);
        }
    }

    // --- Reverse Sequential Number Memory ---
    startReverseSequentialNumberMemory() {
        const display = document.getElementById('number-display');
        const inputContainer = document.getElementById('number-input-container');
        const input = document.getElementById('number-input');
        const prompt = document.getElementById('number-prompt');

        display.textContent = "";
        display.style.display = "flex";
        inputContainer.style.display = "none";
        input.value = "";
        prompt.textContent = "Remember the sequence...";

        // Generate 9 random digits
        this.gameData.numberSequence = [];
        for (let i = 0; i < 9; i++) {
            this.gameData.numberSequence.push(Math.floor(Math.random() * 10));
        }

        let step = 0;

        const flashNextNumber = () => {
            if (step < this.gameData.numberSequence.length) {
                display.textContent = this.gameData.numberSequence[step];

                setTimeout(() => {
                    display.textContent = "";
                    step++;
                    setTimeout(flashNextNumber, 500);
                }, 1000);
            } else {
                display.style.display = "none";
                inputContainer.style.display = "flex";
                prompt.textContent = "Type the sequence in REVERSE (30s):";
                input.focus();

                // Add 30s timeout
                this.gameData.timeoutId = setTimeout(() => {
                    this.handleReverseNumberSubmit();
                }, 30000);
            }
        };

        this.gameData.timeoutId = setTimeout(flashNextNumber, 1000);
    }

    handleReverseNumberSubmit() {
        clearTimeout(this.gameData.timeoutId);
        const input = document.getElementById('number-input');
        const userSeqStr = input.value.trim();
        const actualSeqStr = this.gameData.numberSequence.join("");
        const reversedSeqStr = actualSeqStr.split("").reverse().join("");

        let correctCount = 0;
        const minLen = Math.min(userSeqStr.length, reversedSeqStr.length);
        for (let i = 0; i < minLen; i++) {
            if (userSeqStr[i] === reversedSeqStr[i]) correctCount++;
        }

        this.gameData.trialScores.push(correctCount);
        this.gameData.trialDetails.push({ expected: reversedSeqStr, answered: userSeqStr });
        this.gameData.currentTrialCount++;

        if (this.gameData.currentTrialCount >= 5) {
            const sumCount = this.gameData.trialScores.reduce((a, b) => a + b, 0);
            const avgCount = (sumCount / 5).toFixed(1);

            if (!this.state.scores['reverseSequentialNumberMemory']) this.state.scores['reverseSequentialNumberMemory'] = [];
            this.state.scores['reverseSequentialNumberMemory'].push(`Average: ${avgCount}/9 Digits`);

            const breakdownHTML = this.generateNumberBreakdownHTML(avgCount, "Reverse Numbers");
            this.state.breakdowns['reverseSequentialNumberMemory'] = breakdownHTML;

            const scoreDisplay = document.getElementById('round-score');
            scoreDisplay.innerHTML = breakdownHTML;
            scoreDisplay.style.color = "var(--text-color)";
            this.proceedAfterTest();
        } else {
            setTimeout(() => this.startReverseSequentialNumberMemory(), 500);
        }
    }

    generateNumberBreakdownHTML(avgCount, testName) {
        let html = `<div style="text-align: center; margin-bottom: 1rem; font-size: 1.5rem;">Average Score: <span class="score-highlight">${avgCount}</span>/9 Digits matched</div>`;
        html += '<table class="sequence-table">';
        html += '<thead><tr><th>Round</th><th>Correct Sequence</th><th>Typed Sequence</th></tr></thead>';
        html += '<tbody>';

        this.gameData.trialDetails.forEach((trial, index) => {
            let expected = trial.expected;
            let answered = trial.answered;

            let answerFormatted = '';
            const maxLen = Math.max(expected.length, answered.length);
            for (let i = 0; i < maxLen; i++) {
                const expectedChar = expected[i] || '';
                const answeredChar = answered[i] || '';

                if (expectedChar === answeredChar && expectedChar !== '') {
                    answerFormatted += `<span class="correct-digit">${answeredChar}</span>`;
                } else {
                    const displayChar = answeredChar === '' ? '_' : answeredChar;
                    answerFormatted += `<span class="wrong-digit">${displayChar}</span>`;
                }
            }

            html += `
                <tr>
                    <td>Round ${index + 1}</td>
                    <td class="expected-seq">${expected}</td>
                    <td class="answered-seq">${answerFormatted}</td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        return html;
    }

    // --- N-Back Task ---
    startNBackTask() {
        const display = document.getElementById('nback-letter-display');
        const feedback = document.getElementById('nback-feedback');

        display.textContent = "";
        feedback.textContent = "";
        feedback.className = "nback-feedback";

        // Generate 25 letters sequence with ~30% chance for a 2-back match
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.gameData.nBackSequence = [];
        this.gameData.nBackHits = 0;
        this.gameData.nBackMisses = 0;
        this.gameData.nBackFalseAlarms = 0;
        this.gameData.nBackCurrentIndex = 0;

        for (let i = 0; i < 25; i++) {
            if (i >= 2 && Math.random() < 0.3) {
                // Create a 2-back match
                this.gameData.nBackSequence.push(this.gameData.nBackSequence[i - 2]);
            } else {
                // Random letter that does NOT accidentally match the 2-back letter
                let letter;
                do {
                    letter = letters[Math.floor(Math.random() * letters.length)];
                } while (i >= 2 && letter === this.gameData.nBackSequence[i - 2]);
                this.gameData.nBackSequence.push(letter);
            }
        }

        // Add progress counter
        const h2 = document.querySelector('#nback-screen h2');
        h2.textContent = `Press Spacebar if letter matches the one from 2 steps ago. (1/25)`;

        const showNextLetter = () => {
            if (this.gameData.nBackCurrentIndex >= this.gameData.nBackSequence.length) {
                this.endNBackTask();
                return;
            }

            feedback.textContent = "";
            feedback.className = "nback-feedback";

            const idx = this.gameData.nBackCurrentIndex;
            const char = this.gameData.nBackSequence[idx];
            display.textContent = char;

            // Update counter
            document.querySelector('#nback-screen h2').textContent = `Press Spacebar if letter matches the one from 2 steps ago. (${idx + 1}/25)`;

            // Determine if it is a target
            this.gameData.nBackCurrentTarget = (idx >= 2 && this.gameData.nBackSequence[idx] === this.gameData.nBackSequence[idx - 2]);
            this.gameData.nBackCanPress = true;

            // Keep on screen for 1 second, then clear for 0.5s before next
            this.gameData.timeoutId = setTimeout(() => {
                display.textContent = "";

                // If they missed a target
                if (this.gameData.nBackCurrentTarget && this.gameData.nBackCanPress) {
                    this.gameData.nBackMisses++;
                }

                this.gameData.nBackCanPress = false;
                this.gameData.nBackCurrentIndex++;

                setTimeout(showNextLetter, 500); // 0.5s gap
            }, 1000);
        };

        // Start 1s after load
        this.gameData.timeoutId = setTimeout(showNextLetter, 1000);
    }

    handleNBackSpacebar() {
        if (!this.gameData.nBackCanPress) return;
        this.gameData.nBackCanPress = false; // Lock out further presses this step

        const feedback = document.getElementById('nback-feedback');

        if (this.gameData.nBackCurrentTarget) {
            this.gameData.nBackHits++;
            feedback.textContent = "Hit!";
            feedback.style.color = "var(--accent-color)";
        } else {
            this.gameData.nBackFalseAlarms++;
            feedback.textContent = "False Alarm!";
            feedback.style.color = "#cc3333";
        }
    }

    endNBackTask() {
        const scoreDisplay = document.getElementById('round-score');

        // Calculate score
        if (!this.state.scores['nBackTask']) this.state.scores['nBackTask'] = [];
        this.state.scores['nBackTask'].push(`Hits: ${this.gameData.nBackHits}, False Alarms: ${this.gameData.nBackFalseAlarms}, Misses: ${this.gameData.nBackMisses}`);

        scoreDisplay.innerHTML = `
            Hits: <span style="color: var(--accent-color); font-size: 2rem;">${this.gameData.nBackHits}</span><br>
            False Alarms: <span style="color: #cc3333; font-size: 2rem;">${this.gameData.nBackFalseAlarms}</span><br>
            Misses: <span style="color: #cc3333; font-size: 2rem;">${this.gameData.nBackMisses}</span>
        `;
        scoreDisplay.style.color = "var(--text-color)";

        this.proceedAfterTest();
    }

    // --- Flanker Methods ---
    startFlankerTrial() {
        if (this.gameData.flankerCurrentTrial >= this.gameData.flankerTrialsTotal) {
            this.endFlankerTask();
            return;
        }

        const arrowDiv = document.getElementById('flanker-arrows');
        const feedbackDiv = document.getElementById('flanker-feedback');

        arrowDiv.textContent = "";

        const delay = Math.random() * 1000 + 1000;

        this.gameData.timeoutId = setTimeout(() => {
            feedbackDiv.textContent = "";
            feedbackDiv.className = "flanker-feedback";

            const matchMiddle = Math.random() > 0.5;
            const midDir = Math.random() > 0.5 ? 'Right' : 'Left';
            const flankDir = matchMiddle ? midDir : (midDir === 'Right' ? 'Left' : 'Right');

            const renderArrow = (dir) => dir === 'Right' ? '→' : '←';
            const middleStr = renderArrow(midDir);
            const flankStr = renderArrow(flankDir);

            const displayStr = `${flankStr}${flankStr}${middleStr}${flankStr}${flankStr}`;

            this.gameData.flankerCurrentDirection = midDir;
            arrowDiv.textContent = displayStr;

            this.gameData.startTime = performance.now();
            this.gameData.flankerCanPress = true;
        }, delay);
    }

    handleFlankerInput(keyCode) {
        if (!this.gameData.flankerCanPress) return;
        this.gameData.flankerCanPress = false;

        const reactionTime = Math.round(performance.now() - this.gameData.startTime);
        const userDirection = keyCode === 'ArrowRight' ? 'Right' : 'Left';
        const isCorrect = userDirection === this.gameData.flankerCurrentDirection;

        const feedbackDiv = document.getElementById('flanker-feedback');

        if (isCorrect) {
            feedbackDiv.textContent = `Correct! (${reactionTime} ms)`;
            feedbackDiv.className = "flanker-feedback correct";
            this.gameData.flankerTimes.push(reactionTime);
        } else {
            feedbackDiv.textContent = `Wrong! (${reactionTime} ms)`;
            feedbackDiv.className = "flanker-feedback wrong";
            this.gameData.flankerErrors++;
            this.gameData.flankerTimes.push(reactionTime + 500);
        }

        const arrowDiv = document.getElementById('flanker-arrows');
        arrowDiv.textContent = "";

        this.gameData.flankerCurrentTrial++;

        this.gameData.flankerFeedbackTimeout = setTimeout(() => {
            feedbackDiv.textContent = "";
            this.startFlankerTrial();
        }, 1000);
    }

    endFlankerTask() {
        const testId = this.testSequence[this.currentTestIndex];
        const avgTime = Math.round(this.gameData.flankerTimes.reduce((a, b) => a + b, 0) / this.gameData.flankerTimes.length);
        if (!this.state.scores[testId]) this.state.scores[testId] = [];
        this.state.scores[testId].push({
            avgReaction: avgTime,
            errors: this.gameData.flankerErrors
        });

        this.appContainer.style.backgroundColor = '';
        const scoreDisplay = document.getElementById('round-score');
        scoreDisplay.innerHTML = `Avg: ${avgTime} ms<br><span style="font-size: 2rem; color: #cc3333">${this.gameData.flankerErrors} Errors</span>`;
        scoreDisplay.style.color = "var(--text-color)";

        this.proceedAfterTest();
    }

    // --- Generic Spacebar Handler ---
    handleSpacebarReaction() {
        const testId = this.testSequence[this.currentTestIndex];

        if (this.gameData.isWaiting) {
            clearTimeout(this.gameData.timeoutId);
            clearInterval(this.gameData.distractorIntervalId);
            this.gameData.isWaiting = false;

            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            const prompt = document.getElementById('minigame-prompt');
            prompt.textContent = "Too early!";
            prompt.style.color = "#cc3333";
            this.gameData.trialTimes.push(400); // Early penalty
            this.gameData.trialScores.push("Early");
            this.gameData.currentTrialCount++;

            if (this.gameData.currentTrialCount >= 5) {
                setTimeout(() => this.endReactionTask(), 1000);
            } else {
                setTimeout(() => this.startReactionTrial(), 1000);
            }

        } else if (this.gameData.startTime) {
            const reactionTime = Math.round(performance.now() - this.gameData.startTime);
            this.gameData.startTime = null;

            this.gameData.trialTimes.push(reactionTime);
            this.gameData.currentTrialCount++;

            this.appContainer.style.backgroundColor = '';
            document.body.style.backgroundColor = '';
            const prompt = document.getElementById('minigame-prompt');
            prompt.textContent = `${reactionTime} ms`;
            prompt.style.color = "var(--accent-color)";

            if (this.gameData.currentTrialCount >= 5) {
                setTimeout(() => this.endReactionTask(), 1000);
            } else {
                setTimeout(() => this.startReactionTrial(), 1000);
            }
        }
    }

    endReactionTask() {
        const testId = this.testSequence[this.currentTestIndex];

        let avgStr = "Failed repeatedly";
        let earlyCount = this.gameData.trialScores.filter(score => score === "Early").length;

        if (!this.state.scores[testId]) this.state.scores[testId] = [];
        if (this.gameData.trialTimes.length > 0) {
            const sum = this.gameData.trialTimes.reduce((a, b) => a + b, 0);
            const avg = Math.round(sum / this.gameData.trialTimes.length);
            avgStr = `${avg} ms`;
            this.state.scores[testId].push({ avgReaction: avg, earlyCount: earlyCount }); // Store object for final screen
        } else {
            this.state.scores[testId].push("Failed");
        }

        this.appContainer.style.backgroundColor = '';
        const scoreDisplay = document.getElementById('round-score');

        let earlyStr = earlyCount > 0 ? `<br><span style="font-size: 1.5rem;">Early: ${earlyCount}/5 times</span>` : "";
        scoreDisplay.innerHTML = `Average: <br><span style="color: var(--accent-color); font-size: 3rem;">${avgStr}</span>${earlyStr}`;

        if (avgStr.includes("Fail")) scoreDisplay.style.color = "#cc3333";
        else scoreDisplay.style.color = "var(--text-color)";

        this.proceedAfterTest();
    }

    proceedAfterTest() {
        if (this.gameData.isIndividualTest) {
            this.showScreen('results-screen');
        } else {
            const roundSize = this.testSequence.length / this.gameData.numRounds;
            const completedTests = this.currentTestIndex + 1;
            const isRoundEnd = completedTests % roundSize === 0;
            const isLastTest = completedTests === this.testSequence.length;

            if (isRoundEnd && !isLastTest) {
                const currentRound = completedTests / roundSize;
                const totalRounds = Math.ceil(this.testSequence.length / roundSize);
                document.getElementById('round-complete-text').innerHTML = `You have finished all tests in <strong>Round ${currentRound} of ${totalRounds}</strong>.<br><br>Take a short break if needed, then click below to start the next round.`;
                this.showScreen('round-complete-screen');
            } else if (isLastTest) {
                this.showFinalResults();
            } else {
                this.currentTestIndex++;
                this.showInstructions();
            }
        }
    }

    showFinalResults() {
        this.showScreen('final-screen');
        const summaryDiv = document.getElementById('final-summary');
        let html = '<h2 style="text-align: center; margin-bottom: 2rem;">Final Scores</h2><ul style="list-style: none; padding: 0;">';

        for (const [key, value] of Object.entries(this.state.scores)) {

            let displayValue = "";
            if (Array.isArray(value)) {
                if (typeof value[0] === 'object') {
                    if (value[0].earlyCount !== undefined) {
                        const totalAvg = Math.round(value.reduce((a, b) => a + (b.avgReaction || 0), 0) / value.length);
                        const totalEarly = value.reduce((a, b) => a + (b.earlyCount || 0), 0);
                        displayValue = `${totalAvg} ms (Early: ${totalEarly}/${5 * value.length} times)`;
                    } else if (value[0].errors !== undefined) {
                        const totalAvg = Math.round(value.reduce((a, b) => a + (b.avgReaction || 0), 0) / value.length);
                        const totalErrors = value.reduce((a, b) => a + (b.errors || 0), 0);
                        displayValue = `${totalAvg} ms (Errors: ${totalErrors})`;
                    }
                } else if (typeof value[0] === 'string' && value[0].includes('Hits:')) {
                    if (value.length > 1) {
                        displayValue = value.map((v, i) => `<br><span style="font-size: 0.9em; opacity: 0.8;">[Round ${i + 1}]</span> ${v}`).join('');
                    } else {
                        displayValue = value[0];
                    }
                } else {
                    if (value.length > 1) {
                        displayValue = value.map((v, i) => `<br><span style="font-size: 0.9em; opacity: 0.8;">[Round ${i + 1}]</span> ${v.replace('Average: ', '')}`).join('');
                    } else {
                        displayValue = value[0];
                    }
                }
            } else {
                displayValue = value; // Fallback
            }

            const formattedKey = key.replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
            html += `<li style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid #333; padding-bottom: 8px;"><strong>${formattedKey}:</strong> <span style="text-align: right;">${displayValue}</span></li>`;
        }

        html += '</ul>';

        if (this.state.breakdowns && this.state.breakdowns['sequentialNumberMemory']) {
            html += '<h3 style="margin-top: 3rem; text-align: center; color: var(--text-color);">Sequential Numbers Breakdown</h3>';
            html += this.state.breakdowns['sequentialNumberMemory'];
        }
        if (this.state.breakdowns && this.state.breakdowns['reverseSequentialNumberMemory']) {
            html += '<h3 style="margin-top: 3rem; text-align: center; color: var(--text-color);">Reverse Numbers Breakdown</h3>';
            html += this.state.breakdowns['reverseSequentialNumberMemory'];
        }

        summaryDiv.innerHTML = html;

        document.getElementById('progress-container').style.display = 'none';

        // Save to History (Only Full Assessments)
        if (!this.gameData.isIndividualTest) {
            this.saveToHistory();
        }
    }

    // --- State Persistence & UI Extras ---
    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const progressInfo = document.getElementById('progress-info');
        const totalTests = this.testSequence.length;
        const currentTest = this.currentTestIndex + 1;

        const pct = (this.currentTestIndex / totalTests) * 100;
        progressBar.style.width = `${pct}%`;

        if (!this.gameData.isIndividualTest) {
            const roundSize = this.testSequence.length / this.gameData.numRounds;
            const currentRound = Math.floor(this.currentTestIndex / roundSize) + 1;
            const totalRounds = Math.ceil(totalTests / roundSize);
            const testInRound = (this.currentTestIndex % roundSize) + 1;

            progressInfo.textContent = `Round ${currentRound} of ${totalRounds} • Test ${testInRound} of ${roundSize}`;
        } else {
            progressInfo.textContent = "";
        }
    }

    saveSettings() {
        localStorage.setItem('cognitiveTestSettings', JSON.stringify(this.settings));
    }

    applyTheme(isDark) {
        if (isDark) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    }

    saveToHistory() {
        let history = JSON.parse(localStorage.getItem('cognitiveTestHistory')) || [];

        // Calculate a crude 'overall' score metric for the quick-view list
        let aggregatePoints = 0;
        let testCount = 0;

        for (const [key, value] of Object.entries(this.state.scores)) {
            if (key === 'storyMemoryQuestions' || key === 'storyMemoryReading' || key === 'addressMemoryReading' || key === 'addressMemoryQuestions') continue;

            if (Array.isArray(value) && typeof value[0] === 'object') {
                if (value[0].avgReaction !== undefined) {
                    const avg = Math.round(value.reduce((a, b) => a + (b.avgReaction || 0), 0) / value.length);
                    if (key === 'flankerArrow') {
                        // Flanker: softer scale. 250ms = 100, 700ms = 0, minus 5 per error
                        let flankerScore = Math.max(0, Math.min(100, Math.round(100 * (700 - avg) / 450)));
                        const totalErrors = value.reduce((a, b) => a + (b.errors || 0), 0);
                        const avgErrors = totalErrors / value.length;
                        flankerScore = Math.max(0, Math.round(flankerScore - avgErrors * 5));
                        aggregatePoints += flankerScore;
                    } else {
                        // Reaction tests: 150ms = 100, 500ms = 0
                        aggregatePoints += Math.max(0, Math.min(100, Math.round(100 * (500 - avg) / 350)));
                    }
                    testCount++;
                }
            } else if (Array.isArray(value) && typeof value[0] === 'string' && value[0].includes('%')) {
                // Spatial memory: average percentage across rounds
                let totalPct = 0;
                let pctCount = 0;
                for (const v of value) {
                    const match = v.match(/(\d+)%/);
                    if (match) { totalPct += parseInt(match[1]); pctCount++; }
                }
                if (pctCount > 0) {
                    aggregatePoints += Math.round(totalPct / pctCount);
                    testCount++;
                }
            } else if (Array.isArray(value) && typeof value[0] === 'string' && value[0].includes('Mistakes')) {
                // Chimp test: 0 mistakes = 100, 1 mistake (0.2 avg) = 95, 2 (0.4 avg) = 90
                const match = value[0].match(/Mistakes:\s*([\d.]+)/);
                if (match) {
                    const avgMistakes = parseFloat(match[1]);
                    aggregatePoints += Math.max(0, Math.round(100 - (avgMistakes * 25)));
                    testCount++;
                }
            } else if (Array.isArray(value) && typeof value[0] === 'string' && value[0].includes('Points')) {
                // Math tests: "83 Points"
                let totalPts = 0;
                let ptsCount = 0;
                for (const v of value) {
                    const m = v.match(/(\d+)\s*Points/);
                    if (m) { totalPts += parseInt(m[1]); ptsCount++; }
                }
                if (ptsCount > 0) {
                    aggregatePoints += Math.round(totalPts / ptsCount);
                    testCount++;
                }
            } else if (Array.isArray(value) && typeof value[0] === 'string' && value[0].includes('/')) {

                // Number memory: "Average: 8.2/9 Digits" — average across rounds
                let totalPct = 0;
                let partCount = 0;
                for (const v of value) {
                    const m = v.match(/([\d.]+)\/([\d.]+)/);
                    if (m) { totalPct += (parseFloat(m[1]) / parseFloat(m[2])) * 100; partCount++; }
                }
                if (partCount > 0) {
                    aggregatePoints += Math.round(totalPct / partCount);
                    testCount++;
                }
            } else if (Array.isArray(value) && typeof value[0] === 'string' && value[0].includes('Hits')) {
                // N-Back: "Hits: X, False Alarms: Y, Misses: Z" — average across rounds
                let totalPct = 0;
                let nCount = 0;
                for (const v of value) {
                    const hitsMatch = v.match(/Hits:\s*(\d+)/);
                    const faMatch = v.match(/False Alarms:\s*(\d+)/);
                    const missesMatch = v.match(/Misses:\s*(\d+)/);
                    if (hitsMatch && missesMatch) {
                        const hits = parseInt(hitsMatch[1]);
                        const fa = faMatch ? parseInt(faMatch[1]) : 0;
                        const misses = parseInt(missesMatch[1]);
                        const total = hits + misses;
                        const score = total > 0 ? Math.max(0, Math.round(((hits - fa) / total) * 100)) : 0;
                        totalPct += score;
                        nCount++;
                    }
                }
                if (nCount > 0) {
                    aggregatePoints += Math.round(totalPct / nCount);
                    testCount++;
                }
            }
        }

        let timeStr = "Unknown Time";
        if (this.gameData.assessmentStartTime) {
            const ms = Date.now() - this.gameData.assessmentStartTime;
            const totalSeconds = Math.floor(ms / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timeStr = `${minutes}m ${seconds}s`;
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString();
        const timeOfDayStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // No seconds

        const runRecord = {
            date: `run: ${dateStr} ${timeOfDayStr}`,
            name: `run: ${dateStr} ${timeOfDayStr}`, // Default name is the date
            durationLabel: this.gameData.assessmentLengthStr || "Practice",
            totalTime: timeStr,
            testsCompleted: Object.keys(this.state.scores).length,
            scoreSummary: testCount > 0 ? `Overall Metric: ${Math.round(aggregatePoints / testCount)} / 100` : "Practice Run",
            rawScores: JSON.parse(JSON.stringify(this.state.scores)), // Deep copy currently populated raw scores
            rawBreakdowns: JSON.parse(JSON.stringify(this.state.breakdowns))
        };

        history.unshift(runRecord); // Add to front
        // Keep max 50 records
        if (history.length > 50) history.pop();

        localStorage.setItem('cognitiveTestHistory', JSON.stringify(history));
    }

    renderHistory() {
        const historyContainer = document.getElementById('history-container');
        const history = JSON.parse(localStorage.getItem('cognitiveTestHistory')) || [];

        if (history.length === 0) {
            historyContainer.innerHTML = '<p style="text-align: center; opacity: 0.6; margin-top: 2rem;">No past results found. Complete a Full Assessment to generate history.</p>';
            return;
        }

        let html = '';
        history.forEach((run, index) => {
            const displayName = run.name || run.date;
            html += `
                <div class="history-card" onclick="window.gameManager.showHistoryDetail(${index})" style="background: var(--surface-color); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border-color); cursor: pointer; transition: 0.2s; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="font-weight: bold; color: var(--accent-color);">${displayName}</span>
                        <span style="font-size: 0.9rem; background: var(--border-color); padding: 0.2rem 0.5rem; border-radius: 4px;">${run.durationLabel}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; opacity: 0.8; font-size: 0.95rem; margin-bottom: 0.5rem;">
                        <span>📅 ${(run.date || '').replace(/^run:\s*/i, '')} &nbsp;·&nbsp; ⏱️ ${run.totalTime}</span>
                        <span>${run.testsCompleted} Tasks Configured</span>
                    </div>
                    <div style="margin-top: 0.5rem; font-weight: bold; font-size: 1.1rem;">${run.scoreSummary}</div>
                </div>
            `;
        });
        historyContainer.innerHTML = html;
    }

    showHistoryDetail(index) {
        const history = JSON.parse(localStorage.getItem('cognitiveTestHistory')) || [];
        const run = history[index];
        if (!run) return;

        const detailContainer = document.getElementById('history-detail-container');
        if (!run.rawScores) {
            detailContainer.innerHTML = '<p style="text-align: center; opacity: 0.6;">No detailed data available for this older run.</p>';
            this.showScreen('history-detail-screen');
            return;
        }

        // Determine maximum rounds played across all tests in this run
        let maxRounds = 1;
        for (const [key, value] of Object.entries(run.rawScores)) {
            if (key === 'storyMemoryReading' || key === 'addressMemoryReading') continue;
            if (Array.isArray(value) && value.length > maxRounds) {
                maxRounds = value.length;
            }
        }

        // Helper to compute per-test metric score (0-100), returns null if not applicable
        const computeTestMetric = (key, value) => {
            if (key === 'storyMemoryQuestions' || key === 'storyMemoryReading' || key === 'addressMemoryReading' || key === 'addressMemoryQuestions') return null;
            if (!Array.isArray(value) || value.length === 0) return null;

            if (typeof value[0] === 'object' && value[0].avgReaction !== undefined) {
                const avg = Math.round(value.reduce((a, b) => a + (b.avgReaction || 0), 0) / value.length);
                if (key === 'flankerArrow') {
                    // Flanker: softer scale. 250ms = 100, 700ms = 0, minus 5 per error
                    let flankerScore = Math.max(0, Math.min(100, Math.round(100 * (700 - avg) / 450)));
                    const totalErrors = value.reduce((a, b) => a + (b.errors || 0), 0);
                    const avgErrors = totalErrors / value.length;
                    flankerScore = Math.max(0, Math.round(flankerScore - avgErrors * 5));
                    return flankerScore;
                } else {
                    // Reaction tests: 150ms = 100, 500ms = 0
                    return Math.max(0, Math.min(100, Math.round(100 * (500 - avg) / 350)));
                }
            } else if (typeof value[0] === 'string' && value[0].includes('%')) {
                // Spatial memory: average percentage across rounds
                let totalPct = 0, pctCount = 0;
                for (const v of value) {
                    const match = v.match(/(\d+)%/);
                    if (match) { totalPct += parseInt(match[1]); pctCount++; }
                }
                return pctCount > 0 ? Math.round(totalPct / pctCount) : null;
            } else if (typeof value[0] === 'string' && value[0].includes('mistakes')) {
                // Chimp test: 0 mistakes = 100, 4+ = 0
                const match = value[0].match(/([\d.]+)\s*mistakes/);
                if (match) {
                    const avgMistakes = parseFloat(match[1]);
                    return Math.max(0, Math.round(100 - (avgMistakes / 4) * 100));
                }
            } else if (typeof value[0] === 'string' && value[0].includes('/')) {
                // Number memory: "Average: 8.2/9 Digits" — average across rounds
                let totalPct = 0, partCount = 0;
                for (const v of value) {
                    const m = v.match(/([\d.]+)\/([\d.]+)/);
                    if (m) { totalPct += (parseFloat(m[1]) / parseFloat(m[2])) * 100; partCount++; }
                }
                return partCount > 0 ? Math.round(totalPct / partCount) : null;
            } else if (typeof value[0] === 'string' && value[0].includes('Hits')) {
                // N-Back: "Hits: X, False Alarms: Y, Misses: Z" — average across rounds
                let totalPct = 0, nCount = 0;
                for (const v of value) {
                    const hitsMatch = v.match(/Hits:\s*(\d+)/);
                    const faMatch = v.match(/False Alarms:\s*(\d+)/);
                    const missesMatch = v.match(/Misses:\s*(\d+)/);
                    if (hitsMatch && missesMatch) {
                        const hits = parseInt(hitsMatch[1]);
                        const fa = faMatch ? parseInt(faMatch[1]) : 0;
                        const misses = parseInt(missesMatch[1]);
                        const total = hits + misses;
                        const score = total > 0 ? Math.max(0, Math.round(((hits - fa) / total) * 100)) : 0;
                        totalPct += score;
                        nCount++;
                    }
                }
                return nCount > 0 ? Math.round(totalPct / nCount) : null;
            }
            return null;
        };

        // Compute overall metric
        let aggregatePoints = 0;
        let testCount = 0;
        const testMetrics = {};
        for (const [key, value] of Object.entries(run.rawScores)) {
            const metric = computeTestMetric(key, value);
            testMetrics[key] = metric;
            if (metric !== null) {
                aggregatePoints += metric;
                testCount++;
            }
        }
        const overallMetric = testCount > 0 ? Math.round(aggregatePoints / testCount) : null;

        const displayName = run.name || run.date;
        const dateDisplay = (run.date || 'Unknown date').replace(/^run:\s*/i, '');
        const timeDisplay = run.totalTime || 'N/A';
        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                <h3 style="margin: 0; color: var(--accent-color);">${displayName} - ${run.durationLabel}</h3>
                <div style="display: flex; gap: 0.5rem; flex-shrink: 0;">
                    <button onclick="event.stopPropagation(); window.gameManager.renameHistory(${index})" style="padding: 0.4rem 0.8rem; font-size: 0.9rem; background: rgba(74,144,226,0.15); border: 1px solid var(--accent-color); color: var(--accent-color); border-radius: 6px; cursor: pointer;" title="Rename Run">✏️ Rename</button>
                    <button onclick="event.stopPropagation(); window.gameManager.deleteHistory(${index})" style="padding: 0.4rem 0.8rem; font-size: 0.9rem; background: rgba(255,77,77,0.15); border: 1px solid #ff4d4d; color: #ff4d4d; border-radius: 6px; cursor: pointer;" title="Delete Run">🗑️ Delete</button>
                </div>
            </div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; opacity: 0.6;">📅 ${dateDisplay} &nbsp;·&nbsp; ⏱️ Completed in ${timeDisplay}</p>
        `;

        // Overall metric display
        if (overallMetric !== null) {
            html += `<div style="text-align: center; margin: 1rem 0 0.5rem 0; padding: 1rem; background: rgba(74,144,226,0.1); border: 1px solid var(--accent-color); border-radius: 10px;">
                <span style="font-size: 1rem; opacity: 0.7;">Overall Metric</span><br>
                <span style="font-size: 3rem; font-weight: 700; color: var(--accent-color);">${overallMetric}</span>
                <span style="font-size: 1.5rem; opacity: 0.5;"> / 100</span>
            </div>`;
        }

        // Build style for table
        html += '<style>.detail-table { width: 100%; border-collapse: collapse; margin-top: 1rem; } .detail-table th, .detail-table td { padding: 10px; border: 1px solid var(--border-color); text-align: center; } .detail-table th { background: #222; } .detail-table td { background: var(--surface-color); }</style>';

        html += '<table class="detail-table">';
        html += '<thead><tr><th style="text-align: left;"></th>';
        for (let i = 1; i <= maxRounds; i++) {
            html += `<th>Round ${i}</th>`;
        }
        html += '<th style="background: rgba(74,144,226,0.15);">Metric</th>';
        html += '</tr></thead><tbody>';

        // Define display order: scored tests first, then question rounds
        const scoredTests = ['audioReaction', 'visualReaction', 'inhibitoryControl', 'flankerArrow', 'visualSpatialMemory', 'simultaneousSpatialMemory', 'sequentialNumberMemory', 'reverseSequentialNumberMemory', 'nBackTask', 'chimpTest'];
        const questionTests = ['storyMemoryQuestions', 'addressMemoryQuestions'];
        const allTests = [...scoredTests, ...questionTests];

        for (const key of allTests) {
            const value = run.rawScores[key];
            if (value === undefined) continue;

            const isQuestionRound = questionTests.includes(key);
            const testTitle = this.testInfo[key] ? this.testInfo[key].title : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            html += `<tr><td style="text-align: left; font-weight: bold;">${testTitle}</td>`;

            for (let i = 0; i < maxRounds; i++) {
                let cellData = "-";
                if (Array.isArray(value) && value[i] !== undefined) {
                    const roundData = value[i];
                    if (typeof roundData === 'object') {
                        if (roundData.earlyCount !== undefined) {
                            cellData = `${roundData.avgReaction} ms <br><span style="font-size: 0.8em; opacity: 0.7;">(Early: ${roundData.earlyCount}/5)</span>`;
                        } else if (roundData.errors !== undefined) {
                            cellData = `${roundData.avgReaction} ms <br><span style="font-size: 0.8em; opacity: 0.7;">(Errors: ${roundData.errors})</span>`;
                        }
                    } else if (typeof roundData === 'string') {
                        cellData = roundData.replace('Average: ', '');
                    } else {
                        cellData = roundData;
                    }
                } else if (!Array.isArray(value) && i === 0) {
                    cellData = value;
                }
                html += `<td>${cellData}</td>`;
            }

            // Metric column
            const metric = testMetrics[key];
            if (isQuestionRound) {
                html += '<td style="opacity: 0.3;">—</td>';
            } else if (metric !== null) {
                html += `<td style="font-weight: bold; color: var(--accent-color);">${metric}</td>`;
            } else {
                html += '<td>-</td>';
            }

            html += '</tr>';
        }

        html += '</tbody></table>';

        if (run.rawBreakdowns) {
            if (run.rawBreakdowns['sequentialNumberMemory']) {
                html += '<h4 style="margin-top: 2rem; color: var(--text-color);">Sequential Numbers Breakdown</h4>';
                html += run.rawBreakdowns['sequentialNumberMemory'];
            }
            if (run.rawBreakdowns['reverseSequentialNumberMemory']) {
                html += '<h4 style="margin-top: 2rem; color: var(--text-color);">Reverse Numbers Breakdown</h4>';
                html += run.rawBreakdowns['reverseSequentialNumberMemory'];
            }
        }

        detailContainer.innerHTML = html;
        this.showScreen('history-detail-screen');
    }

    renameHistory(index) {
        let history = JSON.parse(localStorage.getItem('cognitiveTestHistory')) || [];
        if (!history[index]) return;

        const currentName = history[index].name || history[index].date;
        this.showCustomModal({
            title: 'Rename Assessment Run',
            message: 'Enter a new name for this assessment run:',
            inputField: true,
            inputValue: currentName,
            confirmText: 'Save',
            cancelText: 'Cancel',
            onConfirm: (value) => {
                if (value && value.trim() !== '') {
                    history[index].name = value.trim();
                    localStorage.setItem('cognitiveTestHistory', JSON.stringify(history));
                    this.renderHistory();
                    this.showHistoryDetail(index);
                }
            }
        });
    }

    deleteHistory(index) {
        let history = JSON.parse(localStorage.getItem('cognitiveTestHistory')) || [];
        if (!history[index]) return;

        this.showCustomModal({
            title: 'Delete Assessment Run',
            message: 'Are you sure you want to permanently delete this assessment run from your history?',
            inputField: false,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            dangerous: true,
            onConfirm: () => {
                history.splice(index, 1);
                localStorage.setItem('cognitiveTestHistory', JSON.stringify(history));
                this.renderHistory();
                this.showScreen('history-screen');
            }
        });
    }

    showCustomModal({ title, message, inputField, inputValue, confirmText, cancelText, dangerous, onConfirm }) {
        // Remove any existing modal
        const existing = document.getElementById('custom-app-modal');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'custom-app-modal';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:10000;';

        const box = document.createElement('div');
        box.style.cssText = 'background:#1a1a2e;border:1px solid rgba(74,144,226,0.3);border-radius:12px;padding:2rem;max-width:420px;width:90%;box-shadow:0 8px 32px rgba(0,0,0,0.5);';

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;
        titleEl.style.cssText = 'margin:0 0 1rem 0;color:var(--accent-color,#4a90e2);font-size:1.2rem;';
        box.appendChild(titleEl);

        const msgEl = document.createElement('p');
        msgEl.textContent = message;
        msgEl.style.cssText = 'margin:0 0 1.5rem 0;color:#ccc;font-size:0.95rem;line-height:1.5;';
        box.appendChild(msgEl);

        let inputEl = null;
        if (inputField) {
            inputEl = document.createElement('input');
            inputEl.type = 'text';
            inputEl.value = inputValue || '';
            inputEl.style.cssText = 'width:100%;padding:0.6rem 0.8rem;font-size:1rem;background:#111;color:#fff;border:1px solid rgba(74,144,226,0.4);border-radius:6px;margin-bottom:1.5rem;box-sizing:border-box;outline:none;';
            inputEl.addEventListener('focus', () => { inputEl.style.borderColor = '#4a90e2'; });
            inputEl.addEventListener('blur', () => { inputEl.style.borderColor = 'rgba(74,144,226,0.4)'; });
            box.appendChild(inputEl);
        }

        const btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;gap:0.75rem;justify-content:flex-end;';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = cancelText;
        cancelBtn.style.cssText = 'padding:0.5rem 1.2rem;font-size:0.95rem;background:transparent;border:1px solid #555;color:#aaa;border-radius:6px;cursor:pointer;';
        cancelBtn.addEventListener('click', () => overlay.remove());

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = confirmText;
        if (dangerous) {
            confirmBtn.style.cssText = 'padding:0.5rem 1.2rem;font-size:0.95rem;background:rgba(255,77,77,0.2);border:1px solid #ff4d4d;color:#ff4d4d;border-radius:6px;cursor:pointer;font-weight:600;';
        } else {
            confirmBtn.style.cssText = 'padding:0.5rem 1.2rem;font-size:0.95rem;background:rgba(74,144,226,0.2);border:1px solid #4a90e2;color:#4a90e2;border-radius:6px;cursor:pointer;font-weight:600;';
        }
        confirmBtn.addEventListener('click', () => {
            overlay.remove();
            if (onConfirm) onConfirm(inputEl ? inputEl.value : null);
        });

        btnRow.appendChild(cancelBtn);
        btnRow.appendChild(confirmBtn);
        box.appendChild(btnRow);
        overlay.appendChild(box);

        // Close on overlay click (outside the box)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        document.body.appendChild(overlay);

        // Focus input or confirm button
        if (inputEl) {
            inputEl.focus();
            inputEl.select();
            inputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') confirmBtn.click();
                if (e.key === 'Escape') overlay.remove();
            });
        } else {
            confirmBtn.focus();
            confirmBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') overlay.remove();
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameManager = new GameManager();
});
