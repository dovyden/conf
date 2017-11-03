'use strict';

module.exports = {
    path: '/ws',
    transports: ['polling', 'websocket']
};
/*
path (String)
serveClient (Boolean)
adapter (Adapter)
origins (String)
parser (Parser)

pingTimeout (Number)
pingInterval (Number)
upgradeTimeout (Number)
maxHttpBufferSize (Number)
allowRequest (Function)
transports (<Array> String)
allowUpgrades (Boolean)
perMessageDeflate (Object|Boolean)
threshold (Number)
httpCompression (Object|Boolean)
threshold (Number)
cookie (String|Boolean)
cookiePath (String|Boolean)
cookieHttpOnly (Boolean)
wsEngine (String)
initialPacket (Object)
*/
