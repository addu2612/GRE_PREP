import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';


const words = [
    { word: "Abate", meaning: "subside, or moderate" },
    { word: "Aberrant", meaning: "abnormal, or deviant" },
    { word: "Abeyance", meaning: "suspended action" },
    { word: "Abscond", meaning: "depart secretly and hide" },
    { word: "Abstemious", meaning: "sparing in eating and drinking; temperate" },
    { word: "Admonish", meaning: "warn; reprove" },
    { word: "Adulterate", meaning: "make impure by adding inferior or tainted substances" },
    { word: "Aesthetic", meaning: "artistic; dealing with or capable of appreciating the beautiful" },
    { word: "Aggregate", meaning: "gather; accumulate" },
    { word: "Alacrity", meaning: "cheerful promptness; eagerness" },
    { word: "Alleviate", meaning: "relieve" },
    { word: "Amalgamate", meaning: "combine; unite in one body" },
    { word: "Ambiguous", meaning: "unclear or doubtful in meaning" },
    { word: "Ambivalence", meaning: "the state of having contradictory or conflicting emotional attitudes" },
    { word: "Ameliorate", meaning: "improve" },
    { word: "Anachronism", meaning: "something or someone misplaced in time" },
    { word: "Analogous", meaning: "comparable" },
    { word: "Anarchy", meaning: "absence of governing body; state of disorder" },
    { word: "Anomalous", meaning: "abnormal; irregular" },
    { word: "Antipathy", meaning: "aversion; dislike" },
    { word: "Apathy", meaning: "lack of caring; indifference" },
    { word: "Appease", meaning: "pacify or soothe; relieve" },
    { word: "Apprise", meaning: "inform" },
    { word: "Approbation", meaning: "approval" },
    { word: "Appropriate", meaning: "acquire; take possession of for one's own use" },
    { word: "Arduous", meaning: "hard; strenuous" },
    { word: "Artless", meaning: "without guile; open and honest" },
    { word: "Ascetic", meaning: "practicing self-denial; austere" },
    { word: "Assiduous", meaning: "diligent" },
    { word: "Assuage", meaning: "ease or lessen (pain); satisfy (hunger); soothe (anger)" },
    { word: "Attenuate", meaning: "make thinner" },
    { word: "Audacious", meaning: "daring; bold" },
    { word: "Austere", meaning: "forbiddingly stern; severely simple and unornamented" },
    { word: "Autonomous", meaning: "self-governing; independent" },
    { word: "Aver", meaning: "assert confidently or declare; as used in law, state formally as a fact" },
    { word: "Banal", meaning: "hackneyed; commonplace; trite; lacking originality" },
    { word: "Belie", meaning: "contradict; give a false impression" },
    { word: "Beneficent", meaning: "kindly; doing good" },
    { word: "Bolster", meaning: "support; reinforce" },
    { word: "Bombastic", meaning: "pompous; using inflated language" },
    { word: "Boorish", meaning: "rude; insensitive" },
    { word: "Burgeon", meaning: "grow forth; send out buds" },
    { word: "Burnish", meaning: "make shiny by rubbing; polish" },
    { word: "Buttress", meaning: "support; prop up" },
    { word: "Capricious", meaning: "unpredictable; fickle" },
    { word: "Castigation", meaning: "punishment; severe criticism" },
    { word: "Catalyst", meaning: "agent that increases the pace of a chemical action" },
    { word: "Caustic", meaning: "burning; sarcastically biting" },
    { word: "Chicanery", meaning: "trickery; deception" },
    { word: "Coagulate", meaning: "thicken; congeal; clot" },
    { word: "Coda", meaning: "concluding section of a musical or literary composition; summarizes or concludes" },
    { word: "Cogent", meaning: "convincing" },
    { word: "Commensurate", meaning: "corresponding in extent, degree, etc.; proportionate" },
    { word: "Compendium", meaning: "brief, comprehensive summary" },
    { word: "Complaisant", meaning: "trying to please; overly polite; obliging" },
    { word: "Compliant", meaning: "yielding; conforming to requirements" },
    { word: "Conciliatory", meaning: "reconciling; soothing" },
    { word: "Condone", meaning: "overlook; forgive; give tacit approval; excuse" },
    { word: "Confound", meaning: "confuse; puzzle" },
    { word: "Connoisseur", meaning: "person competent to act as a judge of art; a lover of art" },
    { word: "Contention", meaning: "claim; thesis" },
    { word: "Contentious", meaning: "quarrelsome" },
    { word: "Contrite", meaning: "penitent" },
    { word: "Conundrum", meaning: "riddle; difficult problem" },
    { word: "Converge", meaning: "approach; tend to meet; come together" },
    { word: "Convoluted", meaning: "coiled around; involved; intricate" },
    { word: "Craven", meaning: "cowardly" },
    { word: "Daunt", meaning: "intimidate; frighten" },
    { word: "Decorum", meaning: "propriety; orderliness and good taste in manners" },
    { word: "Default", meaning: "failure to act" },
    { word: "Deference", meaning: "courteous regard for another's wishes" },
    { word: "Delineate", meaning: "portray; depict; sketch" },
    { word: "Denigrate", meaning: "blacken" },
    { word: "Deride", meaning: "ridicule; make fun of" },
    { word: "Derivative", meaning: "unoriginal; obtained from another source" },
    { word: "Desiccate", meaning: "dry up" },
    { word: "Desultory", meaning: "aimless; haphazard; digressing at random" },
    { word: "Deterrent", meaning: "Something that discourages; hindrance" },
    { word: "Diatribe", meaning: "bitter scolding; invective" },
    { word: "Dichotomy", meaning: "split; branching into two parts (especially contradictory ones)" },
    { word: "Diffidence", meaning: "Shyness" },
    { word: "Diffuse", meaning: "wordy, rambling, spread out (like a gas)" },
    { word: "Digression", meaning: "wandering away from the subject" },
    { word: "Dirge", meaning: "lament with music" },
    { word: "Disabuse", meaning: "correct a false impression; undeceive" },
    { word: "Discerning", meaning: "mentally quick and observant; having insight" },
    { word: "Discordant", meaning: "not harmonious; conflicting" },
    { word: "Discredit", meaning: "defame; destroy confidence in; disbelieve" },
    { word: "Discrepancy", meaning: "lack of consistency; difference" },
    { word: "Discrete", meaning: "separate; unconnected; consisting of distinct parts" },
    { word: "Disingenuous", meaning: "lacking genuine candor; insincere" },
    { word: "Disinterested", meaning: "unprejudiced" },
    { word: "Disjointed", meaning: "lacking coherence; separated at the joints" },
    { word: "Dismiss", meaning: "eliminate from consideration; reject" },
    { word: "Disparage", meaning: "belittle" },
    { word: "Disparate", meaning: "basically different; unrelated" },
    { word: "Dissemble", meaning: "disguise; pretend" },
    { word: "Disseminate", meaning: "distribute; spread; scatter (like seeds)" },
    { word: "Dissolution", meaning: "disintegration; looseness in morals" },
    { word: "Dissonance", meaning: "discord; opposite of harmony" },
    { word: "Distend", meaning: "expand; swell out" },
    { word: "Distill", meaning: "purify; refine; concentrate" },
    { word: "Diverge", meaning: "vary; go in different directions from the same point" },
    { word: "Divest", meaning: "strip; deprive" },
    { word: "Document", meaning: "provide written evidence" },
    { word: "Dogmatic", meaning: "opinionated; arbitrary; doctrinal" },
    { word: "Dormant", meaning: "sleeping; lethargic; latent" },
    { word: "Dupe", meaning: "someone easily fooled" },
    { word: "Ebullient", meaning: "showing excitement; overflowing with enthusiasm" },
    { word: "Eclectic", meaning: "selective; composed of elements drawn from disparate sources" },
    { word: "Efficacy", meaning: "power to produce desired effect" },
    { word: "Effrontery", meaning: "impudence; shameless boldness; sheer nerve; presumptuousness" },
    { word: "Elegy", meaning: "poem or song expressing lamentation" },
    { word: "Elicit", meaning: "draw out by discussion" },
    { word: "Embellish", meaning: "adorn; ornament; enhance, as a story" },
    { word: "Empirical", meaning: "based on experience" },
    { word: "Emulate", meaning: "imitate; rival" },
    { word: "Endemic", meaning: "prevailing among a specific group of people or in a specific area or country" },
    { word: "Enervate", meaning: "weaken" },
    { word: "Engender", meaning: "cause; produce" },
    { word: "Enhance", meaning: "increase; improve" },
    { word: "Ephemeral", meaning: "short-lived; fleeting" },
    { word: "Equanimity", meaning: "calmness of temperament; composure" },
    { word: "Equivocate", meaning: "lie; mislead; attempt to conceal the truth" },
    { word: "Erudite", meaning: "learned; scholarly" },
    { word: "Esoteric", meaning: "hard to understand; known only to the chosen few" },
    { word: "Eulogy", meaning: "expression of praise, often on the occasion of someone's death" },
    { word: "Euphemism", meaning: "mild expression in place of an unpleasant one" },
    { word: "Exacerbate", meaning: "worsen; embitter" },
    { word: "Exculpate", meaning: "clear from blame" },
    { word: "Exigency", meaning: "urgent situation; pressing needs or demands; state of requiring immediate attention" },
    { word: "Extrapolation", meaning: "projection; conjecture" },
    { word: "Facetious", meaning: "joking (often inappropriately); humorous" },
    { word: "Facilitate", meaning: "help bring about; make less difficult" },
    { word: "Fallacious", meaning: "false; misleading" },
    { word: "Fatuous", meaning: "brainless; inane; foolish, yet smug" },
    { word: "Fawning", meaning: "trying to please by behaving obsequiously, flattering, or cringing" },
    { word: "Felicitous", meaning: "apt; suitably expressed; well chosen" },
    { word: "Fervor", meaning: "glowing ardor; intensity of feeling" },
    { word: "Flag", meaning: "droop; grow feeble" },
    { word: "Fledgling", meaning: "inexperienced" },
    { word: "Flout", meaning: "reject; mock; show contempt for" },
    { word: "Foment", meaning: "stir up; instigate" },
    { word: "Forestall", meaning: "prevent by taking action in advance" },
    { word: "Frugality", meaning: "thrift; economy" },
    { word: "Futile", meaning: "useless; hopeless; ineffectual" },
    { word: "Gainsay", meaning: "deny" },
    { word: "Garrulous", meaning: "loquacious; talkative; wordy" },
    { word: "Goad", meaning: "urge on" },
    { word: "Gouge", meaning: "overcharge" },
    { word: "Grandiloquent", meaning: "pompous; bombastic; using high-sounding language" },
    { word: "Gregarious", meaning: "sociable" },
    { word: "Guileless", meaning: "without deceit" },
    { word: "Gullible", meaning: "easily deceived" },
    { word: "Harangue", meaning: "long, passionate, and vehement speech" },
    { word: "Homogeneous", meaning: "of the same kind" },
    { word: "Hyperbole", meaning: "exaggeration; overstatement" },
    { word: "Iconoclastic", meaning: "attacking cherished traditions" },
    { word: "Idolatry", meaning: "worship of idols; excessive admiration" },
    { word: "Immutable", meaning: "unchangeable" },
    { word: "Impair", meaning: "injure; hurt" },
    { word: "Impassive", meaning: "without feeling; imperturbable; stoical" },
    { word: "Impede", meaning: "hinder; block" },
    { word: "Impermeable", meaning: "impervious; not permitting passage through its substance" },
    { word: "Imperturbable", meaning: "calm; placid" },
    { word: "Impervious", meaning: "impenetrable; incapable of being damaged or distressed" },
    { word: "Implacable", meaning: "incapable of being pacified" },
    { word: "Implicit", meaning: "understood but not stated" },
    { word: "Implode", meaning: "burst inward" },
    { word: "Inadvertently", meaning: "unintentionally; by oversight; carelessly" },
    { word: "Inchoate", meaning: "recently begun; rudimentary; elementary" },
    { word: "Incongruity", meaning: "lack of harmony; absurdity" },
    { word: "Inconsequential", meaning: "insignificant; unimportant" },
    { word: "Incorporate", meaning: "introduce something into a larger whole; combine; unite" },
    { word: "Indeterminate", meaning: "uncertain; not clearly fixed; indefinite" },
    { word: "Indigence", meaning: "poverty" },
    { word: "Indolent", meaning: "lazy" },
    { word: "Inert", meaning: "inactive; lacking power to move" },
    { word: "Ingenuous", meaning: "naive and trusting; young; unsophisticated" },
    { word: "Inherent", meaning: "firmly established by nature or habit" },
    { word: "Innocuous", meaning: "harmless" },
    { word: "Insensible", meaning: "unconscious; unresponsive" },
    { word: "Insinuate", meaning: "hint; imply; creep in" },
    { word: "Insipid", meaning: "lacking in flavor; dull" },
    { word: "Insularity", meaning: "narrow-mindedness; isolation" },
    { word: "Intractable", meaning: "unruly; stubborn; unyielding" },
    { word: "Intransigence", meaning: "refusal of any compromise; stubbornness" },
    { word: "Inundate", meaning: "overwhelm; flood; submerge" },
    { word: "Inured", meaning: "accustomed; hardened" },
    { word: "Invective", meaning: "abuse" },
    { word: "Irascible", meaning: "irritable; easily angered" },
    { word: "Irresolute", meaning: "uncertain how to act; weak" },
    { word: "Itinerary", meaning: "plan of a trip" },
    { word: "Laconic", meaning: "brief and to the point" },
    { word: "Lassitude", meaning: "languor; weariness" },
    { word: "Latent", meaning: "potential but undeveloped; dormant; hidden" },
    { word: "Laud", meaning: "praise" },
    { word: "Lethargic", meaning: "drowsy; dull" },
    { word: "Levee", meaning: "stone embankment to prevent flooding" },
    { word: "Levity", meaning: "lack of seriousness or steadiness; frivolity" },
    { word: "Log", meaning: "record of a voyage or flight; record of day-to-day activities" },
    { word: "Loquacious", meaning: "talkative" },
    { word: "Lucid", meaning: "easily understood; clear; intelligible" },
    { word: "Luminous", meaning: "shining; issuing light" },
    { word: "Magnanimity", meaning: "generosity" },
    { word: "Malingerer", meaning: "one who feigns illness to escape duty" },
    { word: "Malleable", meaning: "capable of being shaped by pounding; impressionable" },
    { word: "Maverick", meaning: "rebel; nonconformist" },
    { word: "Mendacious", meaning: "lying; habitually dishonest" },
    { word: "Metamorphosis", meaning: "change of form" },
    { word: "Meticulous", meaning: "excessively careful; painstaking; scrupulous" },
    { word: "Misanthrope", meaning: "one who hates mankind" },
    { word: "Mitigate", meaning: "appease; moderate" },
    { word: "Mollify", meaning: "soothe" },
    { word: "Morose", meaning: "ill-humored; sullen; melancholy" },
    { word: "Mundane", meaning: "worldly as opposed to spiritual; everyday" },
    { word: "Negate", meaning: "cancel out; nullify; deny" },
    { word: "Neophyte", meaning: "recent convert; beginner" },
    { word: "Obdurate", meaning: "stubborn" },
    { word: "Obsequious", meaning: "lavishly attentive; servile; sycophantic" },
    { word: "Obviate", meaning: "make unnecessary; get rid of" },
    { word: "Occlude", meaning: "shut; close" },
    { word: "Officious", meaning: "meddlesome; excessively pushy in offering one's services" },
    { word: "Onerous", meaning: "burdensome" },
    { word: "Opprobrium", meaning: "infamy; vilification" },
    { word: "Oscillate", meaning: "vibrate; waver" },
    { word: "Ostentatious", meaning: "showy; pretentious; trying to attract attention" },
    { word: "Paragon", meaning: "model of perfection" },
    { word: "Partisan", meaning: "one-sided; prejudiced; committed to a party" },
    { word: "Pathological", meaning: "pertaining to disease" },
    { word: "Paucity", meaning: "scarcity" },
    { word: "Pedantic", meaning: "showing off learning; bookish" },
    { word: "Penchant", meaning: "strong inclination; liking" },
    { word: "Penury", meaning: "severe poverty; stinginess" },
    { word: "Perennial", meaning: "something long-lasting" },
    { word: "Perfidious", meaning: "treacherous; disloyal" },
    { word: "Perfunctory", meaning: "superficial; not thorough; lacking interest, care, or enthusiasm" },
    { word: "Permeable", meaning: "penetrable; porous; allowing liquids or gas to pass through" },
    { word: "Pervasive", meaning: "spread throughout" },
    { word: "Phlegmatic", meaning: "calm; not easily disturbed" },
    { word: "Piety", meaning: "devoutness; reverence for God" },
    { word: "Placate", meaning: "pacify; conciliate" },
    { word: "Plasticity", meaning: "ability to be molded" },
    { word: "Platitude", meaning: "trite remark; commonplace statement" },
    { word: "Plethora", meaning: "excess; overabundance" },
    { word: "Plummet", meaning: "fall sharply" },
    { word: "Porous", meaning: "full of pores; like a sieve" },
    { word: "Pragmatic", meaning: "practical (as opposed to idealistic); concerned with the practical worth or impact of something" },
    { word: "Preamble", meaning: "introductory statement" },
    { word: "Precarious", meaning: "uncertain; risky" },
    { word: "Precipitate", meaning: "rash, premature, hasty, sudden" },
    { word: "Precursor", meaning: "forerunner" },
    { word: "Presumptuous", meaning: "arrogant; taking liberties" },
    { word: "Prevaricate", meaning: "lie" },
    { word: "Pristine", meaning: "characteristic of earlier times; primitive; unspoiled" },
    { word: "Probity", meaning: "uprightness; incorruptibility" },
    { word: "Problematic", meaning: "doubtful; unsettled; questionable; perplexing" },
    { word: "Prodigal", meaning: "wasteful; reckless with money" },
    { word: "Profound", meaning: "deep; not superficial; complete" },
    { word: "Prohibitive", meaning: "tending to prevent the purchase or use of something; inclined to prevent or forbid" },
    { word: "Proliferate", meaning: "grow rapidly; spread; multiply" },
    { word: "Propensity", meaning: "natural inclination" },
    { word: "Propitiate", meaning: "appease" },
    { word: "Propriety", meaning: "fitness; correct conduct" },
    { word: "Proscribe", meaning: "ostracize; banish; outlaw" },
    { word: "Pungent", meaning: "stinging; sharp in taste or smell; caustic" },
    { word: "Qualified", meaning: "limited; restricted" },
    { word: "Quibble", meaning: "minor objection or complaint" },
    { word: "Quiescent", meaning: "at rest; dormant; temporarily inactive" },
    { word: "Rarefied", meaning: "made less dense (of a gas)" },
    { word: "Recalcitrant", meaning: "obstinately stubborn; determined to resist authority; unruly" },
    { word: "Recant", meaning: "disclaim or disavow; retract a previous statement; openly confess error" },
    { word: "Recluse", meaning: "hermit; loner" },
    { word: "Recondite", meaning: "abstruse; profound; secret" },
    { word: "Refractory", meaning: "stubborn; unmanageable" },
    { word: "Refute", meaning: "disprove" },
    { word: "Relegate", meaning: "banish to an inferior position; delegate; assign" },
    { word: "Reproach", meaning: "express disapproval or disappointment" },
    { word: "Reprobate", meaning: "person hardened in sin; devoid of a sense of decency" },
    { word: "Repudiate", meaning: "disown; disavow" },
    { word: "Rescind", meaning: "cancel" },
    { word: "Resolution", meaning: "determination" },
    { word: "Resolve", meaning: "determination; firmness of purpose" },
    { word: "Reticent", meaning: "reserved; uncommunicative; inclined to silence" },
    { word: "Reverent", meaning: "respectful; worshipful" },
    { word: "Sage", meaning: "person celebrated for wisdom" },
    { word: "Salubrious", meaning: "healthful" },
    { word: "Sanction", meaning: "approve; ratify" },
    { word: "Satiate", meaning: "satisfy fully" },
    { word: "Saturate", meaning: "soak thoroughly" },
    { word: "Savor", meaning: "enjoy; have a distinctive flavor, smell, or quality" },
    { word: "Secrete", meaning: "hide away or cache; produce and release a substance into an organism" },
    { word: "Shard", meaning: "fragment, generally of pottery" },
    { word: "Skeptic", meaning: "doubter; person who suspends judgment until having examined evidence supporting a point of view" },
    { word: "Solicitous", meaning: "worried; concerned" },
    { word: "Soporific", meaning: "sleep-causing; marked by sleepiness" },
    { word: "Specious", meaning: "seemingly reasonable but incorrect; misleading (often intentionally)" },
    { word: "Spectrum", meaning: "colored band produced when a beam of light passes through a prism" },
    { word: "Sporadic", meaning: "occurring irregularly" },
    { word: "Stigma", meaning: "token of disgrace; brand" },
    { word: "Stint", meaning: "be thrifty; set limits" },
    { word: "Stipulate", meaning: "make express conditions; specify" },
    { word: "Stolid", meaning: "dull; impassive" },
    { word: "Striated", meaning: "marked with parallel bands; grooved" },
    { word: "Strut", meaning: "pompous walk" },
    { word: "Strut", meaning: "supporting bar" },
    { word: "Subpoena", meaning: "writ summoning a witness to appear" },
    { word: "Subside", meaning: "settle down; descend; grow quiet" },
    { word: "Substantiate", meaning: "establish by evidence; verify; support" },
    { word: "Supersede", meaning: "cause to be set aside; replace; make obsolete" },
    { word: "Supposition", meaning: "hypothesis; surmise" },
    { word: "Tacit", meaning: "understood; not put into words" },
    { word: "Tangential", meaning: "peripheral; only slightly connected; digressing" },
    { word: "Tenuous", meaning: "thin; rare; slim" },
    { word: "Tirade", meaning: "extended scolding; denunciation; harangue" },
    { word: "Torpor", meaning: "lethargy; sluggishness; dormancy" },
    { word: "Tortuous", meaning: "winding; full of curves" },
    { word: "Tractable", meaning: "docile; easily managed" },
    { word: "Transgression", meaning: "violation of a law; sin" },
    { word: "Truculence", meaning: "aggressiveness; ferocity" },
    { word: "Vacillate", meaning: "waver; fluctuate" },
    { word: "Venerate", meaning: "revere" },
    { word: "Veracious", meaning: "truthful" },
    { word: "Verbose", meaning: "wordy" },
    { word: "Viable", meaning: "practical or workable" },
    { word: "Viscous", meaning: "sticky, gluey" },
    { word: "Vituperative", meaning: "abusive; scolding" },
    { word: "Volatile", meaning: "changeable; explosive; evaporation rapidly" },
    { word: "Warranted", meaning: "justified; authorized" },
    { word: "Wary", meaning: "very cautious" },
    { word: "Welter", meaning: "turmoil; bewildering jumble" },
    { word: "Whimsical", meaning: "capricious; fanciful" },
    { word: "Zealot", meaning: "fanatic; person who shows excessive zeal" },
    { word: "Zenith", meaning: "point directly overhead in the sky; summit" },
    { word: "Zephyr", meaning: "gentle breeze; west wind" },
    { word: "Abate", meaning: "subside, or moderate" },
    { word: "Aberrant", meaning: "abnormal, or deviant" },
    { word: "Abeyance", meaning: "suspended action" },
    { word: "Abscond", meaning: "depart secretly and hide" },
    { word: "Abstemious", meaning: "sparing in eating and drinking; temperate" },
    { word: "Admonish", meaning: "warn; reprove" },
    { word: "Adulterate", meaning: "make impure by adding inferior or tainted substances" },
    { word: "Aesthetic", meaning: "artistic; dealing with or capable of appreciating the beautiful" },
    { word: "Aggregate", meaning: "gather; accumulate" },
    { word: "Alacrity", meaning: "cheerful promptness; eagerness" },
    { word: "Alleviate", meaning: "relieve" },
    { word: "Amalgamate", meaning: "combine; unite in one body" },
    { word: "Ambiguous", meaning: "unclear or doubtful in meaning" },
    { word: "Ambivalence", meaning: "the state of having contradictory or conflicting emotional attitudes" },
    { word: "Ameliorate", meaning: "improve" },
    { word: "Anachronism", meaning: "something or someone misplaced in time" },
    { word: "Analogous", meaning: "comparable" },
    { word: "Anarchy", meaning: "absence of governing body; state of disorder" },
    { word: "Anomalous", meaning: "abnormal; irregular" },
    { word: "Antipathy", meaning: "aversion; dislike" },
    { word: "Apathy", meaning: "lack of caring; indifference" },
    { word: "Appease", meaning: "pacify or soothe; relieve" },
    { word: "Apprise", meaning: "inform" },
    { word: "Approbation", meaning: "approval" },
];


const Flashcard = ({ word, meaning, isFlipped, onFlip }) => (
  <motion.div 
    className="w-96 h-64 bg-gradient-to-br from-pink-300 to-pink-400 shadow-lg rounded-lg flex items-center justify-center cursor-pointer"
    onClick={onFlip}
    initial={{ rotateY: 0 }}
    animate={{ rotateY: isFlipped ? 180 : 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.div 
      className="text-center p-4 w-full h-full flex flex-col items-center justify-center"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-2 text-white">
        {isFlipped ? meaning : word}
      </h2>
      <p className="text-pink-100">
        {isFlipped ? 'Meaning' : 'Word'}
      </p>
    </motion.div>
  </motion.div>
);

const FlashcardApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : words.length - 1));
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < words.length - 1 ? prevIndex + 1 : 0));
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">GRE Vocabulary Flashcards</h1>
      <div className="flex items-center space-x-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevious} 
          className="p-3 bg-blue-500 text-white rounded-full shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <Flashcard
          word={words[currentIndex].word}
          meaning={words[currentIndex].meaning}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext} 
          className="p-3 bg-blue-500 text-white rounded-full shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFlip} 
        className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full shadow-md font-semibold"
      >
        Flip Card
      </motion.button>
      <p className="mt-4 text-blue-600 font-medium">
        Card {currentIndex + 1} of {words.length}
      </p>
    </div>
  );
};

export default FlashcardApp;