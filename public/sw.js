if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let t={};const o=e=>i(e,c),r={module:{uri:c},exports:t,require:o};n[c]=Promise.all(s.map((e=>r[e]||o(e)))).then((e=>(a(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/1gQiPjMlS8rvqF7nvYbXf/_buildManifest.js",revision:"c7d6e0316c17e7b23b5af6cfdba7cd52"},{url:"/_next/static/1gQiPjMlS8rvqF7nvYbXf/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/282-b05176d714afd32f.js",revision:"b05176d714afd32f"},{url:"/_next/static/chunks/fb7d5399-991627cefb29bc24.js",revision:"991627cefb29bc24"},{url:"/_next/static/chunks/framework-5429a50ba5373c56.js",revision:"5429a50ba5373c56"},{url:"/_next/static/chunks/main-3d95fe5764bf3726.js",revision:"3d95fe5764bf3726"},{url:"/_next/static/chunks/pages/_app-790c8b94ec6ffd2c.js",revision:"790c8b94ec6ffd2c"},{url:"/_next/static/chunks/pages/_error-b6491f42fb2263bb.js",revision:"b6491f42fb2263bb"},{url:"/_next/static/chunks/pages/game-c0a392af91b32fa9.js",revision:"c0a392af91b32fa9"},{url:"/_next/static/chunks/pages/index-29301195cdfd5aa8.js",revision:"29301195cdfd5aa8"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ee7e63bc15b31913.js",revision:"ee7e63bc15b31913"},{url:"/_next/static/css/100814e6e36944ca.css",revision:"100814e6e36944ca"},{url:"/_next/static/css/9f0d25e54cbf5b6e.css",revision:"9f0d25e54cbf5b6e"},{url:"/_next/static/css/d18ccea169bff7d3.css",revision:"d18ccea169bff7d3"},{url:"/_next/static/media/cinzel-decorative-latin-400-normal.5b48941b.woff",revision:"5b48941b"},{url:"/_next/static/media/cinzel-decorative-latin-400-normal.ed774aef.woff2",revision:"ed774aef"},{url:"/_next/static/media/close.c8699234.png",revision:"c95b6b121033fd43e39770f47adef455"},{url:"/_next/static/media/contact.3e2bc3e5.png",revision:"50a180082ebb254c1b72cc333d01ae47"},{url:"/_next/static/media/copy.b58a7d19.png",revision:"26b38dd4647fdbc5bcbe60303d0f35b3"},{url:"/_next/static/media/dark_wall.af1e4d83.png",revision:"af1e4d83"},{url:"/_next/static/media/endLine.597846e9.png",revision:"9040616ea4b4334d3614d983409573d4"},{url:"/_next/static/media/github.7e40569c.png",revision:"cda394d790aa7ee7e3f9eaddf6d168fa"},{url:"/_next/static/media/home.1fa74cfe.png",revision:"50a617147aef1831f08c09636fb7d7c1"},{url:"/_next/static/media/hr.3c5ee43c.png",revision:"3c5ee43c"},{url:"/_next/static/media/info.bf064c53.png",revision:"28f5378b312c6bb823086f4bde2cfd81"},{url:"/_next/static/media/insta.b6474103.png",revision:"65049b22976d07e160aaf2cdad5651dd"},{url:"/_next/static/media/linkedin.2edeb115.png",revision:"be20c14030304602c5b2fd891696cfaa"},{url:"/_next/static/media/logo.2ce43850.png",revision:"f4b02e15404b18be3db8c63e2fd49061"},{url:"/_next/static/media/mail.95ef572a.png",revision:"a912394ab050135533904a81a57ff8e5"},{url:"/_next/static/media/video.ca9b80e4.png",revision:"ca9b80e4"},{url:"/bishop-transformed.glb",revision:"f4a0773454c51531f1a89c92fffc1455"},{url:"/favIcons/android-chrome-192x192.png",revision:"30b9d3303eaba7c07d57dd5461529b3f"},{url:"/favIcons/android-chrome-512x512.png",revision:"773e678bfe061cfbae3d937b1ade62e5"},{url:"/favIcons/apple-touch-icon.png",revision:"9a34abe9ec8d9ba5434c8978e48b5723"},{url:"/favIcons/favicon-16x16.png",revision:"e65b756188d466d719ec5c414480cae9"},{url:"/favIcons/favicon-32x32.png",revision:"75fc46dc9f352b836dc64f54cbe9ef34"},{url:"/favIcons/favicon.ico",revision:"2a3bfb1c1f11f9d2bc9b5b99c56e014f"},{url:"/favIcons/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/images/hogwards.png",revision:"6e01a564525646b3895869df3c2339e7"},{url:"/images/lakeView.jpg",revision:"3796c57bc54bbe0e3e76c34300534dba"},{url:"/king-transformed.glb",revision:"33a3334701524182077fa93c9c7b73b9"},{url:"/knight-transformed.glb",revision:"ff86789c7e5087bfd7dfce9d19a1c4b4"},{url:"/logo/icon-128x128.png",revision:"c51f4e584ac8493ebcc791eb48270844"},{url:"/logo/icon-144x144.png",revision:"dee34d5ff5cea36b0b332457db3c025e"},{url:"/logo/icon-152x152.png",revision:"07240a244622e7a8e903881a609641d3"},{url:"/logo/icon-192x192.png",revision:"d9919b41bfe62542d09f9d7755f4ade0"},{url:"/logo/icon-384x384.png",revision:"37f2520f58345cce509e3493b8cf60cb"},{url:"/logo/icon-48x48.png",revision:"c9b9b5603b68c0f148b7979aaf84c5bd"},{url:"/logo/icon-512x512.png",revision:"25d61733b1400b83c21b9220dfa5da71"},{url:"/logo/icon-72x72.png",revision:"28fce3e12c0750a2295dce88d8285bde"},{url:"/logo/icon-96x96.png",revision:"3804cb807fc7ae4bcbc77c9f884bc7f8"},{url:"/manifest.json",revision:"458481bf47e510eca5abb827f82870be"},{url:"/pawn-transformed.glb",revision:"7069e3e090ba5cb0e1f89425f5394ddb"},{url:"/queen-transformed.glb",revision:"fa047b6bb1cd02aecd65edf352073992"},{url:"/rook-transformed.glb",revision:"2bb43c5fe1613666bdcc37a4634c83ae"},{url:"/videos/clouds.webm",revision:"8fc73e85855687c5543f1366d9257162"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:i,state:s})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));