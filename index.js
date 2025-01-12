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

const { spawn } = require('child_process')
const path = require('path')

function startSho() {
	let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
	console.log([process.argv[0], ...args].join('\n'))
	let p = spawn(process.argv[0], args, {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc']
	})
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting Bot...')
			p.kill()
			startSho()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		if (code == '.' || code == 1 || code == 0) startSho()
	})
}
startSho()
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