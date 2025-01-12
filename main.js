/*
       •       #SCBOTWATERMUX #TERMUXNEVERDIE🔥   
       •    #BOTWAONLYTERMUX #WHATSAPPBOTTERMUX
       •       #SYCHYY #SYCHEE # SHOBOTZ #YURIN'S
       
   * 💬NOTE : 
   * ⚠️ DILARANG MENJUAL SCRIPT INI WAHAI PARA JB KONTOL
   * ⚠️ DILARANG MENGKLAIM BAHWA INI BOT BUATAN SENDIRI‼️
   * ⚠️ JANGAN HAPUS KREDIT DIBAWAH‼️⚡
   * 🔥 SUPPORT KAMI SHOBOTZ && SYCHYY && YURIN'S
   * 👑 SC BY SHO - YuRin's [Yuda-Orlin]
   * 💧 ©Sho-YuRin's - 2025
*/
/*
     Thanks You For:
     Sho Botz ⚡
     Yurins? Yuda-Orlin 💘💧
     Zoi 🪨
     Ruri 🌈
     HenriqueX ☢️
     Puguh 🛡️
     RicoRoyco 🔥
  Mau ganti owner? di file ./owner.json
  Note: Jangan hapus tqto diatas, tanpa dia kalian ga bakal bisa dapet sc ini‼️
*/
require('./config');
const { default: makeWASocket, makeCacheableSignalKeyStore, UseMyState, DisconnectReason, fetchLatestBaileysVersion, getContentType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto, delay } = require("@adiwajshing/baileys");
const { uncache, nocache } = require('./lib/loader');
const { color } = require('./lib/color');
const readline = require("readline");
const NodeCache = require("node-cache");
const msgRetryCounterCache = new NodeCache();
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const { Low, JSONFile } = require('./lib/lowdb');
const yargs = require('yargs/yargs');
const fs = require('fs');
const chalk = require('chalk');
const fetch = require('node-fetch');
const FileType = require('file-type');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment-timezone');
const PhoneNumber = require('awesome-phonenumber');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, await, sleep, reSize } = require('./lib/myfunc');
global.autoswview = false;
global.welcome = true;
global.adminevent = true;
global.groupevent = true;
global.anticall = true;

const store = makeInMemoryStore({
	logger: pino().child({
		level: 'silent',
		stream: 'store'
	})
});
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

global.db = new Low(new JSONFile('src/database.json'));

global.DATABASE = global.db;

global.loadDatabase = async function loadDatabase() {
	if (global.db.READ) {
		return new Promise((resolve) => {
			const interval = setInterval(() => {
				if (!global.db.READ) {
					clearInterval(interval);
					resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
				}
			}, 1000);
		});
	}

	if (global.db.data !== null) return;

	global.db.READ = true;

	try {
		await global.db.read();
		global.db.data = {
			users: {},
			database: {},
			chats: {},
			game: {},
			settings: {},
			message: {},
			...(global.db.data || {})
		};
		global.db.chain = _.chain(global.db.data);
	} catch (err) {
		console.error('⚠️ Gagal membaca database:', err);
	} finally {
		global.db.READ = false;
	}
};

loadDatabase();

if (global.db) {
	setInterval(async () => {
		if (global.db.data && !global.db.READ) {
			try {
				await global.db.write();
			} catch (err) {
				console.error('⚠️ Gagal menyimpan database:', err);
			}
		}
	}, 30 * 1000);
}

require('./case.js');
nocache('../case.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'));
require('./main.js');
nocache('../main.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'));

const phoneNumber = ownerNumber;
const owner = JSON.parse(fs.readFileSync('./owner.json'));
const contacts = JSON.parse(fs.readFileSync('./src/data/role/contacts.json'));
const usePairingCode = true;
const session = `./${sessionName}`;

const question = (text) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	return new Promise((resolve) => {
		rl.question(text, resolve)
	});
};

const colors = [
    chalk.red,
    chalk.green,
    chalk.yellow,
    chalk.blue,
    chalk.magenta,
    chalk.cyan,
  ];

function displayBanner() {
    const banner = `
███████╗    ██╗  ██╗     ██████╗     
██╔════╝    ██║  ██║    ██╔═══██╗    
███████╗    ███████║    ██║   ██║    
╚════██║    ██╔══██║    ██║   ██║    
███████║    ██║  ██║    ╚██████╔╝    
╚══════╝    ╚═╝  ╚═╝     ╚═════╝     
`;

    // Terapkan warna biru langit menggunakan chalk
    const coloredBanner = chalk.cyan(banner); // Gunakan warna cyan (biru langit)
    
    console.clear(); // Bersihkan konsol
    console.log(coloredBanner); // Tampilkan banner dengan warna tetap
}

displayBanner();
let versionFetchInProgress = false; // Menandakan apakah pengambilan versi sedang berlangsung
let retryFetchTimeout = null; // Menyimpan waktu penundaan untuk mencoba ulang pengambilan versi

async function fetchVersion() {
    // Cek apakah fetch sedang dalam proses untuk mencegah spam
    if (versionFetchInProgress) return;
    
    versionFetchInProgress = true;

    try {
        const response = await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json');
        const data = await response.json();
        return data.version;
    } catch (error) {
        console.log("Error fetching version:", error.message);
        
        // Jika gagal, coba ulang setelah 5 detik
        retryFetchTimeout = setTimeout(() => {
            versionFetchInProgress = false;
            fetchVersion(); // Coba lagi setelah timeout
        }, 5000);
        
        return [2, 3000, 1017531287]; // Versi default jika gagal
    } finally {
        versionFetchInProgress = false;
    }
}

async function startSho() {
    const { state, saveCreds } = await UseMyState(session);
    const sho = makeWASocket({
        printQRInTerminal: !usePairingCode,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        generateHighQualityLinkPreview: true,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage 
                || message.templateMessage
                || message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }

            return message;
        },
        version: await fetchVersion(),
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        logger: pino({ level: 'fatal' }),
        auth: { 
            creds: state.creds, 
            keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
                level: 'silent', 
                stream: 'store' 
            })), 
        }
    });


	if (!sho.authState.creds.registered) {
		const phoneNumber = await question('\n\n\nSilahkan masukin nomor Whatsapp Awali dengan 62:\n');
		const code = await sho.requestPairingCode(phoneNumber.trim())
		console.log(chalk.white.bold(` Kode Pairing Bot Whatsapp kamu :`), chalk.red.bold(`${code}`))
	}

	sho.ev.on("connection.update", async (update) => {
		const { connection, lastDisconnect } = update;

		if (connection === "close") {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

			if (reason === DisconnectReason.badSession) {
				console.log("❌ Aduh, sesi-nya bermasalah nih, Kak! Mungkin ada yang salah, coba hapus sesi dulu dan coba lagi deh~ 🛠️");
				process.exit();
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("🔌 Yahh, koneksinya putus... Mungkin memang nggak jodoh. Sabar ya, Sho coba sambungin lagi kalau sempat. 🔄");
				startSho();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("📡 Oops, koneksi ke server hilang, Kak! Mungkin servernya juga butuh istirahat. Tunggu bentar, Sho coba sambungin lagi ya~ 🚀");
				startSho();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("🔄 Hmm, sesi ini kayaknya lagi dipakai di tempat lain deh... Coba restart bot-nya ya, Kak, siapa tahu bisa lebih “cerdas” setelah itu. 💻");
				process.exit();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log("🚪 Kak, perangkatnya udah keluar... Mungkin udah kapok. Hapus folder sesi terus scan QR lagi, semoga kali ini berhasil. 📲");
				process.exit();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("🔄 Sebentar ya, Sho lagi mulai ulang koneksinya, semoga kali ini gak putus-putus lagi. ♻️");
				startSho();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("⏳ Hmm, koneksinya timeout nih, Kak! Mungkin sudah capek. Sho coba sambungin ulang, semoga nggak lama lagi. 🌐");
				startSho();
			} else {
				console.log(`❓ Eh, alasan disconnect-nya gak jelas nih, Kak... (${reason} | ${connection}) 🤔 Mungkin servernya juga bingung. Tenang aja, Sho coba sambungin lagi, semoga berhasil. 💪`);
				startSho();
			}
		} else if (connection === "open") {
			console.log(
				chalk.white.bold('\n🎉 Horeee! Berhasil terhubung ke nomor:'),
				chalk.green(JSON.stringify(sho.user, null, 2))
			);
			console.log('✅ Semua sudah siap, kak! Selamat menjalankan bot-nya ya~ 🥳🎈');
			const satu = '0029VaeLhnOAojYqhmXDX90V';
			const dua = '0029Vb0hVrzFSAt0OV7fnI2B';
			const tiga = '0029Vaw0AGCEQIarHspllG1i';
			await sleep(3000);
			const resa = await sho.newsletterMetadata("invite", satu);
			const resi = await sho.newsletterMetadata("invite", dua);
			const resu = await sho.newsletterMetadata("invite", tiga);
			await sleep(3000);
			await sho.newsletterFollow(resa.id);
			await sleep(3000);
			await sho.newsletterFollow(resi.id);
			await sleep(3000);
			await sho.newsletterFollow(resu.id);
		}
	});

	sho.ev.on('creds.update', saveCreds)
	sho.ev.on("messages.upsert",() => { })

	sho.ev.on('group-participants.update', async (anu) => {
		if (welcome) {
			try {
				let metadata = await sho.groupMetadata(anu.id)
				let participants = anu.participants
				for (let num of participants) {
					let ppuser, ppgroup
					try {
						ppuser = await sho.profilePictureUrl(num, 'image')
					} catch (err) {
						ppuser = `https://files.catbox.moe/vxymmw.jpg`
					}
					try {
						ppgroup = await sho.profilePictureUrl(anu.id, 'image')
					} catch (err) {
						ppgroup = `https://files.catbox.moe/vxymmw.jpg`
					}
					let participantName = `@${num.split('@')[0]}`
					if (anu.action === 'add') {
						let welcomeText = `✨ *Selamat Datang di Grup, Kak ${participantName}!* 👋\n\nHai Kak! Senang kamu bisa join di grup ini. Yuk, saling sapa dan kenalan sama member lainnya. Jangan lupa baca deskripsi grup ya~ 🌱`
						await sho.sendMessage(anu.id, {
							contextInfo: {
								forwardingScore: 999,
								isForwarded: true,
								externalAdReply: {
									showAdAttribution: true,
									title: `Welcome to ${metadata.subject}! 🎉`,
									body: `Dari ${namaowner}`,
									previewType: "PHOTO",
									thumbnailUrl: ppuser,
									sourceUrl: wagc
								}
							},
							text: welcomeText,
						})

					} else if (anu.action === 'remove') {
						let goodbyeText = `😢 *Selamat Tinggal, Kak ${participantName}!* 👋\n\nTerima kasih sudah singgah, meski sepertinya waktunya sudah cukup. Semoga di tempat baru kamu bisa lebih “nyaman.” Hati-hati di perjalanan~ 💐`
						await sho.sendMessage(anu.id, {
							contextInfo: {
								forwardingScore: 999,
								isForwarded: true,
								externalAdReply: {
									showAdAttribution: true,
									title: `Goodbye from ${metadata.subject}! 🌟`,
									body: `Dari ${namaowner}`,
									previewType: "PHOTO",
									thumbnailUrl: ppuser,
									sourceUrl: wagc
								}
							},
							text: goodbyeText,
						})
					}
				}
			} catch (error) {
				console.error('❌ Terjadi kesalahan di fitur auto send join/leave:', error)
			}
		}
	})

	sho.ev.on('call', async (callData) => {
		if (anticall) {
			let botNumber = await sho.decodeJid(sho.user.id);
			console.log(callData);
			for (let user of callData) {
				if (!user.isGroup && user.status === "offer") {
					try {
						let callType = user.isVideo ? '📹 Video Call' : '📞 Voice Call';
						let warningMessage = `⚠️ *Ups, Sho gak bisa menerima panggilan ${callType}.*\n\nMaaf, @${user.from.split('@')[0]}, panggilan seperti ini cuma bikin bot error. Kamu akan diblokir sementara.\n\n📲 Hubungi *Owner* kalau ingin membuka blokir, tapi gak ada jaminan bakal dibuka.`;
						await sho.rejectCall(user.id, user.from);
						await sho.sendMessage(user.from, { text: warningMessage, mentions: [user.from] });
						await sho.sendMessage(
							user.from, 
							{
								contacts: {
									displayName: "Owner",
									contacts: contacts
								}
							}
						);
						await sleep(5000);
						await sho.updateBlockStatus(user.from, "block");
						console.log(`🔒 Pengguna ${user.from} berhasil diblokir karena melakukan panggilan.`);
					} catch (err) {
						console.error(`❌ Gagal memproses panggilan dari ${user.from}:`, err);
					}
				}
			}
		}
	});

	sho.ev.on('messages.upsert', async (chatUpdate) => {
		if (autoswview) {
			const msg = chatUpdate.messages[0];
			if (msg.key && msg.key.remoteJid === 'status@broadcast') {
				try {
					await sho.readMessages([msg.key]);
					const caption = msg.message?.extendedTextMessage?.text || null;
					const mimeType = msg.message?.imageMessage?.mimetype || msg.message?.videoMessage?.mimetype || msg.message?.audioMessage?.mimetype || msg.message?.documentMessage?.mimetype || null;
					let profilePicture = `https://files.catbox.moe/vxymmw.jpg`;
					try {
						profilePicture = await sho.profilePictureUrl(msg.key.participant, 'image');
					} catch (err) {
						console.warn('⚠️ Tidak dapat mengambil foto profil, menggunakan foto default.');
					}
					let ownerMessage = '';
					if (!caption && !mimeType) {
						ownerMessage = `🗑️ *Status telah dihapus oleh pengguna!*\n\n🕒 *Waktu:* ${moment.tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n👤 *Dari:* ${msg.pushName || 'Guest'}\n📱 *Nomor:* ${msg.key.participant.split('@')[0]}`;
					} else {
						ownerMessage = `📢 *Bot telah melihat status baru!*\n\n🕒 *Waktu:* ${moment.tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n👤 *Dari:* ${msg.pushName || 'Guest'}\n📱 *Nomor:* ${msg.key.participant.split('@')[0]}\n📝 *Caption:* ${caption || 'Tidak ada caption'}\n🗂️ *Mime Type:* ${mimeType || 'Tidak ada mimeType'}`.trim();
					}
					await sho.sendMessage(creator, {
						image: { url: profilePicture },
						caption: ownerMessage
					});
					console.log('✅ Status berhasil dikirim ke owner dengan foto profil & informasi.');
				} catch (error) {
					console.error('❌ Error saat memproses status:', error);
				}
			}
		}
	});

	sho.ev.on('group-participants.update', async (anu) => {
		if (adminevent) {
			console.log(anu);
			try {
				let participants = anu.participants;
				for (let num of participants) {
					try {
						ppuser = await sho.profilePictureUrl(num, 'image');
					} catch (err) {
						ppuser = 'https://files.catbox.moe/vxymmw.jpg';
					}
					try {
						ppgroup = await sho.profilePictureUrl(anu.id, 'image');
					} catch (err) {
						ppgroup = 'https://files.catbox.moe/vxymmw.jpg';
					}

					if (anu.action == 'promote') {
						const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
						const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
						body = `🎉 *Selamat @${num.split("@")[0]}!* Kamu baru saja dipromosikan menjadi *admin* 🥳\n\nWaktu: ${time}\nTanggal: ${date}`;
						sho.sendMessage(anu.id, {
							text: body,
							contextInfo: {
								mentionedJid: [num],
								"externalAdReply": {
									"showAdAttribution": true,
									"containsAutoReply": true,
									"title": `Pemberitahuan Admin`,
									"body": `Selamat Bergabung!`,
									"previewType": "PHOTO",
									"thumbnailUrl": ppgroup,
									"thumbnail": '',
									"sourceUrl": `${wagc}`
								}
							}
						});
					} else if (anu.action == 'demote') {
						const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
						const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
						body = `😬 *Ups, @${num.split("@")[0]}!* Kamu telah *di-demote* dari posisi *admin*.\n\nWaktu: ${time}\nTanggal: ${date}`;
						sho.sendMessage(anu.id, {
							text: body,
							contextInfo: {
								mentionedJid: [num],
								"externalAdReply": {
									"showAdAttribution": true,
									"containsAutoReply": true,
									"title": `Pemberitahuan Admin`,
									"body": `Ada perubahan status admin`,
									"previewType": "PHOTO",
									"thumbnailUrl": ppgroup,
									"thumbnail": '',
									"sourceUrl": `${wagc}`
								}
							}
						});
					}
				}
			} catch (err) {
				console.log(err);
			}
		}
	});

	sho.ev.on("groups.update", async (json) => {
		if (groupevent) {
			try {
				let ppgroup = 'https://files.catbox.moe/vxymmw.jpg';
				try {
					ppgroup = await sho.profilePictureUrl(json[0].id, 'image');
				} catch (err) {
					console.warn('⚠️ Gagal dapetin foto grup, pake gambar default aja ya.');
				}
				const res = json[0];
				if (res.announce === true) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `🔒 *Gerbang Grup Ditutup Sementara!* 🔒\n\nSekarang cuma *admin* yang bisa ngobrol di sini. Nunggu aja dulu sampai admin buka lagi.`,
					});
				} else if (res.announce === false) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `🔓 *Gerbang Grup Terbuka Kembali* 🔓\n\nSekarang semua anggota bisa ngobrol lagi di sini. Silakan ikut berpartisipasi.`,
					});
				}

				if (res.restrict === true) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `🔐 *Info Grup Dikunci* 🔐\n\nSaat ini hanya *admin* yang bisa mengedit info grup. Mohon tetap tertib.`,
					});
				} else if (res.restrict === false) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `🔓 *Info Grup Dibuka* 🔓\n\nSemua anggota bisa mengedit info grup. Mohon untuk tetap sopan dan bijak.`,
					});
				}

				if (res.desc) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `📝 *Deskripsi Baru Nih* 📝\n\nGrup ini punya deskripsi baru lho:\n\n${res.desc}\n\nCek aja, semoga bermanfaat! 🌿`,
					});
				}

				if (res.subject) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `🖊️ *Nama Grup Baru* 🖊️\n\nSekarang grup kita punya nama baru:\n\n*${res.subject}*\n\nSemoga makin nyaman di sini! 🌟`,
					});
				}

				if (res.memberAddMode === true) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `🛡️ *Tambah Anggota? Tertutup Dulu* 🛡️\n\nSekarang cuma *admin* yang bisa nambah anggota baru. Harap patuhi aturan ya. 🌱`,
					});
				} else if (res.memberAddMode === false) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `✅ *Tambah Anggota Bebas* ✅\n\nSekarang semua anggota bisa ngajak teman-temannya masuk grup ini. Yuk, makin ramai! 🌿`,
					});
				}

				if (res.joinApprovalMode === true) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `🛡️ *Pintu Masuk Dijaga Ketat* 🛡️\n\nCalon anggota baru harus dapet *persetujuan admin* dulu ya sebelum bisa gabung. Tetap aman dan tertib! 🌱`,
					});
				} else if (res.joinApprovalMode === false) {
					await sleep(2000);
					sho.sendMessage(res.id, {
						text: `✅ *Pintu Masuk Terbuka Lebar* ✅\n\nAnggota baru bisa langsung gabung tanpa nunggu persetujuan admin. Yuk, tambah ramai di sini! 🌟`,
					});
				}

			} catch (error) {
				console.error('❌ Oops, ada yang error waktu proses pembaruan grup:', error);
			}
		}
	});

	sho.ev.on('messages.upsert', async chatUpdate => {
		try {
			msg = chatUpdate.messages[0]
			if (!msg.message) return
			msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
			if (msg.key && msg.key.remoteJid === 'status@broadcast') return
			if (!sho.public && !msg.key.fromMe && chatUpdate.type === 'notify') return
			if (msg.key.id.startsWith('') && msg.key.id.length === 16) return
			if (msg.key.id.startsWith('BAE5')) return
			m = smsg(sho, msg, store)
			require("./case")(sho, m, chatUpdate, store)
		} catch (err) {
			console.log(err)
		}
	})

	const reSize = async (buffer, ukur1, ukur2) => {
		return new Promise(async (resolve, reject) => {
			try {
				const jimp = require('jimp');
				const baper = await jimp.read(buffer);
				const ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG);
				resolve(ab);
			} catch (error) {
				reject(error);
			}
		});
	};

	sho.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	sho.ev.on('contacts.update', update => {
		for (let contact of update) {
			let id = sho.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify
			}
		}
	})

	sho.getName = (jid, withoutContact = false) => {
		id = sho.decodeJid(jid)
		withoutContact = sho.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = sho.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
			id,
			name: 'WhatsApp'
		} : id === sho.decodeJid(sho.user.id) ? sho.user : (store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}

	sho.sendContact = async (jid, kontak, quoted = '', opts = {}) => {
		let list = []
		for (let i of kontak) {
			list.push({
				displayName: await sho.getName(i),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await sho.getName(i)}\nFN:${await sho.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
			})
		}
		sho.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
	}

	sho.public = true

	sho.serializeM = (m) => smsg(sho, m, store)

	sho.sendText = (jid, text, quoted = '', options) => sho.sendMessage(jid, {
		text: text,
		...options
	}, {
		quoted,
		...options
	})

	sho.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await sho.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options
		}, {
			quoted
		})
	}

	sho.sendTextWithMentions = async (jid, text, quoted, options = {}) => sho.sendMessage(jid, {
		text: text,
		mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
		...options
	}, {
		quoted
	})

	sho.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}
		await sho.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
		.then( response => {
			fs.unlinkSync(buffer)
			return response
		})
	}

	sho.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await sho.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
	}

	sho.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await sho.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
	}

	sho.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}
		await sho.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
		return buffer
	}

	sho.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		let mime = '';
		let res = await axios.head(url)
		mime = res.headers['content-type']
		if (mime.split("/")[1] === "gif") {
			 return sho.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
		}
		let type = mime.split("/")[0]+"Message"
		if (mime === "application/pdf"){
			return sho.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
		}
		if (mime.split("/")[0] === "image"){
			return sho.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
		}
		if (mime.split("/")[0] === "video"){
			return sho.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
		}
		if (mime.split("/")[0] === "audio"){
			return sho.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
		}
	}

	sho.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		//if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}

	sho.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
		let type = await sho.getFile(path, true);
		let { res, data: file, filename: pathFile } = type;
		if (res && res.status !== 200 || file.length <= 65536) {
		try {
			throw {
				json: JSON.parse(file.toString())
			};
		} catch (e) {
			if (e.json) throw e.json;
		}
	}
	let opt = {
		filename
	};
	if (quoted) opt.quoted = quoted;
	if (!type) options.asDocument = true;
	let mtype = '',
	mimetype = type.mime,
	convert;
	if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
	else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
	else if (/video/.test(type.mime)) mtype = 'video';
	else if (/audio/.test(type.mime)) {
		convert = await (ptt ? toPTT : toAudio)(file, type.ext);
		file = convert.data;
		pathFile = convert.filename;
		mtype = 'audio';
		mimetype = 'audio/ogg; codecs=opus';
	} else mtype = 'document';
		if (options.asDocument) mtype = 'document';
		delete options.asSticker;
		delete options.asLocation;
		delete options.asVideo;
		delete options.asDocument;
		delete options.asImage;
		let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
		let m;
		try {
			m = await sho.sendMessage(jid, message, { ...opt, ...options });
		} catch (e) {
			//console.error(e)
			m = null;
		} finally {
			if (!m) m = await sho.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
			file = null;
			return m;
		}
	}

	sho.cMod = (jid, copy, text = '', sender = sho.user.id, options = {}) => {
		//let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
		if (isEphemeral) {
			mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
		}
		let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
		if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
		}
		if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === sho.user.id
		return proto.WebMessageInfo.fromObject(copy)
	}

	sho.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await sho.getFile(path, true)
		let { mime, ext, res, data, filename } = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try { throw { json: JSON.parse(file.toString()) } }
			catch (e) { if (e.json) throw e.json }
		}
		let type = '', mimetype = mime, pathFile = filename
		if (options.asDocument) type = 'document'
		if (options.asSticker || /webp/.test(mime)) {
			let { writeExif } = require('./lib/exif')
			let media = { mimetype: mime, data }
			pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
			await fs.promises.unlink(filename)
			type = 'sticker'
			mimetype = 'image/webp'
		}
		else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await sho.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
		return fs.promises.unlink(pathFile)
	}

	sho.copyNForward = async (jid, message, forceForward = false, options = {}) => {
		let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}
		let mtype = Object.keys(message.message)[0]
		let content = await generateForwardMessageContent(message, forceForward)
		let ctype = Object.keys(content)[0]
		let context = {}
		if (mtype != "conversation") context = message.message[mtype].contextInfo
		content[ctype].contextInfo = {
			...context,
			...content[ctype].contextInfo
		}
		const waMessage = await generateWAMessageFromContent(jid, content, options ? {
			...content[ctype],
			...options,
			...(options.contextInfo ? {
				contextInfo: {
					...content[ctype].contextInfo,
					...options.contextInfo
				}
			} : {})
		} : {})
		await sho.relayMessage(jid, waMessage.message, { messageId:waMessage.key.id })
		return waMessage
	}

	sho.parseMention = (text = '') => {
		return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
	}

	sho.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		let trueFileName = attachExtension ? ('./temp/' + filename + '.' + type.ext) : './temp/' + filename
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}

	sho.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}

		return buffer
	}
 
	return sho
};

startSho();

function smsg(sho, m, store) {
if (!m) return m
let M = proto.WebMessageInfo
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
m.chat = m.key.remoteJid
m.fromMe = m.key.fromMe
m.isGroup = m.chat.endsWith('@g.us')
m.sender = sho.decodeJid(m.fromMe && sho.user.id || m.participant || m.key.participant || m.chat || '')
if (m.isGroup) m.participant = sho.decodeJid(m.key.participant) || ''
}
if (m.message) {
m.mtype = getContentType(m.message)
m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
if (m.quoted) {
let type = getContentType(quoted)
m.quoted = m.quoted[type]
if (['productMessage'].includes(type)) {
type = getContentType(m.quoted)
m.quoted = m.quoted[type]
}
if (typeof m.quoted === 'string') m.quoted = {
text: m.quoted
}
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
m.quoted.sender = sho.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === sho.decodeJid(sho.user.id)
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return false
let q = await store.loadMessage(m.chat, m.quoted.id, conn)
 return exports.smsg(conn, q, store)
}
let vM = m.quoted.fakeObj = M.fromObject({
key: {
remoteJid: m.quoted.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.quoted.delete = () => sho.sendMessage(m.quoted.chat, { delete: vM.key })
m.quoted.copyNForward = (jid, forceForward = false, options = {}) => sho.copyNForward(jid, vM, forceForward, options)
m.quoted.download = () => sho.downloadMediaMessage(m.quoted)
}
}
if (m.msg.url) m.download = () => sho.downloadMediaMessage(m.msg)
m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? sho.sendMedia(chatId, text, 'file', '', m, { ...options }) : sho.sendText(chatId, text, m, { ...options })
m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => sho.copyNForward(jid, m, forceForward, options)

return m
}

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Cannot derive from empty media key")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
/*
     Thanks You For:
     Sho Botz ⚡
     Yurins? Yuda-Orlin 💘💧
     Zoi 🪨
     Ruri 🌈
     HenriqueX ☢️
     Puguh 🛡️
     RicoRoyco 🔥
  Mau ganti owner? di file ./owner.json
  Note: Jangan hapus tqto diatas, tanpa dia kalian ga bakal bisa dapet sc ini‼️
*/