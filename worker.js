addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const searchURL = buildSearchURL(query);
  return Response.redirect(searchURL, 302);
}

const bangs = {
  g: "https://www.google.com/search?q=", 
  p: "https://www.perplexity.ai/search?q=",
  b: "https://search.brave.com/search?q=",
  d: "https://duckduckgo.com/?q=",
  w: "https://cs.wikipedia.org/wiki/Special:Search?search=",
  gh: "https://github.com/search?q=",
  yt: "https://www.youtube.com/results?search_query=",
  gpt: "https://chat.openai.com/?q=",
  tw: "https://twitter.com/search?q=",
  rd: "https://www.reddit.com/search/?q=",
  ig: "https://www.instagram.com/explore/tags/",
  li: "https://www.linkedin.com/search/results/all/?keywords=",
  tmdb: "https://www.themoviedb.org/search?query=",
  amz: "https://www.amazon.com/s?k=",
  eb: "https://www.ebay.com/sch/i.html?_nkw=",
  sp: "https://www.spotify.com/search/",
  tm: "https://translate.google.com/?sl=auto&tl=en&text=",
  map: "https://www.google.com/maps/search/"
};

function buildSearchURL(query) {
  const bangMatch = query.match(/!(\w+)/);
  let baseURL = "https://www.google.com/search?q=";
  let searchQuery = query;
  if (bangMatch) {
    const bang = bangMatch[1];
    if (bangs[bang]) {
      baseURL = bangs[bang];
      searchQuery = query.replace(bangMatch[0], "").trim();
    }
  }
  return baseURL + encodeURIComponent(searchQuery);
}
