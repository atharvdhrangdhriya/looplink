const sessionString = "{\"id\":227,\"Fullname\":\"lezemulu\",\"Profilename\":\"Brooke Watson\",\"Bio\":\"Molestiae culpa libe\",\"social_media\":\"{\\\"instagram\\\":\\\"qivemiv\\\",\\\"snapchat\\\":\\\"kuhagema\\\",\\\"twitter\\\":\\\"ceqadawu\\\",\\\"facebook\\\":\\\"viheqe\\\",\\\"linkedin\\\":\\\"lytygeq\\\",\\\"phone\\\":\\\"myfir\\\",\\\"email\\\":\\\"rydawys\\\",\\\"youtube\\\":\\\"xefoq\\\",\\\"tiktok\\\":\\\"puzulaxyj\\\",\\\"suncloud\\\":\\\"govat\\\",\\\"spotify\\\":\\\"kizuwar\\\",\\\"applemusic\\\":\\\"sifyhyjyku\\\",\\\"veno\\\":\\\"jekewiliz\\\",\\\"cashapp\\\":\\\"cyqyvap\\\",\\\"paypal\\\":\\\"taqetuzas\\\",\\\"whatsapp\\\":\\\"rukeruhu\\\",\\\"twitch\\\":\\\"nicebe\\\",\\\"custom_link\\\":\\\"tuqapodyk\\\",\\\"websitelink\\\":\\\"lojeli\\\",\\\"googleaddress\\\":\\\"zeguz\\\"}\",\"filename\":\"file-1728299791503-.jpg\",\"user_image_id\":119,\"name\":\"Irene Singleton\",\"username\":\"razec\",\"bio\":\"Iusto necessitatibus\"}";

// Step 1: Parse the main session string
const sessionObject = JSON.parse(sessionString);

// Step 2: Parse the nested social_media string if it exists
if (sessionObject.social_media) {
  sessionObject.social_media = JSON.parse(sessionObject.social_media);
}

// Now sessionObject is a simple object with parsed values
console.log(sessionObject);
