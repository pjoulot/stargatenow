/* Shared campaign content for Stargate Now Europe.
   Edit this file to update actions, contact targets and footer links. */
window.SGN = {
  /* Canonical site URL — used by the "Copy link" action. */
  site: "https://stargatenow.com",

  /* The tweetstorm event — single source of truth for the hero countdown AND
     the "Add to Calendar" button. `start` is ISO 8601 WITH an explicit offset
     (+02:00 = CEST), so it resolves to the same instant in every timezone.
     durationMins is the calendar event length. */
  event: {
    title: "Stargate Now Europe — Global Tweetstorm",
    start: "2026-06-24T10:00:00-07:00",
    durationMins: 60
  },

  /* Pre-filled X (Twitter) post — used by the hero button and Action 01.
     Keep the entire string under ~270 chars; it must include both handles,
     the site URL and the #SaveStargate / #StargateNow hashtags. */
  tweet: "@AmazonMGMStudios @PrimeVideo please reconsider the cancellation and continue the #Stargate series from Martin Gero. #SaveStargate #StargateNow https://stargatenow.com",

  /* Respectful email template — pre-fills the mailto: links in Action 03. */
  email: {
    subject: "Please reconsider the cancelled Stargate revival",
    body: "Dear Amazon MGM Studios team,\n\n[ Add a sentence or two here, in your own words, about why the Stargate revival matters to you. ]\n\nWith respect and hope,\nA Stargate fan (#SaveStargate)"
  },

  actions: [
    { title:"X (Twitter) Blast", cta:"Post now", type:"tweet",
      copy:"Post with <b>#SaveStargate</b> and tag <b>@AmazonMGMStudios</b>. Volume is the message — coordinate, repeat, amplify." },

    { title:"Sign the Petition", cta:"Sign now", type:"link",
      href:"https://www.change.org/p/save-stargate-with-martin-gero",
      copy:"Add your name to the Change.org petition growing by the hour. One signature is a data point; a hundred thousand is a headline." },

    { title:"Respectful Emails", cta:"Email execs", type:"reveal",
      copy:"Send targeted, <b>polite</b> notes straight to Amazon leadership. Each opens a pre-written, respectful email.",
      items:[
        { kind:"mail", label:"M. Hopkins", sub:"mike.hopkins@amazonstudios.com" },
        { kind:"mail", label:"P. Friedlander", sub:"pfriedlander@amazon.com" }
      ] },

    { title:"Physical Letters", cta:"View address", type:"reveal",
      copy:"Mail printed letters to Amazon leadership — paper is hard to ignore.",
      items:[
        { kind:"address", label:"Peter Friedlander", lines:["Head of Global Television","Amazon MGM Studios","The Culver Studios","9336 West Washington Boulevard","Culver City, CA 90232"] }
      ] },

    { title:"Direct Support", cta:"Contact Amazon", type:"reveal",
      copy:"Tell Amazon Customer Service, politely, that you're disappointed and want the revival back.",
      items:[
        { kind:"link", label:"Call Amazon", sub:"+1 206-266-1000", href:"tel:+12062661000" },
        { kind:"link", label:"Open support chat", sub:"amazon.com", href:"https://www.amazon.com/gp/help/customer/contact-us" }
      ] },

    { title:"Fund the Campaign", cta:"Contribute", type:"link",
      href:"https://www.gofundme.com/f/savestargate-dont-close-the-gate",
      copy:"Back fan-led billboards and aerial banners flown over Amazon HQ." },

    { title:"Mobilize Networks", cta:"Copy link", type:"copy",
      copy:"Share this campaign with every sci-fi community, forum and group chat you know." },

    { title:"Stream the Franchise", cta:"Watch on Prime", type:"link",
      href:"https://www.primevideo.com/search/ref=atv_nb_sr?phrase=Stargate",
      copy:"Keep watching classic Stargate on official platforms to spike viewership metrics." }
  ],

  socials:
    '<a href="https://x.com/StargateNow_EU" target="_blank" rel="noopener" aria-label="Stargate Now Europe on X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>'
};
