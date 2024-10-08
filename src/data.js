// const data = [
//     {
//         id: 1,
//         name: "Instagram username",
//        text:'Step 1:Open the Instagram app and go to your profile.',
//        text2:'Step 2:navigate to your profile .',
//        text3:'Step 3:Your username will be displayed at the top of your profile page.',  
//     }
// ]

const data = [
    // {
    //   "name": "contact_card",
    //   "label": "Contact Card",
    //   "icon": "https://looplink.me/public/uploads/social_icons/contact_card.png",
    //   "hint": "",
    //   "msg": "",
    //   "default_url": ""
    // },
    {
      "name": "instagram",
      "label": "Instagram",
      "icon": "https://looplink.me/public/uploads/social_icons/icon1.png",
      "hint": "Instagram username",
      "msg": "Step 1. Open the Instagram app.\nStep 2. Navigate to your profile.\nStep 3. Your username will be at the top of your screen.",
      "default_url": "https://www.instagram.com/"
    },
    {
      "name": "snapchat",
      "label": "Snapchat",
      "icon": "https://looplink.me/public/uploads/social_icons/icon3.png",
      "hint": "Snapchat username",
      "msg": "Step 1. Open the Snapchat app.\nStep 2. Tap your profile picture in the top left corner.\nStep 3. Your username will be below your Snapchat name.",
      "default_url": "https://www.snapchat.com/add/"
    },
    {
      "name": "twitter",
      "label": "Twitter",
      "icon": "https://looplink.me/public/uploads/social_icons/icon5.png",
      "hint": "Twitter username",
      "msg": "Step 1. Open the Twitter app.\nStep 2. Tap your profile picture in the top left corner.\nStep 3. Your Twitter username will be in grey with an @ sign.",
      "default_url": "https://www.twitter.com/"
    },
    {
      "name": "facebook",
      "label": "Facebook",
      "icon": "https://looplink.me/public/uploads/social_icons/icon6.png",
      "hint": "Facebook profile link",
      "msg": "Step 1. Go to facebook.com.\nStep 2. Open your Facebook profile or page.\nStep 3. Copy and paste the Facebook Username here.",
      "default_url": "https://www.facebook.com/"
    },
    {
      "name": "linkedin",
      "label": "LinkedIn",
      "icon": "https://looplink.me/public/uploads/social_icons/icon7.png",
      "hint": "LinkedIn profile link",
      "msg": "Step 1. Go to your LinkedIn profile.\nStep 2. Navigate down to the 'Contact' section.\nStep 3. Find your profile link in this section and paste here.",
      "default_url": "https://www.linkedin.com/in/"
    },
    {
      "name": "phone",
      "label": "Phone Number",
      "icon": "https://looplink.me/public/uploads/social_icons/icon13.png",
      "hint": "Phone Number",
      "msg": "Step 1. Go to your Contact App.\nStep 2. Open your profile.\nStep 3. Paste your phone number with your country code.",
      "default_url": "Phone Number"
    },
    {
      "name": "email",
      "label": "Email",
      "icon": "https://looplink.me/public/uploads/social_icons/icon15.png",
      "hint": "Email",
      "msg": "Add any email you want to make public, it can be a gmail, yahoo, hotmail, or business email.",
      "default_url": "Email"
    },
    {
      "name": "youtube",
      "label": "YouTube",
      "icon": "https://looplink.me/public/uploads/social_icons/icon2.png",
      "hint": "YouTube link",
      "msg": "Step 1. Open the YouTube app.\nStep 2. Navigate to your channel profile.\nStep 3. Tap the three dots in the top right corner, tap share. \nStep 4. Copy and paste the link here.",
      "default_url": "https://www.youtube.com/"
    },
    {
      "name": "tiktok",
      "label": "TikTok",
      "icon": "https://looplink.me/public/uploads/social_icons/icon4.png",
      "hint": "TikTok Username",
      "msg": "Step 1. Open the TikTok app.\nStep 2. Navigate to the 'Me' tab\nStep 3. Grab your TikTok username under your profile picture.",
      "default_url": "https://www.tiktok.com/@"
    },
    {
      "name": "suncloud",
      "label": "SoundCloud",
      "icon": "https://looplink.me/public/uploads/social_icons/icon10.png",
      "hint": "SoundCloud username",
      "msg": "Step 1. Open the SoundCloud app.\nStep 2. Navigate to your channel profile.\nStep 3. Copy and paste your username here.",
      "default_url": "https://www.soundcloud.com/"
    },
    {
      "name": "spotify",
      "label": "Spotify",
      "icon": "https://looplink.me/public/uploads/social_icons/icon11.png",
      "hint": "Link to Spotify",
      "msg": "Step 1. Open the Spotify app.\nStep 2. Tap the three dots in the top right corner of your favorite playlist, track, or album.\nStep 3. Tap share and copy and paste your link here.",
      "default_url": "https://open.spotify.com/us/artist/"
    },
    {
      "name": "applemusic",
      "label": "Applemusic",
      "icon": "https://looplink.me/public/uploads/social_icons/icon9.png",
      "hint": "Link to Apple Music",
      "msg": "Step 1. Open the Apple Music app.\nStep 2. Tap the three dots in the top right corner of your favorite playlist, track, or album.\nStep 3. Tap share and copy and paste your link here.",
      "default_url": "https://music.apple.com/us/artist/"
    },
    {
      "name": "veno",
      "label": "Venmo",
      "icon": "https://looplink.me/public/uploads/social_icons/icon19.png",
      "hint": "Venmo username",
      "msg": "Step 1. Open the Venmo app.\nStep 2. Tap the menu option in the top left corner.\nStep 3. Your username will be in grey with an @ sign.",
      "default_url": "https://www.venmo.com/"
    },
    {
      "name": "cashapp",
      "label": "Cash App",
      "icon": "https://looplink.me/public/uploads/social_icons/icon18.png",
      "hint": "CashApp username",
      "msg": "Step 1. Open the CashApp app.\nStep 2. Tap on the profile icon in the top right corner.\nStep 3. Your CashApp username will be in grey with a $ sign.",
      "default_url": "https://cash.app/$"
    },
    {
      "name": "paypal",
      "label": "Paypal",
      "icon": "https://looplink.me/public/uploads/social_icons/icon20.png",
      "hint": "PayPal.me link",
      "msg": "Step 1. Visit https://www.paypal.me\nStep 2. Tap the blue 'Create Your PayPal.Me Link' button.\nStep 3. When you create your account (paypal.me/username), copy and paste your link here.",
      "default_url": "https://www.paypal.com/paypalme/"
    },
    {
      "name": "whatsapp",
      "label": "WhatsApp",
      "icon": "https://looplink.me/public/uploads/social_icons/icon8.png",
      "hint": "WhatsApp number",
      "msg": "Step 1. Open the WhatsApp app.\nStep 2. Navigate to Settings.\nStep 3. Tap your profile at the top and add your WhatsApp phone number here.",
      "default_url": "https://wa.me/"
    },
    {
      "name": "twitch",
      "label": "Twitch",
      "icon": "https://looplink.me/public/uploads/social_icons/icon14.png",
      "hint": "Twitch channel",
      "msg": "Step 1. Open the Twitch app.\nStep 2. Navigate to your account.\nStep 3. Copy and paste your username here.",
      "default_url": "https://www.twitch.tv/"
    },
    {
      "name": "custom_link",
      "label": "Custom Link",
      "icon": "https://looplink.me/public/uploads/social_icons/icon12.png",
      "hint": "Custom link",
      "msg": "Step 1. Visit the website on your browser.\nStep 2. Copy and paste the URL here.",
      "default_url": 'Custom link'
    },
    {
      "name": "websitelink",
      "label": "Websitelink",
      "icon": "https://looplink.me/public/uploads/social_icons/icon16.png",
      "hint": "Website link",
      "msg": "Step 1. Visit the website on your browser.\nStep 2. Copy and paste the URL here.",
      "default_url": "Website link"
    },
    {
      "name": "googleaddress",
      "label": "Googleaddress",
      "icon": "https://looplink.me/public/uploads/social_icons/icon17.png",
      "hint": "Google address",
      "msg": "Step 1. Go to Google Maps.\nStep 2. Locate your business or location.\nStep 3. Copy and paste the location link here.",
      "default_url": "Google address"
    }
  ]
  ;

export default data;
