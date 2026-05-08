import type { ComicTheme, Personality, SelectOption } from "./types";

export const personalityOptions: SelectOption<Personality>[] = [
  { value: "Goofy", label: "Goofy", description: "Silly chaos, big reactions, zero chill." },
  { value: "Heroic", label: "Heroic", description: "Brave, triumphant, mission-focused." },
  { value: "Mischievous", label: "Mischievous", description: "Sneaky, clever, snack-adjacent." },
  { value: "Dramatic", label: "Dramatic", description: "Epic intensity for tiny situations." },
  { value: "Sleepy", label: "Sleepy", description: "Cozy, slow, nap-powered comedy." },
];

export const themeOptions: SelectOption<ComicTheme>[] = [
  { value: "Superhero", label: "Superhero", description: "Powers, missions, saving the day." },
  { value: "Space Adventure", label: "Space Adventure", description: "Stars, planets, rockets, cosmic patrol." },
  { value: "Backyard Chaos", label: "Backyard Chaos", description: "Squirrels, digging, toys, zoomies." },
  { value: "Detective Dog", label: "Detective Dog", description: "Clues, suspicious smells, mystery-solving." },
  { value: "Royal Pup", label: "Royal Pup", description: "Crowns, kingdoms, noble treat drama." },
];

export const titleTemplatesByTheme: Record<ComicTheme, string[]> = {
  Superhero: [
    "{name}: The Bark Knight Begins",
    "{name} and the Snack Signal",
    "Captain {name} Saves the Couch",
    "The Unleashed Legend of {name}",
    "{name}: Guardian of the Good Treats",
  ],
  "Space Adventure": [
    "{name} vs. the Moon Biscuit",
    "{name} and the Cosmic Zoomies",
    "Mission Pup-ossible: {name} in Space",
    "The Galactic Tail of {name}",
    "{name}: Captain of the Star Borks",
  ],
  "Backyard Chaos": [
    "{name} and the Great Yard Uprising",
    "The Backyard Chronicles of {name}",
    "{name} vs. Squirrel Command",
    "Zoomie Zone: {name} Unleashed",
    "{name} and the Mystery Hole",
  ],
  "Detective Dog": [
    "Detective {name} and the Suspicious Crumb",
    "{name}: Nose for Justice",
    "The Case of the Missing Treats",
    "{name} and the Midnight Sniff",
    "Inspector {name}: Furensic Files",
  ],
  "Royal Pup": [
    "The Royal Decree of {name}",
    "{name}: Crown of the Couch Kingdom",
    "The Noble Treat Trials of {name}",
    "Queen/King {name} and the Blanket Throne",
    "{name}: Heir to the Snackdom",
  ],
};

export const actionWordsByTheme: Record<ComicTheme, string[]> = {
  Superhero: ["BORK!", "WHOOSH!", "POW!", "ZOOM!", "KAPOW!", "SAVES!"],
  "Space Adventure": ["BLAST!", "WARP!", "BORK!", "WHOOSH!", "ORBIT!", "ZAP!"],
  "Backyard Chaos": ["ZOOM!", "DIG!", "SCREECH!", "BORK!", "POOF!", "SKID!"],
  "Detective Dog": ["SNIFF!", "AHA!", "BORK!", "CLUE!", "GASP!", "DUN DUN!"],
  "Royal Pup": ["BEHOLD!", "HUZZAH!", "BORK!", "TRUMPETS!", "POOF!", "NOBLE!"],
};

export const panelBeatsByTheme: Record<ComicTheme, string[][]> = {
  Superhero: [
    ["A snack signal flashes over the living room skyline.", "The neighborhood needs a hero with four paws."],
    ["A mysterious squeak toy emergency erupts.", "The mission accelerates at dangerous tail speed."],
    ["The villainous vacuum appears without warning.", "A legendary power activates: maximum floof force."],
    ["Peace returns to the couch district.", "The hero accepts payment in treats and applause."],
  ],
  "Space Adventure": [
    ["Mission control spots a biscuit-shaped moon.", "A brave pup boards the cardboard rocket."],
    ["Asteroids of kibble begin drifting across the galaxy.", "The stars tremble before a mighty tail wag."],
    ["A cosmic squirrel crosses the sensor array.", "Zero-gravity zoomies shake the universe."],
    ["The crew returns with crumbs from Planet Snack.", "The final frontier is actually the nap blanket."],
  ],
  "Backyard Chaos": [
    ["The yard is quiet. Too quiet. Suspiciously squirrel-shaped quiet.", "Fence patrol begins under urgent paw authority."],
    ["A tennis ball vanishes into dangerous grass territory.", "Zoomies reach weather-event status."],
    ["The Great Digging Incident becomes impossible to ignore.", "A leaf ambush triggers emergency bork protocol."],
    ["Order is restored, mostly, sort of, not really.", "The yard survives. The squirrel files a complaint."],
  ],
  "Detective Dog": [
    ["A crumb disappears from the scene of the snack.", "The nose knows something the humans do not."],
    ["Suspicious smells gather near the laundry basket.", "A paw print points toward the forbidden hallway."],
    ["The suspect squeaker cracks under pressure.", "A dramatic sniff reveals the hidden truth."],
    ["Case closed with one final bork.", "Justice is served warm, crunchy, and possibly chicken-flavored."],
  ],
  "Royal Pup": [
    ["A royal summons echoes from the blanket throne.", "The kingdom awaits its fluffiest ruler."],
    ["A treaty is proposed between the Couch and Treat Realms.", "Court drama erupts over who gets the soft pillow."],
    ["The royal zoomies begin without parliamentary approval.", "A peasant squirrel challenges the crown."],
    ["The kingdom rejoices beneath a shower of treats.", "The royal nap is declared legally binding."],
  ],
};

export const dialogueByPersonality: Record<Personality, string[][]> = {
  Goofy: [
    ["I have no plan, only vibes!", "Did somebody say snacks or did I invent that?"],
    ["Emergency wiggle sequence activated!", "My ears are doing science!"],
    ["This is fine. Extremely sideways, but fine!", "I meant to do that. Probably."],
    ["Victory tastes like crumbs!", "Please hold applause until after belly rubs."],
  ],
  Heroic: [
    ["Stand back. I was born for this mission.", "For honor, justice, and the treat jar!"],
    ["No squirrel outruns courage!", "The pack depends on me."],
    ["I summon the ancient power of good dog energy!", "Not today, suspicious danger!"],
    ["The day is saved. The tail remains humble.", "Another mission completed with dignity."],
  ],
  Mischievous: [
    ["Nobody look at the snack shelf.", "I am innocent and extremely busy."],
    ["A diversion would be useful right now.", "The squirrel knows too much."],
    ["Technically, I found it before I stole it.", "Operation Tiny Chaos is working."],
    ["What treat? I see no treat.", "Perfect crime. Perfect nap."],
  ],
  Dramatic: [
    ["The prophecy begins... in the hallway.", "At last, destiny has scratched the door."],
    ["The stakes have never been fluffier!", "Witness my legendary side-eye!"],
    ["The world trembles before this moment!", "Cue the thunder. Cue the wind. Cue dinner."],
    ["History will remember this nap.", "A legend falls gracefully onto the couch."],
  ],
  Sleepy: [
    ["Can the origin story start after this nap?", "I am listening with one eye closed."],
    ["I will investigate from this blanket.", "Wake me when the snacks arrive."],
    ["Maximum effort has been rescheduled.", "A slow blink is basically a battle cry."],
    ["Victory is soft and slightly snoring.", "The case is closed because I am closed."],
  ],
};

export const endingLinesByTheme: Record<ComicTheme, string[]> = {
  Superhero: [
    "And so the couch is safe again.",
    "The hero vanishes into legend, or the kitchen.",
    "Justice has a wagging tail.",
  ],
  "Space Adventure": [
    "The galaxy awards one cosmic biscuit.",
    "Mission complete. Nap orbit achieved.",
    "The stars will bork of this forever.",
  ],
  "Backyard Chaos": [
    "The squirrel retreats. For now.",
    "The yard survives another legendary shift.",
    "No holes were admitted to by management.",
  ],
  "Detective Dog": [
    "The mystery is solved, but the crumb remains missing.",
    "Another cold case turns warm and snacky.",
    "Truth has a nose print.",
  ],
  "Royal Pup": [
    "Long may the snack bowl reign.",
    "The crown is heavy, but the blanket is soft.",
    "All hail the fluff monarchy.",
  ],
};

export const notesInsertionHelpers = {
  titleBoosters: ["featuring {note}", "and the {note} incident", "with bonus {note}"],
  bubbleOpeners: ["Also: {note}!", "Important update: {note}.", "The prophecy mentioned {note}.", "Never underestimate {note}.", "This changes everything: {note}!"],
  captionLines: ["Legend says the key was {note}.", "Nobody expected the {note} maneuver.", "The crowd gasped at pure {note} energy."],
};

export const loadingMessages = [
  "Studying your pup…",
  "Detecting floof levels…",
  "Writing the origin story…",
  "Adding dramatic zoomies…",
  "Finalizing the punchline…",
];
