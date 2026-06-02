// Static data and dynamic math question templates for the Cognitive Intelligence Test

window.COGNITIVE_STORIES = [
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
    },
    {
        text: "David traveled to Iceland in the middle of winter to photograph the Northern Lights. Despite the freezing temperatures, he drove his rented jeep 4 hours outside of Reykjavik and finally captured a perfect shot using a 30-second exposure.",
        questions: [
            { prompt: "What country did David travel to?", options: ["Norway", "Iceland", "Greenland"], answer: "1" },
            { prompt: "What was he trying to photograph?", options: ["Glaciers", "Whales", "Northern Lights"], answer: "2" },
            { prompt: "How far did he drive from the city?", options: ["2 hours", "4 hours", "6 hours"], answer: "1" },
            { prompt: "What city did he leave from?", options: ["Oslo", "Reykjavik", "Stockholm"], answer: "1" },
            { prompt: "How long was the camera exposure?", options: ["30 seconds", "1 minute", "10 seconds"], answer: "0" }
        ]
    },
    {
        text: "Emma, an aspiring pastry chef, flew to Florence, Italy for a two-week intensive culinary masterclass. On her final day, she successfully baked 24 perfect almond croissants that earned her the top prize from the head instructor.",
        questions: [
            { prompt: "What city did Emma fly to?", options: ["Rome", "Milan", "Florence"], answer: "2" },
            { prompt: "How long was her masterclass?", options: ["One week", "Two weeks", "One month"], answer: "1" },
            { prompt: "What is Emma's profession?", options: ["Restaurant manager", "Pastry chef", "Food critic"], answer: "1" },
            { prompt: "How many croissants did she bake?", options: ["12", "18", "24"], answer: "2" },
            { prompt: "What kind of croissants were they?", options: ["Chocolate", "Almond", "Butter"], answer: "1" }
        ]
    },
    {
        text: "Chris spent his entire Saturday morning hunting for vintage car parts at a massive swap meet in Detroit. He haggled with three different vendors and finally walked away with a pristine 1968 Mustang steering wheel for exactly $150.",
        questions: [
            { prompt: "What day of the week was it?", options: ["Friday", "Saturday", "Sunday"], answer: "1" },
            { prompt: "What city was the swap meet in?", options: ["Detroit", "Chicago", "Indianapolis"], answer: "0" },
            { prompt: "How many vendors did he haggle with?", options: ["Two", "Three", "Five"], answer: "1" },
            { prompt: "What specific part did he buy?", options: ["Carburetor", "Windshield", "Steering wheel"], answer: "2" },
            { prompt: "How much did he pay for it?", options: ["$100", "$150", "$200"], answer: "1" }
        ]
    },
    {
        text: "Sophie, a marine biologist, spent the summer stationed at a research facility on the Great Barrier Reef in Australia. During a deep dive in July, she tagged exactly 7 rare sea turtles to track their migration patterns.",
        questions: [
            { prompt: "What is Sophie's profession?", options: ["Scuba instructor", "Marine biologist", "Oceanographer"], answer: "1" },
            { prompt: "Where was she stationed?", options: ["Galapagos", "Caribbean", "Great Barrier Reef"], answer: "2" },
            { prompt: "What month did she do her deep dive?", options: ["June", "July", "August"], answer: "1" },
            { prompt: "How many sea turtles did she tag?", options: ["5", "7", "9"], answer: "1" },
            { prompt: "What was the purpose of tagging them?", options: ["Medical check", "Track migration patterns", "Population counting"], answer: "1" }
        ]
    },
    {
        text: "Marcus is an architect who took a special architectural boat tour down the river in Chicago to study skyscrapers. The tour lasted exactly 90 minutes, during which he sketched 4 famous historic buildings in his leather notebook.",
        questions: [
            { prompt: "What is Marcus's profession?", options: ["Engineer", "Architect", "Historian"], answer: "1" },
            { prompt: "What city was he taking studying in?", options: ["New York", "Chicago", "Boston"], answer: "1" },
            { prompt: "What kind of tour was he on?", options: ["Walking tour", "Helicopter tour", "Boat tour"], answer: "2" },
            { prompt: "How long did the tour last?", options: ["60 minutes", "90 minutes", "120 minutes"], answer: "1" },
            { prompt: "How many buildings did he sketch?", options: ["3", "4", "5"], answer: "1" }
        ]
    },
    {
        text: "Natalie flew into the heart of the Amazon rainforest to catalog undiscovered plant species. On the third day of her damp expedition, she stumbled upon a brightly colored purple orchid growing on the side of a massive mahogany tree.",
        questions: [
            { prompt: "Where did Natalie fly to?", options: ["Amazon rainforest", "Congo basin", "Sumatra"], answer: "0" },
            { prompt: "What was she trying to catalog?", options: ["Insects", "Tree frogs", "Plant species"], answer: "2" },
            { prompt: "What day of the expedition did she find the flower?", options: ["First", "Second", "Third"], answer: "2" },
            { prompt: "What color was the orchid?", options: ["Red", "Purple", "Yellow"], answer: "1" },
            { prompt: "What kind of tree was it growing on?", options: ["Mahogany", "Oak", "Rubber tree"], answer: "0" }
        ]
    },
    {
        text: "Ryan, an independent country musician, booked a small studio in Nashville for his debut album. After playing his acoustic guitar for 8 hours straight, his fingers were blistered, but he managed to perfectly record 5 original songs.",
        questions: [
            { prompt: "What genre of music does Ryan play?", options: ["Rock", "Country", "Folk"], answer: "1" },
            { prompt: "What city was the studio in?", options: ["Austin", "Nashville", "Memphis"], answer: "1" },
            { prompt: "What instrument was he playing?", options: ["Piano", "Electric guitar", "Acoustic guitar"], answer: "2" },
            { prompt: "How many hours did he play straight?", options: ["6 hours", "8 hours", "10 hours"], answer: "1" },
            { prompt: "How many original songs did he record?", options: ["3", "5", "7"], answer: "1" }
        ]
    },
    {
        text: "Elena trained for an entire year to qualify for the famous Boston Marathon. The weather was a freezing 40 degrees and raining, but she pushed through the pain and crossed the finish line in an impressive 3 hours and 15 minutes.",
        questions: [
            { prompt: "What marathon was Elena running?", options: ["New York", "Boston", "Chicago"], answer: "1" },
            { prompt: "How long did she train to qualify?", options: ["Six months", "One year", "Two years"], answer: "1" },
            { prompt: "What was the temperature during the race?", options: ["30 degrees", "40 degrees", "50 degrees"], answer: "1" },
            { prompt: "What was the weather like?", options: ["Sunny", "Snowing", "Raining"], answer: "2" },
            { prompt: "What was her finishing time?", options: ["3 hours 15 minutes", "3 hours 30 minutes", "3 hours 45 minutes"], answer: "0" }
        ]
    },
    {
        text: "Victor rented a tiny stone cottage in the countryside of Provence, France to focus on his painting. Over a single peaceful weekend, he used up 12 tubes of blue oil paint trying to capture the vast lavender fields.",
        questions: [
            { prompt: "What country was Victor visiting?", options: ["Italy", "Spain", "France"], answer: "2" },
            { prompt: "What region was the cottage in?", options: ["Burgundy", "Provence", "Bordeaux"], answer: "1" },
            { prompt: "How many tubes of paint did he use up?", options: ["10", "12", "14"], answer: "1" },
            { prompt: "What color paint did he use the most?", options: ["Blue", "Purple", "Green"], answer: "0" },
            { prompt: "What was he trying to paint?", options: ["Sunflowers", "Lavender fields", "Vineyards"], answer: "1" }
        ]
    },
    {
        text: "Harper packed her heavy telescope and drove high up into the Andes mountains of Chile to escape the city light pollution. At exactly 2:00 AM, she was thrilled to spot a rare passing comet with a glowing green tail.",
        questions: [
            { prompt: "What mountain range did Harper drive into?", options: ["Rockies", "Andes", "Alps"], answer: "1" },
            { prompt: "What country was she in?", options: ["Argentina", "Chile", "Peru"], answer: "1" },
            { prompt: "Why did she go up into the mountains?", options: ["Fresh air", "Escape light pollution", "Higher altitude"], answer: "1" },
            { prompt: "What time did she spot the object?", options: ["Midnight", "1:00 AM", "2:00 AM"], answer: "2" },
            { prompt: "What color was the comet's tail?", options: ["Blue", "Green", "White"], answer: "1" }
        ]
    },
    {
        text: "Leo saved up his bartender tips for months to take a dream surfing trip to the volcanic island of Bali. On his first day hitting the water, he successfully caught a massive 10-foot wave right before a heavy tropical storm rolled in.",
        questions: [
            { prompt: "How did Leo save money for his trip?", options: ["Selling his car", "Bartender tips", "Office bonus"], answer: "1" },
            { prompt: "What island did he travel to?", options: ["Bali", "Fiji", "Maui"], answer: "0" },
            { prompt: "How large was the wave he caught?", options: ["8-foot", "10-foot", "12-foot"], answer: "1" },
            { prompt: "When did he catch the wave?", options: ["His first day", "His last day", "The middle of the trip"], answer: "0" },
            { prompt: "What weather event happened right after?", options: ["Tsunami", "Tropical storm", "Earthquake"], answer: "1" }
        ]
    },
    {
        text: "Chloe, a senior software engineer, flew halfway across the world to attend an artificial intelligence conference in Tokyo. During the event, she drank 5 cups of matcha tea and networked with developers from 18 different countries.",
        questions: [
            { prompt: "What is Chloe's job title?", options: ["Data Analyst", "Senior software engineer", "Product Manager"], answer: "1" },
            { prompt: "What city was the conference in?", options: ["Seoul", "Tokyo", "Singapore"], answer: "1" },
            { prompt: "What was the topic of the conference?", options: ["Cybersecurity", "Blockchain", "Artificial intelligence"], answer: "2" },
            { prompt: "How many cups of tea did she drink?", options: ["3", "5", "7"], answer: "1" },
            { prompt: "How many different countries were the developers from?", options: ["12", "15", "18"], answer: "2" }
        ]
    }
];

window.COGNITIVE_ADDRESSES = [
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
    { text: "9618 Hazel Rd, Mesa, AZ, USA", options: ["9618 Hazel Rd, Mesa, NM, USA", "9618 Hazel Rd, Mesa, AZ, USA", "9168 Hazel Rd, Mesa, AZ, USA", "9618 Hazel Ln, Mesa, AZ, USA"], answer: "1" },
    { text: "1928 Birch Creek Rd, Richmond, VA, USA", options: ["1928 Birch Creek Rd, Richmond, VA, USA", "1829 Birch Creek Rd, Richmond, VA, USA", "1928 Birch Creek Dr, Richmond, VA, USA", "1928 Birch Creek Rd, Roanoke, VA, USA"], answer: "0" },
    { text: "5431 Oceanview Ave, Monterey, CA, USA", options: ["5431 Oceanview Ave, Malibu, CA, USA", "5413 Oceanview Ave, Monterey, CA, USA", "5431 Oceanview Ave, Monterey, CA, USA", "5431 Oceanfront Ave, Monterey, CA, USA"], answer: "2" },
    { text: "8765 Pinewood Ln, Savannah, GA, USA", options: ["8765 Pinewood Ln, Savannah, SC, USA", "8756 Pinewood Ln, Savannah, GA, USA", "8765 Pinehurst Ln, Savannah, GA, USA", "8765 Pinewood Ln, Savannah, GA, USA"], answer: "3" },
    { text: "2314 Meadow Dr, Madison, AL, USA", options: ["2314 Meadow Way, Madison, AL, USA", "2314 Meadow Dr, Madison, AL, USA", "2134 Meadow Dr, Madison, AL, USA", "2314 Meadow Dr, Mobile, AL, USA"], answer: "1" },
    { text: "6590 Riverbend Ct, Cincinnati, OH, USA", options: ["6590 Riverbend Ct, Cincinnati, OH, USA", "6509 Riverbend Ct, Cincinnati, OH, USA", "6590 Riverwalk Ct, Cincinnati, OH, USA", "6590 Riverbend Ct, Cleveland, OH, USA"], answer: "0" },
    { text: "1023 Summit Way, Salt Lake City, UT, USA", options: ["1032 Summit Way, Salt Lake City, UT, USA", "1023 Summer Way, Salt Lake City, UT, USA", "1023 Summit Way, Salt Lake City, UT, USA", "1023 Summit Way, Park City, UT, USA"], answer: "2" },
    { text: "7845 Valley Forge, Lexington, KY, USA", options: ["7845 Valley Forge, Louisville, KY, USA", "7854 Valley Forge, Lexington, KY, USA", "7845 Valley View, Lexington, KY, USA", "7845 Valley Forge, Lexington, KY, USA"], answer: "3" },
    { text: "4901 Harbor Blvd, Charleston, SC, USA", options: ["4901 Harbor Blvd, Charleston, NC, USA", "4901 Harbor Blvd, Charleston, SC, USA", "4091 Harbor Blvd, Charleston, SC, USA", "4901 Haven Blvd, Charleston, SC, USA"], answer: "1" }
];

window.COGNITIVE_MATH_TEMPLATES = [
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
    },
    // 16. Salary/Taxes
    () => {
        const salary = Math.floor(Math.random() * 3 + 4) * 1000; // 4000 to 6000
        const taxRate = Math.floor(Math.random() * 3) * 5 + 15; // 15, 20, 25
        const months = Math.floor(Math.random() * 4) + 3; // 3 to 6
        const text = `You earn a gross salary of $${salary} per month. Exactly ${taxRate}% of your salary is deducted for taxes before you are paid. How much net take-home pay do you receive over the course of ${months} months?`;
        const answer = (salary * (1 - taxRate / 100)) * months;
        return { text, answer };
    },
    // 17. Baking/Ingredients
    () => {
        const baseFlour = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const baseCookies = Math.floor(Math.random() * 2 + 1) * 12; // 12 or 24
        const targetCookies = baseCookies * (Math.floor(Math.random() * 3) + 3); // 36, 48, ... target
        const text = `A recipe requires exactly ${baseFlour} cups of flour to bake a batch of ${baseCookies} master-size cookies. If you are hosting a party and need to bake ${targetCookies} of these cookies, how many cups of flour will you need in total?`;
        const answer = (targetCookies / baseCookies) * baseFlour;
        return { text, answer };
    },
    // 18. Gym Memberships
    () => {
        const joinFee = (Math.floor(Math.random() * 5) + 5) * 10; // 50 to 90
        const monthly = (Math.floor(Math.random() * 4) + 3) * 10; // 30 to 60
        const months = Math.floor(Math.random() * 6) + 6; // 6 to 11
        const text = `A local fitness gym charges a one-time joining fee of $${joinFee} and a flat rate of $${monthly} per month. If you sign a contract and stay a member for ${months} months, how much will you have paid the gym in total?`;
        const answer = joinFee + (monthly * months);
        return { text, answer };
    },
    // 19. Train Commute
    () => {
        const speed = (Math.floor(Math.random() * 4) + 6) * 10; // 60 to 90
        const hours = Math.floor(Math.random() * 3) + 4; // 4 to 6
        const rate = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const text = `An express train travels at a constant speed of ${speed} miles per hour. It takes exactly ${hours} hours to reach its destination. If the railway company charges $${rate} for every single mile traveled, what is the cost of the ticket?`;
        const answer = (speed * hours) * rate;
        return { text, answer };
    },
    // 20. Gardening
    () => {
        const width = Math.floor(Math.random() * 5) + 5; // 5 to 9
        const length = Math.floor(Math.random() * 5) + 10; // 10 to 14
        const area = width * length;
        const coverage = 10;
        const cost = Math.floor(Math.random() * 10) + 15; // 15 to 24
        const text = `You are designing a rectangular garden that is ${width} feet wide and ${length} feet long. A bag of premium fertilizer perfectly covers exactly ${coverage} square feet of ground and costs $${cost} per bag. How much will it cost to fertilize the entire garden area?`;
        const answer = (Math.ceil(area / coverage)) * cost;
        return { text, answer };
    }
];
