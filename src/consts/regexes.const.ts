// link regex
export const IMG_REGEX = /(https?:\/\/.*\.(?:tiff?|jpe?g|gif|png|svg|ico|heic|webp))(.*)/gim
export const IPFS_REGEX = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/gim
export const POST_REGEX = /^https?:\/\/(.*)\/(.*)\/(@[\w.\d-]+)\/(.*)/i
export const CCC_REGEX = /^https?:\/\/(.*)\/ccc\/([\w.\d-]+)\/(.*)/i
export const MENTION_REGEX = /^https?:\/\/(.*)\/(@[\w.\d-]+)$/i
export const COPIED_POST_REGEX = /\/(.*)\/(@[\w.\d-]+)\/(.*)/i
export const COMMUNITY_REGEX = /^https?:\/\/(.*)\/c\/(hive-\d+)(.*)/i
export const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g
export const VIMEO_REGEX = /(https?:\/\/)?(www\.)?(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i
export const BITCHUTE_REGEX = /^(?:https?:\/\/)?(?:www\.)?bitchute.com\/(?:video|embed)\/([a-z0-9]+)/i
export const INFOWARS_REGEX = /https:\/\/(?<domain>banned.video|infowars\.com|freeworldnews\.tv|2020electioncenter\.com)\/watch\?id=(?<video>[0-9a-f]+)/
export const INFOWARS_EMBED_REGEX = /https:\/\/api\.banned\.video\/embed\/(?<video>[0-9a-f]+)/
export const D_TUBE_REGEX = /(https?:\/\/d.tube.#!\/v\/)(\w+)\/(\w+)/g
export const D_TUBE_REGEX2 = /(https?:\/\/d.tube\/v\/)(\w+)\/(\w+)/g
export const TWITCH_REGEX = /https?:\/\/(?:www.)?twitch.tv\/(?:(videos)\/)?([a-zA-Z0-9][\w]{3,24})/i
export const DAPPLR_REGEX = /^(https?:)?\/\/[a-z]*\.dapplr.in\/file\/dapplr-videos\/.*/i
export const TRUVVL_REGEX = /^https?:\/\/embed.truvvl.com\/(@[\w.\d-]+)\/(.*)/i
export const LBRY_REGEX = /^(https?:)?\/\/lbry.tv\/\$\/embed\/.*/i
export const ODYSEE_REGEX = /^(https?:)?\/\/odysee.com\/\$\/embed\/.*/i
export const ARCH_REGEX = /^(https?:)?\/\/archive.org\/embed\/.*/i
export const SPEAK_REGEX = /(?:https?:\/\/(?:3speak.([a-z]+)\/watch\?v=)|(?:3speak.([a-z]+)\/embed\?v=))([A-Za-z0-9\_\-\.\/]+)(&.*)?/i
export const TWITTER_REGEX = /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/gi
export const SPOTIFY_REGEX = /^https:\/\/open\.spotify\.com\/playlist\/(.*)?$/gi
export const RUMBLE_REGEX  = /^https:\/\/rumble\.com\/embed\/(?<id>[a-zA-Z0-9-]+)\/\?pub=4/
export const BRIGHTEON_REGEX = /^https?:\/\/(www\.)?brighteon\.com\/(?:embed\/)?(?<id>[0-9a-f-]+)/i